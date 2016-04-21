;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['util/url'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('util/url'));
    } else {
        root.Pager = factory(root.url);
    }
}(this, function (Url) {
    function Pager($pager, url, successCallback, errorCallback, query, pageSize) {
        this.pager = $pager;
        this.url = url;
        this.success = successCallback;
        this.error = errorCallback;
        this.query = query || {};
        this.totalPageSize = -1;
        this.currPage = 1;
        this.pageSize = pageSize || 10;
    }

    Pager.prototype = {
        initHandle: function () {
            var _this = this;
            _this.pager.delegate(".J_previous,.J_jumpTo,.J_next", "click", function () {
                var pageNum = null,
                current = _this.currPage * 1,
                totalNum = Math.ceil(_this.totalPageSize / _this.pageSize),
                action = this.className.match(/(J_[\S]*)/gm)[0];
                switch (action) {
                    case "J_previous":
                        if (current == 1) {
                            toastr.warning("已经是第一页了");
                        } else {
                            pageNum = current - 1;
                        }
                        break;
                    case "J_next":
                        if (totalNum > 0 && current == totalNum) {
                            toastr.warning("已经是最后一页了");
                        } else {
                            pageNum = current + 1;
                        }
                        break;
                    case "J_jumpTo":
                        pageNum = Number(_this.pager.find(".J_jumpToPages").val());
                        if (totalNum > 0 && (pageNum <= 0 || pageNum > totalNum || pageNum == current)) {
                            toastr.warning("请输入页码范围内的非当前页码数字!");
                            pageNum = null;
                        }

                        break;
                    default :
                        break;
                }
                pageNum && _this.goPage(pageNum);
            });
        },
        goPage: function (pageNum) {
            var defer = $.Deferred();
            var _this = this;
            var query;
            if (_this.query.param) {
                var queryParam = _this.query.param;
                queryParam = $.extend({
                    offset: (pageNum - 1) * _this.pageSize,
                    limit: _this.pageSize
                }, queryParam);
                query = $.extend({}, _this.query);

                query.param = JSON.stringify(queryParam);
            } else {
                query = $.extend({
                    offset: (pageNum - 1) * _this.pageSize,
                    limit: _this.pageSize
                }, _this.query);
            }


            var url = Url.addQueryStringArg(_this.url, query);


            if (_this.PROXY_URL) {
                url = _this.PROXY_URL + "?source=" + encodeURIComponent(Url.addQueryStringArg(_this.url, query));
            }


            $.ajax({
                url: url,
                dataType: "json",
                type: "get",
                success: function (e) {
                    _this.currPage = pageNum;
                    var totalSize = e && e.totalSize || ( e && e.data && e.data.totalSize);
                    if (totalSize != undefined) {
                        _this.totalPageSize = totalSize || 1;
                        _this.pager.find(".page_show") && _this.pager.find(".page_show").text(pageNum + "/" + Math.ceil(_this.totalPageSize / _this.pageSize));
                    } else {
                        _this.pager.find(".page_show") && _this.pager.find(".page_show").text(pageNum);
                    }
                    _this.success(e);
                    defer.resolve(e);
                },
                error: function (e) {
                    if (e && e.status == 200) {
                        _this.success(e);
                        defer.resolve(e);
                    } else {
                        _this.error(e);
                        defer.reject(e);
                    }
                }
            });
            return defer.promise();
        }

    };

    return Pager;
}));
