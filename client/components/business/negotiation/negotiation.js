import React, { Component }     from 'react';
import ReactDOM                 from 'react-dom';
import NestLinkedStateMixin     from 'react-nest-link-state';


import Modal                    from 'react-bootstrap/lib/Modal';
import Button                   from 'react-bootstrap/lib/Button';

import {Group,Left,Hr,Right}    from '../../common/form-group';
import Attachments              from '../../common/attachments';

import bdAjax                   from '../../util/bdAjax';



//fragments
import TaskInfo                 from './task-info';
import PricePlans               from './price-plans';
import CommonFormData           from '../common-formData/common-formData';
import CancelPriceApply         from './cancel-priceApply'



export default class Negotiation extends React.Component {

    static defaultProps = {
        freshParent: function () {
        },
        committed: false,

        type: 1,//1-活动调价 2-常规 3-活动 非调价
        auditType: 1,//taskData.auditType == 1 ? "需要审核" : "不需要审核"
        operateType: 'new',

        taskId: null,
        cinemaId: null,
        cinemaName: null,

        scaaId: 0,//单影院活动申请id，如果没有关联单影院活动则填0

        //活动调价 独有字段
        taskInfo: null,

        //常规调价 独有
        applyId: null,
        sellsrc: null
    };

    nestLinkedState = NestLinkedStateMixin.nestLinkedState;


    state = {
        //ui
        isLoading: false,
        show: true,
        committed: this.props.committed, //已经提交过的并在生效中的申请 需要验证

        //data
        auditInfo: null, //反馈结果
        feedbackContent: null, //自定义表单
        pricePlans: null,
        files: [],//附件
        note: ''//备注
    };

    hide() {
        this.setState({
            show: false
        })
    }


    formatPriceInfos(priceInfos) {
        let newPriceInfos = [];
        priceInfos.forEach(function (priceInfo, index) {
            let showTypes = [];
            let newPurchasePrice = [];
            if (!priceInfo.specialHall) {//普通厅
                showTypes = [1, 3];//0-全部 1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
            } else {
                switch (priceInfo.halls[0].type * 1) { // "type": 1    //影厅类型，1-普通厅，2-IMAX厅，3-DMAX厅，4-4D厅
                    case 1:
                        showTypes = [1, 3];
                        break;
                    case 2:
                        showTypes = [1, 2, 3, 4];
                        break;
                    case 3:
                        showTypes = [1, 3, 6, 7];
                        break;
                    case 4:
                        showTypes = [1, 3, 5];
                        break;
                }
            }
            let defaultType = 1;
            if (index != 0) {
                defaultType = 1;//最低限价
            }

            showTypes.forEach(function (showType) {
                let targetPrice = (function (showType, priceInfo) {
                    let targetPrice = {};
                    priceInfo.purchasePrice.some(function (price) {
                        if (price.showType == showType) {
                            targetPrice = price;
                            return true;
                        }
                    });
                    return targetPrice;
                })(showType, priceInfo)
                newPurchasePrice.push({
                    "showType": showType,
                    "type": targetPrice.type || defaultType,
                    "price": targetPrice.price || 0,
                    "discount": targetPrice.discount || 0
                })
            })

            if (priceInfo.purchasePrice.length == 0) {//为空 不参加
                newPurchasePrice = [{
                    "showType": 0,
                    "type": 0,//不参加
                    "price": 0,
                    "discount": 0
                }];
            } else if (priceInfo.purchasePrice[0].showType == 0) {//已经有全部 就不生成单个版本了
                let purchasePrice = priceInfo.purchasePrice[0]
                newPurchasePrice = [purchasePrice];
            }

            priceInfo.purchasePrice = newPurchasePrice;
            newPriceInfos.push(priceInfo);

        })
        return newPriceInfos;
    }


    unFormatPriceInfos(priceInfos, priceLimit) {
        let newPriceInfos = [];
        priceInfos.forEach(function (priceInfo, index) {
            let newPurchasePrice = [];
            priceInfo.purchasePrice.forEach(function (price) {
                if (price.type != 0) {//参加
                    newPurchasePrice.push(price);
                }
            });
            priceInfo.priceLimit = priceLimit;
            priceInfo.purchasePrice = newPurchasePrice;
            newPriceInfos.push(priceInfo);
        })

        return newPriceInfos;
    }

    componentWillMount() {
        if (this.props.operateType != 'new') {
            this.getNegotiationInfo();
        }
    }

