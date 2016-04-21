require([
    "util/table",
    "util/common",
    "util/url"

], function (Table, Common, URL) {

    var parentId = URL.getUrlArg("parentId", location.search) || 0,
    grandparentId = URL.getUrlArg("grandparentId", location.search) || 0,
    tableWrap = $(".wrap-table"),
    pageTypes = {
        region: {
            regionName: "大区",
            jobTitle: "大区经理",
            parent: null,
            child: "subregion"
        },
        subregion: {
            regionName: "分区",
            jobTitle: "分区经理",
            parent: "region",
            child: "city"
        },
        city: {
            regionName: "城市",
            jobTitle: "BD",
            parent: "subregion",
            child: null
        }
    },
    regionName,
    jobTitle,
    pageType,
    mainTable = new Table(tableWrap, "main-table"),
    tableData,
    addRegionBtn,
    deleRegionBtn,
    editRegionBtn,
    moveRegionBtn,
    addMisBtn,
    deleMisBtn,
    $label = $("<label class='label-user' ><span class='nm'></span><span class='close-label-user'>&nbsp;x&nbsp;</span></label>");

    pageType = location.pathname.match(/[^\/.#?]{2,}$/)[0];
    regionName = pageTypes[pageType].regionName;
    jobTitle = pageTypes[pageType].jobTitle;

    tableData = {
        ths: [regionName, "区域操作", jobTitle, "BD操作"]
    };
    addRegionBtn = "<button class='btn-add-region btn btn-default'>增加" + regionName + "</button>";
    deleRegionBtn = "<button class='btn-dele-region btn btn-default'>删除" + regionName + "</button>";
    editRegionBtn = "<button class='btn-edit-region btn btn-default'>编辑" + regionName + "</button>";
    moveRegionBtn = "<button class='btn-move-region btn btn-default'>移动" + regionName + "</button>";
    addMisBtn = "<button class='btn-add-mis btn btn-default'>增加" + jobTitle + "</button>";
    deleMisBtn = "<button class='btn-dele-mis btn btn-default'>删除" + jobTitle + "</button>";

    $("input.mis").attr("placeholder", "填写mis账号，进行模糊搜索");
    var $J_backToParent = $(".J_backToParent");

    var backToParentUrL = $J_backToParent.attr("href");
    if (backToParentUrL) {
        backToParentUrL = URL.addQueryStringArg(backToParentUrL, {
            parentId: grandparentId,
            parentName: URL.getUrlArg("grandparentName", location.search) || "",
            parentUserName: URL.getUrlArg("grandparentUserName", location.search) || ""
        });
    }

    $J_backToParent.attr("href", backToParentUrL);

    $(".nav-grandparent").html(URL.getUrlArg("grandparentName", location.search) + (URL.getUrlArg("grandparentUserName", location.search) ? ("(" + URL.getUrlArg("grandparentUserName", location.search) + ")") : ""));
    $(".nav-parent").html(URL.getUrlArg("parentName", location.search) + (URL.getUrlArg("parentUserName", location.search) ? ("(" + URL.getUrlArg("parentUserName", location.search) + ")") : ""));

    $(".wrap-btns").append(addRegionBtn);


    var DataHandler = {
        getTableData: function () {
            var dtd = $.Deferred();
            Common.ajax({
                url: "/api/admin/org/" + parentId + ".json?descendants=1&users=true",
                type: "GET",
                des: '获取组织列表',
                dataType: "json"
            }).done(function (e) {
                var trs = [];
                $.each(e.data.descendants, function (i, item) {

                    if (!item.users || item.users.length == 0) {
                        item.users = [{
                            "userId": "",
                            "key": "",
                            "name": ""
                        }];
                    }
                    $.each(item.users, function (index, user) {
                        trs.push({
                            id: item.id,
                            name: item.name,
                            userId: user.userId,
                            userKey: user.key,
                            userName: user.name
                        });
                    });

                });
                dtd.resolve(trs);
            }).fail(function (e) {
                dtd.reject(e);
            });
            return dtd.promise();
        },
        addRegion: function (name, userIds) {
            var dtd = $.Deferred();
            var org_type;
            switch (pageType) {
                case 'region':
                    org_type = 1;
                    break;
                case 'subregion':
                    org_type = 2;
                    break;
                case 'city':
                    org_type = 3;
                    break;
            }
            Common.ajax({
                url: "/api/admin/org/orgs.json",
                type: "POST",
                des: '添加',
                dataType: "json",
                data: {
                    parentId: parentId,
                    name: name,
                    org_type: org_type
                }
            }).done(function (e) {
                if (userIds.length > 0) {
                    var orgId = e.data.id;
                    DataHandler.addMis(orgId, userIds).done(function (e) {
                        dtd.resolve(e);
                    })
                } else {
                    dtd.resolve(e);
                }
            }).fail(function (e) {
                dtd.reject(e);
            });

            dtd.resolve();
            return dtd.promise();
        },
        moveRegion: function (orgId, parentId) {
            var dtd = $.Deferred();
            Common.ajax({
                url: "/api/admin/org/" + orgId + ".json",
                type: "PUT",
                des: '移动',
                dataType: "json",
                data: {
                    parentId: parentId,
                }
            }).done(function (e) {
                dtd.resolve(e);
            }).fail(function (e) {
                dtd.reject(e);
            });
            return dtd.promise();
        },
        editRegion: function (name, orgId) {
            var dtd = $.Deferred();
            Common.ajax({
                url: "/api/admin/org/" + orgId + ".json",
                type: "PUT",
                des: '编辑',
                dataType: "json",
                data: {
                    parentId: parentId,
                    name: name
                }
            }).done(function (e) {
                dtd.resolve(e);
            }).fail(function (e) {
                dtd.reject(e);
            });
            return dtd.promise();
        },
        deleRegion: function (orgId) {
            var dtd = $.Deferred();
            Common.ajax({
                url: "/api/admin/org/" + orgId + ".json",
                type: "DELETE",
                des: '删除',
                dataType: "json"
            }).done(function (e) {
                dtd.resolve(e);
            }).fail(function (e) {
                dtd.reject(e);
            });
            return dtd.promise();
        },
        addMis: function (orgId, userIds) {
            var dtd = $.Deferred();
            Common.ajax({
                url: "/api/admin/org/" + orgId + "/users.json",
                type: "POST",
                des: '添加',
                data: {
                    userIds: JSON.stringify(userIds)
                },
                dataType: "json"
            }).done(function (e) {
                dtd.resolve(e);
            }).fail(function (e) {
                dtd.reject(e);
            });
            return dtd.promise();
        },
        deleMis: function (orgId, userId) {
            var dtd = $.Deferred();
            Common.ajax({
                url: "/api/admin/org/" + orgId + "/user/" + userId + ".json",
                type: "DELETE",
                des: '删除',
                dataType: "json"
            }).done(function (e) {
                dtd.resolve(e);
            }).fail(function (e) {
                dtd.reject(e);
            });
            return dtd.promise();
        },
        getUsersSuggest: function (userLogin, response) {
            Common.ajax({
                url: "/api/admin/user/login/" + userLogin + ".json",
                type: "get",
                des: '获取推荐',
                dataType: "json"
            }).done(function (e) {
                response(
                    $.map(e.data, function (item) {
                        return {
                            id: item.userId,
                            name: item.name + "(" + item.key + ")"
                        }
                    })
                )
            })
        },
        getRegionSuggest: function (query, response, hasParentId) {
            var orgLevel;
            switch (pageType) {
                case 'subregion':
                    orgLevel = 1;
                    break;
                case 'city':
                    orgLevel = 2;
                    break;
            }
            var url = '/api/admin/org/searchCity.json';
            if (hasParentId) {
                url = '/api/admin/org/search.json'
            }

            Common.ajax({
                url: url,
                type: "get",
                data: {
                    currentOrgId: parentId, //当前大区 id 或分区 id
                    orgLevel: orgLevel,
                    name: query,
                },
                des: '获取推荐',
                dataType: "json"
            }).done(function (e) {
                response(
                    e.data
                )
            })
        }
    };

    var UIHandler = {
        mergeTrs: function (trs) {
            var length = trs.length;
            $.each(trs, function (i, tr) {
                var $tr = $(tr),
                $region = $tr.find(".region"),
                $regionOperate = $tr.find(".regionOperate"),
                rowspan = $region.attr("rowspan") || 1;
                if (i == 0) {
                    $region.attr("rowspan", rowspan + length - 1);
                    $regionOperate.attr("rowspan", rowspan + length - 1);
                } else {
                    $region.remove();
                    $regionOperate.remove();
                }
            });
        },
        mergeSameRegion: function ($table) {
            var $regions = $table.find(".region"),
            trs = {};
            $regions.each(function (index, item) {
                var regionId = $(item).data("id");
                trs[regionId] = trs[regionId] || [];
                trs[regionId].push($(item).closest("tr"));
            });

            $.map(trs, function (value, key) {
                UIHandler.mergeTrs(value)
            })
        },


        getTrs: function (data) {
            var trs = [];
            $.each(data, function (index, item) {
                var mis = "";
                if (item.userName) {
                    mis = item.userName + (item.userKey ? "(" + item.userKey + ")" : "");
                }
                trs.push({
                    region: function ($td) {
                        var child = pageTypes[pageType].child;
                        $td.data("id", item.id);
                        if (child) {
                            var url = "/admin/org-manage/" + child;
                            url = URL.addQueryStringArg(url, {
                                parentId: item.id,
                                grandparentId: parentId,
                                parentName: item.name,
                                parentUserName: item.userName,
                                grandparentName: URL.getUrlArg("parentName", location.search) || "",
                                grandparentUserName: URL.getUrlArg("parentUserName", location.search) || ""
                            });

                            $td.html("<a href='" + url + "'>" + item.name + "</a>")

                        } else {
                            $td.html(item.name)
                        }
                    },
                    regionOperate: function ($td) {
                        var btns;
                        switch (pageType) {
                            case 'region':
                                btns = addMisBtn + editRegionBtn + deleRegionBtn;
                                break;
                            case 'subregion':
                                btns = addMisBtn + editRegionBtn + moveRegionBtn + deleRegionBtn;
                                break;
                            case 'city':
                                btns = addMisBtn + editRegionBtn + moveRegionBtn + deleRegionBtn;
                                break;
                        }
                        $td.html(btns);
                        $td.data("tr", item);
                    },
                    mis: mis,
                    misOperate: function ($td) {
                        $td.html(deleMisBtn);
                        $td.data("tr", item);
                    }
                });
            });
            return trs;
        },
        getTable: function (trsData) {
            if (mainTable.hasInitializedTable) {
                mainTable.updateTrs(trsData);
            } else {
                tableData.trs = trsData;
                mainTable.init(tableData);
                mainTable.hasInitializedTable = true;
            }

        },
        _addUserLabel: function (id, nm, $parent) {
            var $newLabel = $label.clone();
            $newLabel.attr("data-id", id).find(".nm").text(nm);
            $parent.append($newLabel);
        }
    };


    var Page = {
        initEvent: function () {
            var $body = $("body");
            var $addRegionModal = $("#add-region");
            var $moveRegionModal = $("#move-region");
            var $editRegionModal = $("#edit-region");
            var $deleRegionModal = $("#dele-region");
            var $addMisModal = $("#add-mis");
            //负责人模糊搜索
            $("input.mis").typeahead({
                source: function (query, process) {
                    DataHandler.getUsersSuggest(query, process);
                },
                matcher: function () {
                    return true;
                },
                afterSelect: function (item) {
                    var $_this = this.$element;
                    var $parent = $_this.parent().find(".wrap-labels");
                    $_this.val("");
                    if ($parent.find(".label-user[data-id='" + item.id + "']").length > 0) {
                        toastr.warning("负责人已经存在，请勿重复添加！");
                        return false;
                    }
                    UIHandler._addUserLabel(item.id, item.name, $parent);
                }
            });


            if (pageType == 'city') {
                //城市模糊搜索
                $addRegionModal.find("input.name").typeahead({
                    source: function (query, process) {
                        DataHandler.getRegionSuggest(query, process);
                    },
                    matcher: function () {
                        return true;
                    },
                    afterSelect: function (item) {
                        var $_this = this.$element;
                    }
                });
                //城市模糊搜索
                $editRegionModal.find("input.name").typeahead({
                    source: function (query, process) {
                        DataHandler.getRegionSuggest(query, process);
                    },
                    matcher: function () {
                        return true;
                    },
                    afterSelect: function (item) {
                        var $_this = this.$element;
                    }
                });

            }


            //区域模糊搜索
            $("input.parentId").typeahead({
                source: function (query, process) {
                    var hasParentId = true;
                    DataHandler.getRegionSuggest(query, process, hasParentId);
                },
                matcher: function () {
                    return true;
                },
                afterSelect: function (item) {
                    var $_this = this.$element;
                    $_this.data('id', item.id);
                }
            });


            //删除负责人Label
            $body.delegate(".label-user", "click", function () {
                $(this).remove();
            });


            $body.delegate(".btn-add-region", "click", function () {
                $addRegionModal.find(".modal-title").text('增加' + regionName);
                $addRegionModal.find(".label-user").remove();
                $addRegionModal.find("input").val("");
                $addRegionModal.modal('show');
            });
            $addRegionModal.delegate(".btn-submit", "click", function () {
                var $this = $addRegionModal,
                $name = $this.find(".name"),
                name = $name.val(),
                userIds = [];
                $this.find(".label-user").each(function (i, item) {
                    userIds.push($(item).data("id"));
                });
                if (!name) {
                    toastr.warning("请填写" + regionName + "名");
                    $name.focus();
                    return;
                } else if (pageType == 'city' && name != $addRegionModal.find("input.name").data('active')) {
                    toastr.warning('增加城市需要输入城市名进行模糊搜索，选择suggestion项，否则无法提交');
                    $name.focus();
                    return;
                }
                DataHandler.addRegion(name, userIds).done(function () {
                    $addRegionModal.modal('hide');
                    setTimeout(function () {
                        Page.initTable();
                    }, 1000);

                });
            });


            $body.delegate(".btn-move-region", "click", function () {
                var tr = $(this).closest("td").data("tr");
                $moveRegionModal.find(".modal-title").text('移动' + regionName);
                $moveRegionModal.find(".name").text(tr.name)
                $moveRegionModal.orgId = tr.id;
                $moveRegionModal.name = tr.name;
                $moveRegionModal.find("input").val("");
                $moveRegionModal.modal('show');
            });
            $moveRegionModal.delegate(".btn-submit", "click", function () {
                var $this = $moveRegionModal,
                $parentId = $this.find('.parentId'),
                parentId = $parentId.data('id');
                if (!parentId) {
                    toastr.warning("请填写移动目的地");
                    $parentId.focus();
                    return;
                }
                DataHandler.moveRegion($moveRegionModal.orgId, parentId).done(function () {
                    $this.modal('hide');
                    setTimeout(function () {
                        Page.initTable();
                    }, 1000);

                });
            });


            $body.delegate(".btn-edit-region", "click", function () {
                var tr = $(this).closest("td").data("tr");
                $editRegionModal.find(".modal-title").text('编辑' + regionName);
                $editRegionModal.find(".name").val(tr.name);
                $editRegionModal.orgId = tr.id;
                $editRegionModal.modal('show');
            });
            $editRegionModal.delegate(".btn-submit", "click", function () {
                var $this = $editRegionModal,
                $name = $this.find(".name"),
                name = $name.val();
                if (!name) {
                    toastr.warning("请填写" + regionName + "名");
                    $name.focus();
                    return;
                } else if (pageType == 'city' && name != $editRegionModal.find("input.name").data('active')) {
                    toastr.warning('修改城市需要输入城市名进行模糊搜索，选择suggestion项，否则无法提交');
                    $name.focus();
                    return;
                }
                DataHandler.editRegion(name, $editRegionModal.orgId).done(function () {
                    $this.modal('hide');
                    setTimeout(function () {
                        Page.initTable();
                    }, 1000);

                });
            });


            $body.delegate(".btn-dele-region", "click", function () {
                var tr = $(this).closest("td").data("tr");
                $deleRegionModal.find(".modal-title").text('删除' + regionName);
                $deleRegionModal.find(".region").text(tr.name);
                $deleRegionModal.find(".id").val(tr.id);
                $deleRegionModal.modal('show');
            });
            $deleRegionModal.delegate(".btn-submit", "click", function () {
                DataHandler.deleRegion($deleRegionModal.find('.id').val()).done(function () {
                    $deleRegionModal.modal('hide');
                    setTimeout(function () {
                        Page.initTable();
                    }, 1000);
                });
            });


            $body.delegate(".btn-add-mis", "click", function () {
                var tr = $(this).closest("td").data("tr");
                $addMisModal.find(".modal-title").text('增加' + jobTitle);
                $addMisModal.find(".id").val(tr.id);
                $addMisModal.find(".label-user").remove();
                $addMisModal.find(".region").text(tr.name);
                $addMisModal.find(".mis").val("");
                $addMisModal.modal('show');
            });
            $addMisModal.delegate(".btn-submit", "click", function () {
                var userIds = [];
                $addMisModal.find(".label-user").each(function (i, item) {
                    userIds.push($(item).data("id"));
                });
                if (userIds.length == 0) {
                    toastr.warning("请填写" + jobTitle);
                    $addMisModal.find(".mis").focus();
                    return;
                } else {
                    DataHandler.addMis($addMisModal.find(".id").val(), userIds).done(function () {
                        $addMisModal.modal('hide');
                        setTimeout(function () {
                            Page.initTable();
                        }, 1000);
                    });
                }
            });

            var $deleMisModal = $("#dele-mis");
            $body.delegate(".btn-dele-mis", "click", function () {
                var tr = $(this).closest("td").data("tr"),
                userId = tr.userId,
                orgId = tr.id;
                $deleMisModal.find(".modal-title").text('删除' + jobTitle);
                $deleMisModal.orgId = orgId;
                $deleMisModal.userId = userId;
                if (!userId) {
                    toastr.warning("没有" + jobTitle + "，无法删除");
                    return;
                }
                $deleMisModal.find(".mis").text(tr.userName + "(" + tr.userKey + ")");
                $deleMisModal.modal('show');
            });
            $deleMisModal.delegate(".btn-submit", "click", function () {
                DataHandler.deleMis($deleMisModal.orgId, $deleMisModal.userId).done(function () {
                    $deleMisModal.modal('hide');
                    setTimeout(function () {
                        Page.initTable();
                    }, 1000);
                });
            });

        },
        initTable: function () {
            DataHandler.getTableData().done(function (trs) {
                var trsData = UIHandler.getTrs(trs);
                UIHandler.getTable(trsData);
                UIHandler.mergeSameRegion(mainTable.table);
            });
        },
        init: function () {
            Page.initTable();
            Page.initEvent();
        }
    };
    Page.init();
});













