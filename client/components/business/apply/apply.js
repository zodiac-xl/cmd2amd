import React,{addons,Component} from 'react';
import ReactDOM                 from 'react-dom';



import RadioGroup               from 'react-simple-radio-group';
import NestLinkedStateMixin     from 'react-nest-link-state';
import equal                    from 'deep-equal';



//children
import Button                   from 'react-bootstrap/lib/Button';
import Modal                    from 'react-bootstrap/lib/Modal';
import Table                    from 'react-bootstrap/lib/Table';
import {Group,Left,Right,Hr}    from '../../common/form-group';
import Attachments              from '../../common/attachments';
import MyTable                  from '../../common/my-table'

import CinemaActivity           from './types/cinema-activity';
import Cinemas                  from './fregments/cinemas';

import CommonFormData           from '../common-formData/common-formData';
import myConfirm                from '../../common/myConfirm';
//custom util
import bdAjax                   from '../../util/bdAjax';
import '../../util/dateformat.js';

import Negotiation              from '../../../components/business/negotiation/negotiation'

let update = addons.update;
export default class Apply extends Component {


    static defaultProps = {
        applyId: null,
        applyType: 1,
        versionType: 1,//1-新流程 2-老流程
        operateType: "new",
        checkAndEdit:false,//查看时是否显示修改按钮
        cinemaId: "",
        cinemaName: ""
    };

    state = this.getState();


    getState() {

        let modalTitle;
        let remarkLabel;
        switch (this.props.operateType) {
            case "new":
                modalTitle = "新建申请";
                remarkLabel = "BD申请备注：";
                break;
            case "edit":
                modalTitle = "修改申请";
                remarkLabel = "BD申请备注：";
                break;
            case "audit-bd1st":
                modalTitle = "审核申请";
                remarkLabel = "BD一审备注：";
                break;
            case "audit-bd2nt":
                modalTitle = "审核申请";
                remarkLabel = "BD二审备注：";
                break;
            case "audit-opt":
                modalTitle = "审核申请";
                remarkLabel = "opt审核备注：";
                break;
            case "offline":
                modalTitle = "查看申请";
                remarkLabel = "下线备注：";
                break;
            case "online":
                modalTitle = "查看申请";
                remarkLabel = "上线备注：";
                break;
            case "check":
                modalTitle = "查看申请";
                break;
        }


        let custom;
        if (this.props.applyType == 1) {
            let cinemas = [];
            if (this.props.cinemaId && this.props.cinemaName) {
                cinemas = [
                    {
                        id: this.props.cinemaId,
                        name: this.props.cinemaName
                    }
                ]
            }
            custom = {
                //单影院活动申请特有字段 *表示必填
                "cinemas": cinemas,
                "startTime": "",                      //活动开始时间*
                "endTime": "",                        //活动结束时间*
                "cost": 0,                              //成本，浮点数，单位"元"* number  0为不限制
                "info": {
                    "form": "票补",//*包括“票补”、“第三方补贴”、“服务费减免”，默认为“票补”。
                    "showTime": [
                        {
                            "startDate": "",//*2015-10-01
                            "endDate": "",//*2015-11-01
                            "startTime": "00:00:00",//*08:00:00
                            "endTime": "23:59:59"//*10:00:00
                        }
                    ],
                    "movies": {// 影片信息，全部影片则data为空json数组{"inverse":false, "data":[]}    ***new
                        "inverse": false,//是否反选
                        "data": [//影片列表
                        ]
                    },
                    "totalLimit": 0, //总量限制* number  不限为0
                    "userLimit": 2, //每人限量* number 不限为0 默认为“限制 2 张“
                    "dailyLimit": { //每天限量*  不限为{}           ***edit
                        dateArr: [],//辅助字段
                        "startTime": "11:00:00",
                        "cost": [ //每天成本限制，不限为[]
                        ],
                        "num": [ //每天张数限制，不限为[]
                        ],
                        "user": 2 //每人每天限量，不限为0
                    },
                    "settleLimit": false, //结算价限量                                            ***new
                    "subsidyRules": [{//*补贴规则
                        "version": 0, //版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，例如1111110=126表示除2D外所有版本。全部用0表示
                        "rules": [
                            {
                                "maxSettle": '',
                                "minSettle": '',
                                "type": 1,  //1-每张补贴，2-一口价，3-服务费
                                "price": ''
                            }
                        ],
                        "additional": ""
                    }],
                    "saleDate": {//*结算价降价日期  rule:2015-01-01
                        "start": "",
                        "end": ""
                    }
                }

            }
        }

        return {

            isLoading: false,
            showModal: true,

            //结算价是否已经调整
            priceAdjusted: 0,

            //影院基本信息
            cinemasDetail: [],

            //影院价格信息
            cinemasPriceDetail: [],

            //必选字段
            type: this.props.applyType, //申请类型
            applyId: null,//新建时为空
            content: "",//
            common: {
                //公共字段，所有申请类型都要填写
                "formData": null,//自定义表单
                "files": [                                            //文件详情列表，没有文件则为空json数组[]
                ],
                "remark": []

            },
            custom: custom,

            //中间 工具字段
            lastReject: null,
            mustChooseOptionsMap: {},
            otherRemark: [],
            myRemark: {
                content: ""
            },
            remarkLabel: remarkLabel,
            rejectBtnText: "驳回",
            modalTitle: modalTitle
        };
    }

