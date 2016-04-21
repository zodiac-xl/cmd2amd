define([
        "util/table",
        "util/pager",
        "util/common",
        "util/dateformat"

    ],
    function (Table, Pager, Common) {


        var pager = null,
        tableData = {},
        propsMap = {

            //非排序项
            cinemaId: {
                title: "影院ID"
            },
            cinemaName: {
                title: "影院名"
            },
            subRegion: {
                title: "分区"
            },
            cityName: {
                title: "城市"
            },
            bd: {
                title: "BD"
            },
            operate: {
                title: "操作"
            },


            //可排序项
            reportDate: {
                title: "日期",
                key: 1
            },
            paidUserNum: {
                title: "选座支付用户数",
                key: 2
            },
            paidOrderNum: {
                title: "选座支付订单数",
                key: 3
            },
            ticketNum: {
                title: "选座出票量",
                key: 4
            },
            dealAmount: {
                title: "选座交易额",
                key: 5
            },
            newUserNum: {
                title: "选座新客数",
                key: 6
            },
            newUserOrderNum: {
                title: "选座新客订单数",
                key: 7
            },
            newUserTicketNum: {
                title: "选座新客出票量",
                key: 8
            },
            newUserDealAmount: {
                title: "选座新客交易额",
                key: 9
            },
            cinemaOnlineTicketNum: {
                title: "影院线上出票量",
                key: 10
            },
            seatRate: {
                title: "选座市占",
                key: 11
            },
            cinemaOnlineRate: {
                title: "影院线上化率",
                key: 12
            },
            cinemaTotalTicketNum: {
                title: "影院总出票量",
                key: 13
            },
            cinemaTotalTicketBox: {
                title: "影院票房",
                key: 14
            }
        },


        table = new Table($(".wrap-table")),
        $startDate = $(".startDate"),
        $endDate = $(".endDate");


        var Util = {
            micrometerLevel: function (num, fix) {
                fix = fix || 0;
                num = Number(num);
                return (num.toFixed(fix) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            }
        };

        var UIHandler = {
            upDateDetailData: function (data) {
                if (!data) {
                    return;
                }
                tableData.trs = [];
                var dataList = data.list;
                dataList.unshift(data.total);
                tableData.ths = {};


                $.each(dataList, function (index, item) {
                    var cinemaId = item.cinemaBdModel && item.cinemaBdModel.id;
                    var cinemaName = item.cinemaBdModel && item.cinemaBdModel.cinemaName;
                    var subRegion = item.subName;
                    var cityName = item.cinemaBdModel && item.cinemaBdModel.cityName;
                    var bd = item.cinemaBdModel && item.cinemaBdModel.bd && (item.cinemaBdModel.bd.name + "<br/>(" + item.cinemaBdModel.bd.key + ")");
                    var sellsrc = item.cinemaBdModel && item.cinemaBdModel.sellsrc;
                    var tr = {
                        cinemaId: cinemaId,
                        cinemaName: cinemaName,
                        subRegion: subRegion,
                        cityName: cityName,
                        bd: bd
                    };
                    switch (pager.query.dataType * 1) {
                        case 1://核心数据
                            tr = $.extend(tr, {

                                ticketNum: item.ticketNum,
                                cinemaOnlineTicketNum: item.cinemaOnlineTicketNum,
                                cinemaTotalTicketNum: item.cinemaTotalTicketNum,
                                seatRate: item.seatRate,
                                cinemaOnlineRate: item.cinemaOnlineRate,
                                dealAmount: item.dealAmount,
                                cinemaTotalTicketBox: item.cinemaTotalTicketBox

                            });
                            break;
                        case 2://选座数据
                            tr = $.extend(tr, {


                                paidUserNum: item.paidUserNum,
                                paidOrderNum: item.paidOrderNum,
                                ticketNum: item.ticketNum,
                                seatRate: item.seatRate,
                                dealAmount: item.dealAmount
                            });
                            break;
                        case 3://选座新客数据
                            tr = $.extend(tr, {

                                newUserNum: item.newUserNum,
                                newUserOrderNum: item.newUserOrderNum,
                                newUserTicketNum: item.newUserTicketNum,
                                newUserDealAmount: item.newUserDealAmount
                            });
                            break;
                        case 4://影院数据
                            tr = $.extend(tr, {
                                cinemaOnlineTicketNum: item.cinemaOnlineTicketNum,
                                cinemaTotalTicketNum: item.cinemaTotalTicketNum,
                                cinemaOnlineRate: item.cinemaOnlineRate,
                                cinemaTotalTicketBox: item.cinemaTotalTicketBox
                            });
                            break;
                    }
                    if (index != 0) {
                        tr.operate = function ($td) {
                            var href = "/bd/my_cinema/sub_page/seat_report?";
                            var search = escape("cinemaId=" + cinemaId + "&cinemaName=" +
                                cinemaName + "&sellSrc=" + sellsrc + "&city=" +
                                cityName + "&backurl=" + encodeURIComponent("/bd/my_cinema"));
                            href = href + search;
                            $td.html("<a target='_blank' href='" + href + "'><button class='btn btn-default'>查看明细</button></a>")
                        };
                    } else {
                        tr.operate = "";
                    }

                    tableData.trs.push(tr);
                });

                Object.keys(tableData.trs[0]).map(function (key) {
                    if (propsMap[key].key != undefined) {
                        tableData.ths[key] = propsMap[key].title+"<span style='margin-right: 10px'></span>";
                    } else {
                        tableData.ths[key] = propsMap[key].title;
                    }
                });
                if (tableData.ths["seatRate"]) {
                    tableData.ths["seatRate"] = ' <a ' +
                        'style="text-align: center;color:white;border:1em;background:black;height:1em;width:1em;border-radius:1em;display:inline-block;line-height:1em;margin-right:0.5em;cursor:pointer;" ' +
                        'title="选座市占=选座出票量/影院线上出票量">?</a>' + tableData.ths["seatRate"];
                }
                if (tableData.ths["cinemaOnlineRate"]) {
                    tableData.ths["cinemaOnlineRate"] = ' <a ' +
                        'style="text-align: center;color:white;border:1em;background:black;height:1em;width:1em;border-radius:1em;display:inline-block;line-height:1em;margin-right:0.5em;cursor:pointer;" ' +
                        'title="影院线上化率=影院线上出票量/影院总出票量">?</a>' + tableData.ths["cinemaOnlineRate"];
                }

                $.each(tableData.trs, function (i, tr) {

                    $.map(tr, function (v, k) {
                        if (propsMap[k].key == undefined) {
                            return;
                        }
                        switch (String(k)) {
                            case "seatRate"://选座市占 影院线上化率 结果以百分数展示，并展示至小数点后两位，如50.31%.
                            case "cinemaOnlineRate":
                                tr[k] = Util.micrometerLevel(tr[k], 2) + "%";
                                break;
                            case "cinemaTotalTicketBox"://影院票房 ，总交易额、选座新客 结果展示千分位，并展示至小数点后两位
                            case "dealAmount":
                            case "newUserDealAmount":
                                tr[k] = Util.micrometerLevel(tr[k], 2);
                                break;
                            case "reportDate"://日期不变
                                break;
                            default ://其他数据展示千分位
                                tr[k] = Util.micrometerLevel(tr[k], 0);
                        }
                    });


                });
                tableData.trs[0].cinemaId = "合计";
            }

        };


        var Page = {
            initSubRegion: function (orgId) {
                var url;
                var data = {};
                var bdId = window.User.userId;
                var $subRegion = $('.sub-region');
                var selfSubRegion = orgId == undefined;

                if (orgId == 0) {
                    var options = '<option value="0" selected>全部</option>';
                    $subRegion.html(options);
                    return;
                }

                if (!selfSubRegion) {
                    url = '/api/org/' + orgId + '.json';
                    data = {
                        descendants: 1
                    };
                } else {//没有上级区域id 获取该bd相关分区

                    url = '/api/org/subs/' + bdId + '.json';
                }
                Common.ajax({
                    url: url,
                    des: "获取分区列表",
                    data: data
                }).done(function (e) {
                    var data = null;
                    var options = '<option value="0" selected>全部</option>';

                    if (!selfSubRegion) {
                        data = e.data && e.data.descendants
                    } else {
                        data = e.data;
                    }
                    data && $.each(data, function (i, item) {
                        options += '<option value="' + item.id + '">' + item.name + '</option>';
                    })
                    $subRegion.html(options);
                });

            },
            initHtml: function () {
                var now = new Date(),
                startDate = new Date(now - 86400000 * 7).Format("yyyy-MM-dd"),
                endDate = new Date(now - 86400000).Format("yyyy-MM-dd");
                $startDate.val(startDate);
                $endDate.val(endDate);
            },
            initEvent: function () {

                var $city = $(".city");
                var $mis = $(".mis");
                var $cinema = $(".cinema");
                var $J_search = $(".J_search");
                var $J_hiddenAbnormal = $(".J_hiddenAbnormal");

                //日期查询
                $startDate.datetimepicker({
                    format: "YYYY-MM-DD"
                }).on("dp.change", function (e) {
                    pager.query.startDate = $startDate.val();
                    pager.goPage(1);
                });
                $endDate.datetimepicker({
                    format: "YYYY-MM-DD"
                }).on("dp.change", function (e) {
                    pager.query.endDate = $endDate.val();
                    pager.goPage(1);
                });


                //bd查询
                $mis.typeahead({
                    source: function (query, process) {
                        Common.ajax({
                            url: "/api/user/login/" + query + ".json"
                        }).done(function (e) {
                            var a = $.map(e.data, function (item) {
                                return {
                                    id: item.userId,
                                    name: item.key,
                                    nm: item.name
                                }
                            });
                            process(a);
                        });

                    },
                    matcher: function () {
                        return true;
                    },
                    afterSelect: function (item) {
                        $mis.data("id", item.id);
                        $mis.data("key", item.name);
                    }
                });


                //筛选项 “核心数据”、“选座数据”、“选座新客数据”、“影院数据”，默认筛选“核心数据”。查询
                $(".J_dataType").on("change", function () {
                    pager.query.dataType = $(this).val();
                    pager.goPage(1);
                });


                $(".wrap-table").delegate("th", "click", function (e) {
                    var $this = $(this),
                    $clone = $this.clone(),
                    orderBy = $clone.removeClass("up down").attr('class');


                    if (propsMap[orderBy].key == undefined) {
                        return;
                    }

                    $clone = null;
                    $this.siblings().removeClass("up down");
                    var className;
                    if ($this.hasClass("up")) {
                        className = "down";
                        pager.query.orderType = 1;
                    } else {
                        className = "up";
                        pager.query.orderType = 0;
                    }
                    pager.query.orderBy = propsMap[orderBy] && propsMap[orderBy].key;
                    pager.goPage(1).done(function () {
                        table.table.find("." + orderBy).addClass(className);
                    });
                });

                var now = new Date(),
                startDate,
                endDate,
                yesterday = new Date(now - 86400000).Format("yyyy-MM-dd");
                $(".J_this-mouth").click(function () {
                    startDate = new Date(new Date().setDate(1)).Format("yyyy-MM-dd");
                    if (now.getDate() == 1) {
                        endDate = startDate;
                    } else {
                        endDate = yesterday;
                    }
                    pager.query.startDate = startDate;
                    pager.query.endDate = endDate;
                    pager.goPage(1);
                });
                $(".J_last-mouth").click(function () {
                    var thisMonth = now.getMonth();
                    if (thisMonth == 0) {//1月
                        startDate = new Date(new Date().setDate(1));
                        startDate = new Date(startDate.setMonth(11));
                        startDate = new Date(startDate.setYear(startDate.getFullYear() - 1));
                        startDate = startDate.Format("yyyy-MM-dd");
                    } else {
                        startDate = new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 1)).Format("yyyy-MM-dd");
                    }

                    pager.query.startDate = startDate;
                    pager.query.endDate = new Date(new Date().setDate(1) - 86400000).Format("yyyy-MM-dd");
                    pager.goPage(1);
                });
                $(".J_yesterday").click(function () {
                    pager.query.startDate = yesterday;
                    pager.query.endDate = yesterday;
                    pager.goPage(1);
                });
                $(".J_this-week").click(function () {
                    pager.query.startDate = new Date(new Date() - 86400000 * 7).Format("yyyy-MM-dd");
                    pager.query.endDate = yesterday;
                    pager.goPage(1);
                });
                $J_hiddenAbnormal.click(function(){
                    $J_search.trigger("click");
                })
                //query
                $J_search.click(function () {
                    var bdId = "";
                    if($mis.data('key') == $mis.val()){
                        bdId = $mis.data('id');
                    }
                    pager.query = {
                        dataType: 1,
                        startDate: $startDate.val(),
                        subId:$('.sub-region').val(),
                        endDate: $endDate.val(),
                        bdId: bdId,
                        city: $city.val(),
                        cinema: $cinema.val(),
                        orderBy: 1,
                        orderType: 0,
                        isHiddenAbnormal:$J_hiddenAbnormal.prop("checked")
                    };
                    pager.goPage(1).done(function () {
                        table.table.find(".reportDate").addClass("up");//默认日期升序
                    });
                });

            },
            initTable: function () {
                var $J_search = $(".J_search");

                pager = new Pager($(".pager"), "/api/cinema/seat/reports.json", function (e) {
                    UIHandler.upDateDetailData(e.data);
                    table.init(tableData);

                }, function (e) {
                    toastr.warning(e.message);
                });
                pager.initHandle();
                $J_search.trigger("click");


            }
        };
        return {

            init: function () {
                Page.initSubRegion();
                Page.initHtml();
                Page.initEvent();
                Page.initTable();
            }
        };


    });