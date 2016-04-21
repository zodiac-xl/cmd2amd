import React                    from 'react'
import ReactDOM                 from 'react-dom';

import uniqid                   from 'uniqid';
import arrayUnique              from 'array-unique';
import Tabs                     from 'react-bootstrap/lib/Tabs';
import Tab                      from 'react-bootstrap/lib/Tab';
import Button                   from 'react-bootstrap/lib/Button';
import DateTimeField            from 'react-bootstrap-datetimepicker';

import SuperChild               from '../../../common/super-child';

import bdAjax                   from '../../../util/bdAjax';

import './index.less'


//fragments
import TimeRanges               from './fragments/time-ranges';
import MovieGroups              from './fragments/movie-groups';

export default class PricePlans extends SuperChild {

    defaultPricePlan() {
        return {
            timeRanges: [],
            movieGroups: []
        };
    }

    static defaultProps = {
        type: 1,//1-活动调价 2-常规 3-活动 非调价
        valueLink: null,
        readOnly: false,
        movieOptions: [],
        cinemaId: null
    };


    getActiveWeekDays(weekDays10) {
        let weekDays2 = ("0000000" + parseInt(weekDays10).toString(2)).slice(-7);
        let activeDays = [];
        for (let i = 0; i < 7; i++) {
            if (weekDays2[i] == 1) {
                activeDays.push(String(i));
            }
        }
        return activeDays;
    }

    validate() {

        let _this = this;
        let _thisComponent = ReactDOM.findDOMNode(_this);
        let validate = true;
        let pricePlans = _this.state.value;

        let validateInputs = [];
        let $validateInputs = $(_thisComponent).find("input[required]");
        $validateInputs.each(function (i, validateInput) {
            validateInputs.push(validateInput);
        })
        validateInputs.some(function (validateInput) {
            if (!validateInput.validity.valid) {
                let message = validateInput.validationMessage;
                let title = validateInput.title;
                let $validateInput = $(validateInput);
                let tabIndex = [].indexOf.call($(_thisComponent).find(".tab-content .tab-pane"), $validateInput.closest(".tab-pane")[0]);

                _this.refs.tabs.setState({
                    activeKey: tabIndex
                });
                setTimeout(function () {
                    $validateInput.focus();
                }, 300);

                toastr.warning(message ? message.replace('此字段', title) : `请填写${title}`);
                validate = false;
                return true;
            }
        });
        if (!validate) {
            return validate;
        }

        //二级验证 禁止结算价均为“不参加此次调价”的申请提交
        pricePlans.some(function (pricePlan, i) {
            let allNotJoin = true;
            pricePlan.movieGroups.some(function (movieGroup, j) {
                movieGroup.priceInfos.some(function (priceInfo) {
                    priceInfo.purchasePrice.some(function (purchasePrice) {
                        if (purchasePrice.type != 0 && priceInfo.halls.length > 0) {
                            allNotJoin = false;
                        }
                        return !allNotJoin
                    })
                    return !allNotJoin;
                })
                return !allNotJoin;
            })
            if (allNotJoin) {
                toastr.warning(`分时段价格${i * 1 + 1}中结算价均为“不参加此次调价”,禁止提交`);
                validate = false;
            }
            return !validate
        });

        if (!validate) {
            return validate;
        }

        //二级验证 禁止开始时间大于结束时间
        let times = [];
        pricePlans.forEach(function (pricePlan, i) {
            pricePlan.timeRanges.forEach(function (timeRange, j) {
                let startNum = Date.parse(`${timeRange.startDate} ${timeRange.startTime}`);
                let endNum = Date.parse(`${timeRange.endDate} ${timeRange.endTime}`);
                times.push({
                    startNum: startNum,
                    endNum: endNum,
                    weekDays: timeRange.weekDays,
                    des: `分时段价格${i * 1 + 1}中场次时段${j * 1 + 1}`
                });

            })
        });

        //禁止开始时间大于结束时间
        times.some(function (time) {
            if (time.startNum >= time.endNum) {
                toastr.warning(`场次时段有误，请修改${time.des}`);
                validate = false;
            }
            return !validate;
        })

        if (!validate) {
            return validate;
        }

        //禁止时间段重叠 待优化逻辑
        //for (let i = 0; i < times.length - 1; i++) {
        //    let pre = times[i];
        //    let preDistance = pre.endNum - pre.startNum;
        //    let preActiveWeekDays = _this.getActiveWeekDays(pre.weekDays);
        //
        //    for (let j = i + 1; j < times.length; j++) {
        //        let next = times[j];
        //        let nextDistance = next.endNum - next.startNum;
        //        let nextActiveWeekDays = _this.getActiveWeekDays(next.weekDays);
        //
        //        // {startNum:1,endNum:3}  {startNum:4,endNum:5}    (5-1) > ((3-1) +(5-4))   ok
        //        // {startNum:1,endNum:3}  {startNum:2,endNum:5}    (5-1) < ((3-1) +(5-2))   时间段重贴
        //        if ((preDistance + nextDistance) > (Math.max(pre.endNum, next.endNum) - Math.min(pre.startNum, next.startNum))) {
        //            let megergedDays = preActiveWeekDays.concat(nextActiveWeekDays);
        //            megergedDays = arrayUnique(megergedDays);
        //            if (megergedDays.length < (preActiveWeekDays.length + nextActiveWeekDays.length)) {//周末有重叠
        //                toastr.warning(`场次时段有误，请修改${next.des}`);
        //                validate = false;
        //                break;
        //            }
        //        }
        //    }
        //    if (!validate) {
        //        break;
        //    }
        //}

        return validate;
    }