    nestLinkedState = NestLinkedStateMixin.nestLinkedState;


    forMatInfo(info) {

        //"dailyLimit": [ //不限为[]
        //    {
        //        "date": "2015-01-01",
        //        "startTime": "11:00:00",
        //        "cost": 20000.0, //每天成本限制，不限为0
        //        "num": 100 //每天张数限制,不限为0
        //    }
        //],
        //    "userDailyLimit": 2 //每人每天限量，不限为0
        //"settleLimit": true, //结算价限量

        //"dailyLimit": { //每天限量*  不限为{}           ***edit
        //    "startTime": "11:00:00",
        //        "cost": [ limit: "2", date: "2016-01-25
        //    ],
        //        "num": [ //每天张数限制，不限为[limit:0]
        //    ],
        //        "user": 2 //每人每天限量，不限为0
        //},
        let dailyLimit = info.dailyLimit;
        let dateArr = [];
        info.dailyLimit = {};
        if (dailyLimit.length > 0) {
            info.dailyLimit = {
                startTime: dailyLimit[0].startTime,
                cost: [],
                num: [],
                user: info.userDailyLimit
            };
            dailyLimit.forEach(function (item) {
                if (item.cost > 0) { //只要一个大于0 就表明需要限制 所有都大于0
                    info.dailyLimit.cost.push({
                        limit: item.cost,
                        date: item.date
                    });
                }

                if (item.num > 0) { //只要一个大于0 就表明需要限制 所有都大于0
                    info.dailyLimit.num.push({
                        limit: item.num,
                        date: item.date
                    })
                }

                dateArr.push(item.date);
            })
        }
        info.dailyLimit.dateArr = dateArr;
        return info;
    }

    unFormatInfo(info) {
        let dailyLimit = info.dailyLimit;
        info.dailyLimit = [];
        dailyLimit.dateArr.forEach(function (item, i) {
            info.dailyLimit.push({
                date: item,
                startTime: dailyLimit.startTime,
                cost: dailyLimit.cost[i] && dailyLimit.cost[i].limit || 0,
                num: dailyLimit.num[i] && dailyLimit.num[i].limit || 0
            });
        })
        info.userDailyLimit = dailyLimit.user || 0;
        delete dailyLimit.dateArr;
        return info;
    }

