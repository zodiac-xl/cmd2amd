import Button                   from 'react-bootstrap/lib/Button';

import {Group,Left,Right,Hr}    from '../../../../../common/form-group';
import SuperChild               from '../../../../../common/super-child';


export default class ShowTimeTimeRange extends SuperChild {

    defaultTimeRange() {
        return {
            "startDate": "",//*2015-10-01
            "endDate": "",//*2015-11-01
            "startTime": "00:00:00",//*08:00:00
            "endTime": "23:59:59"//*10:00:00
        }
    }

    static defaultProps = {
        valueLink: null,
        readOnly: false
    };


    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value || [this.defaultTimeRange()];
        return {
            value: value
        }
    }

    validate(startTime) {//活动开始时间

        //        3.活动场次时间中，
        //3.1 日期的右区间必须大于等于左区间。
        //3.2 时间的右区间必须大于等于左区间。
        //3.3 所有时间不能出现交叉。
        //3.4 最晚的日期必须大于等于“活动日期”字段的左区间。
        let value = this.state.value;
        let validate = true;
        let times = [];
        value.forEach(function (item) {
            times.push(
                {
                    startDate: new Date(item.startDate+' 00:00:00').getTime(),
                    endDate: new Date(item.endDate+' 23:59:59').getTime(),
                    startTime: new Date(`2016-01-01 ${item.startTime}`).getTime(),
                    endTime: new Date(`2016-01-01 ${item.endTime}`).getTime()

                }
            )
        })

        times.some(function (item) {
            if (item.startDate > item.endDate) {
                validate = false;
                toastr.warning('日期的右区间必须大于等于左区间');
            }
            return !validate;
        })


        if (validate) {
            times.some(function (item) {
                if (item.startTime > item.endTime) {
                    validate = false;
                    toastr.warning('时间的右区间必须大于等于左区间');
                }
                return !validate;
            })
        }


        if (validate) {
            for (let i = 0; i < times.length; i++) {
                let pre = times[i];
                let preDateDis = pre.endDate - pre.startDate;
                let preTimeDis = pre.endTime - pre.startTime;
                for (let j = i + 1; j < times.length; j++) {
                    let next = times[j];
                    let nextDateDis = next.endDate - next.startDate;
                    let nextTimeDis = next.endTime - next.startTime;

                    //时间 日期交叉
                    let timeCross = (preTimeDis + nextTimeDis) > (Math.max(next.endTime, pre.endTime) - Math.min(next.startTime, pre.startTime));
                    let DateCross = (preDateDis + nextDateDis) > (Math.max(next.endDate, pre.endDate) - Math.min(next.startDate, pre.startDate));

                    if (timeCross && DateCross) {
                        validate = false;
                        toastr.warning('所有时间不能出现交叉');
                        break;
                    }
                }
                if (!validate) {
                    break;
                }
            }
        }


        if (validate) {

            // 最晚的日期必须大于等于“活动日期”字段的左区间。（活动开始时间）
            let latestDate = 0;
            times.forEach(function (item) {
                latestDate = Math.max(latestDate, item.endDate);
            })
            if (latestDate < startTime) {
                toastr.warning('最晚的日期必须大于等于“活动日期”字段的左区间。');
                validate = false;
            }
        }


        return validate;
    }

    addShowTime() {
        let newState = this.state;
        newState.value.push(this.defaultTimeRange());
        this.setState(newState)
    }

    deleteShowTime(index) {
        let newState = this.state;
        newState.value.splice(index, 1);
        this.setState(newState)
    }


    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;
        let value = _this.state.value;
        let showTime = value;

        let showTimeDom = [];
        showTime.forEach((item, index)=> {
            let btn;
            if (index == 0) {
                btn = <Button onClick={_this.addShowTime.bind(_this)}>增加</Button>;
            } else {
                btn = <Button onClick={_this.deleteShowTime.bind(_this,index)}>删除</Button>;
            }
            if (readOnly) {
                showTimeDom.push(
                    <div key={index}>
                        <div>
                            在日期&nbsp;<span>{item.startDate}</span>
                            &nbsp;--&nbsp;
                            <span>{item.endDate}</span>&nbsp;中，
                        </div>
                        <div>
                            每天&nbsp;&nbsp;&nbsp;<span>{item.startTime}</span>
                            &nbsp;--&nbsp;
                            <span>{item.endTime}</span>&nbsp;的场次。
                        </div>
                    </div>
                );
            } else {
                showTimeDom.push(
                    <div key={index}>
                        <div>
                            <span style={{width: '3.5em',display: 'inline-block'}}>在日期</span>
                            <input
                                style={{width: '85px'}}
                                required={true}
                                className="J_datePicker"
                                valueLink={_this.nestLinkedState(["value",index,'startDate'],_this)}/>
                            &nbsp;--&nbsp;
                            <input
                                style={{width: '85px'}}
                                required={true}
                                className="J_datePicker"
                                valueLink={_this.nestLinkedState(["value",index,'endDate'],_this)}/>
                            &nbsp;中，
                        </div>
                        <div>
                            <span style={{width: '3.5em',display: 'inline-block'}}>每天</span>
                            <input
                                style={{width: '85px'}}
                                required={true}
                                className="J_timePicker"
                                valueLink={_this.nestLinkedState(["value",index,'startTime'],_this)}/>
                            &nbsp;--&nbsp;
                            <input
                                style={{width: '85px'}}
                                required={true}
                                className="J_timePicker"
                                valueLink={_this.nestLinkedState(["value",index,'endTime'],_this)}/>
                            &nbsp;的场次。&nbsp;&nbsp;{btn}
                        </div>
                    </div>
                );
            }

        });
        return (
            <Group>
                <Left>
                    活动场次时间
                </Left>
                ：
                <Right>{showTimeDom}</Right>
            </Group>
        )
    }
};