    getNegotiationInfo() {
        let _this = this;
        let type = _this.props.type;
        if (type == 1 || type == 3) {
            bdAjax({
                url: `/api/activity/task/${_this.props.taskId}/cinema/${_this.props.cinemaId}/negotiationInfo.json`,
                async: false,
                des: '获取跟进结果'
            }).done(function (e) {
                let newState = _this.state;
                let pricePlans = e.data.pricePlans;

                newState.auditInfo = e.data.auditInfo;
                pricePlans.map(function (pricePlan, i) {
                    pricePlan.movieGroups = pricePlan.movieGroups && pricePlan.movieGroups.map(function (movieGroup, j) {
                            movieGroup.priceInfos = _this.formatPriceInfos(movieGroup.priceInfos);

                            //限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
                            movieGroup.priceLimit = movieGroup.priceInfos[0].priceLimit;
                            return movieGroup;
                        })
                    return pricePlan;
                });


                newState.pricePlans = pricePlans;
                newState.feedbackContent = JSON.parse(e.data.feedbackContent);
                newState.files = e.data.files;
                newState.note = e.data.note;
                _this.setState(newState);
            })
        } else if (type == 2) {
            bdAjax({
                url: `/api/price/${_this.props.applyId}/apply.json`,
                des: '获取调价申请'
            }).done(function (e) {
                let newState = _this.state;
                let pricePlans = e.data.pricePlans;

                newState.auditInfo = {
                    reason: e.data.rejectReason
                };
                pricePlans.map(function (pricePlan, i) {
                    pricePlan.movieGroups = pricePlan.movieGroups && pricePlan.movieGroups.map(function (movieGroup, j) {
                            movieGroup.priceInfos = _this.formatPriceInfos(movieGroup.priceInfos);

                            //限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
                            movieGroup.priceLimit = movieGroup.priceInfos[0].priceLimit;
                            return movieGroup;
                        })
                    return pricePlan;
                });
                newState.pricePlans = pricePlans;
                newState.files = e.data.files;
                newState.note = e.data.info;
                _this.setState(newState);
            })
        }


    }


    getData(commit, committed) {//提交验证数据  保存不验证
        let _this = this;
        let validate = true;

        let feedbackContent;//自定义反馈表单 1-活动调价  3-活动不调价
        let pricePlans = null;//影院调价信息  1-活动调价 2-常规

        committed = _this.state.committed;
        if (!commit && !committed) {//已经提交过的并在生效中的申请 需要验证
            return {
                feedbackContent: _this.refs.commonForm.state.value,
                pricePlans: _this.refs.pricePlans.state.value
            }
        }

        switch (_this.props.type * 1) {// type: 1-活动调价 2-常规 3-活动不调价
            case 1:
                feedbackContent = _this.refs.commonForm.getValue();
                if (feedbackContent) {//如果自定义反馈表单通过监测可以获取数据 再检查影院调价信息并获取
                    pricePlans = _this.refs.pricePlans.getValue();
                }

                if (!pricePlans) {
                    validate = false;
                } else {
                    //调整数据
                    //a.PriceInfos字段数据结构转化（UI交互和接口给定字段不匹配 中间使用formatPriceInfos unFormatPriceInfos相互转换）
                    //b.限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
                    pricePlans = pricePlans.map(function (pricePlan, i) {
                        pricePlan.movieGroups = pricePlan.movieGroups.map(function (movieGroup, j) {
                            let priceLimit = movieGroup.priceLimit;
                            movieGroup.priceInfos = _this.unFormatPriceInfos(movieGroup.priceInfos, priceLimit);
                            delete movieGroup.priceLimit;
                            return movieGroup;
                        })
                        return pricePlan
                    });
                }
                break;
            case 2:
                pricePlans = _this.refs.pricePlans.getValue();
                if (!pricePlans) {
                    validate = false;
                } else {
                    //调整数据
                    //a.PriceInfos字段数据结构转化（UI交互和接口给定字段不匹配 中间使用formatPriceInfos unFormatPriceInfos相互转换）
                    //b.限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
                    pricePlans = pricePlans.map(function (pricePlan, i) {
                        pricePlan.movieGroups = pricePlan.movieGroups.map(function (movieGroup, j) {
                            let priceLimit = movieGroup.priceLimit;
                            movieGroup.priceInfos = _this.unFormatPriceInfos(movieGroup.priceInfos, priceLimit);
                            delete movieGroup.priceLimit;
                            return movieGroup;
                        })
                        return pricePlan
                    });
                }
                break
            case 3:
                feedbackContent = _this.refs.commonForm.getValue();
                if (!feedbackContent) {//如果自定义反馈表单通过监测可以获取数据 再检查影院调价信息并获取
                    validate = false;
                }
                break
        }


        return validate ? {
            feedbackContent: feedbackContent,
            pricePlans: pricePlans
        } : false;

    }

