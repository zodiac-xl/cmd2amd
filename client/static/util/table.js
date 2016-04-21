;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Table = factory();
    }
}(this, function () {
    function Table(tableWrap, tableId, classPrefix) {
        this.tableWrap = tableWrap || $("body");
        this.tableId = tableId || "";
        this.classPrefix = classPrefix || "";
        this.table = "";
        this.ths = [];
        this.inited =false;
    }

    Table.prototype = {
        init: function (data) {
            if(this.inited){
                this.updateTrs(data.trs);
                this.updateThs(data.ths);
                return;
            }
            this.ths = data.ths;
            //table table-striped table-bordered table-hover bootstrap table样式
            var $table = $("<table class='table table-striped table-bordered table-hover z-table' id='" + this.tableId + "'><thead></thead><tbody></tbody></table>");
            this.appendThs(data.ths, $table.find("thead"));
            this.appendTrs(data.trs, $table.find("tbody"));
            this.tableWrap.html('');
            this.tableWrap.append($table);
            this.table = $table;
            this.inited =true;

        },
        appendThs: function (thsData, $parent) {
            var _this = this;
            if (thsData) {
                var $tr = $("<tr></tr>");
                $.each(thsData, function (key, value) {
                    var $th = $("<th></th>");
                    if ($.type(value) == "function") {
                        value($th);
                    } else {
                        $th.html(value)
                    }
                    $th.addClass(_this.classPrefix + key);
                    $tr.append($th);
                });
                $parent.append($tr);
            }
        },
        updateThs:function(thsData, $parent){
            $parent = $parent || this.table.find("thead");
            $parent.html("");
            this.appendThs(thsData, $parent);
        },
        appendTrs: function (trsData, $parent) {
            var _this = this;
            if (trsData && trsData.length > 0) {
                $.each(trsData, function (index, tr) {
                    var $tr = $("<tr></tr>");
                    _this.updateTr($tr,tr);
                    $tr.click(function () {
                        _this.table.find(".active").removeClass("active");
                        $(this).addClass("active")
                    });
                    $parent.append($tr);
                });
            } else {
                $parent.append("<tr class='nodata'><td colspan='"+(_this.ths.length||1000)+"'>没有数据</td></tr>");
            }
        },

        updateTrs: function (trsData, $parent) {
            $parent = $parent || this.table.find("tbody");
            $parent.html("");
            this.appendTrs(trsData, $parent);
        },
        updateTr:function($tr,tr){
            var _this = this;
            $tr.html("");
            $.each(tr, function (key, value) {
                var $td = $("<td></td>");


                $td.addClass(_this.classPrefix + key);
                if ($.type(value) == "function") {
                    value($td);
                } else {
                    $td.html(value)
                }
                $tr.append($td);
            });
        }
    };


    return Table;
}));
