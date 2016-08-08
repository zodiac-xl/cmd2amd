import path         from 'path'
import pathExists   from 'path-exists';
import fs           from 'fs'
import ef           from 'easy-file'




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



function getModulePath(source, relatePath, rootPath) {
    let rs = [];
    let realPath = null;
    let isNodeMoudle = false;
    if (/([.]\/)/.test(source)) {//自定义模块
        realPath = path.resolve(path.dirname(relatePath), source);
    } else {
        isNodeMoudle = true;
        if (/node_modules/.test(relatePath)) {//如果引用者是node module中的文件 他引用的node module模块应该根据他的package来决定
            let pathArr = relatePath.split('node_modules');
            let _thisRoot = pathArr.slice(0, pathArr.length - 1);
            //尝试从它的上一级node_modules拿取  如果没有则直接去根目录拿取
            if (pathExists.sync(path.join(_thisRoot, 'node_modules', source))) {//如果它自身带这个模块
                rootPath = _thisRoot;
            }
        }

        realPath = path.join(rootPath, 'node_modules', source);

        if (!pathExists.sync(realPath)) {
        } else {
            //如果有package.json 尝试解析得到main
            let pk = path.join(realPath, 'package.json');
            if (pathExists.sync(pk)) {
                let pkJSON = require(pk);
                let main = pkJSON.main;
                if (main && pathExists.sync(path.join(realPath, main))) {

                    realPath = path.join(realPath, main);
                }
            } else if(pathExists.sync(path.join(realPath, 'index.js'))){
                realPath = path.join(realPath, 'index.js');
            }else{
                realPath = path.join(realPath, '.js');
            }
        }
    }

    if (!path.parse(realPath).ext) {
        let realJS = realPath + '.js';
        let realJSX = realPath + '.jsx';
        let realIndex = realPath + '/index.js';
        if (pathExists.sync(realJS)) {
            rs.push(realJS)
        } else if (pathExists.sync(realJSX)) {
            rs.push(realJSX)
        } else if (pathExists.sync(realIndex)) {
            rs.push(realIndex)
        } else {
            if(!isNodeMoudle){
                rs.push(realJS);
                rs.push(realJSX);
                rs.push(realIndex);
            }else{
                rs.push(realIndex);
            }

        }
    } else {
        rs.push(realPath);
    }

    return rs;
}


module.exports = {
    pathAbsolute: pathAbsolute,
    getModulePath: getModulePath
};