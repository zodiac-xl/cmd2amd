import gulp                         from 'gulp'
import cmd2amd                      from './src/index.js'
import path                         from 'path'


//config
let test = path.join(__dirname, './test');
let distPath = test + '/dist/amd';
let sourcePath = test + '/source/components';
let rootPath = __dirname;
let externals = {
    "jquery": "jQuery",
    "react": "React",
    "react-dom": "ReactDOM"
};
let needPackRegExp = [
    'node_modules',
    'usefulDate'
];
let moduleRoot = path.join(__dirname, './test/dist');
let needWatch = false;

let options = {
    distPath,
    sourcePath,
    rootPath,
    externals,
    needPackRegExp,
    needWatch,
    moduleRoot
};

gulp.task('b', function (cb) {
    options.needWatch = false;
    cmd2amd(options);
    cb();

});
gulp.task('b:watch', function (cb) {
    options.needWatch = true;
    cmd2amd(options);
    cb();

});

gulp.task('c', function (cb) {

});

