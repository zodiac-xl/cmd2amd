(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Common = factory();
    }
}(this, function () {

    var Common = {
        addAttachment: function (id, name, url, $parent, dele) {

            var attachmentTemp = '<div class="attachment"> ' +
                '<a target=""><span class="name-file"></span></a>' +
                '<button class="btn btn-default J_btn-dele">删除</button>' +
                '</div>',
            $attachment = $(attachmentTemp),
            isImage = false;
            if (/.(png|jpg|jpeg)/.test(name)) {
                isImage = true;
            }
            if (isImage) {
                $attachment.find("a").attr("target", "_blank");
            }
            if (dele) {
                $attachment.delegate(".J_btn-dele", "click", function () {
                    $attachment.remove();
                });
            } else {
                $attachment.find(".J_btn-dele").remove();
            }

            $attachment.data("id", id).find(".name-file").text(name);
            $attachment.find("a").attr("href", url);
            $parent.append($attachment);
        },
        addAttachments: function (options) {//files,$parent  file[id,name,url]
            options = $.extend({
                dele: true
            }, options);
            $.each(options.files, function (index, item) {
                Common.addAttachment(item.id, item.name, item.url, options.parent, options.dele);
            });
        },
        ajax: function (options) {
            var defer = $.Deferred();

            options = $.extend({
                url: "",
                type: 'GET',
                dataType: "json",
                des: '未知接口',//接口描述
                bd: false,  //是BD接口 （/api/）
                admin: false, //是admin接口 (/api/admin/)
                showSuccess:false//是否toastr 提示成功信息
            }, options);

            if (!options.bd && !options.admin) {//如果没有明确标识是bd还是admin的接口 需要通过环境自动转换接口

                //JAVA通过bd接口构建admin接口 所以前端bd接口可以自动转化为admin接口 而admin接口不能转化为
                //可以相互转换的接口 统一使用bd接口 再在这里通过环境判断转化接口
                if (window.isAdmin && !/admin/.test(options.url)) {
                    if (/api/.test(options.url)) {
                        options.url = options.url.replace("/api", "/api/admin");
                    }
                }
            }
            $.ajax(options).done(function (e) {
                //一般主动返回错误是200 +success false，抛异常是200 + error
                if (e.error || (e.success != undefined && !e.success)) {
                    var message =  (e.error && e.error.message||'')|| (e.message || '');
                    var failDes = options.des + "失败" + (message?"："+message:"");
                    e.des = failDes;
                    defer.reject(e);
                    toastr.error(failDes);
                    console.error( options.des + "失败：" + (message || e.status || "no message  or status code"));
                } else {
                    var successDes = options.des + "成功";
                    e.des = successDes;
                    defer.resolve(e);
                    if(options.showSuccess){
                        toastr.success(e.des);
                    }
                    console.info(successDes);
                }
            }).fail(function (e) {
                var failDes = options.des + "失败"+(e.message?"："+e.message:"");
                e.des = failDes;
                defer.reject(e);

                toastr.error(failDes);
                console.error( options.des + "失败：" + (e.message || e.status || "no message or status code"));
            });
            return defer.promise();
        }
    };
    return Common;
}));

