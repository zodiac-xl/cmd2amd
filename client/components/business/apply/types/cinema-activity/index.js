import React,{addons,Component} from 'react';


import {mapObject}              from '../../../../util/dataFormat';
import ValidateMap              from '../../../../common/validatemap';
import {Group,Left,Right,Hr}    from '../../../../common/form-group';
import SuperChildFrom           from '../../../../common/super-child-form';
import '../../../../util/dateformat.js';


//fregments
import TimeRange                from './fregments/timeRange';
import ActivityType             from './fregments/activity-type';
import ShowTimeTimeRange        from './fregments/timeRanges-showTime';
import Movies                   from './fregments/movies';

import Cost                     from './fregments/limits/cost';
import TotalLimit               from './fregments/limits/totalLimit';
import UserLimit                from './fregments/limits/userLimit';
import DailyLimit               from './fregments/limits/dailyLimit';
import SettleLimit              from './fregments/limits/settleLimit';
import SubsidyRules             from './fregments/limits/subsidyRules';



import SaleDate                 from './fregments/saleDate';


let update = addons.update;
export default class CinemaActivity extends SuperChildFrom {

    static defaultProps = {
        valueLink: null,
        readOnly: false
    };


    getStateByProps(props) {
        let _this = this;
        let lastValue = _this.lastValue || null;
        let valueLink = props.valueLink || {};
        let value = valueLink.value;
        let defaultValue = {
            //单影院活动申请特有字段 *表示必填

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
                "settleLimit": true, //结算价限量                                            ***new
                "subsidyRules": [
                    {//*补贴规则
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
                    }
                ],
                "saleDate": {//*结算价降价日期  rule:2015-01-01
                    "start": "",
                    "end": ""
                }
            }

        };
        let newValue = update(defaultValue, {$merge: value});


