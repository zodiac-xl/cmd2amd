require([
    "util/table",
    "util/pager",
    "util/common",
    "util/uploader"
], function (Table, Pager, Common, UpLoader) {
    var pager,
    hasPermission = true,
    taskApi = "/api/admin/activity/tasks.json",
    ajaxType = "POST",
    ajaxUrl = taskApi,
    tableData = {
        ths: ["任务ID", "任务名", "任务方案", "任务创建时间", "总影院数", "已处理影院数", "状态", "截止时间", "操作"]
    },
    $body = $("body"),
    $taskTemplate = $("#template-task"),
    taskTemplateHtml = $taskTemplate.get(0).outerHTML,
    $timeNodeForAdd = $(".J_node-time.first").clone().removeClass("first").find("button").text("删除").parent(),
    $label = $("<label class='label-movie m10 other' ><span class='nm'></span><span class='close-label-movie'>&nbsp;x&nbsp;</span></label>");


    var DataHandler = {
        getTaskData: function (taskId, success) {
            var options = {
                url: "/api/admin/activity/task/" + taskId + ".json",
                des: '获取任务列表'
            };
            Common.ajax(options).done(function (res) {
                success(res);
            });
        },
        getMovieSuggest: function (query, response) {
            var options = {
                url: "/api/movie/suggest.json?query=" + query,
                des: '获取电影推荐',
                bd: true
            };
            Common.ajax(options).done(function (e) {
                response(
                    $.map(e.data, function (item) {
                        return {
                            name: item.nm + " " + item.rt,
                            id: item.id,
                            nm: item.nm,
                            movie: item
                        }
                    })
                )
            })
        },
        getTrsData: function (data) {
            var trs = [];
            $(data).each(function (index, item) {
                var tr = {
                    id: item.id,
                    name: function ($td) {
                        $td.html("<a href='/admin/task/task_detail?id=" + item.id + "&status=" + item.state + "'>" + item.name + "</a>");
                    },
                    plan: item.plan,
                    created: item.created,
                    cinemaNum: item.cinemaNum,
                    processedCinemaNum: item.processedCinemaNum,
                    state: function ($td) {
                        $td.text(item.stateDesc).data("state", item.state);
                    },
                    endTime: item.endTime,
                    operate: function ($td) {
                        var checkBtn = "<button  class='J_btn-edit-task'>查看</button>";
                        var editBtn = "<button  class='J_btn-edit-task'>编辑</button>";
                        var closeBtn = "<button class='J_btn-close-task'>关闭</button>";
                        var deleteBtn = "<button class='J_btn-delete-task'>删除</button>";
                        if (item.state == 3) {
                            $td.append(checkBtn + deleteBtn);
                        } else {
                            $td.append(editBtn + closeBtn + deleteBtn);
                        }
                        $td.data("task", item);
                    }
                };
                trs.push(tr);
            });
            return trs;
        }

    };


    var UIHandler = {
        _validate: function ($template) {
            var _validate = true;

            //必选项字段名不为空时
            $template.find(".mustChoose").each(function (index, item) {
                var mustChooseNameIsNull = !$(this).val();
                $(this).parent().find(".option-mustChoose").toggleClass("unnecessary", mustChooseNameIsNull)
            });

            $template.find("[data-warn]:not(.unnecessary)").each(function (index, item) {
                //验空
                var $item = $(item);
                if ($item.val() == "") {
                    $item.focus();
                    toastr.warning($(item).data("warn"));
                    _validate = false;
                    return false;
                }
            });


            return _validate;
        },
        _addCinemaLabel: function (id, value, $parent, movie) {
            function addSingleLabel(id, value, movie) {
                var $newLabel = $label.clone();
                $newLabel.attr("data-id", id).find(".nm").text(value);
                $newLabel.data("movie", movie);
                $parent.find("br").before($newLabel);
            }

            if ($.type(id) == "array") {
                $parent = value;
                id.forEach(function (item, index) {
                    addSingleLabel(item.id, item.nm, item);
                });
            } else {
                addSingleLabel(id, value, movie);
            }
        },
        _getFormData: function ($template) {
            var formData = {},
            timeRanges = [],
            feedbackContent = {
                mustFill: [],
                mustChoose: [],
                notMustFill: []
            },
            files = [],
            movies = {isAll: true, other: []},
            otherMovieLabels = (".label-movie.other");

            //自动获取name字段
            $template.find("[name]").each(function (index, item) {
                if ($(item).attr('type') == "radio") {
                    formData[$(item).attr('name')] = $(item).filter(":checked").val();
                } else {
                    formData[$(item).attr('name')] = $(item).val();
                }

            });


            //附件
            $template.find(".attachment").each(function (index, item) {
                var id = $(item).data("id");
                files.push(id);
            });
            formData.files = files;

            //反馈
            $template.find(".mustFill").each(function (index, item) {
                var val = $(this).val();
                val && feedbackContent.mustFill.push(val);
            });
            $template.find(".notMustFill").each(function (index, item) {
                var val = $(this).val();
                val && feedbackContent.notMustFill.push(val);
            });
            $template.find(".mustChoose").each(function (index, item) {
                var val = $(this).val(),
                select = {};
                if (val) {
                    select[val] = [];
                    $(this).parent().find(".option-mustChoose").each(function (index, item) {
                        var option = $(this).val();
                        option && select[val].push(option);
                    });
                    feedbackContent.mustChoose.push(select);
                }
            });
            formData.feedbackContent = [feedbackContent];

            //任务类型为需要调价
            var needAdjustPrice = $template.type == 2 ? true : false;////任务类型，1-无需调价，2-调价任务
            if (needAdjustPrice) {

                ///影片
                if (otherMovieLabels.length > 0) {
                    movies.isAll = false;
                    $(".label-movie.other").each(function (index, item) {
                        movies.other.push($(this).data("movie"));
                    });
                }


                //时间段
                $template.find(".J_node-time").each(function (index, item) {
                    timeRanges.push({
                        startTime: $(item).find(".startTime-task").val(),
                        endTime: $(item).find(".endTime-task").val()
                    });

                });

                formData.movies = movies.other;

                formData.timeRanges = timeRanges;
            }

            formData.type = $template.type;
            return formData;
        },
        _initTaskHandle: function ($template) {
            var $movieSuggest = $template.find("#movieSuggest"),
            $cinemaAll = $template.find(".label-movie.all"),
            needAdjustPrice = true;


            //参与任务影片选择
            $movieSuggest.typeahead({
                source: function (query, process) {
                    DataHandler.getMovieSuggest(query, process);
                },
                matcher: function () {
                    return true;
                },
                afterSelect: function (item) {
                    var $_this = this.$element;
                    if ($_this.parent().find(".label-movie[data-id='" + item.id + "']").length > 0) {
                        toastr.warning("影片已经存在，请勿重复添加！");
                        $_this.val("");
                        return false;
                    }
                    UIHandler._addCinemaLabel(item.id, item.nm, $cinemaAll.parent(), item.movie);
                    $cinemaAll.hide();
                    $_this.val("");
                }
            });


            //删除影片
            $template.find(".wrap-labels").delegate(".label-movie.other", "click", function () {
                $(this).remove();
                if ($template.find(".label-movie.other").length == 0) {
                    $cinemaAll.show();
                }
            });

            //时间段选择
            $template.find(".nodes-time").delegate("button", "click", function () {
                var $timeNode = $(this).parent();
                //新增
                if ($timeNode.hasClass("first")) {
                    var $newNode = $timeNodeForAdd.clone();
                    $(".wrap-nodes-time").append($newNode);
                } else {//删除
                    $timeNode.remove();
                }
            });

            //上传文件
            //上传影院
            UpLoader({
                input: $template.find("input[accept='text/plain']"),
                type: "text",
                onload: function (e) {
                    var $fileIds = $('#fileIds');
                    var text = [];
                    $.each(e.target.result.split('\n'), function (index, item) {
                        var id = item.match(/\d+/g);
                        if (id != null) {
                            text.push(id);
                        }
                    });
                    $fileIds.val(text.join(",")).removeClass("hide");
                }
            });

            //上传附件
            UpLoader({
                input: $template.find("input[accept='*']"),
                ajax: {
                    success: function (res, input) {
                        var $parent = $template.find(".attachments");
                        Common.addAttachments({
                            files: [{
                                id: res.id,
                                name: res.name,
                                url: res.url
                            }],
                            parent: $parent
                        });
                    }
                }
            });

            $template.find(".btn-upload").click(function () {
                $(this).parent().find("input[type='file']").trigger("click");
            });

            $template.delegate(".J_btn-dele", "click", function () {
                $(this).parent().remove();
            });

            //时间段和bd反馈增加
            $template.delegate(".J_btn-add", "click", function () {
                var $tempParent = $(this).parent().parent(),
                $tem = $(this).parent().clone();
                $tem.find("input").val("");
                $tem.find(".J_btn-add:eq(0)").removeClass("J_btn-add").addClass("J_btn-dele").text("删除");
                $tempParent.append($tem.clone());
            });


            //任务类型切换
            $template.type = 2;
            $template.find("[name='type']").change(function (e) {
                var type = this.value;
                needAdjustPrice = type == 2 ? true : false;////任务类型，1-无需调价，2-调价任务
                $template.type = type;
                $template.find(".for-adjust-price").toggle(needAdjustPrice).find("[data-warn]").toggleClass("unnecessary", !needAdjustPrice);
            });
        },
        _renderTask: function ($template, res) {
            //回填
            var taskData = res.data,
            taskStatus = taskData.state,
            needAdjustPrice = taskData.type == 2 ? true : false;
            $template.type = taskData.type;

            //name自动匹配
            $template.find("[name]").each(function (index, item) {
                var key = $(item).attr('name');
                $(item).val(taskData[key]);
            });
            //附件
            Common.addAttachments({
                files: taskData.files,
                parent: $template.find(".attachments")
            });
            //反馈
            var feedbackContent = JSON.parse(taskData.feedbackContent);
            feedbackContent = feedbackContent[0] || {};
            $.each(Object.keys(feedbackContent), function (index, key) {
                var length = feedbackContent[key].length,
                $feddback = $template.find("." + key);
                if (length > 0) {
                    while (--length) {
                        $feddback.parent().find(".J_btn-add:eq(0)").trigger("click");
                    }
                }

            });
            $.each(feedbackContent["mustChoose"], function (index, select) {
                var mustChooseKey = Object.keys(select || "")[0],
                optionsLength = select[mustChooseKey] && (select[mustChooseKey].length - 1) || 0;
                if (optionsLength > 0) {
                    while (--optionsLength) {
                        $template.find(".mustChoose:eq(" + index + ")").parent().find(".J_btn-add:last-child").trigger("click");
                    }
                }

            });
            $.each(Object.keys(feedbackContent), function (index, key) {
                var $feddbacks = $template.find("." + key);
                switch (key) {
                    case "mustChoose":
                        $feddbacks.each(function (index, feedback) {
                            var select = feedbackContent[key][index],
                            mustChooseKey = Object.keys(select || "")[0];
                            if (mustChooseKey) {
                                var $feedback = $(feedback);
                                $feedback.val(mustChooseKey).parent().find(".option-mustChoose").each(function (i, option) {
                                    $(option).val(select[mustChooseKey][i] || "");
                                });
                            }
                        });
                        break;
                    case "mustFill":
                    case "notMustFill":
                        $feddbacks.each(function (index, feedback) {
                            $(feedback).val(feedbackContent[key][index] || "");
                        });
                        break;
                }
            });
            $template.find(".wrap-feedback button").hide().parent().addClass("disabled");

            //任务类型切换
            $template.find(".for-adjust-price").toggle(needAdjustPrice).find("[data-warn]").toggleClass("unnecessary", !needAdjustPrice);
            $template.find(".wrap-type").text(needAdjustPrice ? "需要调价" : "不需要调价");

            //审核类型切换
            $template.find(".wrap-auditType").text(taskData.auditType == 1 ? "需要审核" : "不需要审核");

            if (needAdjustPrice) {
                //时间段
                for (var i = 0; i < taskData.timeRanges.length; i++) {
                    if (i > 0) {
                        $template.find(".nodes-time button").trigger("click");
                    }
                }
                $template.find(".J_node-time").each(function (index, item) {
                    $(item).find(".startTime-task").val(taskData.timeRanges[index]["startTime"]);
                    $(item).find(".endTime-task").val(taskData.timeRanges[index]["endTime"]);
                });

                //影片
                if (taskData.movies.length > 0) {
                    var $cinemaAll = $template.find(".label-movie.all");
                    $cinemaAll.hide();
                    UIHandler._addCinemaLabel(taskData.movies, $cinemaAll.parent());
                    $template.find(".close-label-movie").hide();
                }

            }


            //上传文件不可修改
            $template.find(".wrap-file").remove();

            //参与影院不可修改
            $template.find("#movieSuggest").hide().parent().addClass("disabled");

            //任务时间段不可修改
            $template.find(".wrap-nodes-time button").hide().parent().addClass("disabled");
            //$template.find(".wrap-nodes-time input").addClass("disabled");

            //反馈不可修改
            $template.find(".wrap-feedback button").hide().parent().addClass("disabled");

            $template.find(".disabled,.disabled input").prop("disabled", true);

            //1：进行中 2：已完成 3：已关闭
            var buttons = true;
            title = "编辑任务";

            if (taskStatus == 2 || taskStatus == 3) {
                //截至时间不可修改
                $template.find("[name='endTime']").addClass("disabled");
                if (taskStatus == 3) {
                    $template.find("input,textarea").addClass("disabled").prop("disabled", true);
                    buttons = null;
                    title = "查看任务";
                }
            }
            return {
                buttons: buttons,
                title: title
            };
        },
        resetTaskTemplate: function () {
            var $newTemplate = $(taskTemplateHtml).clone();
            $taskTemplate.replaceWith($newTemplate);
            $taskTemplate = $newTemplate;
            UIHandler._initTaskHandle($newTemplate);
            return $newTemplate;
        },
        closeTask: function (taskId, taskName) {
            var $templateCloseTask = $("#template-close-task");

            if (!hasPermission) {
                toastr.warning("对不起，您没有权限进行此操作");
                return;
            }

            $templateCloseTask.data('taskId', taskId);

            if (!$templateCloseTask.hasClass('inited')) {
                var $submit = $templateCloseTask.find('.btn-submit');
                $templateCloseTask.find('.modal-title').text('关闭任务');
                $templateCloseTask.find(".name-task").text(taskName);

                $submit.click(function (e) {
                    $submit.button('loading');
                    var options = {
                        url: "/api/admin/activity/task/" + $templateCloseTask.data('taskId') + "/close.json",
                        type: "PUT",
                        des: '关闭任务',
                        data: $templateCloseTask.data('taskId')
                    };
                    Common.ajax(options).done(function (e) {
                        toastr.success(e.des);
                        $templateCloseTask.modal("hide");
                        pager.goPage(pager.currPage);
                    }).always(function () {
                        $submit.button('reset');
                    });
                });
                $templateCloseTask.addClass('inited');
            }

            $templateCloseTask.modal("show");
        },
        deleteTask: function (taskId) {
            var $templateDeleteTask = $("#template-delete-task");

            if (!hasPermission) {
                toastr.warning("对不起，您没有权限进行此操作");
                return;
            }

            $templateDeleteTask.data('taskId', taskId);
            if (!$templateDeleteTask.hasClass('inited')) {
                var $submit = $templateDeleteTask.find('.btn-submit');
                $templateDeleteTask.find('.modal-title').text('删除任务');
                $submit.click(function (e) {
                    $submit.button('loading');
                    Common.ajax({
                        url: "/api/admin/activity/task/" + $templateDeleteTask.data('taskId') + ".json",
                        type: "DELETE",
                        des: "删除任务",
                        dataType: "json",
                        data: $templateDeleteTask.data('taskId')
                    }).done(function (e) {
                        toastr.success(e.des);
                        $templateDeleteTask.modal("hide");
                        pager.goPage(pager.currPage);
                    }).always(function () {
                        $submit.button('reset');
                    });
                });
                $templateDeleteTask.addClass('inited');
            }

            $templateDeleteTask.modal("show");

        },
        editTask: function (taskId) {
            DataHandler.getTaskData(taskId, function (res) {
                var $template = UIHandler.resetTaskTemplate(),
                parsedData = UIHandler._renderTask($template, res);

                var $submit = $template.find('.btn-submit');
                $template.find('.modal-title').text(parsedData.title);
                !parsedData.buttons && $template.find('.modal-footer').hide();
                $submit.click(function (e) {
                    $submit.button('loading');
                    UIHandler.upDateTask($template).done(function () {
                        $template.modal("hide");
                    }).always(function () {
                        $submit.button('reset');
                    });
                });


                $template.on('hidden.bs.modal', function (event) {
                    $template.remove();
                });
                $template.modal("show");

            });
        },
        upDateTask: function ($template) {
            var defer = $.Deferred();
            var formData = {};

            if (UIHandler._validate($template)) {
                formData = UIHandler._getFormData($template);
                if (formData.id != 0) {//o为新建 非0为编辑
                    ajaxType = "PUT";
                    ajaxUrl = "/api/admin/activity/task/" + formData.id + ".json";
                }
                var des = formData.id == 0 ? '新建任务' : '编辑任务';
                Common.ajax({
                    url: ajaxUrl,
                    type: ajaxType,
                    des: des,
                    data: {content: JSON.stringify(formData)}
                }).done(function (res) {
                    var failedText = "";
                    if (res.data && res.data.failedCinemaIds && res.data.failedCinemaIds.length > 0) {
                        failedText = "，失败影院ID为：" + res.data.failedCinemaIds.join(",");
                    }
                    if (!failedText) {
                        toastr.success(res.des);
                        defer.resolve();
                        pager.goPage(pager.currPage);
                    } else {
                        defer.reject();
                        toastr.warning((res.message || des + '失败') + failedText);
                    }
                }).fail(function (e) {
                    defer.reject();
                })
            } else {
                defer.reject();
            }
            return defer.promise();
        }
    };

    var Page = {
        initTable: function () {
            var table = new Table($(".wrap-table"), "table-detail");
            pager = new Pager($(".J_pager"), "/api/admin/activity/tasks.json", function (e) {
                tableData.trs = DataHandler.getTrsData(e.data);
                table.init(tableData);
            }, function (e) {
                toastr.warning(e.message);
            });
            pager.initHandle();
            pager.goPage(1);
        },
        initEvent: function () {
            $(".J_btn-create-task").click(function () {
                var $template = UIHandler.resetTaskTemplate();
                var $submit = $template.find('.btn-submit');
                $submit.click(function (e) {
                    $submit.button('loading');
                    UIHandler.upDateTask($template).done(function () {
                        $template.modal("hide");
                    }).always(function () {
                        $submit.button('reset');
                    });
                });
                $template.find('.modal-title').text('新建任务');
                $template.on('hidden.bs.modal', function (event) {
                    $template.remove();
                });

                $template.modal("show");

            });

            $body.delegate(".J_btn-edit-task", "click", function () {
                var taskId = $(this).closest("td").data("task").id;
                UIHandler.editTask(taskId);
            });
            $body.delegate(".J_btn-close-task", "click", function () {
                var taskId = $(this).closest("td").data("task").id;
                var taskName = $(this).closest("td").data("task").name;
                UIHandler.closeTask(taskId, taskName);
            });
            $body.delegate(".J_btn-delete-task", "click", function () {
                var taskId = $(this).closest("td").data("task").id;
                UIHandler.deleteTask(taskId);
            });


        }
    };

    Page.initTable();
    Page.initEvent();
});






