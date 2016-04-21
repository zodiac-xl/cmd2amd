import Page, {page}             from '../../../../components/layout/page-layout'
import ReactDOM                 from 'react-dom';

import format                   from 'date-format';
import update                   from 'react-addons-update';
import {Input,Button}           from 'react-bootstrap';

import MyTable                  from '../../../../components/common/my-table'
import OperateStandards         from '../../../../components/business/performance/operate-standards';
import EditPerformance          from '../../../../components/business/performance/edit-performance';

import URL                      from '../../../../components/util/url'



@page
export default
class PerformanceManage extends Page {

    state = {
        timeScreen: format("yyyyMM", new Date()),//年份和月份组合，格式为“年份月份”，如：201510
        type: 0,//请求的类型，0为分区经理1为BD
        data: []
    };


    operateStandards(type, subTrData) {
        let _this = this;
        let container = ReactDOM.findDOMNode(this.refs['container-edit-performance']);
        let props = {
            operateType: type || "new",
            performanceTarget: "",
            evaluationCriteria: "",
            weight: "",
            type: 0,
            freshParent: this.reRender.bind(this)
        };
        switch (type) {
            case "new":
                props = $.extend(props, {
                    type: _this.state.type
                });
                break;
            case "delete":
                props = $.extend(props, {
                    bdTargetId: subTrData.bdTargetModel.id
                });
                break;
        }
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <OperateStandards  {...props}/>,
            container
        );
    }

    editPerformance(subTrData) {
        let container = ReactDOM.findDOMNode(this.refs['container-operatestandards']);
        let props = {
            bdPerformanceId: subTrData.id,
            point: subTrData.point,
            execution: subTrData.execution,
            score: subTrData.score,
            freshParent: this.reRender.bind(this)
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <EditPerformance  {...props}/>,
            container
        );
    }

    onTypeChange(e) {
        let newType = e.target.value;
        this.getData(newType, this.state.timeScreen);

    }

    onTimeScreenChange(e) {
        let newTime = e.target.value;
        this.getData(this.state.type, newTime);
    }

    getData(type, timeScreen) {
        let _this = this;
        let apiMap = {
            performanceList: {
                api: "/api/admin/performance/list.json",
                des: "获取bd绩效列表"
            }
        };

        this.ajax({
            url: apiMap.performanceList.api,
            data: {
                timeScreen: timeScreen,
                type: type
            },
            des: apiMap.performanceList.des
        }).done(function (e) {
            _this.setState({
                data: e.data,
                type: type,
                timeScreen: timeScreen
            });
        });

    }

    componentWillMount() {
        this.getData(this.state.type, this.state.timeScreen);
    }

    reRender() {
        this.getData(this.state.type, this.state.timeScreen);
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
                region: "区域",
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
                            let performanceDetailUrl = '/admin/performance/detail';
                            performanceDetailUrl = URL.addQueryStringArg(performanceDetailUrl, {
                                BD: `${subTrData.bdName}（${subTrData.bdLogin}）`,
                                performanceTarget: subTrData.bdTargetModel && subTrData.bdTargetModel.performanceTarget || '',
                                timeScreen: subTrData.timeScreen,
                                type: subTrData.type,
                                bdId: subTrData.bdId,
                                targetId: subTrData.bdTargetModel && subTrData.bdTargetModel.id,
                            });
                            return <div>
                                <Button onClick={_this.editPerformance.bind(_this,subTrData)}>调整整体绩效</Button>
                                <a href={performanceDetailUrl}><Button>查看详情</Button></a>
                            </div>
                        }
                    }
                )
            });
            tableData.trs.push({
                bd: trData.bdName,
                bdOrg: trData.bdOrg,
                bdPerformance: performance
            });
        });

        let setStandardsUrl = `/admin/performance/set_standards?type=${this.state.type}&timeScreen=${this.state.timeScreen}`;

        return (
            <div>
                <div>
                    <select value={this.state.type} onChange={this.onTypeChange.bind(this)}>
                        <option value="0">分区绩效管理</option>
                        <option value="1">BD绩效管理</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <select value={this.state.timeScreen} onChange={this.onTimeScreenChange.bind(this)}>
                        {timeOptions}
                    </select>

                    <div style={{float:"right",marginBottom:"5px"}}>
                        <a href={setStandardsUrl}><Button>绩效指标设置</Button></a>
                    </div>

                </div>
                <MyTable data={tableData}></MyTable>

                <div ref='container-edit-performance'></div>
                <div ref='container-operatestandards'></div>
            </div>
        )
    }

}







