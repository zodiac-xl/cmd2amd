import gulp                         from 'gulp'
import cmd2amd                      from './lib/index.js'
import path                         from 'path'


//config
let test = path.join(__dirname, './test');
let distPath = test + '/dist';
let sourcePath = test + '/source';
let rootPath = path.join(test, '../');
let externals = {};
let needPackRegExp = [];
let modulePrefix = '/amda';


let options = {
    distPath,
    sourcePath,
    rootPath,
    externals,
    needPackRegExp,
    modulePrefix
};

gulp.task('b', function (cb) {
    cmd2amd(options);
    cb();

});