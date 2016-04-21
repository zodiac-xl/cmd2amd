import ReactDOM                     from 'react-dom';
import Button                       from 'react-bootstrap/lib/Button';

import Page, {page}                 from '../../../../components/layout/page-layout'
import MyTable                      from '../../../../components/common/my-table'
import PaginationAdvanced           from '../../../../components/common/pagination-advanced'
import SimpleModal                  from '../../../../components/common/simple-modal'
import URL                          from '../../../../components/util/url';

import NotesModal                   from '../../../../components/business/notes-form/notes-form'
import NegotiationModal             from '../../../../components/business/negotiation/negotiation'
import UploadFile                   from '../../../../components/business/negotiation/uploadFile'

import AddCinema                    from '../../../../components/business/addCinema'


import uniqid                       from 'uniqid';

@page
export default
class TaskDetail extends Page {

    static defaultProps = {
        backUrl: {
            href: "/bd/task/task_list",
            des: "返回任务列表"
        },
        taskId: URL.getUrlArg("id", unescape(location.search)),
        taskStatus: URL.getUrlArg("status", unescape(location.search))
    };


    state = (()=> {

        return {
            overviewTable: {
                data: {
                    ths: [],
                    trs: []
                },
                list: []
            },
            cinemasTable: {
                data: {
                    ths: ["影院ID", "影院名", "大区", "分区", "城市", "状态", "备注", "操作"],
                    trs: []
                },
                list: []
            },
            taskInfo: {},
            query: {}
        }

    })();


    operateNegotiation(cinemaId, cinemaName, operateType, type, auditType, committed) {
        let container = ReactDOM.findDOMNode(this.refs['container-negotiation']);
        let props = {
            operateType: operateType,
            type: type,//1-活动调价 2-常规 3-活动审核不需要调价
            auditType: auditType,//taskData.auditType == 1 ? "需要审核" : "不需要审核"
            committed: committed,
            freshParent: this.freshTable.bind(this),
            taskId: this.props.taskId,
            cinemaId: cinemaId,
            cinemaName: cinemaName,
            taskInfo: this.state.taskInfo
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <NegotiationModal  {...props}/>,
            container
        );
    }

    uploadFile(cinemaId, cinemaName) {
        let container = ReactDOM.findDOMNode(this.refs['container-upload']);
        let props = {
            taskId: this.props.taskId,
            cinemaId: cinemaId,
            cinemaName: cinemaName,
            taskInfo: this.state.taskInfo,
            freshParent: this.freshTable.bind(this)
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <UploadFile  {...props}/>,
            container
        );
    }

    addCinema() {
        let container = ReactDOM.findDOMNode(this.refs['container-addCinema']);
        let props = {
            taskId: this.props.taskId,
            freshParent: this.freshTable.bind(this)
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <AddCinema  {...props}/>,
            container
        );
    }

    operateNotes(cinemaId, operateType) {
        let container = ReactDOM.findDOMNode(this.refs['container-notes']);
        let props = {
            operateType: operateType,
            taskId: this.props.taskId,
            cinemaId: cinemaId,
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <NotesModal  {...props}/>,
            container
        );
    }


    componentWillMount() {
        let _this = this;
        this.setTaskInfoStateByPropsId();

    }

    componentDidMount() {
        this.initSubRegion();
    }

