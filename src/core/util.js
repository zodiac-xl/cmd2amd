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


function getModulePath(filePath, relatePath, rootPath) {


    if (/([.]\/)/.test(filePath)) {//自定义模块
        filePath = path.resolve(relatePath, filePath);

    } else {
        if (/node_modules/.test(relatePath)) {//如果引用者是node module中的文件 他引用的node module模块应该根据他的package来决定
            let _thisRoot = relatePath.split('node_modules')[0];
            if (pathExists.sync(path.join(_thisRoot, 'node_modules', filePath))) {//如果它自身带这个模块
                rootPath = _thisRoot;
            }
        }

        filePath = path.join(rootPath, 'node_modules', filePath);

        let pk = path.join(filePath, 'package.json');

        if (pathExists.sync(pk)) {//如果有package.json 尝试解析得到main
            let pkJSON = require(pk);
            let main = pkJSON.main;
            if (main && pathExists.sync(path.join(filePath, main))) {
                filePath = path.join(filePath, main);
            }
        } else {

        }
    }
    let parseRs = path.parse(filePath);
    let ext = parseRs.ext;

    if (ext && ext != '.js' && ext != '.jsx' && ext != '.less' && ext != '.css') {//未知后缀加上ext 设置空 （针对 a.a.v）
        ext = null;
    }


    if (!ext) {//如果没有后缀 有可能是文件下index.js 或者本身加上.js
        let files = [path.join(filePath, 'index.js'), filePath + '.js'];
        if (pathExists.sync(files[0])) {
            filePath = files.splice(0, 1);
        } else if (pathExists.sync(files[1])) {
            filePath = files.splice(1, 1);
        } else {
            console.error('not fount:' + filePath);
            filePath = files
        }
    } else {
        filePath = [filePath];
    }

    return filePath;
}


export default {
    pathAbsolute: pathAbsolute,
    makeAMD: makeAMD,
    getModulePath: getModulePath
}