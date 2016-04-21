require.config({
    //By default load any module IDs from js/lib
    baseUrl: '/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.

    "shim": {},
    map: {
        '*': {
            'css': "/plugin/require-css/require-css.js"
        }
    }
});


var externals = {
    "jquery": "jQuery",
    "react": "React",
    "react-dom": "ReactDOM"
}
$.map(externals, function (item, key) {
    define(key, [], function () {
        return window[item];
    });
})
