import path         from 'path'
import pathExists   from 'path-exists';
import fs           from 'fs'




function pathAbsolute(dirname, path) {
    let pattern = new RegExp(dirname, 'g');
    pattern.exec(path);
    let lastIndex = pattern.lastIndex;
    let result = null;
    if (lastIndex) {
        result = path.substr(lastIndex);
    }
    return result;
}


function makeAMD(fnStr, modules,modulePrefix) {


    let rs = `define([modulesPath],function(modulesName){ \n var module = {}; \n var exports ={}; \n ${fnStr} \n })`;
    let modulesPath = [];
    let modulesName = [];

    fnStr = fnStr || '';

    modules && modules.forEach(function (module) {
        modulesPath.push(module.path || '');
        modulesName.push(module.name || '');
    });

    modulesPath = modulesPath.map(function (item) {
        let rs = '"'+path.join(modulePrefix,item)+'"';
        if (path.parse(item).ext == '.less') {
            rs = rs.replace('.less', '');
            rs = 'css!' + rs;
        }
        return rs;
    });
    modulesPath.join(',');
    modulesName.join(',');

    rs = rs.replace('modulesPath', modulesPath);
    rs = rs.replace('modulesName', modulesName);

    return rs;
}


function getModulePath(filePath, relatePath, rootPath) {


    if (/([.]\/)/.test(filePath)) {//自定义模块
        filePath = path.resolve(relatePath, filePath);
    } else {
        filePath = path.join(rootPath, 'node_modules', filePath);

        let pk = path.join(filePath, 'package.json');

        if (pathExists.sync(pk)) {//如果有package.json 尝试解析得到main
            let pkJSON = require(pk);
            let main = pkJSON.main;
            if (main && pathExists.sync(path.join(filePath, main))) {
                filePath = path.join(filePath, main);
            }
        }
    }
    let parseRs = path.parse(filePath);
    let ext = parseRs.ext;

    if (ext && ext != '.js' && ext != '.jsx' && ext != '.less' && ext != '.css') {//未知后缀加上ext 设置空 （针对 a.a.v）
        ext = null;
    }

    if (!ext) {//如果没有后缀 有可能是文件下index.js 或者本身加上.js
        if (pathExists.sync(path.join(filePath, 'index.js'))) {//
            filePath = path.join(filePath, 'index.js');
        } else {
            filePath = filePath + '.js';
        }
    }

    if (!pathExists.sync(filePath)) {
        console.error('not fount' + filePath);
        filePath = null;
    }

    return filePath
}


export default {
    pathAbsolute: pathAbsolute,
    makeAMD: makeAMD,
    getModulePath: getModulePath
}