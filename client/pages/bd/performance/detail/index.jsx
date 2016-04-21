import ReactDOM                 from 'react-dom';

import Page, {page}             from '../../../../components/layout/page-layout'

import {Button}                 from 'react-bootstrap';
import MyTable                  from '../../../../components/common/my-table'
import URL                      from '../../../../components/util/url'
import EditTarget               from '../../../../components/business/performance/edit-target';


@page
export default
class PerformanceDetail extends Page {

    static defaultProps = {
        BD: URL.getUrlArg('BD'),
        performanceTarget: URL.getUrlArg('performanceTarget'),
        isEdit:URL.getUrlArg('isEdit') == 'true',
        apiData: {
            timeScreen: URL.getUrlArg('timeScreen'),
            type: URL.getUrlArg('type'),
            bdId: URL.getUrlArg('bdId'),
            targetId: URL.getUrlArg('targetId'),
        }
    }

    state = {
        performanceDetail: [],

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

    reRender() {
        this.setPerformanceDetail();
    }


    editTarget(subTrData, performanceType) {
        let container = ReactDOM.findDOMNode(this.refs['container-edit-target']);
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
            <EditTarget  {...props}/>,
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
            let operate = '';
            if (_this.props.isEdit) {
                operate = <Button onClick={_this.editTarget.bind(_this,item,1)}>调整POI目标</Button>;
            }
            tableData.trs.push({
                cinemaId: item.cinemaId,
                cinemaName: item.cinemaName,
                point: item.point,
                execution: item.execution,
                operate: operate
            });
        })

        return (
            <div>
                <div>

                    <a href="/bd/performance/manage"><Button>返回绩效管理</Button></a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p/>

                    <div>
                        BD：<span>{_this.props.BD}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        绩效指标：<span>{_this.props.performanceTarget}</span>

                        <div className='pull-right hide'>请于本月16日00:00:00之前调整绩效目标，逾期无法操作</div>
                    </div>
                    <p/>
                </div>
                <MyTable data={tableData}></MyTable>

                <div ref='container-edit-target'></div>
            </div>
        )
    }

}







