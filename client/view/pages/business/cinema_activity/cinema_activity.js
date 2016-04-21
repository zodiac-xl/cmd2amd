require([
    "util/table",
    "util/pager",
    "util/url",
    "util/common",
    "util/dateformat"
], function (Table, Pager, URL, Common) {

    var $pane = $("#cinemaActivity"),
    $J_startTime = $pane.find(".J_startTime"),
    $J_endTime = $pane.find(".J_endTime"),
    $searchBar = $(".bar-search"),
    overviewTable = new Table($pane.find(".wrap-table-overview")),
    detailTable = new Table($pane.find(".wrap-table-cinemaActivity")),
    detailData = {
        ths: ["申请ID", "影院ID", "影院名", "分区", "城市", "活动日期", "成本（元）", "状态", "操作"]
    },
    overviewData = {
        ths: ["BD申请数/总成本（元）", "BD一审通过申请数/总成本（元）", "BD二审通过申请数/总成本（元）"]
    },
    pager;

    var isAdmin = window.isAdmin;


    //admin 和bd的申请列表相比
    //增加：
    //  1.查询 大区
    //  2.导出申请列表
    //  3.BD反馈模板设置 原有页面中使用jsx调用component ApplyFormTemplate

    //申请操作变化：
    //bd：查看 修改 BD一审 BD二审核 （审核包括通过和驳回 各阶段审核无标识 后端根据申请现有状态 判断审核阶段）
    //admin: 查看 opt审核 上线 下线


    var UIHandler = {
        _createDetailTableTrData: function (item) {

            var cinemaId = '';
            var cinemaName = '';
            var regionName = '';
            var subName = '';
            var cityName = '';
            var bdName = '';
            var cinemas = item.cinemas;
            var cinemaCount = cinemas.length;
            var firstCinema;
            if (cinemaCount > 0) {
                firstCinema = cinemas[0];
                cinemaId = firstCinema.id;
                cinemaName = firstCinema.name;
                regionName = firstCinema.regionName;
                subName = firstCinema.subName;
                cityName = firstCinema.cityName;
                bdName = firstCinema.bd.name;

                if (cinemaCount > 1) {
                    cinemaId += '等' + cinemaCount + '家影院';
                    cinemaName += '等';
                    regionName += '等';
                    subName += '等';
                    cityName += '等';
                    bdName += '等';
                }
            } else {
                toastr.warning('影院申请数据有误，请相关工作人员');
                return {};
            }
            return {
                applyId: item.id,
                cinemaId: cinemaId,
                cinemaName: cinemaName,
                region: regionName,
                subRegionName: subName,
                cityName: cityName,
                bdName: bdName,
                time: function ($td) {
                    $td.html(item.startTime + "至" + item.endTime)
                },
                cost: item.cost,
                state: function ($td) {
                    $td.text(item.state.desc).data("state", item.state.value);
                },
                operate: function ($td) {
                    var state = item.state.value;
                    var btnText = "查看";
                    var operateType = "check";
                    var canAudit = item.canAudit;
                    var misId = window.User.misId;
                    var applyUserKey = item.applyUser.key;
                    var bdKey = firstCinema.bd.key;

                    //bd 操作表
                    //1. 当申请状态为“被驳回”时   修改按钮 修改操作 （window.User.misId  = bd 或 applyser 才可以修改）
                    //2. 当申请状态为“待BD一审”或“待BD二审”，且该BD需要对其进行审核时    审核按钮 审核操作
                    //3. 其他展示   查看按钮 查看操作

                    //admin 操作表
                    //1. 当申请状态为“待OPT审核”时    审核按钮
                    //2. 状态为“待上线”、“上线中”时    查看按钮 下线按钮
                    //3. 状态为“已下线”时      查看按钮 上线按钮 (需要活动未结束)
                    //4. 其他 查看按钮 查看操作
                    if (isAdmin) {
                        switch (state * 1) {//2 被驳回  3待BD一审 4待BD二审 5-待OPT审核，6-待上线，7-上线中，8-已下线。
                            case 5:
                                btnText = "审核";
                                operateType = "audit-opt";
                                break;
                            default:
                                break;
                        }
                    } else {
                        var canEditOrOnline = (misId == applyUserKey || misId == bdKey);
                        switch (state * 1) {//2 被驳回  3待BD一审 4待BD二审 5-待OPT审核，6-待上线，7-上线中，8-已下线。
                            case 2:
                                if (canEditOrOnline) {
                                    btnText = "修改";
                                    operateType = "edit";
                                }
                                break;
                            case 3:
                                if (canAudit) {
                                    btnText = "审核";
                                    operateType = "audit-bd1st";
                                } else {
                                    if (canEditOrOnline) {
                                        btnText = "修改";
                                        operateType = "edit";
                                    }
                                }
                                break;
                            case 4:
                                if (canAudit) {
                                    btnText = "审核";
                                    operateType = "audit-bd2nt";
                                }
                                break;
                            case 6:
                                if (canEditOrOnline) {
                                    btnText = "上线";
                                    operateType = "online";
                                }
                                break;
                        }
                    }

                    var checkAndEdit = !isAdmin && state== 7 && misId == applyUserKey;//“已上线”时 查看的时候可以修改 按钮仅对发起该申请的BD展示

                    //new 时才传递cinemaId cinemaName
                    $td.data("apply", {
                        applyId: item.id,
                        cinemaId: cinemaId,
                        cinemaName: cinemaName,
                        operateType: operateType,
                        applyType: 1,
                        checkAndEdit:checkAndEdit,
                        versionType: item.type //1-新流程 2-老流程
                    });

                    $td.html("<button class='J_operate-apply btn btn-default'>" + btnText + "</button>&nbsp;&nbsp;<button class='J_record-apply btn btn-default'>申请记录</button>")

                }
            };
        },
        getDetailTable: function (data) {

            if (isAdmin && detailData.ths[3] != '大区') {
                detailData.ths.splice(3, 0, "大区");
                detailData.ths.splice(6, 0, "负责BD");
            }

            detailData.trs = [];
            $(data).each(function (index, item) {
                var tr = UIHandler._createDetailTableTrData(item);
                if (!isAdmin) {
                    delete tr.bdName;
                    delete tr.region;
                }
                detailData.trs.push(tr);
            });

            detailTable.init(detailData);
        },
        getOverviewTable: function (data) {
            Common.ajax({
                url: '/api/apply/special/scaa/stat.json',
                type: 'GET',
                dataType: "json",
                data: data,
                des: "单影院活动申请通过数和成本统计table获取"
            }).done(function (e) {
                var data = e.data;
                overviewData.trs = [{
                    bd: data.bd.passed + "/" + data.bd.cost,
                    bd1st: data.bd1st.passed + "/" + data.bd1st.cost,
                    bd2nd: data.bd2nd.passed + "/" + data.bd2nd.cost
                }];
                overviewTable.init(overviewData);
            });

        }
    };

    var Page = {

        initRegion: function () {
            Common.ajax({
                url: '/api/admin/org/regions.json',
                des: "获取所有大区"
            }).done(function (e) {
                var data = e.data;
                var options = '';
                data && $.each(data, function (i, item) {
                    options += '<option value="' + item.id + '">' + item.name + '</option>';
                });
                $('.region').append($(options));
            });
        },
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
        initEvent: function () {


            var now = new Date();
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            var currentDay = now.getDay(),
            currentDate = now.getDate(),
            distanceToSunday = (7 - currentDay) % 7,
            distanceToMonday = 6 - distanceToSunday,
            thisMonday = new Date(now.getTime() - distanceToMonday * 1000 * 60 * 60 * 24),
            thisSunday = new Date(now.getTime() + (distanceToSunday + 1) * 1000 * 60 * 60 * 24 - 1);

            $pane.find("[data-datepicker]").datetimepicker({
                format: "YYYY-MM-DD"
            });
            $J_startTime.val(thisMonday.Format("yyyy-MM-dd"));
            $J_endTime.val(thisSunday.Format("yyyy-MM-dd"));


            $pane.find(".J_thisWeek").click(function () {
                $J_startTime.val(thisMonday.Format("yyyy-MM-dd"));
                $J_endTime.val(thisSunday.Format("yyyy-MM-dd"));
                $pane.find(".J_btn-search").trigger("click");
            });
            $pane.find(".J_lastWeek").click(function () {
                $J_startTime.val(new Date(thisMonday.getTime() - 7 * 1000 * 60 * 60 * 24).Format("yyyy-MM-dd"));
                $J_endTime.val(new Date(thisSunday.getTime() - 7 * 1000 * 60 * 60 * 24).Format("yyyy-MM-dd"));
                $pane.find(".J_btn-search").trigger("click");
            });


            $searchBar.find(".state").on("change", function () {
                $pane.find(".J_btn-search").trigger("click");
            });

            $searchBar.find(".region").on("change", function (e) {
                Page.initSubRegion($(e.target).val())
            });
            if (!isAdmin) {//非管理就没有上级区域id 获取该bd相关分区
                Page.initSubRegion();
            }


            $pane.find(".J_btn-search").click(function () {
                var cinemaName = "";
                var cinemaIds = [];
                var cinemaInputValue = $searchBar.find(".id-cinema").val();
                if (cinemaInputValue == "" || /\D/.test(cinemaInputValue)) {
                    cinemaName = cinemaInputValue;
                } else {
                    cinemaIds = [cinemaInputValue * 1];
                }
                pager.query = {
                    type: 1, //单影院活动
                    param: {
                        state: $searchBar.find(".state").val() * 1,
                        cinemaIds: cinemaIds,
                        cinemaName: cinemaName,
                        cityName: $searchBar.find(".city").val(),
                        modifiedAfter: $J_startTime.val(),    //最近操作时间大于该时间
                        modifiedBefore: $J_endTime.val() + " 23:59:59"    //最近操作时间小于该时间
                    }
                };
                //  1.查询 大区
                if (isAdmin) {
                    pager.query.param.regionId = $searchBar.find(".region").val();
                }
                pager.query.param.subId = $searchBar.find(".sub-region").val();

                var overviewTableQuery = pager.query.param;

                UIHandler.getOverviewTable({
                    param: JSON.stringify(pager.query.param)
                });

                pager.goPage(1);

            });


            //  2.导出申请列表
            $pane.find(".J_export").click(function () {
                var params = JSON.stringify({
                    startTime: new Date($J_startTime.val()).getTime(),
                    endTime: new Date($J_endTime.val() + ' 23:59:59').getTime()

                });

                var url = "/api/admin/apply/applies/xls?type=1&params=" + params;

                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json"
                }).done(function (e) {
                    if (e.error) {
                        toastr.warning(e.error.message);
                    } else {
                        toastr.success(e.message)
                    }
                })
            });


        },
        initTable: function () {
            var url = "/api/apply/applies.json";
            //bd和admin请求url 不同
            if (isAdmin) {
                url = "/api/admin/apply/applies.json";
            }
            pager = new Pager($pane.find(".pager"), url, function (e) {
                UIHandler.getDetailTable(e.data);
            }, function (e) {
                toastr.warning(e.message);
            });
            pager.initHandle();


            $pane.find(".J_btn-search").trigger("click");


        },
        init: function () {

            if (isAdmin) {//管理就获取所有大区
                this.initRegion();
            }

            this.initEvent();
            this.initTable();
        }
    };


    var urlState = URL.getUrlArg('state');
    if (urlState != undefined && urlState * 1 > 0) {
        $searchBar.find(".state").val(urlState)
    }
    Page.init();

    window.freshTable = function () {
        pager.goPage(pager.currPage);
    }


});