        if (newValue.info) {
            //根据form 类型 修正subsidyRule type
            //a. "form" 包括“票补”、“第三方补贴”、“服务费减免”，默认为“票补”。
            //b."type"  1-每张补贴，2-一口价，3-服务费
            if (newValue.info.form == "服务费减免") {
                newValue.info.subsidyRules.map(function (subsidyRule) {
                    subsidyRule.rules.map(function (item) {
                        item.type = 3;
                        return item
                    })
                    return subsidyRule;
                })
            } else {
                newValue.info.subsidyRules.map(function (subsidyRule) {
                    subsidyRule.rules.map(function (item) {
                        if (item.type == 3) {
                            item.type = 1;
                        }
                        return item
                    })
                    return subsidyRule;
                })
            }

            //活动日期修改
            if (!lastValue || newValue.startTime && newValue.endTime && (lastValue.startTime != newValue.startTime || lastValue.endTime != newValue.endTime)) {
                if (_this.state && _this.state.value) {
                    let newDailyLimit = _this.dailyLimitHandle();
                    if (newDailyLimit) {
                        newValue.info.dailyLimit = newDailyLimit;
                    }
                }
            }
            _this.lastValue = update({}, {$merge: newValue});
        }
        return {
            value: newValue
        }
    }

    customValidate() {
        let _this = this;
        let validate = true;
        validate = this.refs['dailyLimit'].validate();
        if (validate) {
            validate = this.refs['subsidyRules'].validate();
        }

        if (validate) {
            validate = this.refs['showTimeTimeRange'].validate(new Date(_this.state.value.startTime).getTime());
        }


        if (validate) {
            let dailyLimit = _this.state.value.info.dailyLimit;

            //1.每天成本限制若为“限制”，则各分天成本之和必须大于等于活动成本。
            if (dailyLimit.cost && dailyLimit.cost.length > 0) {
                let totalCost = 0;
                dailyLimit.cost.forEach(function (item) {
                    totalCost += item.limit * 1;
                })
                if (totalCost < _this.state.value.cost) {
                    toastr.warning('每天成本限制若为“限制”，则各分天成本之和必须大于等于活动成本');
                    validate = false;
                }
            }

            if (validate) {
                //2.每天张数限制若为“限制”，则各分天张数之和必须大于等于总量限制。。
                if (dailyLimit.num && dailyLimit.num.length > 0) {
                    let totalNum = 0;
                    dailyLimit.num.forEach(function (item) {
                        totalNum += item.limit * 1;
                    })
                    if (totalNum < _this.state.value.info.totalLimit * 1) {
                        toastr.warning('每天张数限制若为“限制”，则各分天张数之和必须大于等于总量限制。。');
                        validate = false;
                    }
                }
            }


        }


        return validate;
    }

    dailyLimitHandle(newValue) {
        let _this = this;
        let radioValue;
        if (newValue == undefined) {
            let disableNoLimit = (_this.state.value.info.form != '服务费减免');
            if (!_this.state.value.info.dailyLimit.startTime && !disableNoLimit) {//dailyLimit为空 且form是服务费减免 为不限制
                radioValue = 0;
            } else {
                radioValue = 1;
            }
        } else {
            radioValue = newValue;
        }


        let value = _this.state.value;
        let endTimeNum = new Date(value.endTime).getTime();
        let startTimeNum = new Date(value.startTime).getTime();
        let dayDistance = Math.floor((endTimeNum - startTimeNum) / (1000 * 60 * 60 * 24) * 1);


        let newState = _this.state;
        let newDailyLimit = null;
        let dateArr = [];
        if (radioValue == 1) {//需要限制每日量
            if (dayDistance >= 0) {
                newDailyLimit = { //每天限量*  不限为{}           ***edit
                    "startTime": "11:00:00",
                    "cost": [ //每天成本限制，不限为[]
                    ],
                    "num": [ //每天张数限制，不限为[]
                    ],
                    "user": 2 //每人每天限量，不限为0
                };
                let periodDateNum = startTimeNum;
                while (dayDistance + 1) {
                    let date = new Date(periodDateNum).Format('yyyy-MM-dd');
                    dateArr.push(date);
                    newDailyLimit.cost.push({
                        "date": date,
                        "limit": ''
                    });
                    newDailyLimit.num.push({
                        "date": new Date(periodDateNum).Format('yyyy-MM-dd'),
                        "limit": ''
                    });
                    periodDateNum += 1000 * 60 * 60 * 24 * 1;
                    dayDistance--;
                }
            } else {
                newDailyLimit = {};
                toastr.warning("活动日期 结束日期应该大于开始日期");
            }
        } else {
            newDailyLimit = {};
        }
        newDailyLimit.dateArr = dateArr;
        if (newValue == undefined) {
            return newDailyLimit;
        } else {
            if (newDailyLimit) {
                newState.value.info.dailyLimit = newDailyLimit;
                _this.setState(newState);
            }
        }

    }


    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;
        let value = _this.state.value;
        let disableNoLimit = (_this.state.value.info && _this.state.value.info.form != '服务费减免');
        return (
            <div>
                {(()=> {
                    if (value.info && value.info.form) {
                        return <ActivityType readOnly={readOnly}
                                             valueLink={_this.nestLinkedState(["value","info","form"],_this)}/>
                    }

                })()}

                <TimeRange readOnly={readOnly} valueLink={{
                            value:{
                                 "startTime":value.startTime,
                                 "endTime":value.endTime
                            },
                            requestChange(newValue){
                                let newState = _this.state;
                                newState.value.startTime = newValue.startTime;
                                newState.value.endTime = newValue.endTime;
                                _this.setState(newState)
                            }
                          }}/>


                {(()=> {
                    if (value.info && value.info.showTime) {

                        return <ShowTimeTimeRange ref='showTimeTimeRange' readOnly={readOnly}
                                                  valueLink={_this.nestLinkedState(["value","info","showTime"],_this)}/>
                    }
                })()}
                {(()=> {
                    if (value.info && value.info.movies) {

                        return <Movies readOnly={readOnly}
                                       valueLink={_this.nestLinkedState(["value","info","movies"],_this)}/>
                    }
                })()}


                <Cost readOnly={readOnly} disableNoLimit={disableNoLimit}
                      valueLink={_this.nestLinkedState(["value","cost"],_this)}/>


                {(()=> {
                    if (_this.state.value.info) {
                        //活动形式为“票补”或“第三方补贴”时：“不限”置灰无法选择；默认选择“限制 XX 张”，必填，

                        return <div>

                            <TotalLimit readOnly={readOnly} disableNoLimit={disableNoLimit}
                                        valueLink={_this.nestLinkedState(["value","info","totalLimit"],_this)}/>

                            <UserLimit readOnly={readOnly} disableNoLimit={disableNoLimit}
                                       valueLink={_this.nestLinkedState(["value","info","userLimit"],_this)}/>

                            <DailyLimit ref='dailyLimit' readOnly={readOnly} disableNoLimit={disableNoLimit}
                                        valueLink={_this.nestLinkedState(["value","info","dailyLimit"],_this)}
                                        dailyLimitHandle={_this.dailyLimitHandle.bind(_this)}/>

                            <SettleLimit readOnly={readOnly}
                                         valueLink={_this.nestLinkedState(["value","info","settleLimit"],_this)}/>


                            <SaleDate readOnly={readOnly}
                                      valueLink={_this.nestLinkedState(["value","info","saleDate"],_this)}/>

                            <SubsidyRules readOnly={readOnly} form={value.info.form} ref='subsidyRules'
                                          valueLink={_this.nestLinkedState(["value","info","subsidyRules"],_this)}/>
                        </div>
                    }
                })()}


            </div>
        )
    }
};