    componentWillMount() {
        let _this = this;
        let operateType = _this.props.operateType;
        //获取申请数据回填
        if (operateType != "new") {
            let newState = this.state;
            let applyId = this.props.applyId;


            bdAjax({
                url: "/api/apply/" + applyId + ".json",
                data: {
                    type: this.props.versionType
                },
                async: false,
                des: this.props.operateType + "申请"
            }).done(function (e) {
                let data = e.data;
                let common = {
                    formData: data.formData,
                    files: data.files,
                    remark: data.remark
                };


                let custom = {
                    cinemas: data.cinemas,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    cost: data.cost,
                    info: _this.forMatInfo(data.info)
                };
                newState.priceApplies = data.priceApplies || [];


                newState.lastReject = data.lastReject || null;

                newState.modified = data.modified || null;

                newState.common = common;
                newState.custom = custom;
            });


            newState.applyId = this.props.applyId;
            newState.otherRemark = newState.common.remark;
            this.setState(newState);
        }


    }

    componentDidMount() {
        let operateType = this.props.operateType;
        if (operateType == 'online' || operateType == 'check') {
            this.getCinemaDetail();
            this.getCinemaPriceDetail();
        }
    }

    getCinemaDetail() {
        let _this = this;
        let cinemas = _this.state.custom.cinemas;
        let cinemaIds = [];
        cinemas.forEach(function (item) {
            cinemaIds.push(item.id);
        })
        cinemaIds = cinemaIds.join(',');
        bdAjax({
            url: "/api/cinema/cinemas.json?cinemaIds=" + cinemaIds,
            des: '获取影院基本信息'
        }).done(function (e) {
            if (e.data) {
                _this.setState({
                    cinemasDetail: e.data
                });
            }
        })
    }

    getCinemaPriceDetail() {
        let _this = this;
        let cinemas = _this.state.custom.cinemas;
        let cinemaIds = [];
        cinemas.forEach(function (item) {
            cinemaIds.push(item.id);
        })
        bdAjax({
            url: "/api/cinema/price.json",
            data: {
                cinemaIds: JSON.stringify(cinemaIds)
            },
            bd: true,
            des: '获取影院价格信息'
        }).done(function (e) {
            if (e.data) {
                _this.setState({
                    cinemasPriceDetail: e.data
                });
            }
        })
    }

    getTableData() {
        let _this = this;
        let cinemasDetail = _this.state.cinemasDetail;
        let cinemasPriceDetail = _this.state.cinemasPriceDetail;
        let priceApplies = _this.state.priceApplies

        //影院和关联的调价申请表
        let tableData = {
            ths: ['影院ID', '影院名称', '城市', '售票系统', '备注', '调价申请ID', '调价状态', '操作'],
            trs: []
        };

        let isSettleByCinemaMap = {};
        cinemasPriceDetail.forEach(function (item) {
            isSettleByCinemaMap[item.cinemaId] = item.isSettleByCinema;
        })
        $.each(cinemasDetail, function (index, item) {
            let applys = [];
            if (priceApplies && priceApplies.length > 0) {
                priceApplies.forEach(function (apply) {
                    if (apply.cinemaId == item.id) {
                        applys.push({
                            applyId: apply.id,
                            applyStatus: function ($td) {
                                return <a href={`/bd/apply/adjust_price?cinemaId=${apply.cinemaId}`}
                                          target='_blank'>{apply.statusDesc}</a>;
                            }
                        });
                    }
                })
            }

            if (applys.length == 0) {
                applys = [{
                    applyId: '',
                    applyStatus: ''
                }]
            }
            tableData.trs.push({
                cinemaId: item.id,
                cinemaName: item.cinemaName,
                cityName: item.cityName,
                sellSrcDesc: item.sellSrcDesc || '',
                remark: isSettleByCinemaMap[item.id] ? '需联系影院完成调价' : '',
                apply: applys,
                operate: function ($td) {

                    let href = "/bd/cinema_detail?";
                    href = href + escape("cinemaId=" + item.id + "&cinemaName=" +
                            item.cinemaName + "&city=" + item.cityName + "&sellSrcDesc=" + (item.sellSrcDesc || ''));

                    let checkBtn = <Button onClick={function(){
                                         window.open(href);
                                    }}>查看结算价</Button>;
                    let newApplyBtn = <Button
                        onClick={_this.negotiation.bind(_this,item,'new')}>新建调价申请</Button>;

                    if (_this.state.priceAdjusted == 1 || _this.props.operateType == 'check') {
                        newApplyBtn = '';
                    }
                    return <div>
                        {checkBtn}
                        {newApplyBtn}
                    </div>;
                }
            })
        });
        return tableData;


    }