    submit(commmit) {

        let _this = this;
        let api;
        let type = _this.props.type;
        let auditType = _this.props.auditType;
        let operateType = _this.props.operateType;
        let freshParent = _this.props.freshParent;
        let committed = _this.state.committed;

        let data = _this.getData(commmit);//提交验证数据  保存不验证
        if (!data) {
            return;
        }
        let feedbackContent = data.feedbackContent;
        let pricePlans = data.pricePlans;
        let files = _this.state.files;
        let note = _this.state.note;
        let content;
        let callback;


        if (type == 2 || (type == 1 && auditType == 2)) {//常规 和 活动需要调价不需审核 均需要立即上传附件
            if (files.length == 0) {
                toastr.warning('请上传附件');
                return;
            }
        }

        if (type == 1 || type == 3) {//活动调价 活动非调价
            let ajaxType;
            switch (operateType) {
                case 'new':
                    ajaxType = 'POST'
                    break;
                case 'edit':
                    ajaxType = 'PUT'
                    break;

            }
            if (type == 3) {
                if (!note) {
                    toastr.warning("请填写备注");
                    return;
                }
                content = JSON.stringify({
                    feedbackContent: feedbackContent,
                    files: files,
                    note: note
                });
            } else {
                content = JSON.stringify({
                    feedbackContent: feedbackContent,
                    pricePlans: pricePlans,
                    files: files,
                    note: note
                });
            }

            bdAjax({
                url: `/api/activity/task/${_this.props.taskId}/cinema/${_this.props.cinemaId}/negotiationInfo.json`,
                type: ajaxType,
                des: '保存跟进',
                data: {
                    content: content
                }
            }).done(function (e) {
                if (commmit && !committed) {
                    bdAjax({
                        url: `/api/activity/task/${_this.props.taskId}/cinema/${_this.props.cinemaId}/negotiationInfo/submit.json`,
                        type: 'post',
                        des: '提交跟进',
                        showSuccess: true
                    }).done(function (e) {
                        _this.hide();
                        freshParent();
                    })
                } else {
                    toastr.success(e.des);
                    _this.hide();
                    freshParent();
                }
            })
        } else {
            let url;
            let applyId = _this.props.applyId;

            content = {
                data: {
                    id: applyId,
                    cinemaId: _this.props.cinemaId,
                    info: note,
                    files: files,
                    pricePlans: pricePlans
                }
            };

            if (applyId && applyId * 1 > 0) {
                url = "/api/price/" + applyId + "/apply.json";
            } else {
                url = "/api/price/applies.json";
                content.data.scaaId = _this.props.scaaId;
            }


            bdAjax({
                url: url,
                type: 'post',
                des: `${_this.props.operateType == 'new' ? '新建' : '修改'}调价申请`,
                data: {
                    content: JSON.stringify(content)
                },
                showSuccess: true
            }).done(function (e) {
                _this.hide();
                freshParent(e);
            })
        }


    }


