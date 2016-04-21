import Page, {page}             from '../../../../components/layout/page-layout'

import update                   from 'react-addons-update';
import {Input,Button}           from 'react-bootstrap';
import format                   from 'date-format';

import MyTable                  from '../../../../components/common/my-table'
import URL                      from '../../../../components/util/url';

import OperateStandards         from '../../../../components/business/performance/operate-standards';
import ImportPerformance        from '../../../../components/business/performance/import-performance';


@page
export default
class StandardsSet extends Page {

    state = {
        timeScreen: URL.getUrlArg("timeScreen", location.search),//年份和月份组合，格式为“年份月份”，如：201510
        type: URL.getUrlArg("type", location.search),//请求的类型，0为分区经理1为BD
        data: []
    };

    importPerformance(trData, performanceType) {
        let _this = this;
        let container = ReactDOM.findDOMNode(this.refs['container-import-performance']);
        let props = {
            targetId: trData.id || 0,//绩效指标id,
            performanceType: performanceType || 0,// 0 为整体绩效  1为poi绩效
            type: _this.state.type,
            timeScreen: _this.state.timeScreen,
            freshParent: this.reRender.bind(this)
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <ImportPerformance  {...props}/>,
            container
        );
    }

    exportPerformance(trData) {
        let _this = this;
        _this.ajax({
            url: '/api/admin/performance/data.json',
            des: '导出BD绩效',
            showSuccess: true,
            data: {
                targetId: trData.id,
                type: _this.state.type,
                timeScreen: _this.state.timeScreen
            }
        })
    }

    operateStandards(type, trData) {
        type = type || 'new';

        let container = ReactDOM.findDOMNode(this.refs['container-operatestandards']);
        let props = {
            operateType: type,
            performanceTarget: "",
            evaluationCriteria: "",
            weight: "",
            type: URL.getUrlArg("type", location.search),
            timeScreen: URL.getUrlArg("timeScreen", location.search),
            freshParent: this.reRender.bind(this)
        };
        switch (type) {
            case "new":
                break;
            case "edit":
                props = $.extend(props, {
                    performanceTarget: trData.performanceTarget,
                    evaluationCriteria: trData.evaluationCriteria,
                    weight: trData.weight,
                    bdTargetId: trData.id
                })
                break;
            case "delete":
                props = $.extend(props, {
                    bdTargetId: trData.id
                })
                break;
        }
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <OperateStandards  {...props}/>,
            container
        );
    }

    reRender() {
        this.getData();
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        let _this = this;

        let type = URL.getUrlArg("type", location.search);
        let timeScreen = URL.getUrlArg("timeScreen", location.search);
        _this.setState({
            type: _this.state.type || 0,
            timeScreen: _this.state.timeScreen || format("yyyyMM")
        });

        let apiMap = {
            targetList: {
                api: "/api/admin/target/targets.json",
                des: "获取绩效指标列表 "
            }
        };

        this.ajax({
            url: apiMap.targetList.api,
            data: {
                timeScreen: _this.state.timeScreen,
                type: _this.state.type
            },
            des: apiMap.targetList.des
        }).done(function (e) {
            _this.setState({data: e.data});
        });
    }

    renderMain() {

        let _this = this;


        //table data
        let tableData = {
            ths: {
                performanceTarget: "绩效指标",
                evaluationCriteria: "评估标准",
                weight: "权重",
                operate: "操作"
            },
            trs: []
        };
        $.each(this.state.data, function (index, trData) {
            tableData.trs.push({
                performanceTarget: trData.performanceTarget,
                evaluationCriteria: trData.evaluationCriteria,
                weight: trData.weight,
                operate: function (tdKey, rowSpan, style) {
                    let bdTargetId = trData.id;
                    return <div>
                        <Button onClick={_this.importPerformance.bind(_this,trData,0)}>导入整体绩效</Button>
                        <Button onClick={_this.importPerformance.bind(_this,trData,1)}>导入POI绩效</Button>
                        <Button onClick={_this.exportPerformance.bind(_this,trData)}>导出</Button>
                        <Button onClick={_this.operateStandards.bind(_this,"edit",trData)}>编辑</Button>
                        <Button onClick={_this.operateStandards.bind(_this,"delete",trData)}>删除</Button>
                    </div>
                }
            });
        });

        return (
            <div>
                <div>
                    <div>

                        <a href="/admin/performance/manage"><Button>返回绩效管理</Button></a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.operateStandards.bind(this,"new")}>新增绩效指标</Button>
                    </div>
                    <p/>
                </div>
                <MyTable data={tableData}></MyTable>


                <div ref='container-import-performance'></div>
                <div ref='container-operatestandards'></div>


            </div>
        )
    }

}







