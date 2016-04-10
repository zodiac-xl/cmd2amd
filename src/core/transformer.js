import path         from 'path'
import del          from 'del'
import fu           from 'fileutil';
import concat       from 'concat-regexp';
import ef           from 'easy-file'

import gulp         from 'gulp'
import webpack      from 'webpack-stream';
import less         from 'gulp-less';
import rename       from 'gulp-rename';
import wrapper      from 'gulp-wrapper';
import watch        from 'gulp-watch';


let babel = require("babel");

import {pathAbsolute,makeAMD,getModulePath} from './util';


let l = function (str, des) {

    console.log('------------------s');
    des && console.log(des + ":");
    console.log(str);
    console.log('------------------e');
};

let distPath;
let sourcePath;
let rootPath;
let externals;
let needPackRegExp;
let modulePrefix;
let template;
let loadedMap = {};
let moduleEffectMap = {}; //文件增加的时候会影像 引用他的文件
let needWatch = false;

if (!template) {
    ef.read(path.join(__dirname, './template.js'), function (contents) {
        template = contents;
    });
}

function doTransform(options) {

    distPath = options.distPath;
    sourcePath = options.sourcePath;
    rootPath = options.rootPath;
    externals = options.externals || {};
    needPackRegExp = options.needPackRegExp || [];
    modulePrefix = options.modulePrefix || '';
    needWatch = options.needWatch || false;


    del.sync(distPath);


    if (needWatch) {
        watch(sourcePath + '/**', function (file, e) {
            let filePath = file.path;
            switch (file.event) {
                case 'add':
                    l(`file ${file.event}: ${filePath}`);

                    try {
                        babelAndAmd(filePath, distPath);
                    } catch (e) {
                        l(file, 'file');
                        console.log(e);
                    }
                    break;
            }
        });

    }

    let files = fu.list(sourcePath, {
        excludeDirectory: true, //不包含文件夹
        matchFunction: function (item) {
            return item.name.match(/(.)(jsx|js)/);
        }
    });
    files.forEach(function (file) {
        try {
            babelAndAmd(file, distPath);
        } catch (e) {
            l(file, 'file');
            console.log(e);
        }
    })
}

function babelAndAmd(filePath, distPath) {


    let ext = path.parse(filePath).ext;


    //修正文件名后缀
    if (!ext) {
        filePath += '.js';
    }

    let distFile = path.join(distPath, pathAbsolute(rootPath, filePath.replace('.jsx', '.js')));


    //判断是否需要解析
    if (loadedMap[filePath]) {
        return;
    }


    if (needWatch && loadedMap[filePath] == undefined) {
        watch(filePath, function (file, e) {
            let filePath = file.path;
            l(`file ${file.event}: ${filePath}`);
            switch (file.event) {
                case 'add':
                case 'change':
                    if (file.event == 'add') {
                        let effectFiles = moduleEffectMap[filePath];
                        effectFiles && effectFiles.forEach(function (effectFile) {
                            loadedMap[effectFile] = false;
                            babelAndAmd(effectFile, distPath);
                        })
                    }
                    loadedMap[filePath] = false;
                    babelAndAmd(filePath, distPath);
                    break;
                case 'unlink':
                    delete loadedMap[filePath];
                    let distFile = path.join(distPath, pathAbsolute(rootPath, filePath));
                    del.sync(distFile);
                    break;
            }
        });

    }


    loadedMap[filePath] = true;


    //for less and css
    if (ext == '.less') {
        gulp.src(filePath)
            .pipe(less({}))
            .pipe(rename(function (path1) {
                path1.extname = ".css";
            }))
            .pipe(gulp.dest(path.dirname(distFile)));
        return;
    } else if (ext == '.css') {
        ef.read(filePath, function (contents) {
            ef.write(distFile, contents, 'utf8');
        });
        return;
    }


    //for nodeModule
    let needPack = false;


    try {
        needPackRegExp.some(function (item) {
            if ((new RegExp(item)).test(filePath)) {
                needPack = true;
                return true;
            }
        });

        if (needPack) {
            gulp.src(filePath)
                .pipe(webpack(
                    {
                        module: {
                            loaders: [
                                {
                                    test: /\.js/,
                                    loader: 'babel?cacheDirectory&stage=0',
                                    exclude: /(node_modules\/[^(@myfe)]|min\.js)/
                                },
                                {test: /\.css$/, loader: "style-loader!css-loader"},
                                {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
                                {test: /\.json$/, loader: 'json'},
                                {test: /\.jpe?g$|\.gif$|\.png|\.ico$/, loader: 'file?name=[name].[ext]'},
                                {test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]'}
                            ]
                        },
                        externals: externals,
                        output: {
                            library: 'packedModule',
                            libraryTarget: 'var'
                        }
                    }
                ))
                .pipe(wrapper(
                    {
                        header: 'define(function(){\n',
                        footer: '\n return packedModule;\n})'
                    }
                ))
                .pipe(rename(path.basename(filePath)))
                .pipe(gulp.dest(path.dirname(distFile)));
            return;
        }


        //for custom js
        babel.transformFile(filePath, {
            stage: 0
        }, function (err, result) {
            //result; // => { code, map, ast }
            if (err) {
                console.log(err);
                return;
            }
            let code = result.code;

            if (/define\.amd/.test(code)) {//本来就是amd或者umd 返回
                ef.write(distFile, code, 'utf8');
                return;
            }


            let modules = [];
            let moduleIndex = 0;
            if (/require/.test(code)) {//需要define
                code = code.replace(/require\(/gim, 'cmd2amdLoadModule(');
                let arr = code.split(/cmd2amdLoadModule[(]('|")([^('|")]*)('|")[)]/gim);
                arr.forEach(function (item, i) {
                    if (i % 4 == 0 && (i + 2) <= arr.length) {
                        let name = arr[i + 2];
                        let obj = {};


                        if (externals[name]) {
                            obj[name] = {
                                external: externals[name],
                                index: null,
                                path: null
                            };

                        } else {
                            let fileDistPath = getModulePath(name, path.dirname(filePath), rootPath);
                            fileDistPath.forEach(function (item) {
                                moduleEffectMap[item] = moduleEffectMap[item] || [];
                                moduleEffectMap[item].push(filePath);
                                babelAndAmd(item, distPath);
                            });


                            obj[name] = {
                                external: externals[name],
                                index: moduleIndex,
                                path: pathAbsolute(rootPath, fileDistPath[0])
                            };
                            moduleIndex++;

                        }


                        modules.push(obj);
                    }
                });
            }
            let amdRs = makeAMD(code, modules, modulePrefix, template);

            ef.write(distFile, amdRs, 'utf8');


        });
    } catch (e) {
        console.log(e.message);
    }

}


export default doTransform;

