import React                    from 'react'

import uniqid                   from 'uniqid';
import Button                   from 'react-bootstrap/lib/Button';

import {Group,Left,Right,Hr}    from '../../../../common/form-group';
import SuperChild               from '../../../../common/super-child';
import CheckboxGroup            from '../../../../common/checkbox-group';

import '../../../../util/dateformat';


export default class TimeRanges extends SuperChild {

    defaultTimeRange() {
        return {
            "startDate": "",
            "endDate": "",
            "startTime": "00:00:00",
            "endTime": "23:59:59",
            "weekDays": 127    //星期，7位二进制数字分别表示周一到周日，例如1111100=121表示周一到周五
        }
    }

    static defaultProps = {
        type: 1,//1-活动调价 2-常规 3-活动 非调价
        valueLink: null,
        readOnly: false
    };


    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = (valueLink.value && valueLink.value.length > 0) ? valueLink.value : [this.defaultTimeRange()];

        return {
            value: value
        }
    }

    addTimeRange() {
        let newState = this.state;
        newState.value.push(this.defaultTimeRange());
        this.setState(newState);
    }

    deleteTimeRange(index) {
        let newState = this.state;
        newState.value.splice(index,1);
        this.setState(newState);
    }

    renderMain() {
        let _this = this;
        let leftStyle = {
            width: "8em"
        };
        let timeRangesData = _this.state.value;
        let makeTimeRanges = (timeRangesData)=> {
            let timeRanges = [];
            $.each(timeRangesData, (timeRangesIndex)=> {
                let weekDays10 = _this.state['value'][timeRangesIndex]['weekDays'];
                let weekDays2 = ("0000000" + parseInt(weekDays10).toString(2)).slice(-7);
                let activeDays = [];
                for (let i = 0; i < 7; i++) {
                    if (weekDays2[i] == 1) {
                        activeDays.push(String(i));
                    }
                }
                let timeRangeCheckBoxName = `timeRange-${uniqid()}-${timeRangesIndex}`;
                let timeRangeCheckBoxHandleChange = (timeRangesIndex)=> {
                    let newActiveDays = _this.refs[timeRangeCheckBoxName].getCheckedValues();
                    let newWeekDays2 = "0000000";
                    let newWeekDays10;
                    let newState = _this.state;
                    newWeekDays2 = newWeekDays2.split('');
                    newActiveDays.forEach((item, i)=> {
                        newWeekDays2[item * 1] = 1;
                    });
                    newWeekDays2 = newWeekDays2.join('');
                    newWeekDays10 = parseInt(newWeekDays2, 2);

                    newState['value'][timeRangesIndex]['weekDays'] = newWeekDays10;
                    _this.setState(newState);
                };

                let ifMakeContractOffline = false;
                if (_this.state.value[timeRangesIndex].endDate == '2099-12-31') {
                    ifMakeContractOffline = true;
                }
                let timeRange = <div key={`timeRange-${timeRangesIndex}`}>
                    <Group>
                        <Left style={leftStyle}>{`场次时段价格${timeRangesIndex * 1 + 1}`}</Left>：
                        <Right>
                            <span style={{display:'inline-block',position:'relative'}}>
                                   <input type='text' className='J_datePicker' required={true} title='场次时段'
                                          valueLink={_this.nestLinkedState(['value',timeRangesIndex,'startDate'],_this)}/>
                            </span>
                            <span>----</span>
                             <span style={{display:'inline-block',position:'relative'}}>
                                <input type='text' className='J_datePicker' disabled={ifMakeContractOffline} style={ifMakeContractOffline?{
                                    color: '#eee',
                                    background: '#eee'
                                }:{}} required={true} title='场次时段'
                                       valueLink={_this.nestLinkedState(['value',timeRangesIndex,'endDate'],_this)}/>
                                 {(()=> {
                                     if (_this.props.type == 2) {//1-活动调价 2-常规 3-活动 非调价
                                         return <span><input type='checkbox' disa name={uniqid()} onChange={function(timeRangesIndex,e){
                                            let newState = this.state;
                                            newState.value[timeRangesIndex].endDate = e.target.checked?'2099-12-31':'';
                                            _this.setState(newState);
                                       }.bind(_this,timeRangesIndex)} checked={ifMakeContractOffline}/>至合同下线</span>;
                                     }
                                 })()}
                            </span>
                            {(()=> {
                                if (timeRangesIndex != 0) {
                                    return <Button  className='pull-right' onClick={_this.deleteTimeRange.bind(_this,timeRangesIndex)}>删除</Button>;
                                }
                            })()}
                        </Right>
                    </Group>
                    <Group>
                        <Left style={leftStyle}>时间</Left>：
                        <Right>
                            <span>开始时间：</span>
                            <span style={{display:'inline-block',position:'relative'}}>
                                <input type='text' className='J_timePicker' required={true} title='开始时间'
                                       valueLink={_this.nestLinkedState(['value',timeRangesIndex,'startTime'],_this)}/>
                            </span>
                            <span>----</span>
                            <span>结束时间：</span>
                             <span style={{display:'inline-block',position:'relative'}}>
                                    <input type='text' className='J_timePicker' required={true} title='结束时间'
                                           valueLink={_this.nestLinkedState(['value',timeRangesIndex,'endTime'],_this)}/>
                            </span>
                        </Right>
                    </Group>
                    <Group>
                        <Left style={leftStyle}>星期</Left>：
                        <Right>
                            <CheckboxGroup name={timeRangeCheckBoxName} ref={timeRangeCheckBoxName}
                                           onChange={timeRangeCheckBoxHandleChange.bind(_this,timeRangesIndex)}
                                           value={activeDays}>
                                <input type="checkbox" value="0"/>周一
                                <input type="checkbox" value="1"/>周二
                                <input type="checkbox" value="2"/>周三
                                <input type="checkbox" value="3"/>周四
                                <input type="checkbox" value="4"/>周五
                                <input type="checkbox" value="5"/>周六
                                <input type="checkbox" value="6"/>周日
                            </CheckboxGroup>
                        </Right>
                    </Group>
                </div>;
                timeRanges.push(timeRange);
            });
            return timeRanges;
        };

        return (
            <div style={{paddingTop:'10px'}}>
                {makeTimeRanges(timeRangesData)}
                <div style={{border:'1px solid black',margin:5,padding:5}}>
                    <p style={{textAlign:'right'}}>
                        若不同时段的定价相同，请点击右侧“增加”按钮
                        <Button onClick={_this.addTimeRange.bind(_this)}>增加</Button>
                    </p>

                    <p style={{textAlign:'right'}} className='text-muted'>
                        若不同时段的定价不同，请点击上方Tab栏的“新增分时段价格”按钮&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                </div>
            </div>
        )
    }
};
