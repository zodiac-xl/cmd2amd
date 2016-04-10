import path         from 'path'
import del          from 'del'
import fu           from 'fileutil';
import concat       from 'concat-regexp';
import ef           from 'easy-file'

import gulp         from 'gulp'
import webpack      from 'gulp-webpack';
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
            if (file.event == 'add') {
                l(`file ${file.event}: ${file.path}`);
                try {
                    babelAndAmd(file.path, distPath);
                } catch (e) {
                    l(file, 'file');
                    console.log(e);
                }
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

function babelAndAmd(distFilePath, distPath) {


    let sourceFilePath = distFilePath;
    let filePath = sourceFilePath;
    let ext = path.parse(filePath).ext;


    //修正文件名后缀
    if (!ext) {
        filePath += '.js';
        sourceFilePath += '.js';
    } else if (ext == '.jsx') {
        filePath = filePath.replace('.jsx', '.js');
    }

    let distFile = path.join(distPath, pathAbsolute(rootPath, filePath));


    //判断是否需要解析
    if (loadedMap[sourceFilePath]) {
        return;
    }

    if (needWatch && loadedMap[sourceFilePath] == undefined) {
        watch(sourceFilePath, function (file, e) {
            if (file.event == 'add') {
                return;
            }
            l(`file ${file.event}: ${sourceFilePath}`);
            switch (file.event) {
                case 'change':
                    loadedMap[sourceFilePath] = false;
                    babelAndAmd(distFilePath, distPath);
                    break;
                case 'unlink':
                    delete loadedMap[sourceFilePath];
                    del.sync(distFile);
                    break;
            }
        });
    }

    loadedMap[sourceFilePath] = true;


    //for less and css
    if (ext == '.less') {
        gulp.src(sourceFilePath)
            .pipe(less({}))
            .pipe(rename(function (path1) {
                path1.extname = ".css";
            }))
            .pipe(gulp.dest(path.dirname(distFile)));
        return;
    } else if (ext == '.css') {
        ef.read(sourceFilePath, function (contents) {
            ef.write(distFile, contents, 'utf8');
        });
        return;
    }


    //for nodeModule
    let needPack = false;


    try {
        needPackRegExp.some(function (item) {
            if ((new RegExp(item)).test(sourceFilePath)) {
                needPack = true;
                return true;
            }
        });

        if (needPack) {
            gulp.src(sourceFilePath)
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
        babel.transformFile(sourceFilePath, {
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
                            let nodeModuleDir = rootPath;
                            let fileDistPath = getModulePath(name, path.dirname(filePath), nodeModuleDir);
                            fileDistPath && babelAndAmd(fileDistPath, distPath);


                            obj[name] = {
                                external: externals[name],
                                index: moduleIndex,
                                path: pathAbsolute(rootPath, fileDistPath)
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

