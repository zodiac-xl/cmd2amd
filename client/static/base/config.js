import path             from 'path';
let __s = (dir) => path.join(__dirname, "source", dir);
let __p = (dir) => path.join(__dirname, "../plugin", dir);
let __d = (dir) => path.join(__dirname, "dist", dir);

export default {
    source: {
        js: [
            //react jquery bootstrap
            __s('react-with-addons.js'),
            __s('react-dom.js'),
            __s('jquery-2.1.4.js'),
            __p('datetimepicker/js/moment-with-locales.js'),
            __s('bootstrap/js/bootstrap.js'),
            __s('color-console.js'),


            //plugin

            //toastr
            __p('toastr/toastr.js'),


            //datetimepicker
            __p('datetimepicker/js/datetimepicker.js'),
            __p('datetimepicker/js/config.js'),
            __s('bindDateTimePicker.js'),



            //require
            __s('require.js'),
            __s('require-config.js')

        ],
        css: [
            //bootstrap
            __s('bootstrap/css/bootstrap.css'),


            //plugin

            //toastr
            __p('toastr/toastr.css'),


            //datetimepicker
            __p('datetimepicker/css/datetimepicker.css')
        ],
        fonts: __s('bootstrap/fonts')//bootstrap fonts
    },


    dist: {
        js: __d("js"),
        css: __d("css"),
        fonts: __d("fonts"),
        self:__d('')
    }
};
