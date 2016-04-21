'use strict';

;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Table = factory();
    }
})(undefined, function () {
    function fileupload(options) {

        options = $.extend({
            success: null,
            fail: null
        }, options);

        return function (e) {
            var $_this = $(e.target),
                file = e.target.files[0],
                formData = new FormData();

            formData.append('file', file);

            //大小限制为1M  图片、excel（包括xis、xlsx）、word（包括doc、docx）、txt、pdf
            var extArray = [".jpg", "jpeg", ".png", ".txt", ".xls", "xlsx", ".doc", ".docx", ".pdf"];
            var ext = file.name.slice(file.name.indexOf(".")).toLowerCase();
            var rightExt = false;

            for (var i = 0; i < extArray.length; i++) {
                if (extArray[i] == ext) {
                    rightExt = true;
                    break;
                }
            }
            if (!rightExt) {
                toastr.warning("非法的文件后缀");
                return;
            }

            if (file.size > 1024 * 1024) {
                toastr.warning("文件大小限制为1M");
                return;
            }

            var ajaxOptions = {
                type: 'POST',
                contentType: false,
                processData: false,
                dataType: "json",
                data: formData,
                url: '/api/fileUpload',
                des: "上传文件"
            };

            $.ajax(ajaxOptions).done(function (e) {
                if (e.error) {
                    var des = ajaxOptions.des + "失败 for：" + e.error.message;
                    toastr.error(des);
                    console.log(des + "  request：" + e.error.request);
                    options.fail(e);
                    defer.reject(e);
                } else {
                    var des = ajaxOptions.des + "成功 for：" + (e.status || "no notice");
                    console.log(des);
                    options.success(e);
                }
            }).fail(function (e) {
                var des = ajaxOptions.des + "失败 for：" + (e.message || e.status || "no notice");
                console.log(des);
                options.fail(e);
            });
        };
    }
    return fileupload;
});