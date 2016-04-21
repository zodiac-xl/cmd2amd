import ReactDOM                 from 'react-dom';

import Page, {page}             from '../../../../components/layout/page-layout'

import {Button}                 from 'react-bootstrap';
import MyTable                  from '../../../../components/common/my-table'
import URL                      from '../../../../components/util/url'
import EditPerformance          from '../../../../components/business/performance/edit-performance';


@page
export default
class PerformanceDetail extends Page {

    static defaultProps = {
        BD: URL.getUrlArg('BD'),
        performanceTarget: URL.getUrlArg('performanceTarget'),
        apiData: {
            timeScreen: URL.getUrlArg('timeScreen'),
            type: URL.getUrlArg('type'),
            bdId: URL.getUrlArg('bdId'),
            targetId: URL.getUrlArg('targetId'),
        }
    }

    state = {
        performanceDetail: []
    };

    componentWillMount() {
        this.setPerformanceDetail();
    }

    setPerformanceDetail() {
        let _this = this;
        _this.ajax({
            url: '/api/performance/cinemas/detail.json',
            des: ' 获取bd POI绩效详情',
            data: this.props.apiData
        }).done(function (e) {
            _this.setState({
                performanceDetail: e.data
            });
        })
    }
    reRender(){
        this.setPerformanceDetail();
    }


    editPerformance(subTrData,performanceType) {
        let container = ReactDOM.findDOMNode(this.refs['container-edit-performance']);
        let props = {
            bdCinemaPerformanceId: subTrData.id,
            point: subTrData.point,
            execution: subTrData.execution,
            score: subTrData.score,
            freshParent: this.reRender.bind(this),
            performanceType: performanceType
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <EditPerformance  {...props}/>,
            container
        );
    }


    renderMain() {
        let _this = this;
        let tableData = {
            ths: ['影院ID', '影院名', '目标', '完成情况', '操作'],
            trs: []
        };
        _this.state.performanceDetail.forEach(function (item) {
            tableData.trs.push({
                cinemaId: item.cinemaId,
                cinemaName: item.cinemaName,
                point: item.point,
                execution: item.execution,
                operate: <Button onClick={_this.editPerformance.bind(_this,item,1)}>调整POI绩效</Button>
            });
        })

        return (
            <div>
                <div>

                    <a href="/admin/performance/manage"><Button>返回绩效管理</Button></a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p/>

                    <div>
                        BD：<span>{_this.props.BD}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        绩效指标：<span>{_this.props.performanceTarget}</span>
                    </div>
                    <p/>
                </div>
                <MyTable data={tableData}></MyTable>

                <div ref='container-edit-performance'></div>
            </div>
        )
    }

}







