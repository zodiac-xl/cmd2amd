import RadioGroup               from 'react-simple-radio-group';


import {Group,Left,Right,Hr}    from '../../../../../../common/form-group';
import SuperChild               from '../../../../../../common/super-child';
import ValidateMap              from '../../../../../../common/validatemap';


export default class DailyLimit extends SuperChild {

    defaultValue() {
        return {
            "startTime": "11:00:00",
            "cost": [ //每天成本限制，不限为[]
            ],
            "num": [ //每天张数限制，不限为[]
            ],
            "user": 2 //每人每天限量，不限为0
        }
    }


    static defaultProps = {
        valueLink: null,
        readOnly: false,
        disableNoLimit: false,
        dailyLimitHandle: function () {
        }
    };


    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value || this.defaultValue();
        return {
            value: value
        }
    }

    validate() {
        //若“每天限量”选择“限制”，则“每天成本限制”、“每天张数限制”、“每人每天限量”中至少有一个需要选择“限制”，否则无法提交申请。
        let value = this.state.value;
        let dailyLimit = value;
        let validate = true;

        if (dailyLimit.startTime && dailyLimit.cost.length == 0 && dailyLimit.num.length == 0) {
            validate = false
            toastr.warning('若“每天限量”选择“限制”，则“每天成本限制”、“每天张数限制”中至少有一个需要选择“限制”')
        }
        return validate;
    }

    getLimitList(data, readOnly, filedName) {
        let doms = [];
        let _this = this;
        if (readOnly && data.length == 0) {
            doms = <div style={{padding:'5px 0'}}>
                不限
            </div>;
        }
        data.forEach((item, i)=> {
            let dom;
            if (readOnly) {
                dom = <div key={i} style={{padding:'5px 0'}}>
                    {item.date}：限制
                    {item.limit}
                    <span>{filedName == 'cost' ? '元' : '张'}</span>
                </div>;

            } else {
                dom = <div key={i} style={{padding:'5px 0'}}>{item.date}：限制
                    <input
                        required={true}
                        {...ValidateMap.number} min={1}
                        style={{width: '140px'}}
                        valueLink={_this.nestLinkedState(["value",filedName,i,'limit'],_this)}
                        placeholder={filedName == 'cost'?'数字，包括服务费':'数字'}
                        />&nbsp;{filedName == 'cost' ? '元' : '张'}
                </div>;
            }
            doms.push(dom);
        });
        return doms;
    }


    dailyLimitFiledHandle(filedName, newValue) {
        let _this = this;
        let radioValue = newValue;
        let newState = _this.state;
        if (radioValue == 1) {//需要限制
            newState.value[filedName] = _this.props.dailyLimitHandle()[filedName];
        } else {
            newState.value[filedName] = [];
        }
        _this.setState(newState);
    }

    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;
        let disableNoLimit = _this.props.disableNoLimit;
        let dailyLimitHandle = _this.props.dailyLimitHandle;

        let value = _this.state.value;
        let dailyLimit = value;

        let user = dailyLimit.user;
        let cost = dailyLimit.cost || [];
        let num = dailyLimit.num || [];

        let rightDom;
        let costdDom = _this.getLimitList(cost, readOnly, 'cost');
        let numdDom = _this.getLimitList(num, readOnly, 'num');


        let dailyLimitRadioValue; // 0 不限制  1限制
        if (!dailyLimit.startTime && !disableNoLimit) {
            dailyLimitRadioValue = 0;
        } else {
            dailyLimitRadioValue = 1;
        }

        let dailyLimitcostRadioValue = cost.length > 0 ? 1 : 0;
        let dailyLimitnumRadioValue = num.length > 0 ? 1 : 0;
        let dailyLimituserRadioValue = user > 0 ? 1 : 0;

        if (readOnly) {
            if (dailyLimitRadioValue == 0) {
                rightDom = <Right><span>不限</span></Right>;
            } else {
                rightDom = <Right>
                    <div style={{margin:'5px 0'}}>每天<span>{dailyLimit.startTime}</span>开始抢票</div>

                    <div style={{margin:'5px 0'}}><span
                        style={{paddingTop: '5px',display: 'inline-block'}}>每天成本限制：</span>

                        <div style={{display: 'inline-block',verticalAlign: 'top'}}>{costdDom}</div>
                    </div>

                    <div style={{margin:'5px 0'}}><span
                        style={{paddingTop: '5px',display: 'inline-block'}}>每天张数限制：</span>

                        <div style={{display: 'inline-block',verticalAlign: 'top'}}>{numdDom}</div>
                    </div>
                    <div style={{margin:'5px 0'}}>每人每天限量：{user > 0 ? `${user}张` : '不限'}</div>
                </Right>;
            }
        } else {
            rightDom = <Right>
                <RadioGroup name={'dailyLimit'} value={dailyLimitRadioValue}
                            onChange={dailyLimitHandle}>
                    <span
                        style={{
                            color: disableNoLimit?'#C5C5C5':'inherit',
                            verticalAlign: 'top',display: 'inline-block'
                            }}>
                        <input type="radio" value="0"
                               disabled={disableNoLimit}/>不限
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio"
                           value="1"
                        />限制
                </RadioGroup>
                {(()=> {
                    if (dailyLimitRadioValue == 1) {
                        return <div>
                            <div style={{padding:'5px 0'}}>每天
                                <input
                                    type="text"
                                    required={true}
                                    style={{width: '85px'}}
                                    className="J_timePicker"
                                    valueLink={_this.nestLinkedState(["value",'startTime'],_this)}
                                    />开始抢票
                            </div>
                            <div style={{padding:'5px 0'}}>
                                <span>每天成本限制：</span>

                                <div style={{display: 'inline-block',verticalAlign: 'top'}}>
                                    <RadioGroup name={'dailyLimitcost'} value={dailyLimitcostRadioValue}
                                                onChange={_this.dailyLimitFiledHandle.bind(_this,'cost')}>
                                        <input type="radio" value="0"/>不限
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" value="1"/>限制
                                    </RadioGroup>
                                    {costdDom}
                                </div>
                            </div>
                            <div style={{padding:'5px 0'}}>
                                <span>每天张数限制：</span>

                                <div style={{display: 'inline-block',verticalAlign: 'top'}}>
                                    <RadioGroup name={'dailyLimitnum'} value={dailyLimitnumRadioValue}
                                                onChange={_this.dailyLimitFiledHandle.bind(_this,'num')}>
                                        <input type="radio" value="0"/>不限
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" value="1"/>限制
                                    </RadioGroup>
                                    {numdDom}
                                </div>
                            </div>
                            <div style={{padding:'5px 0'}}>
                                <span>每人每天限量：</span>

                                <div style={{display: 'inline-block',verticalAlign: 'top'}}>
                                    <RadioGroup name={'dailyLimituser'} value={dailyLimituserRadioValue}
                                                onChange={function(newValue) {
                                              let newState =_this.state;
                                              if(newValue ==0){
                                                newState.value.user = 0;
                                              }else{
                                                 newState.value.user = 2;
                                              }
                                               _this.setState(newState);
                                            }}>
                                        <input type="radio" value="0"/>不限
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" value="1"/>限制
                                        {(()=> {
                                            if (dailyLimituserRadioValue == 1) {
                                                return <span>
                                                <input
                                                    required={true}
                                                    {...ValidateMap.number} min={'1'}
                                                    style={{width: '85px'}}
                                                    valueLink={_this.nestLinkedState(["value",'user'],_this)}
                                                    />
                                                    &nbsp;张
                                            </span>
                                            }
                                        })()}
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>;
                    }
                })()}
            </Right>;
        }


        return (
            <Group>
                <Left>
                    每天限量
                </Left>
                ：
                {rightDom}
            </Group>
        )
    }
};
