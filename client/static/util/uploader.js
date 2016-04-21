(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Url = factory();
    }
}(this, function () {
    UpLoader = function (options) {
        return new UpLoader.fn.init(options);
    };

    UpLoader.fn = UpLoader.prototype = {
        jquery: "1.0",
        constructor: UpLoader,
        init: function (options) {
            options = $.extend({
                input: $("input[type='file']:eq(0)"),    //file input
                type: "text",                           //how to read file (DataURL/text),
                onload: function () {                   //onload callback
                },
                ajax: null                              //ajax upload to server,then back data to
            }, options);

            options.input.on("change", function () {
                var reader = new FileReader(),
                inputFile = this,
                file = inputFile.files[0];


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






                switch (options.type) {
                    case "text":
                        reader.readAsText(file);
                        break;
                    case "dataURL":
                        reader.readAsDataURL(file);
                        break;
                    default :
                        break;
                }

                reader.onload = function (e) {
                    options.onload(e, inputFile);
                };

                if (options.ajax) {
                    var data = new FormData();
                    var url = '/api/fileUpload';
                    data.append('file', file);
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: data,
                        dataType: "json",
                        contentType: false,        //不可缺参数 set to headr to tell http  to pass un-encoded data when using "contentType: false".
                        processData: false         //不可缺参数 formData will not be converted to string(a=b&c=d) when using "processData: false".
                    }).done(function (e) {
                        if (e.error) {
                            e.error.message && toastr.error(e.error.message);
                        } else {
                            options.ajax.success(e[0], inputFile);
                        }
                    }).fail(function (e) {
                        e.error && e.error.message && toastr.error(e.error.message);
                    });

                }
            });
        }
    };
    return UpLoader;
}));

