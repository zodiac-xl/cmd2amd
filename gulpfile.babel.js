import gulp                         from 'gulp'
import cmd2amd                      from './src/index.js'
import path                         from 'path'


//config
let test = path.join(__dirname, './test');
let distPath = test + '/dist/amd';
let sourcePath = test + '/source';
let rootPath = __dirname;
let externals = {
    "jquery": "jQuery",
    "react": "React",
    "react-dom": "ReactDOM"
};
let needPackRegExp = [
    'node_modules',
    'side-bar'
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
    cmd2amd(options);
    cb();

});

gulp.task('c', function (cb) {

});