    getOverviewTableThs(auditType, type) {
        //auditType审核类型，1-需要审核，2-无需审核
        //type任务类型，1-无需调价，2-需要调价
        let ths;
        if (auditType == 2 && type == 2) {//无需审核 需调价
            ths = {
                "totalNum": "全部",
                "negotiating": "BD跟进中",
                "unAdjust": "待调价",
                "rejected": "被驳回",
                "adjusting": "调价中",
                "adjusted": "已完成调价"
            };
        } else if (auditType == 2 && type == 1) {//无需审核 无需调价
            ths = {
                "totalNum": "全部",
                "negotiating": "BD跟进中",
                "committed": "BD已提交"
            };
        } else if (auditType == 1 && type == 2) {//需审核 需调价
            ths = {
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
            ths = {
                "totalNum": "全部",
                "negotiating": "BD跟进中",
                "unAudit": "待OPT审核",
                "passed": "OPT已审核",
                "rejected": "被驳回"
            };
        }
        return ths;
    }

    setTaskInfoStateByPropsId() {
        let _this = this;
        let api = {
            url: `/api/activity/task/${_this.props.taskId}.json`,
            des: "获取任务信息",
            async: false
        };

        this.ajax(api).done(function (e) {
            if (e.data) {
                let newState = _this.state;
                let data = e.data;
                newState.taskInfo = {
                    taskId: data.id,
                    plan: data.plan,
                    timeRanges: data.timeRanges || [],
                    taskName: data.name,
                    movies: data.movies || [],
                    files: data.files || [],
                    feedbackContent: JSON.parse(data.feedbackContent) || [],
                    type: data.type,
                    auditType: data.auditType
                };
                newState.overviewTable.data.ths = _this.getOverviewTableThs(data.auditType, data.type);
                _this.setState(newState);
            }
        });
    }

    initSubRegion(orgId) {

        var url;
        var data = {};
        var bdId = window.User.userId;
        var $subRegion = $(ReactDOM.findDOMNode(this.refs['subRegion']));
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
        this.ajax({
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

    }

    queryHandler(query) {
        let _this = this;
        query = $.extend(_this.state.query, query || {});

        _this.setTableState(query).done(function (totalSize) {
            _this.setState({
                query: query
            })
            _this.refs.paginationAdvanced.onQuery(query, totalSize);
        });

    }

    statusQueryHandler(state) {
        this.queryHandler({state: state, offset: 0});
    }

    normalQueryHandler(status) {
        this.queryHandler({
            subId: this.refs.subRegion.value,
            cityName: this.refs.cityName.value,
            cinema: this.refs.cinema.value,
            offset: 0
        });
    }

    setTableState(query) {
        let defer = $.Deferred();
        let _this = this;
        let taskId = _this.props.taskId;
        let apiMap = {
            overviewTable: {
                url: `/api/activity/task/${taskId}/cinema/counts.json`,
                des: "获取任务详情状态总览列表",
                data: query
            },
            cinemasTable: {
                url: `/api/activity/task/${taskId}/cinemas.json`,
                des: "获取任务详情影院列表",
                data: query
            }
        };

        let overviewTableApi = apiMap["overviewTable"];
        let cinemasTableApi = apiMap["cinemasTable"];

        _this.ajax(overviewTableApi).done(function (e) {
            if (e.data) {
                let newState = _this.state;
                let data = e.data;
                newState.overviewTable.list = [data];
                _this.setState(newState);
            }
        });


        _this.ajax(cinemasTableApi).done(function (e) {
            if (e.data) {
                let newState = _this.state;
                let data = e.data;
                let totalSize = e.totalSize || 0;
                newState.cinemasTable.list = data;
                _this.setState(newState);
                defer.resolve(totalSize);
            }
        });
        return defer.promise();
    }

    freshTable() {
        this.queryHandler();
    }


    renderMain() {

        let _this = this;
        let taskStatus = _this.props.taskStatus;//任务状态 3为关闭
        let taskInfo = _this.state.taskInfo;
        let taskType = taskInfo.type; //任务类型 2为需要调价 1为不需要调价
        let auditType = taskInfo.auditType; //taskData.auditType == 1 ? "需要审核" : "不需要审核"


        let overviewTableData = _this.state.overviewTable.data;
        let cinemasTableData = _this.state.cinemasTable.data;
        overviewTableData.trs = [];
        cinemasTableData.trs = [];


        let stateMap = {
            totalNum: 0,
            negotiating: 1,
            unAudit: 2,
            passed: 4,
            rejected: 3,
            unAdjust: 5,
            adjusting: 6,
            adjusted: 7,
            committed: 8

        };
        $.each(_this.state.overviewTable.list, function (index, item) {
            let tr = {};
            $.each(Object.keys(_this.state.overviewTable.data.ths), function (i, key) {
                tr[key] = function () {
                    return <a style={{padding: "5px 20px",cursor: "pointer"}}
                              onClick={_this.statusQueryHandler.bind(_this,stateMap[key])}>{item[key]}</a>;
                };
            });
            overviewTableData.trs.push(tr);
        });

        $.each(_this.state.cinemasTable.list, function (index, item) {
            let tr = {
                cinemaId: item.cinemaId,
                cinemaName: item.cinemaName,
                regionName: item.regionName,
                subRegionName: item.subName,
                cityName: item.cityName,
                state: item.stateDesc,
                remark: function () {
                    if (taskStatus == 3) {
                        return <Button onClick={_this.operateNotes.bind(_this,item.cinemaId,"check")}>
                            查看备注</Button>;
                    } else {
                        return <div>
                            <Button onClick={_this.operateNotes.bind(_this,item.cinemaId,"add")}>添加备注
                            </Button>&nbsp;&nbsp;
                            <Button onClick={_this.operateNotes.bind(_this,item.cinemaId,"check")}>查看备注
                            </Button>
                        </div>;
                    }
                }
            };
            let committed = true;
            if (item.state == 1 || item.state == 3) {//1, "BD跟进中  3, "被驳回"
                committed = false;
            }

            if (taskStatus != 3) {//任务未关闭时
                if (taskType == 2) {//taskInfo.type 2为需要调价 1为不需要调价
                    tr.operate = function () {
                        if (item.state == 1 || item.state == 2 || item.state == 3 || item.state == 7 || (taskInfo.auditType == 2 && item.state == 5)) {//“BD跟进中” “待opt审核” “被驳回” “已完成调价” “不需要审核任务待调价” 时展示按钮
                            let btnText;
                            let operateType;
                            if (!item.hasFeedback) {
                                operateType = 'new';
                                btnText = "提交跟进结果"
                            } else {
                                operateType = 'edit';
                                btnText = "修改跟进结果"
                            }

                            return <Button
                                onClick={_this.operateNegotiation.bind(_this,item.cinemaId,item.cinemaName,operateType,1,auditType,committed)}>{btnText}</Button>;


                        } else if (item.state == 4 && taskInfo.auditType == 1) { //状态为“OPT已审核” 审核类型为1（需要审核） 时展示上传附件按钮按钮。

                            return <Button
                                onClick={_this.uploadFile.bind(_this,item.cinemaId,item.cinemaName)}>上传附件</Button>;

                        }
                    };
                } else {
                    let btnText = item.hasFeedback ? "修改跟进结果" : "提交跟进结果";
                    tr.operate = function () {
                        var btnText = item.hasFeedback ? "修改跟进结果" : "提交跟进结果";
                        let operateType = item.hasFeedback ? "edit" : "new";
                        return <Button
                            onClick={_this.operateNegotiation.bind(_this,item.cinemaId,item.cinemaName,operateType,3,auditType,committed)}>{btnText}</Button>;
                    };

                }
            } else {
                cinemasTableData.ths = cinemasTableData.ths.splice(0,7);
            }

            cinemasTableData.trs.push(tr);
        });


        return (

            <div>

                <p>
                    <a href={_this.props.backUrl.href}>
                        <Button>{_this.props.backUrl.des}</Button>
                    </a>
                </p>

                <div style={{width:"50%"}}>
                    <MyTable data={overviewTableData}></MyTable>
                </div>


                <div style={{textAlign:"right"}}>
                    <Button onClick={_this.addCinema.bind(this)} className='pull-left'>增加影院</Button>
                    分区：
                    <select className="sub-region" ref='subRegion' defaultValue='0'>
                        <option value="0">全部</option>
                    </select>
                    <span>城市: </span><input type="text" ref="cityName"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span>影院ID/影院名: </span><input type="text" ref="cinema"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={_this.normalQueryHandler.bind(this)}>查询</Button>
                </div>


                <br/>


                <MyTable data={cinemasTableData}></MyTable>

                <div className="pull-right">
                    <PaginationAdvanced onQueryHandler={_this.queryHandler.bind(_this)} ref='paginationAdvanced'/>
                </div>


                <div ref='container-negotiation'></div>

                <div ref='container-notes'></div>
                <div ref='container-upload'></div>
                <div ref='container-addCinema'></div>


            </div>
        )
    }


}







