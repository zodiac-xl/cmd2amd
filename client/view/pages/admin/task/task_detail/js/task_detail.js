require([
    "util/table",
    "util/pager",
    "util/common",
    "util/uploader",
    "util/url"
], function (Table, Pager, Common, UpLoader, URL) {

    var taskInfo = {},
    halls = null,
    taskId = URL.getUrlArg("id", location.search),
    taskStatus = URL.getUrlArg("status", location.search),//任务状态码 1：进行中 2：已完成 3：已关闭
    pager = null,
    $auditTaskDialog = null,
    overviewData = {},
    detailData = {
        ths: ["<input type='checkbox' name='checkAll'  class='J_checkAll'>", "影院ID", "影院名", "大区", "分区", "城市", "负责BD", "状态", "备注", "操作"]
    },
    $body = $("body"),
    $overviewTableWrap = $(".warp-table-overview"),
    overviewTable = new Table($overviewTableWrap, "table-overview"),
    detailTable = new Table($(".warp-table-detail"), "table-detail"),
    $fileIds = $('.J_ids-added'),
    $uploadInput = $(".J_input-upload"),
    $checkRemarkModal = $('#checkRemarkModal'),
    $checkRemarkTableWrap = $checkRemarkModal.find('.wrap-table'),
    simpleFeedbackTemp = '<div> <label ><span class="key-feedback"></span>：</label><span class="value-feedback"></span></div>',
    fileTemp = '<div class="file"> <a href="#" target="_blank" class="name"></a></div>';

    var DataHandler = {
        getTaskInfoById: function (success) {
            //获取任务信息  任务名 任务方案 任务时间
            if (!taskInfo.taskId) {
                var options = {
                    url: "/api/admin/activity/task/" + taskId + ".json",
                    async: false,
                    des: '获取编号为' + taskId + '的任务信息'
                };
                Common.ajax(options).done(function (e) {
                    var data = e.data;
                    taskInfo.taskId = data.id;
                    taskInfo.plan = data.plan;
                    taskInfo.timeRanges = data.timeRanges || [];
                    taskInfo.taskName = data.name;
                    taskInfo.movies = data.movies || [];
                    taskInfo.type = data.type;
                    taskInfo.files = data.files;
                    taskInfo.auditType = data.auditType;
                    success()
                })
            } else {
                success()
            }
        },
        exportExcel: function () {
            var options = {
                url: "/api/admin/activity/task/" + taskId + "/cinemas/xls",
                des: "导出影院列表"
            };
            Common.ajax(options).done(function (e) {
                toastr.success(e.des);
            });
        },
        getHalls: function (cinemaId, success) {
            var options = {
                url: "/api/admin/cinema/" + cinemaId + "/halls.json",
                async: false,
                des: '获取影厅'
            };
            Common.ajax(options).done(function (e) {
                e.data && success(e.data);
            });
        },
        auditTask: function (cinemaId, type, reason, success) {
            var options = {
                url: "/api/admin/activity/task/" + taskId + "/cinema/" + cinemaId + "/negotiationInfo/audit.json",
                type: "POST",
                data: {
                    type: type,
                    reason: reason,
                    modified: $auditTaskDialog.modified
                },
                des: '审核任务'
            };
            Common.ajax(options).done(function (e) {
                e.data && success(UIHandler._createDetailTableTrData(e.data));
            });
        },
        getRemarkData: function ($el, success) {
            var trs = [], notes = $el.data("note");
            $.each(notes, function (i, note) {
                trs.push({
                    noterAccount: note.noterAccount,
                    noteTime: note.noteTime,
                    content: note.content
                });
            });
            success({
                ths: ["添加人", "添加时间", "添加内容"],
                trs: trs
            });
        },
        deleCinema: function (cinemaIds) {
            var defer = $.Deferred();
            var options = {
                url: "/api/admin/activity/task/" + taskId + "/cinemas.json?cinemaIds=" + cinemaIds.join(","),
                type: "DELETE",
                des: '删除影院'
            };
            Common.ajax(options).done(function (e) {
                defer.resolve(e);
            }).fail(function (e) {
                defer.reject(e);
            });
            return defer.promise();
        },
        addCinema: function (cinemaIds) {
            var defer = $.Deferred();
            var options = {
                url: "/api/admin/activity/task/" + taskId + "/cinemas.json",
                type: "POST",
                dataType: "json",
                data: {cinemaIds: cinemaIds},
                des: "追加影院" + cinemaIds
            };
            Common.ajax(options).done(function (res) {
                var failedText = "";
                if (res.data && res.data.failedCinemaIds && res.data.failedCinemaIds.length > 0) {
                    failedText = "，添加失败影院ID为：" + res.data.failedCinemaIds.join(",");
                }
                if (!failedText) {
                    toastr.success(res.message);
                    defer.resolve(res);
                } else {
                    toastr.warning(res.message + failedText);
                    defer.reject(res);
                }
            }).fail(function (e) {
                defer.reject(e);
            });
            return defer.promise();
        },
        getCinemas: function (cinemaIds, success) {
            Common.ajax({
                url: "/api/admin/cinema/cinemas.json?cinemaIds=" + cinemaIds,
                type: "GET",
                dataType: "json",
                des: '获取影院'
            }).done(function (e) {
                if (e.data) {
                    var cinemasData = [];
                    $.each(e.data, function (index, item) {
                        cinemasData.push({
                            cinemaId: item.id,
                            cinemaName: item.cinemaName,
                            regionName: item.regionName,
                            cityName: item.cityName,
                            operate: function ($td) {
                                $td.append("<button class='J_btn-dele-showed-cinema btn btn-default'>删除</button>");
                            }
                        })
                    });
                    success(cinemasData);
                }
            });
        },
        getNegotiationInfo: function ($el, success) {
            Common.ajax({
                url: "/api/admin/activity/task/" + taskId + "/cinema/" + $el.data("cinemaId") + "/negotiationInfo.json",
                type: "GET",
                dataType: "json",
                des: '获取审核信息'
            }).done(function (e) {
                e.data && success(e.data);
            });
        },
        getOverviewData: function (query, success) {
            var url = "/api/admin/activity/cinema/counts.json?taskId=" + taskId;
            query = query || {};
            Common.ajax({
                url: URL.addQueryStringArg(url, query),
                type: "get",
                dataType: "json",
                des: '获取总览表格'
            }).done(function (e) {
                var tr = {
                    totalNum: function ($td) {
                        $td.data("status", 0).html("<a>" + e.data.totalNum + "</a>");
                    },
                    negotiating: function ($td) {
                        $td.data("status", 1).html("<a>" + e.data.negotiating + "</a>");
                    },
                    committed: function ($td) {
                        $td.data("status", 8).html("<a>" + e.data.committed + "</a>");
                    },
                    unAudit: function ($td) {
                        $td.data("status", 2).html("<a>" + e.data.unAudit + "</a>");
                    },
                    passed: function ($td) {
                        $td.data("status", 4).html("<a>" + e.data.passed + "</a>");
                    },
                    rejected: function ($td) {
                        $td.data("status", 3).html("<a>" + e.data.rejected + "</a>");
                    },
                    unAdjust: function ($td) {
                        $td.data("status", 5).html("<a>" + e.data.unAdjust + "</a>");
                    },
                    adjusting: function ($td) {
                        $td.data("status", 6).html("<a>" + e.data.adjusting + "</a>");
                    },
                    adjusted: function ($td) {
                        $td.data("status", 7).html("<a>" + e.data.adjusted + "</a>");
                    }
                };
                var newTr = {};
                $.each(overviewData.ths, function (key, value) {
                    newTr[key] = tr[key];
                });
                overviewData.trs = [newTr];
                success(overviewData);
            });
        },
        upDateDetailData: function (data) {
            detailData.trs = [];

            $(data).each(function (index, item) {
                var tr = UIHandler._createDetailTableTrData(item);
                detailData.trs.push(tr);
            });
        },
        updateTaskInfo: function ($el) {
            taskInfo.cinemaId = $el.data("cinemaId");
            taskInfo.cinemaName = $el.data("cinemaName");
        }

    };

    var UIHandler = {
        _createDetailTableTrData: function (item) {
            return {
                check: "<input type='checkbox' name='checkSingle'>",
                cinemaId: function ($td) {
                    $td.text(item.cinemaId);
                    item.addByBd && $td.addClass("text-danger");
                },
                cinemaName: item.cinemaName,
                regionName: item.regionName,
                subRegionName: item.subName,
                cityName: item.cityName,
                bdName: item.bdName,
                state: function ($td) {
                    $td.text(item.stateDesc).data("state", item.state);
                },
                remark: function ($td) {
                    $td.html("<button class='J_btn-check-remark btn btn-default'>查看备注</button>");
                    $td.find(".J_btn-check-remark").data("note", item.note);
                },
                operate: function ($td) {
                    //a.审核类型为1（需要审核）b.任务未关闭时 c.影院状态为3待OPT审核  to有操作项
                    if (taskInfo.auditType == 1 && taskStatus != 3 && item.state == 2) {
                        $td.data("addByBd", item.addByBd);
                        $td.html("<button  class='J_btn-audit btn btn-default' data-cinema-id='" + item.cinemaId + "' data-cinema-name='" + item.cinemaName + "'>审核任务</button>");
                    } else {
                        $td.html("");
                    }
                }
            };
        },

        _makeSimpleFeedbackGroups: function (orginFeedbackContent, $feedBacks) {
            //保证执行顺序
            if ($.isArray(orginFeedbackContent)) {
                orginFeedbackContent = orginFeedbackContent[0] || {};
            }
            var feedbackContent = {
                mustFill: orginFeedbackContent.mustFill,
                mustChoose: orginFeedbackContent.mustChoose,
                notMustFill: orginFeedbackContent.notMustFill
            };

            $.each(Object.keys(feedbackContent), function (index, key) {
                var goup = feedbackContent[key];
                if ($.isArray(goup)) {
                    goup = goup[0];
                }
                $.each(goup, function (feedbackKey, feedbackValue) {
                    var $temp = $(simpleFeedbackTemp);
                    $temp.find(".key-feedback").text(feedbackKey);
                    $temp.find(".value-feedback").text(feedbackValue);
                    $feedBacks.append($temp);
                });
            });
        },
        _makePriceAdjustContents: function (priceAdjustContents, $wrap) {
            var table = new Table($wrap);
            if (priceAdjustContents.length == 0) {
                return;
            }
            var tableData = {
                ths: [
                    '序号',
                    '影厅',
                    '版本',
                    '影片',
                    '时段',
                    '进价类型',
                    '售价类型',
                    '限价保护'
                ],
                trs: []
            };

            var showTypeMap = ['所有版本', '2D', 'IMAX2D', '3D', 'IMAX3D', '4D', '巨幕2D', '巨幕3D'];

            $.each(priceAdjustContents, function (i, item) {

                var timeRanges = item.timeRanges.map(function (timeRange) {
                    var weekDays = timeRange.weekDays;
                    var weekDaysMap = ['一', '二', '三', '四', '五', '六', '七']
                    var weekDays2 = ("0000000" + parseInt(weekDays).toString(2)).slice(-7);
                    var activeDays = [];
                    for (var i = 0; i < 7; i++) {
                        if (weekDays2[i] == 1) {
                            activeDays.push(String(i));
                        }
                    }
                    activeDays = activeDays.map(function (key) {
                        return weekDaysMap[key]
                    }).join('/');

                    return timeRange.startDate + '至' + timeRange.endDate + " " + timeRange.startTime + '至' + timeRange.endTime + ' ' + activeDays;
                }).join("<br/>");

                var halls = item.halls.map(function (hall) {
                    return hall.name;
                });

                var movies;
                if (item.movies.data.length == 0) {
                    movies = item.movies.inverse ? '其他' : '全部';
                } else {
                    movies = item.movies.data.map(function (movie) {
                        return "《" + movie.nm + "》";
                    }).join("<br/>")
                }


                var buyDes = '';
                var price = item.purchasePrice.price;
                var discount = item.purchasePrice.discount;
                switch (item.purchasePrice.type * 1) {
                    case 1:
                        buyDes = '最低限价:+' + price;
                        break;
                    case 2:
                        buyDes = '协定价:' + price;
                        break;
                    case 3:
                        buyDes = '折扣价:' + discount + "% + " + price;
                        break;
                }
                //"type": 3,    //进价类型，1-最低限价+N，2-协定价，3-折扣价

                tableData.trs.push({
                    index: tableData.trs.length + 1,
                    halls: halls.join('\\'),
                    showType: showTypeMap[item.purchasePrice.showType * 1],
                    movies: movies,
                    timeRange: timeRanges,
                    buyDes: buyDes,
                    saleDes: '加价3',
                    priceLimit: item.priceLimit ? '是' : '否'
                })
            })
            table.init(tableData);

        },


        initAuditTaskDialog: function ($el) {

            $auditTaskDialog && $auditTaskDialog.remove();
            $auditTaskDialog = $("#template-audit-task").clone();

            var $reject = $auditTaskDialog.find(".reject"),
            $lastReject = $auditTaskDialog.find(".reject-last"),
            $note = $auditTaskDialog.find(".note"),
            priceTable = new Table($auditTaskDialog.find(".wrap-table")),
            cinemaId = $el.data("cinemaId"),
            $tr = $el.closest("tr");

            DataHandler.updateTaskInfo($el);

            //匹配 影院id 影院名 任务名 任务方案 任务时间
            $auditTaskDialog.find("[data-text]").each(function (index, item) {
                var key = $(item).data("text");
                if (taskInfo[key]) {
                    var text = taskInfo[key];
                    if (key == 'cinemaId' && $el.closest("td").data("addByBd")) {
                        text += "<span class='text-danger'>（BD添加）</span>"
                    }
                    $(item).html(text);
                }
            });

            if (taskInfo.type != 2) {//无需调价
                $auditTaskDialog.find(".group-movies-task").hide();
                $auditTaskDialog.find(".files").parent().find("label").text("附件：");

            }

            //附件
            $auditTaskDialog.find(".wrap-attachments").toggleClass("hide", !(taskInfo.files.length > 0));
            Common.addAttachments({
                files: taskInfo.files,
                parent: $auditTaskDialog.find(".attachments"),
                dele: false
            });


            if (taskInfo.timeRanges.length == 0) {
                $auditTaskDialog.find(".timeRanges").parent().hide();
            }
            $.each(taskInfo.timeRanges, function (index, timeRange) {
                $auditTaskDialog.find(".timeRanges").append("<div class='timeRange'>" + timeRange.startTime + "--" + timeRange.endTime + "</div>")
            });

            if (taskInfo.movies.length > 0) {
                var movieNames = [];
                $.each(taskInfo.movies, function (i, movie) {
                    movieNames.push(movie.nm);
                });
                $auditTaskDialog.find(".movies-task").text(movieNames.join("，"));
            }

            DataHandler.getNegotiationInfo($el, function (data) {

                $auditTaskDialog.modified = data.modified;

                // //_makeSimpleFeedbackGroups
                var feedbackContent = JSON.parse(data.feedbackContent) || {};
                UIHandler._makeSimpleFeedbackGroups(feedbackContent, $auditTaskDialog.find(".feedbacks"));

                UIHandler._makePriceAdjustContents(data.priceAdjustContents || [], $auditTaskDialog.find(".wrap-pricePlans"));


                //驳回
                if (data.auditInfo && (data.auditInfo.type == 22 || data.auditInfo.type == 21)) {
                    var lastRejectLabel;
                    if (data.auditInfo.type == 21) {
                        lastRejectLabel = "上次OPT驳回原因：";
                    } else {
                        lastRejectLabel = "上次Price驳回原因：";
                    }
                    $lastReject.find("label").text(lastRejectLabel);
                    $lastReject.find(".reason").text(data.auditInfo.reason);
                    $lastReject.show();
                }

                if (!data.priceInfos || data.priceInfos.length == 0) {
                    $auditTaskDialog.find(".wrap-table").prev().hide();
                } else {
                    priceTable.init(UIHandler._trimPriceInfos(data.priceInfos, cinemaId));
                }

                if (data.files && data.files.length > 0) {
                    UIHandler._addFiles($auditTaskDialog, data.files);
                }

                if (data.note) {
                    $note.find("span").text(data.note);
                } else {
                    $note.hide();
                }


                var $template = $auditTaskDialog;
                var $submitBtn = $template.find('.btn-submit');
                var $rejectBtn = $template.find('.btn-reject');

                $template.find('.modal-title').text('审核任务');
                $submitBtn.click(function (e) {
                    $submitBtn.button('loading');

                    if (confirm('确认审核通过吗？')) {
                        $reject.addClass("hide");
                        type = 11;//11：OPT通过，12：Price通过，21：OPT驳回，22Price驳回
                        DataHandler.auditTask(cinemaId, type, "", function (data) {
                            detailTable.updateTr($tr, data);
                            $submitBtn.button('reset');
                            $template.modal("hide");
                        });
                    } else {
                        $submitBtn.button('reset');
                    }
                });
                $rejectBtn.click(function (e) {
                    if ($reject.hasClass("hide")) {
                        $reject.removeClass("hide");
                        $reject.focus();
                        $(e.target).text("确认驳回").prev().hide();
                    } else {
                        var reason = $reject.find("textarea").val();
                        if (/\S+/.test(reason)) {
                            $rejectBtn.button('loading');
                            var type = 21;//11：OPT通过，12：Price通过，21：OPT驳回，22Price驳回
                            DataHandler.auditTask(cinemaId, type, reason, function (data) {
                                $rejectBtn.button('reset');
                                $template.modal("hide");
                                detailTable.updateTr($tr, data)
                            });

                        } else {
                            toastr.warning("请输入驳回原因");
                        }
                    }
                });


                $template.on('show.bs.modal', function (event) {

                });

                $template.modal("show");
            });

        },
        _addFiles: function ($modal, data, isImage) {

            $.each(data, function (index, item) {
                var $file = $(fileTemp),
                isImage = false,
                url = item.url;

                if (/.(png|jpg|jpeg)/.test(item.name)) {
                    isImage = true;
                }
                if (!isImage) {
                    $file.find("a").attr("target", "_self");
                }
                $file.data("file", item);
                $file.find(".name").text(item.name).attr("href", url);
                $modal.find(".files").append($file);
            });
        },
        _trimPriceText: function (hall, special) {
            var text,
            purchaseType = hall.purchaseType,
            purchasePrice = hall.purchasePrice,
            classifiedPurchasePrice = hall.classifiedPurchasePrice;
            switch (Number(purchaseType)) {
                case 0:
                    text = "不参加活动";
                    break;
                case 1:
                    text = "最低限价+" + purchasePrice;
                    break;
                case 2:
                    text = "协定价：" + purchasePrice;
                    break;
                case 3:
                    text = "折扣价：" + purchasePrice * 100 + "%";
                    break;
                case 4:
                    classifiedPurchasePrice = classifiedPurchasePrice.split(",");
                    text = {
                        "2D": classifiedPurchasePrice[0],
                        "3D": classifiedPurchasePrice[1]
                    };
                    if (special) {
                        switch (Number(hall.hall.type)) {//影厅类型，1-普通厅，2-IMAX厅，3-DMAX厅，4-4D厅
                            case 1:
                                break;
                            case 2:
                                text["IMAX2D"] = classifiedPurchasePrice[2];
                                text["IMAX3D"] = classifiedPurchasePrice[3];
                                break;
                            case 3:
                                text["巨幕2D"] = classifiedPurchasePrice[2];
                                text["巨幕3D"] = classifiedPurchasePrice[3];
                                break;
                            case 4:
                                text["4D"] = classifiedPurchasePrice[2];
                                break;
                        }
                    }
                    break;
            }
            return text;
        },
        _trimPriceInfos: function (priceInfos, cinemaId) {
            var priceData = {
                ths: [""],
                trs: []
            },
            movies = [],
            movieName;

            //初始table的影厅 getHalls方法同步调用 不用维护callbacks嵌套了
            DataHandler.getHalls(cinemaId, function (data) {
                $.each(data, function (index, item) {
                    priceData["trs"][index] = priceData["trs"][index] || {};
                    priceData["trs"][index]["name-room"] = item.name;
                });

                $.each(priceInfos, function (index, priceInfo) {
                    var movie = {},
                    prices = [];
                    $.each(priceInfo.movies, function (index, movie) {
                        priceInfo.movies[index] = movie;
                    });

                    //组合电影名
                    if (priceInfo.movies.length == 0) {
                        if (priceInfos.length == 1) {
                            movieName = "全部影片";
                        } else {
                            movieName = "其它影片";
                        }
                    } else {
                        var movieNames = [];
                        $.each(priceInfo.movies, function (index, item) {
                            movieNames.push("《" + item.nm + "》");
                        });
                        movieName = movieNames.join("<br/>");
                    }
                    movie.name = movieName;
                    movie.priceLimit = priceInfo.priceLimit;

                    //获取普通价格
                    if (priceInfo.halls && priceInfo.halls.length > 0) {
                        var text;

                        text = UIHandler._trimPriceText(priceInfo);
                        $.each(priceInfo.halls, function (index, item) {
                            prices.push({
                                name: item.name,
                                text: text
                            });
                        });
                    }
                    //获取特殊价格
                    if (priceInfo.specialHalls && priceInfo.specialHalls.length > 0) {
                        $.each(priceInfo.specialHalls, function (index, hall) {
                            var specialPrice,
                            text,
                            isSpecial = true;

                            text = UIHandler._trimPriceText(hall, isSpecial);
                            specialPrice = {
                                name: hall.hall.name,
                                text: text
                            };
                            prices.push(specialPrice);
                        });
                    }
                    movie.prices = prices;
                    movies.push(movie);
                });

                $.each(movies, function (index, item) {

                    $.each(priceData["trs"], function (i) {
                        priceData["trs"][i]["price" + index] = "";
                    });

                    priceData["ths"][index + 1] = item.name + "<br/>" + (item.priceLimit ? "有" : "无") + "限价保护";

                    $.each(item.prices, function (index2, price) {
                        var text = "";
                        if ($.isPlainObject(price.text)) {
                            $.map(price.text, function (value, key) {
                                text += key + ":" + value + "<br/>";
                            });
                        } else {
                            text = price.text;
                        }
                        $.each(priceData["trs"], function (i, tr) {
                            if (tr["name-room"] == price.name) {
                                priceData["trs"][i]["price" + index] = text;
                                return false;
                            }
                        });

                    })
                });
            });

            return priceData;
        },
        checkAll: function (el) {
            $("input[name='checkSingle']").each(function (index, item) {
                item.checked = el.checked;
            });
        },
        deleCinema: function () {
            var cinemaIds = [];
            $("input[name='checkSingle']:checked").each(function (index, item) {
                cinemaIds.push($(item).parent().parent().find(".cinemaId").text());
            });
            if (cinemaIds.length == 0) {
                toastr.warning("请选择想删除的影院");
                return;
            }
            var $template = $("#template-dele-cinema");
            var $submit = $template.find('.btn-submit');

            $template.data('cinemaIds', cinemaIds);
            if (!$template.hasClass('inited')) {
                $template.find('.modal-title').text('删除影院');
                $submit.click(function (e) {
                    $submit.button('loading');
                    DataHandler.deleCinema($template.data('cinemaIds')).done(function () {
                        $template.modal("hide");
                        UIHandler.getOverviewTable();
                        pager.goPage(pager.currPage);
                    }).always(function () {
                        $submit.button('reset');
                    })

                });
                $template.addClass('inited');
            }
            $template.modal("show");

        },
        addCinema: function () {

            var $template = $("#template-add-cinema");
            var $submit = $template.find('.btn-submit');


            if (!$template.hasClass('inited')) {
                $template.find('.modal-title').text('追加影院');
                $template.on('show.bs.modal', function (event) {
                    $fileIds.val('');
                    $("#table-cinema-added tbody").html("");
                });
                $submit.click(function (e) {

                    var cinemaIds = $fileIds.val();
                    if (cinemaIds == "") {
                        toastr.warning("请导入影院id");
                        $fileIds.focus();
                        return;
                    }
                    $submit.button('loading');
                    DataHandler.addCinema(cinemaIds).done(function () {
                        $template.modal("hide");
                        UIHandler.getOverviewTable();
                        pager.goPage(pager.currPage);
                    }).always(function () {
                        $submit.button('reset');
                    })
                });
                $template.addClass('inited');
            }


            $template.modal("show");

        },
        showCinemas: function () {
            var cinemaIds = $fileIds.val();
            if (cinemaIds == "") {
                toastr.warning("请导入影院id");
                $fileIds.focus();
                return;
            }
            DataHandler.getCinemas(cinemaIds, function (cinemasData) {
                var $addedCinemaTableBody = $("#table-cinema-added tbody").html(""),
                addedCinemaTable = new Table();

                addedCinemaTable.appendTrs(cinemasData, $addedCinemaTableBody);
            });
        },
        checkRemark: function ($el) {
            var checkRemarkTable = new Table($checkRemarkTableWrap);
            var $template = $checkRemarkModal;


            $template.find('.modal-title').text('查看备注');
            DataHandler.getRemarkData($el, function (data) {
                checkRemarkTable.init(data);
            });

            $template.modal("show");
        },
        setOverviewTableThs: function () {
            //审核类型，1-需要审核，2-无需审核
            //任务类型，1-无需调价，2-需要调价
            if (taskInfo.auditType == 2 && taskInfo.type == 2) {//无需审核 需调价
                overviewData.ths = {
                    "totalNum": "全部",
                    "negotiating": "BD跟进中",
                    "unAdjust": "待调价",
                    "rejected": "被驳回",
                    "adjusting": "调价中",
                    "adjusted": "已完成调价"
                };
            } else if (taskInfo.auditType == 2 && taskInfo.type == 1) {//无需审核 无需调价
                overviewData.ths = {
                    "totalNum": "全部",
                    "negotiating": "BD跟进中",
                    "committed": "BD已提交"
                };
            } else if (taskInfo.auditType == 1 && taskInfo.type == 2) {//需审核 需调价
                overviewData.ths = {
                    "totalNum": "全部",
                    "negotiating": "BD跟进中",
                    "unAudit": "待OPT审核",
                    "passed": "OPT已审核",
                    "rejected": "被驳回",
                    "unAdjust": "待调价",
                    "adjusting": "调价中",
                    "adjusted": "已完成调价"
                };
            } else {//需审核 无需调价
                overviewData.ths = {
                    "totalNum": "全部",
                    "negotiating": "BD跟进中",
                    "unAudit": "待OPT审核",
                    "passed": "OPT已审核",
                    "rejected": "被驳回"
                };
            }
        },
        getOverviewTable: function (query) {

            DataHandler.getOverviewData(query, function (overviewData) {
                overviewTable.init(overviewData);
                overviewTable.query = query;
            });
        },
        getDetailTable: function (data) {
            DataHandler.upDateDetailData(data);
            detailTable.init(detailData);
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

            //选择全部
            $body.delegate(".J_checkAll", "click", function () {
                UIHandler.checkAll(this);
            });

            //删除影院
            $(".J_btn-dele-cinema").click(function () {
                UIHandler.deleCinema()
            });

            //追加影院
            $(".J_btn-add-cinema").click(function () {
                UIHandler.addCinema()
            });


            //导出影院
            $(".J_btn-export-excel").click(function () {
                DataHandler.exportExcel();
            });

            //查看备注
            $body.delegate(".J_btn-check-remark", "click", function () {
                UIHandler.checkRemark($(this));
            });

            //上传文件 追加影院
            $uploadInput.on("change", function () {
                var reader = new FileReader(),
                inputFile = $(this)[0];

                reader.onload = function (e) {
                    var text = [];
                    $.each(e.target.result.split('\n'), function (index, item) {
                        var id = item.match(/\d+/g);
                        if (id != null) {
                            text.push(id);
                        }
                    });
                    $fileIds.val(text.join(",")).removeClass("hide");
                };
                if (inputFile.files[0]) {
                    reader.readAsText(inputFile.files[0]);
                } else {
                    toastr.warning('请先选择导入文件！');
                }
            });
            $(".J_btn-upload").click(function () {
                $uploadInput.trigger("click");
            });


            //展示要追加的影院
            $(".J_btn-show-cinemas").click(function () {
                UIHandler.showCinemas();
            });

            //删除待添加的影院
            $body.delegate(".J_btn-dele-showed-cinema", "click", function () {
                var newIds = [],
                $table = $(this).parent().parent().parent();
                $(this).parent().parent().remove();
                $table.find(".cinemaId").each(function (index, item) {
                    newIds.push($(item).text());
                });
                $fileIds.val(newIds.join(","));
            });

            //审核
            $body.delegate(".J_btn-audit", "click", function () {
                UIHandler.initAuditTaskDialog($(this));
            });

            //大区 城市查询 影院查询
            $(".J_btn-query").click(function () {
                var query = {
                    regionId: $(".region").val(),
                    subId: $(".sub-region").val(),
                    cityName: $(".city").val(),
                    cinema: $(".cinemaId").val()
                };
                pager.query = query;
                pager.goPage(1);
                UIHandler.getOverviewTable(query);
            });

            $(".region").on("change", function (e) {
                Page.initSubRegion($(e.target).val())
            });

            //综合表单点击查询
            $overviewTableWrap.delegate("td", "click", function () {
                pager.query = $.extend({
                    state: $(this).data("status")
                }, overviewTable.query);
                pager.goPage(1);
            });

        },
        initTable: function () {


            UIHandler.getOverviewTable();
            pager = new Pager($(".J_pager"), "/api/admin/activity/task/" + taskId + "/cinemas.json", function (e) {
                UIHandler.getDetailTable(e.data);
            }, function (e) {
                toastr.warning(e.message);
            });

            var defaultState;
            if (taskInfo.auditType == 2) {//无需审核任务应默认筛选状态“全部”
                defaultState = 0;
            } else {
                defaultState = 2;
            }
            pager.query = {
                state: defaultState
            };
            pager.initHandle();
            pager.goPage(1);
        },
        init: function () {
            Page.initRegion();
            //region 任务关闭后 不可删除和追加影院
            if (taskStatus == 3) {
                $(".btn-dele").hide();
                $(".btn-add").hide();
            }
            DataHandler.getTaskInfoById(function () {
                UIHandler.setOverviewTableThs();
                Page.initTable();
                Page.initEvent();
            });

        }
    };
    Page.init();
})











