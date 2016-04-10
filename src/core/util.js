import path         from 'path'
import pathExists   from 'path-exists';
import fs           from 'fs'
import ef           from 'easy-file'


let template;


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


function makeAMD(fnStr, modules, modulePrefix, template) {

    let rs = template;
    let modulesPath = [];
    let modulesName = [];

    fnStr = fnStr || '';

    let browserModules = {};
    modules && modules.forEach(function (module, i) {
        var name = Object.keys(module)[0];
        browserModules[name] = module[name]
    });


    modules && modules.forEach(function (module, i) {
        let name = Object.keys(module)[0];
        if (!module[name].path) {
            return;
        }
        modulesPath.push(module[name].path);
        modulesName.push(`ref_${i}`);
    });

    modulesPath = modulesPath.map(function (item) {
        let rs = path.join(modulePrefix, item);
        if (path.parse(item).ext == '.less') {
            rs = rs.replace('.less', '.css');
            rs = 'css!' + rs;
        }
        rs = '"' + rs + '"';

        return rs;
    });
    modulesPath.join(',');
    modulesName.join(',');

    fnStr = fnStr.replace(/\$/g, 'a-b-c-d');
    rs = rs.replace('dependsPlaceholder', modulesPath);
    rs = rs.replace('refersPlaceholder', modulesName);
    rs = rs.replace('cmd2amdModulesPlaceholder', JSON.stringify(browserModules));
    rs = rs.replace('callbackPlaceholder', fnStr);
    rs = rs.replace(/a-b-c-d/g, '$');

    return rs;
}


function getModulePath(filePath, relatePath, nodeModuleDir) {


    if (/([.]\/)/.test(filePath)) {//自定义模块
        filePath = path.resolve(relatePath, filePath);

    } else {
        filePath = path.join(nodeModuleDir, 'node_modules', filePath);

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
        console.log('relatePath' + relatePath);

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