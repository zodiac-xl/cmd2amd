$(function(){
    require([
        "util/table",
        "util/pager",
        "plugin/fileupload/fileupload",
        "util/dateformat"

    ], function (Table, Pager, FileUpload) {

        var $competitivePrice = $("#competitivePrice");
        var $searchWrap = $(".competitivePrice__search--bar .wrap-search");
        var $showRivalHall = $("#showRivalHall");
        var $showHandleUpdate = $('#showHandleUpdate');
        var $showHandleRecord = $('#showHandleRecord');

        /*
         var showRivalHallHtml = $originShowRivalHall.get(0).outerHTML;
         var $showRivalHall = $(showRivalHallHtml).clone();
         $originShowRivalHall.hide();
         */

        // 列表页日期
        var $weakCinemaStartDate = $(".weakCinema-startDate");
        var $weakCinemaEndDate = $(".weakCinema-endDate");
        var startDay = new Date();
        var endDay = new Date();
        // 查看劣势场次日期
        var $rivalStartDate = $showRivalHall.find(".weakHall-startDate");
        var $rivalEndDate = $showRivalHall.find(".weakHall-endDate");
        var rivalStartDay = new Date();
        var rivalEndDay = new Date();

        var handleUpdataDay = startDay;

        //var PREFIX = 'http://adminapi.movie.test.sankuai.com/api/admin/movieeye'; //为测试环境URL前缀
        //var PREFIX = 'http://adminapi.movie.st.sankuai.com/api/admin/movieeye'; // staging 环境URL前缀
        var PREFIX = 'http://adminapi.movie.sankuai.com/api/admin/movieeye'; // 线上环境URL前缀
        var PROXY_URL = '/proxy'; // test
        //var PREFIX = '/api/admin/movieeye'; //为线上环境URL前缀


        // 处理状态
        var stateType = 0;
        // 处理状态对照
        var stateTypeList = {
            0: '全部',
            1: '待处理',
            2: '非劣势',
            3: '跟进中',
            4: '已解决',
            5: '无法解决'
        };
        // 当前选中影院的参数
        var rivalSelected = {
            cinemaId: '0',
            cinemaName: '',
            city: ''
        };

        // 详情表格
        var table = new Table($competitivePrice.find("#wrap-table-competitivePrice"));
        // 详情表格翻页
        var pager = new Pager($competitivePrice.find(".J__competitivePrice--search .pager"));

        // 统计表格
        var statisticsTable = new Table($competitivePrice.find('#wrap-table-statistics'));

        // 劣势场次弹窗 表格
        var rivalHallTable = new Table($showRivalHall.find("#wrap-table-rival-hall"));
        // 劣势场次弹窗 翻页
        var rivalHallPager = new Pager($showRivalHall.find(".pager"));

        // 处理记录页弹窗 表格
        var handleRecordTable = new Table($showHandleRecord.find("#wrap-table-handle-record"));

        var DataHandler = {
            getCompetitivePriceTableTrs: function (data) {
                // 影院列表数据
                var trs = [];
                $(data).each(function (index, item) {
                    var tr = {};
                    tr.cinemaId = item.id;
                    tr.cinemaName = item.name;
                    tr.city = item.cityName;
                    tr.weakNum = item.count;
                    tr.averagePrice = item.meanPrice;
                    tr.rival = item.source;
                    if (startDay.Format('yyyy-MM-dd') === endDay.Format('yyyy-MM-dd')) {
                        tr.stateType = item.handleStatus;

                    }
                    if (startDay.Format('yyyy-MM-dd') === endDay.Format('yyyy-MM-dd') &&
                        Date.parse(startDay) <= Date.parse(new Date()) &&
                        item.handleStatus !== '待处理') {
                        tr.operate = function ($td) {
                            $td.html(
                                "<button class='J_show_rival_hall btn btn-default'>查看劣势场次</button>" +
                                "<button class='J_show_handle_update btn btn-default'>更新处理进度</button>" +
                                "<button class='J_show_handle_record btn btn-default'>查看处理记录</button>"
                            );
                        };
                    } else {
                        tr.operate = function ($td) {
                            $td.html(
                                "<button class='J_show_rival_hall btn btn-default'>查看劣势场次</button>" +
                                "<button class='J_show_handle_record btn btn-default'>查看处理记录</button>"
                            );
                        };
                    }

                    trs.push(tr);
                });
                return trs;
            },
            getRivalHallTableTrs: function (data) {
                // 查看劣势场次 弹窗
                var trs = [];
                $(data).each(function (index, item) {
                    var tr = {
                        movieId: item.movieId,
                        movieName: item.movieName,
                        hall: item.hall,
                        showTime: item.showTime,
                        mtSellPrice: item.mtSellPrice,
                        outSellPrice: item.outSellPrice,
                        source: item.source,
                        weakPrice: item.weakPrice
                    };
                    trs.push(tr);
                });
                return trs;
            },
            getStatisticsTableTrs: function (data) {
                // 统计汇总数据
                var trs = [];
                if (data && !$.isEmptyObject(data)) {
                    var tr = {
                        total: '<p class="J__total--filter" data-type="0">' + data.total + '</p>',
                        unHandle: '<p class="J__total--filter" data-type="1">' + data.unHandle + '</p>',
                        inHandle: '<p class="J__total--filter" data-type="3">' + data.inHandle + '</p>',
                        notWeak: '<p class="J__total--filter" data-type="2">' + data.notWeak + '</p>',
                        cantResolve: '<p class="J__total--filter" data-type="5">' + data.cantResolve + '</p>',
                        alreadyResolve: '<p class="J__total--filter" data-type="4">' + data.alreadyResolve + '</p>',
                    };
                    trs.push(tr);
                }
                return trs;
            },
            getHandleRecordTableTrs: function (data) {
                // 查看处理记录
                var trs = [];
                $(data).each(function (index, ele) {
                    var file = '';
                    if (ele.fileList && ele.fileList.length) {
                        $.each(ele.fileList, function (index, item) {
                            file += '<p><a href="' + item.fileUrl + '"> ' + item.fileName + '</a></p>';
                        })
                    }
                    var tr = {
                        date: ele.date,
                        bd: ele.bd,
                        time: ele.time,
                        handleDetail: ele.handleDetail,
                        file: file
                    };
                    trs.push(tr);
                });
                return trs;

            }
        };

        var UIHandler = {
            initRivalsSelect: function (data) {
                $(".riva").each(function (i, select) {
                    var options = "<option value='' checked>全部</option>";
                    if (data) {
                        $.each(data, function (j, rial) {
                            options += "<option value='" + rial.id + "'>" + rial.desc + "</option>"
                        });
                    }

                    $(select).append($(options));
                });
            }
        };

        var Page = {
            initSearchTime: function () {
                // 列表页日期
                //初始"开始日期"为今天的日期
                $weakCinemaStartDate.datetimepicker({
                    format: "YYYY-MM-DD",
                    maxDate: new Date(),
                    defaultDate: startDay
                });
                //初始"结束日期"为今天的日期
                $weakCinemaEndDate.datetimepicker({
                    format: "YYYY-MM-DD",
                    maxDate: new Date(),
                    defaultDate: endDay
                });

                // 查看劣势场次日期
                //初始"开始日期"为今天的日期
                $rivalStartDate.datetimepicker({
                    format: "YYYY-MM-DD",
                    maxDate: new Date(),
                    defaultDate: rivalStartDay
                });
                //初始"结束日期"为今天的日期
                $rivalEndDate.datetimepicker({
                    format: "YYYY-MM-DD",
                    maxDate: new Date(),
                    defaultDate: rivalEndDay
                });
            },
            initFilterType: function () {
                // 点击统计栏的数字时 对所有数据进行过滤
                $("body").delegate(".J__total--filter", "click", function (e) {
                    pager.query = {
                        bd: window.User.userId,
                        startDay: startDay.Format('yyyy-MM-dd'),
                        endDay: endDay.Format('yyyy-MM-dd'),
                        cinema: $searchWrap.find(".cinemaId").val(),
                        src: $searchWrap.find(".riva").val(),
                        stateType: $(this).data('type'),
                    };
                    pager.goPage(1);

                });

            },
            // 详情表格和翻页 实例化并初始化
            initCinemaTableAndPager: function () {
                var competitivepricetabledata = {
                    ths: ["影院id", "影院名", "城市", "劣势场次数量", "平均劣势价格", "劣势竞对", "状态", "操作"],
                    trs: []
                };
                table.init(competitivepricetabledata);

                // 详情表格翻页
                pager.url = PREFIX + "/weakcinema/bd/list.json";
                pager.PROXY_URL = PROXY_URL;
                pager.success = function (e) {
                    if (!e.data) {
                        return;
                    }

                    var ths;
                    if (startDay.Format('yyyy-MM-dd') === endDay.Format('yyyy-MM-dd')) {
                        ths = ["影院id", "影院名", "城市", "劣势场次数量", "平均劣势价格", "劣势竞对", "状态", "操作"];
                    } else {
                        ths = ["影院id", "影院名", "城市", "劣势场次数量", "平均劣势价格", "劣势竞对", "操作"];
                    }
                    table.updateThs(ths);
                    table.updateTrs(DataHandler.getCompetitivePriceTableTrs(e.data.list));
                };
                pager.error = function (e) {
                    toastr.warning('查询劣势影院失败 ' + e.statusText);
                }
                pager.initHandle();
            },
            // 统计表格 实例化并初始化
            initStatisticsTable: function () {
                var statisticsTableData = {
                    ths: ['全部', '待处理', '处理中', '非劣势', '无法解决', '已解决'],
                    trs: []
                }
                statisticsTable.init(statisticsTableData);
            },
            // 处理记录页弹窗 表格 实例化并初始化
            initHandleRecordTable: function () {
                var handleRecordTableData = {
                    ths: ['日期', 'BD', '时间', '操作', '附件'],
                    trs: []
                }
                handleRecordTable.init(handleRecordTableData);
            },
            // 劣势场次弹窗 表格和翻页 实例化并初始化
            initRivalTableAndPager: function () {
                var rivalHallTableData = {
                    ths: ["影片ID", "影片名", "影厅", "场次时间", "猫眼售价", "竞对售价", "竞对", "劣势金额"],
                    trs: []
                };
                rivalHallTable.init(rivalHallTableData);

                // 劣势场次弹窗 翻页
                rivalHallPager.url = "/api/show/cinema/" + rivalSelected.cinemaId + "/weak/shows.json";
                rivalHallPager.success = function (e) {
                    if (!e.data) {
                        rivalHallTable.updateTrs([]);
                        return;
                    }
                    rivalHallTable.updateTrs(DataHandler.getRivalHallTableTrs(e.data));
                };
                rivalHallPager.error = function (e) {
                    rivalHallTable.updateTrs([]);
                    toastr.warning('查询劣势场次失败 ' + e.statusText);
                }
                rivalHallPager.initHandle();
            },
            initHtml: function () {
                Page.initSearchTime();
                Page.initStatisticsTable();
                Page.initCinemaTableAndPager();
                Page.initRivalTableAndPager();
                Page.initHandleRecordTable();

                $.ajax({
                    url: "/api/competitor/competitors.json",
                }).then(function (data) {
                    // 配置劣势竞对的option
                    UIHandler.initRivalsSelect(data.data);

                    // 获取汇总的状态数据
                    Page.fetchTotalList();

                    pager.query = {
                        bd: window.User.userId,
                        startDay: startDay.Format('yyyy-MM-dd'),
                        endDay: endDay.Format('yyyy-MM-dd'),
                        cinema: $searchWrap.find(".cinemaId").val(),
                        src: $searchWrap.find(".riva").val(),
                        stateType: stateType,
                    };
                    pager.goPage(1);

                }, function () {
                    toastr.warning("获取竞对失败");
                });

            },
            fetchTotalList: function () {
                // 获取汇总的数目
                var param = {
                    bdId: window.User.userId,
                    startDay: startDay.Format('yyyy-MM-dd'),
                    endDay: endDay.Format('yyyy-MM-dd'),
                    cinema: $searchWrap.find(".cinemaId").val(),
                    src: $searchWrap.find(".riva").val(),
                };

                $.get(PROXY_URL + '?source=' + encodeURIComponent(PREFIX + "/weakcinema/bd/status/" + window.User.userId + ".json?" + $.param(param)))
                    .done(function (data) {
                        statisticsTable.updateTrs(DataHandler.getStatisticsTableTrs(data.data));

                        // 统计今日状态为“待处理”的劣势poi数量
                        if (data.data && !$.isEmptyObject(data.data)) {
                            $('#BdTabs').find('#unHandleCounts').text(data.data.unHandle);
                        } else {
                            $('#BdTabs').find('#unHandleCounts').text('0');
                        }
                    });

            },
            initDateChangeEvent: function () {
                // 日期变更事件
                $weakCinemaStartDate
                    .datetimepicker({
                        format: "YYYY-MM-DD"
                    })
                    .on('dp.change', function (e) {
                        startDay = new Date(e.date);
                    });
                $weakCinemaEndDate
                    .datetimepicker({
                        format: "YYYY-MM-DD"
                    })
                    .on('dp.change', function (e) {
                        endDay = new Date(e.date);
                    });

                $rivalStartDate
                    .datetimepicker({
                        format: "YYYY-MM-DD"
                    })
                    .on('dp.change', function (e) {
                        rivalStartDay = new Date(e.date);
                        toggleRivalHanleButton();
                    });
                $rivalEndDate
                    .datetimepicker({
                        format: "YYYY-MM-DD"
                    })
                    .on('dp.change', function (e) {
                        rivalEndDay = new Date(e.date);
                        toggleRivalHanleButton();
                    });

                // 处理按钮仅在 查询日期为单天且为当天或当前之前的某一天时出现处理按钮
                function toggleRivalHanleButton() {
                    if (rivalStartDay.Format('yyyy-MM-dd') === rivalEndDay.Format('yyyy-MM-dd') && Date.parse(rivalStartDay) <= Date.parse(new Date())) {
                        $showRivalHall.find(".J_btn-rival-handle").show();
                    } else {
                        $showRivalHall.find(".J_btn-rival-handle").hide();
                    }
                }
            },
            initCinemaSearchEvent: function () {
                //列表页查询
                $competitivePrice.find(".J_btn-search").click(function () {
                    pager.query = {
                        bd: window.User.userId,
                        startDay: startDay.Format('yyyy-MM-dd'),
                        endDay: endDay.Format('yyyy-MM-dd'),
                        cinema: $searchWrap.find(".cinemaId").val(),
                        src: $searchWrap.find(".riva").val(),
                        stateType: stateType,
                    }
                    pager.goPage(1);

                    Page.fetchTotalList();
                    rivalStartDay = startDay;
                    rivalEndDay = endDay;
                });
            },
            getSelectCinemaInfo: function (ele) {
                rivalSelected.cinemaId = ele.closest("tr").find(".cinemaId").text();
                rivalSelected.cinemaName = ele.closest("tr").find(".cinemaName").text();
                rivalSelected.city = ele.closest("tr").find(".city").text();
            },
            initShowRivalHallEvent: function () {
                //查看劣势场次
                $("body").delegate(".J_show_rival_hall", "click", function () {
                    var $this = $(this);
                    Page.getSelectCinemaInfo($this);

                    $showRivalHall.find(".cinemaId").text(rivalSelected.cinemaId);
                    $showRivalHall.find(".cinemaName").text(rivalSelected.cinemaName);
                    $showRivalHall.find(".city").text(rivalSelected.city);

                    $rivalStartDate.data("DateTimePicker") && $rivalStartDate.data("DateTimePicker").defaultDate(rivalStartDay);
                    $rivalEndDate.data("DateTimePicker") && $rivalEndDate.data("DateTimePicker").defaultDate(rivalEndDay);

                    if (rivalStartDay.Format('yyyy-MM-dd') === rivalEndDay.Format('yyyy-MM-dd') && Date.parse(rivalStartDay) <= Date.parse(new Date())) {
                        $showRivalHall.find(".J_btn-rival-handle").show();
                    } else {
                        $showRivalHall.find(".J_btn-rival-handle").hide();
                    }

                    rivalHallPager.url = "/api/show/cinema/" + rivalSelected.cinemaId + "/weak/shows.json";
                    rivalHallPager.query = {
                        startDay: rivalStartDay.Format('yyyy-MM-dd'),
                        endDay: rivalEndDay.Format('yyyy-MM-dd')
                    };
                    rivalHallPager.goPage(1);

                    // 查看劣势场次 弹框展现 bootstrap
                    $showRivalHall.modal('show');

                    // codes works on all bootstrap modal windows in application
                    $showRivalHall.on('hidden.bs.modal', function (e) {
                        //$showRivalHall.remove();
                        rivalHallTable.updateTrs([]);
                        $showRivalHall.hide();
                    });

                });
                //查询
                $("body").delegate(".J_btn-rival-search", 'click', function () {
                    rivalHallPager.query = {
                        startDay: $showRivalHall.find(".weakHall-startDate").val(),
                        endDay: $showRivalHall.find(".weakHall-endDate").val(),
                        src: $showRivalHall.find(".riva").val(),
                    };
                    rivalHallPager.goPage(1);
                });

                $("body").delegate(".J_btn-rival-handle", 'click', function () {
                    // 查看劣势场次 弹框关闭 bootstrap
                    $showRivalHall.modal('hide');
                    //$showHandleUpdate.modal('show');
                });
            },
            initShowHandleUpdate: function () {
                //更新处理进度页面
                $("body").delegate(".J_show_handle_update, #showRivalHall .J_btn-rival-handle", "click", function (e) {

                    // 根据出现改弹框的来源 设置对应的更新日期
                    var $this = $(this);
                    if ($this.attr('class') === 'J_show_handle_update') {
                        // 在列表中点击 更新处理进度
                        handleUpdataDay = startDay;
                        Page.getSelectCinemaInfo($this);
                    } else {
                        // 在查看劣势场次弹窗中 点击 处理
                        handleUpdataDay = rivalStartDay;
                    }

                    // 重置为初始状态
                    resetHandleUpdateDialog();

                    //默认为确认劣势跟进处理
                    $('#showHandleUpdate input[name="solutionType"][value="1"]').attr('checked', 'checked');
                    $('.J__weak').show();

                    // 获取最新一次的处理信息
                    fetchLastedHandleInfo();
                    $showHandleUpdate.modal('show');

                    $showHandleUpdate.on('hidden.bs.modal', function (e) {
                        // 重置为初始状态
                        resetHandleUpdateDialog();
                    });

                });

                // 用户不同的选择对应不同的展现
                initToggleScheduleEvent();

                // 提交事件
                submitHandleUpdateEvent();


                // 重置为初始状态
                function resetHandleUpdateDialog() {
                    var radioList = ['solutionType', 'followUpPersonType', 'followUpSchedule', 'insolvableReason', 'noWeakReason'];
                    $.each(radioList, function (index, ele) {
                        $('#showHandleUpdate input[name="' + ele + '"]').attr('checked', false);
                    });
                    $("#showHandleUpdate #handleUpdateFileContainer").html('');
                    $('#showHandleUpdate textarea').val('');
                    $('#showHandleUpdate .J__weak').hide();
                    $('#showHandleUpdate .J__notweak').hide();
                    $('#showHandleUpdate .J__status--not__reason').hide();
                }

                // 获取最新一次的处理信息
                function fetchLastedHandleInfo() {
                    var param = {
                        cinemaId: rivalSelected.cinemaId,
                        showDay: rivalStartDay.Format('yyyy-MM-dd')
                    };
                    $.get(PROXY_URL + '?source=' + encodeURIComponent(PREFIX + '/weakcinema/bd/handle/' + rivalSelected.cinemaId + '.json?' + $.param(param)))
                        .done(function (data) {
                            var data = data.data
                            $('#showHandleUpdate input[name="solutionType"][value="' + data.solutionType + '"]').attr('checked', 'checked');

                            if ($('#showHandleUpdate input[name="solutionType"][value="1"]').is(':checked')) {
                                // 劣势，跟进处理，当选择跟进处理时，展示跟进人、处理进度、备注（都是必填）
                                //un 默认选择跟进处理中
                                $('#showHandleUpdate input[name="followUpSchedule"][value="1"]').attr('checked', 'checked');

                                // 根据获取的结果重新渲染
                                var list = {
                                    followUpPersonType: data.followUpPersonType,
                                    followUpSchedule: data.followUpSchedule,
                                    insolvableReason: data.insolvableReason
                                };
                                $.each(list, function (k, v) {
                                    $('#showHandleUpdate input[name="' + k + '"][value="' + v + '"]').attr('checked', 'checked');
                                })
                                $('.J__notweak').hide();
                                $('.J__weak').show();
                            } else if ($('#showHandleUpdate input[name="solutionType"][value="2"]').is(':checked')) {
                                // 非劣势，无需处理，展示原因（必选）、上传附件（选填）、备注（必填）三项
                                $('#showHandleUpdate input[name="noWeakReason"][value="' + data.noWeakReason + '"]').attr('checked', 'checked');
                                if (data.fileList) {
                                    $.each(data.fileList, function (index, ele) {
                                        $("#handleUpdateFileContainer").append(Page.buildFileContainer(ele, true));
                                    })
                                }
                                console.log(123)
                                $('.J__weak').hide();
                                $('.J__notweak').show();
                            }

                            // 备注信息
                            $('#showHandleUpdate textarea').val(data.remark);

                            if ($('#showHandleUpdate input[name="followUpSchedule"][value="2"]').is(':checked')) {
                                $('.J__status--not__reason').show();
                            }
                        })
                        .fail(function (e) {
                            toastr.warning('获取上一次处理信息失败 ' + e.statusText);
                        })
                }

                // 用户不同的选择对应不同的展现
                function initToggleScheduleEvent() {
                    // 处理方案默认选择跟进处理，当选择跟进处理时，展示跟进人、处理进度、备注（都是必填）
                    $('#showHandleUpdate').delegate('.J__select--weak', 'click', function () {
                        $('.J__notweak').hide();
                        $('.J__weak').show();
                    });

                    //当处理方案选择无需处理时，展示原因（必选）、上传附件（选填）、备注（必填）三项
                    $('#showHandleUpdate').delegate('.J__select--notweak', 'click', function () {
                        $('.J__weak').hide();
                        $('.J__notweak').show();
                    });

                    //当选择暂时无法解决时，弹出原因选项
                    $('#showHandleUpdate').delegate('.J__weak__status--not', 'click', function () {
                        $('.J__status--not__reason').show();
                    });
                    $('#showHandleUpdate').delegate('.J__weak__status--in, .J__weak__status--close', 'click', function () {
                        $('.J__status--not__reason').hide();
                    });
                }

                // 提交事件
                function submitHandleUpdateEvent() {
                    $('#showHandleUpdate').delegate('.J__submit--handle--update', 'click', function () {
                        var data = {};
                        var fileList = [];

                        var radioObj = {
                            'solutionType': '处理方案',
                            'followUpPersonType': '跟进人',
                            'followUpSchedule': '处理进度',
                            'insolvableReason': '原因',
                            'noWeakReason': '原因'
                        }

                        // 检查 所有可见的选项都被选中
                        var allVisibleChecked = true;
                        $.each(radioObj, function (k, v) {
                            // 当前弹窗中可以看到的项目
                            if ($('#showHandleUpdate input[name="' + k + '"]').is(':visible')) {
                                if ($('#showHandleUpdate input[name="' + k + '"]').is(':checked')) {
                                    // 如果是选中状态
                                    data[k] = $('#showHandleUpdate input[name="' + k + '"]:checked').val();
                                } else {
                                    toastr.warning(v + '未选');
                                    allVisibleChecked = false;
                                    return;
                                }
                            }

                        });
                        if (!allVisibleChecked) {
                            return;
                        }
                        if (!$('#showHandleUpdate textarea').val()) {
                            toastr.warning('备注没有填写');
                            return;
                        }
                        // 无需处理时 可以上传附件
                        if ($('#showHandleUpdate input[name="solutionType"][value="2"]').is(':checked')) {
                            $('.J__uploadfile--item').each(function (index, ele) {
                                fileList.push({
                                    id: index,
                                    fileUrl: $(ele).data('info').url,
                                    fileName: $(ele).data('info').name
                                })
                            })
                            data.fileList = fileList;
                        }
                        data.remark = $('#showHandleUpdate textarea').val();
                        var param = {
                            cinemaId: rivalSelected.cinemaId,
                            showDay: handleUpdataDay.Format('yyyy-MM-dd'),
                            bdId: window.User.userId,
                            data: JSON.stringify(data)
                        }

                        $.ajax({
                            url: PROXY_URL + "?source=" + PREFIX + '/weakcinema/bd/handle/' + rivalSelected.cinemaId + '.json',
                            data: param,
                            type: "post",
                            dataType: "json",
                            success: function (data) {
                                if (data.data.success) {
                                    $showHandleUpdate.modal('hide');

                                    pager.goPage(1);
                                    Page.fetchTotalList();
                                } else {
                                    toastr.error("对不起，提交失败！");
                                }
                            },
                            error: function (data) {
                                toastr.error("对不起，提交失败！");
                            }
                        })
                    })
                }
            },
            initShowHandleRecord: function () {
                //查看处理记录页面
                $("body").delegate(".J_show_handle_record", "click", function () {
                    $showRivalHall.hide();

                    var $this = $(this);
                    Page.getSelectCinemaInfo($this);

                    $showHandleRecord.modal('show');

                    $.get(PROXY_URL + '?source=' + encodeURIComponent(PREFIX + '/weakcinema/bd/handlerecord/' + rivalSelected.cinemaId + '.json'), function (data) {
                        handleRecordTable.updateTrs(DataHandler.getHandleRecordTableTrs(data.data));
                    });
                });
            },
            initUploadFileEvent: function () {
                function haneleUpdateUploadFile(fileId) {
                    FileUpload({
                        $file: $("#" + fileId),
                        success: function (data) {
                            $("#handleUpdateFileContainer").append(Page.buildFileContainer(data[0], true))
                        },
                        fail: function (e) {
                            toastr.warning(e.message);
                        }
                    })
                }

                haneleUpdateUploadFile("haneleUpdateUploadFile");

                $("#showHandleUpdate").delegate(".deleteHaneleUpdateUploadFile", "click", function () {
                    $(this).parent().remove();
                });
            },
            buildFileContainer: function (data, deleteBtn) {
                if (data.fileName) {
                    data.name = data.fileName;
                    data.url = data.fileUrl;
                }
                var $span = $("<span data-info='" + JSON.stringify(data) + "' class='J__uploadfile--item'></span>");
                var $a = $("<a name='priceApplyPic' target='_blank' href='" + data.url + "' data-id='" + data.id + "' target='_blank'> " + data.name + "</a>");
                $span.append($a);
                if (deleteBtn) {
                    $span.append("&nbsp;&nbsp;<a class='deleteHaneleUpdateUploadFile'>删除文件</a>");
                }
                $span.append("</br>");
                return $span;
            },
            initEvent: function () {
                Page.initDateChangeEvent();
                Page.initCinemaSearchEvent();
                Page.initFilterType();
                Page.initShowRivalHallEvent();
                Page.initShowHandleUpdate();
                Page.initShowHandleRecord();
                Page.initUploadFileEvent();

            },
            init: function () {
                Page.initHtml();
                //Page.initWeakCinema();
                Page.initEvent();
            }
        };

        Page.init();
        //endregion
    })
})
