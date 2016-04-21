define([
    "util/table",
    "util/pager",
    "util/url",
    "util/common",
    "util/dateformat"
], function (Table, Pager, URL, Common) {


    //templates
    var $templates = $("#templates"),
    $movieInfo = $templates.find(".movie-info");


    //table Data
    var moviePriceTableData = {
        ths: ["时间", "语言", "版本", "厅", "原价", "最低价", "结算价", "监控结算价", "售价"]
    };

    //doms
    var $searchDate = $(".date-search"),
    $moviesInfoPane = $("#movies_info");

    //const
    var cinemaId = URL.getUrlArg("cinemaId", unescape(location.search)),
    cinemaName = URL.getUrlArg("cinemaName", unescape(location.search)),
    contractId = null,
    city = URL.getUrlArg("city", unescape(location.search)),
    sellSrcDesc = URL.getUrlArg("sellSrcDesc", unescape(location.search));

    var DataHandler = {
        //region pane 影讯
        getMovieShowsByDate: function (date) {
            var defer = $.Deferred();
            Common.ajax({
                url: "/api/show/shows.json",
                type: "GET",
                des: '获取影讯',
                data: {
                    cinemaId: cinemaId,
                    showDate: date
                },
                dataType: "json"
            }).done(function (e) {
                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);

            });
            return defer.promise();
        },
        synchronize: function (cinemaId) {
            var url = "/api/show/cinema/" + cinemaId + "/shows/synchronize.json";
            toastr.remove();
            toastr.info("正在同步，请稍候。。。");
            Common.ajax({
                url: url,
                type: "PUT",
                des: '同步',
                dataType: "json"
            }).then(function (e) {
                toastr.remove();
                toastr.info(e.message);
            })
        },

        //endregion

        //cinema detail pane 影院详细信息
        getCinemaDetail: function () {
            var defer = $.Deferred();
            Common.ajax({
                url: "/api/cinema/" + cinemaId + ".json",
                type: "GET",
                des: '获取影院信息',
                dataType: "json"
            }).done(function (e) {
                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);
            });
            return defer.promise();
        },
        //endcinemadetail

        //region pane 关联影院
        getRelatedCinemas: function () {
            var defer = $.Deferred();
            Common.ajax({
                url: '/api/cinema/contract/' + contractId + '/cinemas.json',
                type: "GET",
                des: '获取关联影院',
                dataType: "json"
            }).done(function (e) {
                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);

            });
            return defer.promise();
        },
        //endregion

        //region pane 基本信息
        getBaseInfo: function () {
            var defer = $.Deferred();
            Common.ajax({
                url: "/api/cinema/contract/" + cinemaId + ".json",
                type: "GET",
                des: '获取基本信息',
                dataType: "json"
            }).done(function (e) {
                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);
            });
            return defer.promise();
        }
        //endregion

    };

    var UIHandler = {
        _getMoviesInfo: function (moviesData) {
            var moviesInfo = [];
            $.each(moviesData, function (index, movieData) {
                var movieName,
                moviePriceTrs = [];
                $.each(movieData, function (i, perTimeMovieInfo) {
                    movieName = perTimeMovieInfo.movieName;
                    moviePriceTrs.push({
                        showTime: new Date(perTimeMovieInfo.showTime).Format("hh:mm"),
                        lang: perTimeMovieInfo.lang,
                        ticketType: perTimeMovieInfo.ticketType,
                        hallName: perTimeMovieInfo.hallName,
                        originPrice: Number(perTimeMovieInfo.originPrice) / 100,//后端价格全部乘以了100 （for someone can not save float data）
                        lowestPrice: Number(perTimeMovieInfo.lowestPrice) / 100,
                        purchasePrice: Number(perTimeMovieInfo.purchasePrice) / 100,
                        monitorPrice: Number(perTimeMovieInfo.monitorPrice) / 100,
                        sellPrice: Number(perTimeMovieInfo.sellPrice) / 100

                    });
                });
                moviesInfo.push({
                    movieName: movieName,
                    moviePriceTrs: moviePriceTrs
                });

            });
            return moviesInfo;
        },
        _showMoviesInfo: function (moviesData) {
            var moviesInfo = UIHandler._getMoviesInfo(moviesData);
            $("#movies_info").find(".wrap-info").html("");
            $.each(moviesInfo, function (index, movieInfo) {
                var $newMovieInfo = $movieInfo.clone(),
                moviePriceTable = new Table($newMovieInfo.find(".wrap-table"));
                $newMovieInfo.find(".movie-name").text(movieInfo.movieName);

                moviePriceTableData.trs = movieInfo.moviePriceTrs;
                moviePriceTable.init(moviePriceTableData);

                $moviesInfoPane.find(".wrap-info").append($newMovieInfo)

            });
        },

        initCinemaDetailInfoPane: function () {
            var defer = $.Deferred();
            DataHandler.getCinemaDetail().done(function (e) {
                var data = e.data;
                $("#cinema_deatail_info").data("data", data);
                // 基础信息
                var cinemaDetailTable = new Table($("#cinema_deatail_info").find(".wrap-table.detailInfoTable"));
                var tableData = {
                    ths: ["字段", "填写规范", "信息"],
                    trs: []
                };
                var column1 = ["POIID", "影院名称", "品牌", "城市", "区域", "电话", "地址"];
                var column2 = {
                    1: "门店名由招牌名和分店名两部分构成，填写形式为：影院招牌名(分店名)；英文名词注意大小写区分：CGV、IMAX、UME等；尽量不要出现城市名称。",
                    5: "请确保电话准确，且可接通",
                    6: "注明在建筑物几层或某地铁站某个出口，例如：**路**号+方位词+**米+**广场/大厦/购物中心+**层(**地铁站B口出站向西200米)",
                }
                var column3 = ["poiId", "nm", "brd", "ct", "area", "tel", "addr"];
                $.each(column3, function (i, key) {
                    tableData.trs.push({
                        column1: column1[i],
                        column2: column2[i] || '',
                        column3: data[key],
                    });
                });
                cinemaDetailTable.init(tableData);

                // 特色信息 + 非选座影院的特效厅
                if (data.note) {
                    $("#cinema_deatail_info [name=note]").text(data.note.replace(/<br\/>/g, '\n'));
                }
                $("#cinema_deatail_info [name=rpFor2D]").val(data.rpFor2D || '');
                $("#cinema_deatail_info [name=rpFor3D]").val(data.rpFor3D || '');

                if (data.featureTags && data.featureTags.length > 0) {
                    $.each(data.featureTags, function (i, map) {
                        $("#cinema_deatail_info [type=checkbox][tag=" + map["tag"] + "]").prop("checked", true);
                        $("#cinema_deatail_info [type=text][tag=" + map["tag"] + "]").val(map["desc"]);
                    });
                }

                // 特效厅是否隐藏
                if (data.ticketing) {
                    $(".isShownFeactureHalls").hide();
                } else {
                    $(".isShownHalls").hide();
                }

                // 同步影厅
                if (data.halls && data.halls.length > 0) {
                    var hallsTable = new Table($("#cinema_deatail_info").find(".wrap-table.hallsTable"));
                    tableData = {
                        ths: ["影厅名称", "影厅属性", "座位数", "荧幕尺寸"],
                        trs: []
                    };
                    $.each(data.halls, function (i, hall) {
                        tableData.trs.push({
                            name: hall["name"],
                            hallType: hall["hallType"],
                            seatCount: hall["seatCount"],
                            size: hall["size"],
                        });
                    });
                    hallsTable.init(tableData);
                }

                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);
            });

            return defer.promise();
        },

        initMoviesInfoPane: function (date) {
            var defer = $.Deferred();
            DataHandler.getMovieShowsByDate(date).done(function (e) {
                var data = e.data;

                UIHandler._showMoviesInfo(data);

                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);
            });

            return defer.promise();
        },

        initRelatedCinemasPane: function () {
            var defer = $.Deferred();
            DataHandler.getRelatedCinemas().done(function (e) {
                var data = e.data,
                relatedCinemasTable = new Table($("#related_cinemas").find(".wrap-table")),
                tableData = {
                    ths: ["影院ID", "影院名", "城市"],
                    trs: []
                };
                $.each(data, function (i, item) {
                    tableData.trs.push({
                        cinemaId: item.cinemaId,
                        cinemaName: item.cinemaName,
                        city: item.city
                    })
                });
                relatedCinemasTable.init(tableData);
                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);
            });

            return defer.promise();
        },

        initBaseInfoPane: function () {
            var defer = $.Deferred();
            DataHandler.getBaseInfo().done(function (e) {
                var $baseInfo = $("#base_info"),
                $needText = $baseInfo.find("[data-text]"),
                $needAttachments = $baseInfo.find("[data-attachments]"),
                data = e.data,
                validDateArr;

                if (!e.data) {
                    defer.resolve(e);
                    console.log('获取基本信息失败');
                    return;
                }
                contractId = data.id;

                data.prepayment = data.prepayment ? ("人民币：" + data.prepayment + "元") : "无";
                data.quantity = data.quantity ? ("人民币：" + data.quantity + "元") : "无";
                data.deposit = data.deposit ? ("人民币：" + data.deposit + "元") : "无";

                data.signDate = new Date(data.signDate).Format("yyyy-MM-dd");
                validDateArr = data.validDate && data.validDate.split(";") || [];
                if (validDateArr[0] == 2) {
                    data.validDate = "上线日期：" + validDateArr[1] + "   下线日期：" + validDateArr[2];
                } else {
                    data.validDate = "自上线之日起" + validDateArr[1];
                }

                $needText.each(function (i, item) {
                    $(item).text(data[$(item).data("text")] || "无");
                });

                $needAttachments.each(function (i, item) {
                    var attachments = data[$(item).data("attachments")] || [],
                    files = [], fileId = 0;
                    if ($.type(attachments) == "string") {
                        attachments = JSON.parse(attachments);
                    }
                    $.each(attachments, function (index, attachment) {
                        files.push({
                            id: fileId++,
                            name: attachment.name,
                            url: attachment.url
                        });
                    });
                    Common.addAttachments({
                        files: files,
                        parent: $(item),
                        dele: false

                    });

                });


                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);
            });

            return defer.promise();
        }
    };

    var Page = {
        initCinemaInfo: function () {
            $(".cinema-info .cinema-id").text(cinemaId);
            $(".cinema-info .cinema-name").text(cinemaName);
            $(".cinema-info .city").text(city);
            $(".cinema-info .system").text(sellSrcDesc);
        },
        initEvent: function () {

            //region pane 影讯
            //初始查询日期为今天的日期

            $searchDate.datetimepicker({format: 'YYYY-MM-DD', defaultDate: new Date()});


            //查询
            $(".J_search").click(function () {
                UIHandler.initMoviesInfoPane($searchDate.val())
            });

            //同步影讯
            $(".J_synchronize").click(function () {
                DataHandler.synchronize(cinemaId);
            });
            //endregion


        },
        initPanes: function () {
            UIHandler.initCinemaDetailInfoPane();
            UIHandler.initMoviesInfoPane($searchDate.val());
            UIHandler.initBaseInfoPane().done(function () {
                if (contractId != null) {
                    UIHandler.initRelatedCinemasPane();
                }
            }).fail(function (e) {
                console.error("初始化tabs失败：" + e.message || "未知");
            });

        }
    };

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();

        // 3D眼镜
        $("[type=checkbox][name=3dglass]").click(function () {
            $(this).closest("#cinema_deatail_info").find("[name=3dglass]").not($(this)).prop("checked", false);
        });

        $(".save_cinema_deatail_info").click(function () {
            var data0 = $("#cinema_deatail_info").data("data") || {};
            var cinemaId = data0.id || 0;
            var data = {};
            var data0NeedKeys = ["nm", "brd", "ct", "area", "dis", "lng", "lat", "rpFor2D", "rpFor3D", "tel", "addr", "bus", "suw", "dri", "park", "note", "closeStatus", "imax", "featureTags"];
            $.each(data0NeedKeys, function (i, key) {
                data[key] = data0[key];
            });
            var note = $("#cinema_deatail_info [name=note]").val();
            data['note'] = note.replace(/\n/g, "<br/>");
            data['rpFor2D'] = Number($("#cinema_deatail_info [name=rpFor2D]").val());
            data['rpFor3D'] = Number($("#cinema_deatail_info [name=rpFor3D]").val());
            data.featureTags = [];
            $.each($("#cinema_deatail_info [type=checkbox]:not([disabled])"), function (i, ele) {
                var featureTag = {};
                if ($(ele).prop("checked")) {
                    featureTag["tag"] = $(ele).attr("tag");
                    featureTag["desc"] = $("#cinema_deatail_info [type=text][tag=" + featureTag["tag"] + "]").val();
                }
                if (featureTag.hasOwnProperty("tag")) {
                    data.featureTags.push(featureTag);
                }
            });
            var dtd = $.Deferred();
            Common.ajax({
                url: '/api/cinema/' + cinemaId + '.json',
                type: "PUT",
                des: '修改影院特效厅信息',
                dataType: "json",
                data: "content=" + JSON.stringify(data),
            }).done(function (e) {
                toastr.success("保存成功");
                dtd.resolve(e);
            }).fail(function (e) {
                dtd.reject(e);
            });
        });

        $(".syncBtns").click(function () {
            var data0 = $("#cinema_deatail_info").data("data") || {};
            var cinemaId = data0.id || 0;
            var url = '/api/hall/cinema/' + cinemaId + '/halls/synchronize.json';
            var des = '同步影厅和座位图';
            toastr.remove();
            toastr.info(des + '中，请稍候。。。');
            this.ajax({
                url: url,
                type: "PUT",
                des: des,
            }).done(function (e) {
                toastr.remove();
                toastr.info(e.des);
            });
        });
    });

    return {
        init: function () {
            Page.initCinemaInfo();
            Page.initEvent();
            Page.initPanes();
        }
    };
});