    cancelPriceApply() {
        let _this = this;
        let container = ReactDOM.findDOMNode(this.refs['container-cancelPriceApply']);
        let id = this.props.applyId;
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <CancelPriceApply id={id} done={function(){
                _this.hide();
                _this.props.freshParent();

            }}/>,
            container
        );
    }

    render() {


        let _this = this;
        let readOnly;
        let modalTile;
        let type = _this.props.type * 1;
        let operateType = _this.props.operateType;
        switch (operateType) {
            case 'new':
                readOnly = false;
                modalTile = "提交跟进结果";
                break;
            case 'edit':
                readOnly = false;
                modalTile = "修改跟进结果";
                break;
            case 'check':
                readOnly = true;
                modalTile = "查看跟进结果";
                break;
        }


        let showDesignationSystemTips = false;
        if (type == 2) {

            modalTile = modalTile.replace('跟进结果', '调价申请');

            //当创建申请的影院对应的售票系统，属于以下15个售票系统之一，则在【基础信息】页面显示以下提示内容:
            //该售票系统影院可自行调价，低于最低限价且差额部分由影城承担的调价可正常申请。

            let showTipsSellSrc = [21, 13, 4, 18, 19, 9, 44, 15, 26, 24, 27, 29, 32, 31, 46];

            // 判断是否为15个售票系统之一
            if (_this.props.sellSrc != null && $.inArray(_this.props.sellSrc, showTipsSellSrc) > -1) {
                showDesignationSystemTips = true;
            }
        }


        let taskInfoProps = {
            ref: "taskInfo",
            taskInfo: _this.props.taskInfo,
            cinemaId: _this.props.cinemaId,
            cinemaName: _this.props.cinemaName,
            auditInfo: _this.state.auditInfo,
            showDesignationSystemTips: showDesignationSystemTips,
            readOnly: readOnly
        };
        let pricePlansProps = {
            ref: "pricePlans",
            type: _this.props.type,//1-活动调价 2-常规 3-活动 非调价
            valueLink: _this.nestLinkedState(['pricePlans'], _this),
            readOnly: readOnly,
            movieOptions: _this.props.taskInfo && _this.props.taskInfo.movies || [],
            cinemaId: _this.props.cinemaId,
        };

        let commonFormDataProps = {
            ref: "commonForm",
            template: _this.props.taskInfo && _this.props.taskInfo.feedbackContent && _this.props.taskInfo.feedbackContent[0],
            valueLink: _this.nestLinkedState(['feedbackContent'], _this),
            readOnly: readOnly
        };

        let styles = {
            pointerEvents: {},
            cursor: {}
        };
        if (operateType == 'check') {
            styles = {
                pointerEvents: {
                    pointerEvents: 'none'
                },
                cursor: {
                    cursor: 'not-allowed'
                }
            };
        }
        return (
            <div>
                <div className="modal-container">
                    <Modal show={this.state.show} onHide={ _this.hide.bind(_this)} bsSize='large'>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTile}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={styles.cursor}>
                            <div style={styles.pointerEvents}>

                                <TaskInfo {...taskInfoProps}/>


                                {(()=> {
                                    if (_this.props.taskInfo && _this.props.taskInfo.feedbackContent && _this.props.taskInfo.feedbackContent[0]) {
                                        return <div>
                                            <CommonFormData {...commonFormDataProps}/>
                                            <Hr/>
                                        </div>;
                                    }
                                })()}

                                {(()=> {
                                    if (_this.props.type != 3) {
                                        return <PricePlans {...pricePlansProps}/>;
                                    }
                                    <Hr/>
                                })()}


                                <Attachments readOnly={readOnly}
                                             valueLink={this.nestLinkedState(["files"],_this)}/>

                                <Hr/>

                                <Group>
                                    <Left>备注</Left>：
                                    <Right>
                               <textarea style={{
                               height: '100px',
                                width: '400px',
                               }} valueLink={this.nestLinkedState(["note"],_this)} placeholder='可选，其他特殊情况'></textarea>
                                    </Right>
                                </Group>
                                <br/>
                                {(()=> {
                                    let isLoading = _this.state.isLoading;
                                    let committed = _this.state.committed;
                                    if (operateType != 'check') {
                                        let Footer;
                                        let cancelBtn;
                                        if (operateType == 'edit' && type == 2) {
                                            cancelBtn =
                                                <Button onClick={_this.cancelPriceApply.bind(_this)}>取消调价申请</Button>;
                                        }
                                        switch (type) {//1-活动调价 2-常规 3-活动 非调价
                                            case 1:
                                                Footer = <Modal.Footer>
                                                    <Button disabled={isLoading}
                                                            className={committed?'hide':''}
                                                            onClick={!isLoading ? _this.submit.bind(_this,false) : null}>
                                                        {isLoading ? '保存中...' : '保存草稿'}</Button>
                                                    <Button disabled={isLoading}
                                                            onClick={!isLoading ? _this.submit.bind(_this,true) : null}>
                                                        {isLoading ? '提交中...' : '提交'}</Button>
                                                </Modal.Footer>;
                                                break;
                                            case 2:
                                            case 3:
                                                Footer = <Modal.Footer>
                                                    <Button disabled={isLoading}
                                                            onClick={!isLoading ? _this.submit.bind(_this,true) : null}>
                                                        {isLoading ? '提交中...' : '提交'}</Button>
                                                    {cancelBtn}
                                                </Modal.Footer>;
                                                break;
                                        }
                                        return Footer;
                                    }
                                })()}

                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <div ref='container-cancelPriceApply'></div>
            </div>
        )
    }
};
