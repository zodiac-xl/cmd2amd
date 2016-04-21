;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Url = factory();
    }
}(this, function () {
    var Url = {
        //key 可以为对象
        addQueryStringArg: function (url, key, value) {
            function addQueryStings(url, key, value) {

                function addQuerySting(url, key, value) {
                    if (url.indexOf("?") == -1) {
                        url += "?";
                    }
                    else {
                        url += "&";
                    }
                    url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
                    return url;
                }

                if (typeof key == "object") {
                    for (var k in key) {
                        url = addQuerySting(url, k, key[k])
                    }
                }
                else if (typeof key == "string") {
                    url = addQuerySting(url, key, value)
                }
                return url;
            }

            if (url.indexOf("#") == -1) {
                url = addQueryStings(url, key, value);
            }
            else {
                var hash = url.split("#")[1] || "";
                url = url.split("#")[0];
                url = addQueryStings(url, key, value);
                this.addHash(url, hash);
            }
            return url;
        },
        addHash: function (url, hash) {
            if (url.indexOf("#") == -1) {
                url += "#" + encodeURIComponent(hash);

            }
            else {
                url += encodeURIComponent(hash);
            }
            return url;
        },
        getUrlArg: function (name, urlSearch) {
            var regExp = new RegExp("[?&]" + name + "=([^&#]*)", "gim");
            urlSearch = urlSearch || location.href;
            if (regExp.test(urlSearch)) {
                return decodeURIComponent(RegExp["$1"]);
            } else {
                return "";
            }
        }
    };


    return Url;
}));
