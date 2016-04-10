import gulp                         from 'gulp'
import cmd2amd                      from './lib/index.js'
import path                         from 'path'
import watch                         from 'gulp-watch'


//config
let test = path.join(__dirname, './test');
let distPath = test + '/dist';
let sourcePath = test + '/source';
let rootPath = path.join(test, '../');
let externals = {};
let needPackRegExp = [
    'b.js'
];
let modulePrefix = '/dist/';
let needWatch = true;

let options = {
    distPath,
    sourcePath,
    rootPath,
    externals,
    needPackRegExp,
    modulePrefix,
    needWatch
};

gulp.task('b', function (cb) {
    cmd2amd(options);
    cb();

});

gulp.task('c', function (cb) {

});

