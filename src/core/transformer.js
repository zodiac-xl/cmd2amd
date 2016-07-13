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
import intercept    from 'gulp-intercept';

import watch        from 'gulp-watch';
import pathExists   from 'path-exists';


let babel = require("babel-core");

import {pathAbsolute,getModulePath} from './util';


let l = function (file) {

    console.log('------------------s');
    console.log(file+'\n');
    console.log('------------------e');
};


let distPath;
let sourcePath;
let rootPath;
let externals;
let needPackRegExp;
let modulePrefix;
let moduleRoot;
let loadedMap = {};
let moduleEffectMap = {}; //文件增加的时候会影像 引用他的文件
let needWatch = false;
let sourceMaps = false;

let callFirst = false;
function callFirstTime(fn) {
    if (!callFirst) {
        fn();
        callFirst = true;
    }
}

function doTransform(options) {

    distPath = options.distPath;
    sourcePath = options.sourcePath;
    rootPath = options.rootPath;
    externals = options.externals || {};
    needPackRegExp = options.needPackRegExp || [];
    modulePrefix = options.modulePrefix || '';
    moduleRoot = options.moduleRoot || '';
    needWatch = options.needWatch || false;
    sourceMaps = options.sourceMaps || false;


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
            l(file);
            console.log(e)


        }
    })
}

function getDistFile(filePath) {
    let ext = path.parse(filePath).ext;
    //修正文件名后缀
    if (!ext) {
        if (pathExists.sync(filePath + '.jsx')) {
            filePath += '.jsx'
        } else {
            filePath += '.js'
        }
    }
    let distFile = pathAbsolute(rootPath, filePath.replace('.jsx', '.js'));
    if (distFile) {
        distFile = path.join(distPath, distFile);
    }
    return distFile
}

function babelAndAmd(filePath, distPath) {
    let ext = path.parse(filePath).ext;

    let distFile = getDistFile(filePath);
    if (!distFile) {
        return;
    }

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

    if (!pathExists.sync(filePath)) {
        return;
    }
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
                                    loader: 'babel',
                                    query: {
                                        presets: ['es2015', 'stage-0', 'react'],
                                        plugins: [
                                            "add-module-exports", "transform-decorators-legacy", "transform-es2015-modules-amd"                                        ]
                                    },
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
                .pipe(intercept(function(file){
                    var contents = file.contents.toString();
                    contents = contents.replace(/sourceMappingURL=/g,'');
                    file.contents = new Buffer(contents);
                    return file;
                }))
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
            sourceMaps: sourceMaps,
            "presets": [
                "es2015",
                "react",
                "stage-0"
            ],
            plugins: ["add-module-exports", "transform-decorators-legacy", "transform-es2015-modules-amd"],
            resolveModuleSource: function (source, filename) {
                let moduleName = '';
                if (externals[source]) {
                    moduleName = source;
                } else {
                    let realPaths = getModulePath(source, filename, rootPath);
                    realPaths.forEach(function (item) {
                        moduleEffectMap[item] = moduleEffectMap[item] || [];
                        moduleEffectMap[item].push(filePath);
                        babelAndAmd(item, distPath);
                        loadedMap[item] = true;
                    });
                    moduleName = pathAbsolute(moduleRoot, getDistFile(realPaths[0]));
                    if (/\.(css|less)$/.test(moduleName)) {
                        moduleName = moduleName.replace(/\.less$/, '.css');
                        moduleName = 'css!' + moduleName;
                    }
                }
                return moduleName;
            },
        }, function (err, result) {
            //result; // => { code, map, ast }
            if (err) {
                l(filePath);
                console.log(err)
                return;
            }
            let code = result.code;

            if(sourceMaps){
                code += `\n //# sourceMappingURL=${path.basename(distFile)}.map`;
                ef.write(distFile + '.map', JSON.stringify(result.map), 'utf8');
            }
            ef.write(distFile, code, 'utf8');

        });
    } catch (e) {
        l(filePath);
        console.log(e.message)
    }

}


export default doTransform;

