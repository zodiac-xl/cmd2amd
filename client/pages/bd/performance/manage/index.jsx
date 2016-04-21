import Page, {page}             from '../../../../components/layout/page-layout'

import format                   from 'date-format';
import update                   from 'react-addons-update';
import {Input,Button}           from 'react-bootstrap';

import MyTable                  from '../../../../components/common/my-table'
import EditTarget               from '../../../../components/business/performance/edit-target';
import URL                      from '../../../../components/util/url'


@page
export default
class PerformanceManage extends Page {

    state = {
        timeScreen: format("yyyyMM", new Date()),//年份和月份组合，格式为“年份月份”，如：201510
        data: []
    };


    editTarget(subTrData, performanceType) {
        let container = ReactDOM.findDOMNode(this.refs['container-edit-target']);
        let props = {
            bdPerformanceId: subTrData.id,
            point: subTrData.point,
            execution: subTrData.execution,
            score: subTrData.score,
            freshParent: this.reRender.bind(this),
            performanceType: performanceType
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <EditTarget  {...props}/>,
            container
        );

    }

    onTimeScreenChange(e) {
        let newTime = e.target.value;
        this.getData(newTime);
    }

    getData(timeScreen) {
        let _this = this;
        let apiMap = {
            performanceList: {
                url: "/api/performance/list.json",
                data: {
                    timeScreen: timeScreen
                },
                des: "获取bd绩效列表"
            }
        };

        this.ajax(apiMap.performanceList).done(function (e) {
            _this.setState({
                data: e.data,
                timeScreen: timeScreen
            });
        });

    }

    componentWillMount() {
        this.getData(this.state.timeScreen);
    }

    reRender() {
        this.getData(this.state.timeScreen);
    }


    renderMain() {

        let _this = this;

        //时间筛选
        //可筛选从2015年11月至当前月份的下个月期间的所有月份，默认为当前月份。
        // 例如当前为2016年1月，则可筛选2015年11月至2016年2月期间的所有月份，且默认为2016年1月。
        //month和week 尾巴开始计数  11 to 10
        let startMonth = 2015 * 12 + 10;
        let endMonth = new Date().getFullYear() * 12 + new Date().getMonth() + 1; //+1  下一个月（for:begin with 0）
        let timeOptions = [];
        while (!(startMonth > endMonth)) {
            let time = new Date(new Date().setDate(1)).setFullYear(Math.floor(startMonth / 12));
            time = new Date(time).setMonth(startMonth % 12);

            timeOptions.push(
                <option key={startMonth}
                        value={format("yyyyMM", new Date(time))}>{format("yyyy年MM月", new Date(time))}</option>
            );
            startMonth++;
        }


        //table data
        let tableData = {
            ths: {
                bd: "BD",
                performanceTarget: "绩效指标",
                point: "目标",
                execution: "完成情况",
                score: "分数",
                operate: "操作"
            },
            trs: []
        };
        $.each(this.state.data, function (index, trData) {
            let performance = [];


            trData.bdPerformance && $.each(trData.bdPerformance, function (i, subTrData) {

                let style = {
                    color: "white",
                    border: "1em",
                    background: "black",
                    height: "1em",
                    width: "1em",
                    borderRadius: "1em",
                    display: "inline-block",
                    lineHeight: "1em",
                    marginRight: "0.5em",
                    cursor: "pointer"
                };
                let performanceTarget = "";
                let title = "";
                if (subTrData.bdTargetModel) {
                    performanceTarget = subTrData.bdTargetModel.performanceTarget;
                    title = `评估标准：${subTrData.bdTargetModel.evaluationCriteria}\n权重：${subTrData.bdTargetModel.weight}`
                }
                performance.push(
                    {
                        performanceTarget: function () {
                            return <span><a style={style} title={title}>?</a>{performanceTarget}</span>
                        },
                        point: subTrData.point,
                        execution: subTrData.execution,
                        score: subTrData.score,
                        operate: function (tdKey, rowSpan, style) {
                            let performanceDetailUrl = '/bd/performance/detail';
                            performanceDetailUrl = URL.addQueryStringArg(performanceDetailUrl, {
                                BD: `${subTrData.bdName}（${subTrData.bdLogin}）`,
                                performanceTarget: subTrData.bdTargetModel && subTrData.bdTargetModel.performanceTarget || '',
                                timeScreen: subTrData.timeScreen,
                                type: subTrData.type,
                                bdId: subTrData.bdId,
                                targetId: subTrData.bdTargetModel && subTrData.bdTargetModel.id,
                                isEdit: trData.isEdit,
                            });

                            //bd 可以调整下级目标
                            if (trData.isEdit) {
                                return <div>
                                    <Button onClick={_this.editTarget.bind(_this,subTrData,0)}>调整整体目标</Button>
                                    <a href={performanceDetailUrl}><Button>查看详情</Button></a>
                                </div>
                            } else {
                                return <a href={performanceDetailUrl}><Button>查看详情</Button></a>;
                            }

                        }
                    }
                )
            });
            tableData.trs.push({
                bd: trData.bdName,
                bdPerformance: performance
            });
        });

        return (
            <div>
                <div>
                    <select value={this.state.timeScreen} onChange={this.onTimeScreenChange.bind(this)}>
                        {timeOptions}
                    </select>

                </div>
                <br/>
                <MyTable data={tableData}></MyTable>

                <div ref='container-edit-target'></div>
            </div>
        )
    }

}