    negotiation(data, operateType) {
        let _this = this;
        let container = ReactDOM.findDOMNode(this.refs['container-negotiation']);
        let props = {
            type: 2,//1-活动调价 2-常规
            operateType: operateType,
            cinemaId: data.id,
            cinemaName: data.cinemaName,
            scaaId: this.props.applyId,
            freshParent: function (e) {
                let newState = _this.state;
                newState.priceApplies.push({
                    "cinemaId": data.id,
                    "id": e.data.id,
                    "statusDesc": '待调价'
                })
                _this.setState(newState);
            }
        };

        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <Negotiation  {...props}/>,
            container
        );
    }


    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    validate() {
        if (!this.refs.cinemas.validate()) {
            return false;
        }
        if (!this.refs.cinemaActivityFrom.validate()) {
            return false;
        }
        if (!this.refs.commonForm.validate()) {
            return false;
        }
        return true;
    }

    operateApply(operateType) {
        let _this = this;
        let remarkType;
        let applyId = _this.state.applyId;
        let applyType = _this.props.applyType;

        let freshTable = window.freshTable || function () {
            }; //局部更新table


        if (operateType == "new" || operateType == "edit") {

            if (!_this.validate()) {
                return false;
            }

            remarkType = 3;//备注类型：1-BD一审,2-BD二审,3-BD申请

            let content = {};


            //merge basic info
            $.extend(content, {
                applyId: applyId
            });


            let common = $.extend(true, {}, _this.state.common);

            //merge remark
            let remark = _this.state.otherRemark;
            if (_this.state.myRemark.content) {
                let myRemark = {
                    content: _this.state.myRemark.content,
                    user: window.User.misId,
                    type: remarkType,
                    time: new Date().Format("yyyy-MM-dd hh:mm:ss")
                };
                remark = update(remark, {$push: [myRemark]});
            }
            common.remark = remark;

            //fill fileIds
            common.fileIds = [];
            common.files && common.files.forEach(function (item) {
                common.fileIds.push(item.id);
            });

            //merge content
            $.extend(content, common);
            let customData = $.extend(true, {}, _this.state.custom);

            if (customData.info) {
                customData.info = _this.unFormatInfo(customData.info);
            }
            $.extend(content, customData);
            content.startTime = `${content.startTime}`; //活动开始时间 手动加上00:00:00 for java默认为00:00:00
            content.endTime = new Date(content.endTime).Format('yyyy-MM-dd') + ` 23:59:59`;//活动结束时间 手动加上 23:59:59  for java默认为00:00:00

            if (operateType == "new") {//新建或修改后自动提交审核
                bdAjax({
                    url: "/api/apply/applies.json",
                    type: "POST",
                    dataType: "json",
                    data: {
                        type: applyType,
                        content: JSON.stringify(content)
                    },
                    des: operateType + "申请"
                }).done(function (e) {
                    let applyId = e.data.id;
                    bdAjax({
                        url: "/api/apply/" + applyId + ".json",
                        type: "POST",
                        dataType: "json",
                        data: {
                            type: applyType
                        },
                        showSuccess: true,
                        des: "提交审核" + "申请"
                    }).done(function (e) {
                        freshTable();
                        _this.close();
                    }).always(function () {
                        _this.setState({
                            isLoading: false
                        });
                    })
                }).fail(function () {
                    _this.setState({
                        isLoading: false
                    });
                })
            }
            else {
                bdAjax({
                    url: "/api/apply/" + applyId + ".json",
                    type: "PUT",
                    dataType: "json",
                    showSuccess: true,
                    data: {
                        type: applyType,
                        content: JSON.stringify(content)
                    },
                    des: operateType + "申请"
                }).done(function (e) {
                    let applyId = e.data.id;
                    bdAjax({
                        url: "/api/apply/" + applyId + ".json",
                        type: "POST",
                        dataType: "json",
                        data: {
                            type: applyType
                        },
                        des: "提交审核" + "申请"
                    }).done(function (e) {
                        _this.close();
                        freshTable();
                    }).always(function () {
                        _this.setState({
                            isLoading: false
                        });
                    });
                }).fail(function () {
                    _this.setState({
                        isLoading: false
                    });
                })
            }

        }
        else if (operateType == "reject" || operateType == "approve") {
            let approved = operateType == "approve";
            let reason = _this.state.myRemark.content;

            //merge remark
            if (_this.props.operateType == "audit-bd2nt") {
                remarkType = 2;
            } else if (_this.props.operateType == "audit-bd1st") {
                remarkType = 1;
            }
            //备注类型：1-BD一审,2-BD二审,3-BD申请

            let remark = _this.state.otherRemark;
            if (_this.state.myRemark.content) {
                let myRemark = {
                    content: _this.state.myRemark.content,
                    user: window.User.misId,
                    type: remarkType,
                    time: new Date().Format("yyyy-MM-dd hh:mm:ss")

                };
                remark = update(remark, {$push: [myRemark]});
            }

            if (operateType == "reject") {


                if (_this.state.rejectBtnText == "驳回") {
                    let remarkLabel = _this.state.remarkLabel;
                    remarkLabel = remarkLabel.replace("备注", "驳回原因");
                    _this.setState({
                        rejectBtnText: "确认驳回",
                        remarkLabel: remarkLabel,
                        modalTitle: "驳回申请"
                    });
                    return;
                }

                if (!reason) {
                    toastr.warning("请输入驳回原因");
                    return
                }

            }

            if (operateType == "approve") {
                if (!confirm("确认审核通过吗？")) {
                    return;
                }
            }


            bdAjax({
                url: "/api/apply/" + applyId + "/audit.json",
                type: "POST",
                dataType: "json",
                data: {
                    applyId: applyId,
                    type: applyType,
                    approved: approved,
                    reason: reason,
                    remark: JSON.stringify(remark),
                    modified: _this.state.modified
                },
                des: operateType + "申请"
            }).done(function (e) {
                toastr.success(e.message);
                _this.close();
                freshTable();
            }).always(function () {
                _this.setState({
                    isLoading: false
                });
            })
        }
        else if (operateType == "offline" || operateType == "online") {
            let operation = operateType == "online" ? 5 : 6;
            let url;
            if (operateType == "online") {
                url = `/api/apply/special/scaa/${applyId}/online.json`;
                if (_this.state.priceAdjusted == 0) {
                    toastr.warning('无法操作上线，原因：结算价尚未完成调整。');
                    return;
                }
            } else {
                return;
            }
            let api = {
                url: url,
                type: "POST",
                dataType: "json",
                des: operateType + "申请",
                showSuccess: true
            };
            myConfirm(
                <span>
                    <h4>确认已完成相关调价，立即发布活动吗？</h4>
                    点击“确定”，活动方案立即发布，活动生效时间以活动方案设置生效时间为准。
                </span>,
                '确认上线', api).done(()=> {
                    _this.close();
                    freshTable();
                }).fail(()=> {
                    _this.setState({
                        isLoading: false
                    });
                })
        }
    }

    render() {

        let _this = this;
        let modalContentClassName = "";
        let readOnly = false;
        let operateType = _this.props.operateType;

        if (operateType != "edit" && operateType != "new") {
            readOnly = true;
        }

        //UI字段生成
        let modalFooter;
        let isLoading = _this.state.isLoading;
        switch (operateType) {
            case "new":
                modalFooter = <Modal.Footer>
                    <Button disabled={isLoading}
                            onClick={!isLoading ? this.operateApply.bind(this,"new") : null}>
                        {isLoading ? '确认申请中...' : '确认申请'}</Button>
                </Modal.Footer>;
                break;
            case "edit":
                modalFooter = <Modal.Footer>
                    <Button disabled={isLoading}
                            onClick={!isLoading ? this.operateApply.bind(this,"edit") : null}>
                        {isLoading ? '确认申请中...' : '确认申请'}</Button>
                </Modal.Footer>;
                break;
            case "audit-bd1st":
            case "audit-bd2nt":
            case "audit-opt":
                if (this.state.rejectBtnText == "驳回") {
                    modalFooter = <Modal.Footer>
                        <Button disabled={isLoading}
                                onClick={!isLoading ? this.operateApply.bind(this,"approve"): null} refs="approveBtn">
                            {isLoading ? '审核通过中...' : '审核通过'}</Button>
                        <Button disabled={isLoading}
                                onClick={!isLoading ? this.operateApply.bind(this,"reject"): null}>
                            {isLoading ? `${this.state.rejectBtnText}中...` : this.state.rejectBtnText}</Button>
                    </Modal.Footer>;
                } else {
                    modalFooter = <Modal.Footer>
                        <Button disabled={isLoading}
                                onClick={!isLoading ? this.operateApply.bind(this,"reject"): null}>
                            {isLoading ? `${this.state.rejectBtnText}中...` : this.state.rejectBtnText}</Button>
                    </Modal.Footer>;
                }

                break;
            case "offline":
                modalFooter = <Modal.Footer>
                    <Button disabled={isLoading}
                            onClick={!isLoading ? this.operateApply.bind(this,"offline") : null}>
                        {isLoading ? '下线中...' : '下线'}</Button>
                </Modal.Footer>;
                break;
            case "online":
                modalFooter = <Modal.Footer>
                    <Button disabled={isLoading}
                            onClick={!isLoading ? this.operateApply.bind(this,"online") : null}>
                        {isLoading ? '上线中...' : '上线'}</Button>
                </Modal.Footer>;
                break;
            case "check":
                if(_this.props.checkAndEdit){
                    modalFooter = <Modal.Footer>
                        <Button className='J_checkAndEdit'>修改</Button>
                    </Modal.Footer>;
                }else{
                    modalFooter = "";
                }
                break;
        }


        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close.bind(_this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={modalContentClassName} ref="modalContent">

                            <Group>
                                <Left>
                                    申请类型
                                </Left>
                                ：
                                <Right>
                                    <select>
                                        <option>影院活动</option>
                                    </select>
                                </Right>
                            </Group>

                            <Cinemas readOnly={readOnly} ref="cinemas"
                                     valueLink={_this.nestLinkedState(["custom","cinemas"],_this)}/>

                            {
                                (()=> {
                                    let Form;
                                    switch (_this.props.applyType * 1) {
                                        case 1:
                                            Form = <CinemaActivity readOnly={readOnly} ref="cinemaActivityFrom"
                                                                   valueLink={_this.nestLinkedState(["custom"],_this)}/>;
                                            break;
                                    }
                                    return Form
                                })()
                            }


                            {(()=> {
                                if (this.state.lastReject) {
                                    return <Group className="text-danger">
                                        <Left>
                                            上次{this.state.lastReject.node}驳回原因
                                        </Left>
                                        ：
                                        <Right>
                                            {this.state.lastReject.reason}
                                        </Right>
                                    </Group>
                                }

                            })()}

                            <Hr/>

                            <CommonFormData readOnly={readOnly} ref="commonForm" applyType={this.props.applyType}
                                            valueLink={this.nestLinkedState(["common","formData"],_this)}/>


                            <Hr/>


                            {/*补充 备注 附件等*/}

                            {(()=> {

                                if (this.state.otherRemark.length > 0) {
                                    let trs = [];
                                    _this.state.otherRemark.forEach(function (remark, index) {
                                        let typeDes;
                                        switch (remark.type * 1) {
                                            case 1:
                                                typeDes = "BD一审备注";
                                                break;
                                            case 2:
                                                typeDes = "BD二审备注";
                                                break;
                                            case 3:
                                                typeDes = "BD申请备注";
                                                break;
                                            default :
                                                typeDes = "未知类型";
                                                break;
                                        }
                                        let tr = <tr key={index}>
                                            <td>{typeDes}</td>
                                            <td>{remark.content}</td>
                                        </tr>;

                                        trs = update(trs, {$push: [tr]});

                                    });

                                    return <Table striped bordered condensed hover>
                                        <thead>
                                        <tr>
                                            <th>备注类型</th>
                                            <th>备注内容</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {trs}
                                        </tbody>

                                    </Table>
                                }

                            })()}


                            <Attachments readOnly={readOnly}
                                         valueLink={this.nestLinkedState(["common","files"],_this)}/>

                            <Hr/>

                            {(()=> {
                                let style = {
                                    pointerEvents: "initial !important",
                                    width: "250px",
                                    height: "80px"
                                };
                                let placeholder = "可选";

                                if (this.state.rejectBtnText != "驳回") {//rejectBtnText==确认驳回 时需要填写理由
                                    placeholder = "驳回需要填写理由";
                                }

                                //opt审核 上线 下线 查看 无备注 （opt驳回有驳回原因 用备注做）
                                if (this.state.rejectBtnText != "驳回" || ( operateType != "check" && operateType != "online" && operateType != "offline" && operateType != "audit-opt")) {
                                    return <Group>
                                        <Left>
                                            {this.state.remarkLabel}
                                        </Left>
                                        <Right>
                                        <textarea placeholder={placeholder} style={style}
                                                  valueLink={this.nestLinkedState(["myRemark","content"],_this)}></textarea>
                                        </Right>
                                    </Group>
                                }
                            })()}

                            {(()=> {
                                if (operateType == 'online' || operateType == 'check') {

                                    let tableData = _this.getTableData();


                                    return <div>

                                        <div style={{padding:'10px 20px 20px'}}
                                             className={operateType == 'check'?'hide':''}>
                                            <h4>结算价调整：</h4>

                                            <p>*若方案涉及结算价调整，请确认<span className='text-danger'>结算价已完成调整</span>再操作上线。否则会影响活动策略效果。
                                            </p>
                                            <RadioGroup name={'price-adjusted'} value={_this.state.priceAdjusted}
                                                        onChange={function(newValue) {
                                                      _this.setState({
                                                        priceAdjusted:newValue
                                                      })
                                                }}>
                                                <input type="radio" value="0"/>结算价尚未调整，立即申请调价
                                                <div>*请在下方列表中直接发起调价申请</div>
                                                <br/>
                                                <input type="radio" value="1"/>结算价已完成调整，或无需调整
                                                <div>*请检查下方关联调价申请已完成调价，且“需联系影院完成调价”的影院已联系商家完成调价</div>
                                            </RadioGroup>
                                        </div>
                                        <Hr/>
                                        <MyTable data={tableData}></MyTable>

                                    </div>
                                }
                            })()}


                        </div>
                        {modalFooter}
                    </Modal.Body >
                </Modal>

                <div ref='container-negotiation'></div>

            </div>
        )
    }
};