    customGetValue() {
        let _this = this;

        if (!this.validate()) {
            return null;
        }

        let pricePlans = _this.state.value;
        return pricePlans;
    }


    getStateByProps(props) {
        let _this = this;
        let valueLink = props.valueLink || {};
        let value = (valueLink.value && valueLink.value.length > 0) ? valueLink.value : [this.defaultPricePlan()];


        return {
            value: value
        }
    }

    deletePricePlan(index) {
        let _this = this;
        let newState = _this.state;
        if (newState.value.length > 1) {
            newState.value.splice(index, 1);
            this.setState(newState, ()=> {
                //for tabsComponent的state不会随父组件更新 activeKey仍然是删除tab的key 导致无tab可显示
                let tabsComponent = _this.refs.tabs;
                let newTabsState = tabsComponent.state;
                newTabsState.activeKey = index < newState.value.length ? index : 0;
                newTabsState.previousActiveKey = null;
                tabsComponent.setState(newTabsState);
            });
        } else {
            toastr.warning(`请至少保留1个分时段`);
        }
    }

    addPricePlan() {
        let newState = this.state;
        if (newState.value.length < 9) {
            newState.value.push(this.defaultPricePlan());
            this.setState(newState);
        } else {
            toastr.warning(`已经添加9个分时段啦，如需继续添加，请单独创建新的申请`);
        }
    }


    renderMain() {
        let _this = this;
        let tabs = [];
        let value = _this.state.value;
        $.each(value, (index, item)=> {

            let eventKey = index;
            let title = `分时段价格${index * 1 + 1}`;
            let deleteButtonStyle = {
                paddingLef: '15px',
                position: 'relative',
                top: '-2px',
                cursor: 'pointer'
            };
            let deleteButton = <button type="button" style={deleteButtonStyle}
                                       onClick={_this.deletePricePlan.bind(this,index)} className="close"
                                       aria-label="Close"><span aria-hidden="true">&times;</span></button>;

            title = <span>{title} {deleteButton}</span>;

            tabs.push(
                <Tab key={index} eventKey={index} ref={`tab${index}`} title={title}>
                    <TimeRanges type={_this.props.type}
                                valueLink={_this.nestLinkedState(['value',index,'timeRanges'],_this)}/>
                    <MovieGroups valueLink={_this.nestLinkedState(['value',index,'movieGroups'],_this)}
                                 movieOptions={_this.props.movieOptions} cinemaId={_this.props.cinemaId}/>
                </Tab>
            );
        });

        return (
            <div>
                <Tabs defaultActiveKey={0} ref='tabs'>
                    <Button onClick={_this.addPricePlan.bind(_this)} style={{
                                float: 'right',
                                transform: 'translateY(-150%)'
                                }}>新增分时段定价
                    </Button>
                    {tabs}
                </Tabs>
            </div>
        )
    }
};
