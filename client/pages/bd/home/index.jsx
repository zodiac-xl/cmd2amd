import './less/home.less';

import Table from 'react-bootstrap/lib/Table';
import {Component} from 'react';

import Page, {page} from '../../../components/layout/page-layout';
import ajax from '../../../components/util/bdAjax';
import {toFinancialNumber as financial, addSign} from '../../../components/util/dataFormat';

let TODAY_URL = '/api/cinema/live/bd/reports.json';
let YESTERDAY_URL = '/api/cinema/panel/bd/reports.json';


class BoardTableTh extends Component {
    render() {
        return (
            <th {...this.props}>
                {this.props.text}
                <a href='/bd/count_report' className='pull-right' title='统计报表'>
                    <i className='glyphicon glyphicon-check'></i>
                </a>
            </th>
        );
    }
}


@page
export default
class Home extends Page {

    state = {
        todayData: {},
        yesterdayData: {}
    };

    componentDidMount() {
        this.fetchAllData();
        this.timer = setInterval(this.fetchTodayData.bind(this), 1000 * 60 * 10);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    fetchTodayData() {
        // 接口WIKI http://wiki.sankuai.com/pages/viewpage.action?pageId=400196239
        ajax({url: TODAY_URL, type: 'GET', des: '获取数据直播间数据'})
            .then(response => {
                this.setState({todayData: response.data});
            })
            .fail(() => console.log(`Get ${TODAY_URL} data fail`));
    }

    fetchAllData() {
        // 接口WIKI http://wiki.sankuai.com/pages/viewpage.action?pageId=400196239
        let count = 0;
        let updateState = {};
        let finish = () => {
            count++;
            if (count >= 2) this.setState(updateState);
        };

        ajax({url: TODAY_URL, type: 'GET', des: '获取数据直播间数据'})
            .then(response => {
                updateState['todayData'] = response.data;
            })
            .fail(() => console.log(`Get ${TODAY_URL} data fail`))
            .always(finish);

        ajax({url: YESTERDAY_URL, type: 'GET', des: '获取仪表盘数据'})
            .then(response => {
                updateState['yesterdayData'] = response.data;
            })
            .fail(() => console.log(`Get ${YESTERDAY_URL} data fail`))
            .always(finish);
    }

    renderMain() {
        let props ={
            className: 'table table-striped table-bordered'
        };
        let {todayData, yesterdayData} = this.state;

        // FIXTEST
        // todayData = {
        //     "ticketNum": 33159,  // 选座出票量
        //     "dealAmount": 38583.12, // 选座交易额
        //     "payTime": "2016.1.19 12:00:01" // 最新支付时间
        // };

        // yesterdayData = {
        //     "ticketNum": 33159,  // 选座出票量
        //     "ticketNumDayOnDay": 0, // 选座出票率环比
        //     "dealAmount": 38583.12, // 选座交易额
        //     "dealAmountDayOnDay": -30.12, // 选座交易额环比
        //     "seatRate": 12, //选座市占
        //     "seatRateDayOnDay": 10.12 // 选座市占环比
        // };
        //////////////

        let defaultValue = (value, extra='') => value || value === 0 ? value + extra : '—';
        let payTime = todayData.payTime ? todayData.payTime.split(' ')[1] : '';

        return (
            <div className='home-panel'>
                <div>
                    <h1 className='home-panel-title'>
                        <span>数据直播间</span>
                        <sub>所有负责影院今天数据</sub>
                        <span className='home-panel-title-right'>
                            截至今天{payTime}
                            <i className='glyphicon glyphicon-repeat'
                                onClick={this.fetchTodayData.bind(this)}/>
                        </span>
                    </h1>
                    <Table {...props}>
                        <thead>
                            <tr><th>指标</th><th>数值</th></tr>
                        </thead>
                        <tbody>
                            <tr><th>选座出票量</th><td>{defaultValue(financial(todayData.ticketNum))}</td></tr>
                            <tr><th>选座交易额</th><td>{defaultValue(financial(todayData.dealAmount))}</td></tr>
                        </tbody>
                    </Table>
                </div>
                <div>
                    <h1 className='home-panel-title'>
                        <span>仪表盘</span>
                        <sub>所有负责影院昨天数据</sub>
                        <span className='home-panel-title-right'>每天约12:00:00更新</span>
                    </h1>
                    <Table {...props}>
                        <thead>
                            <tr><th>指标</th><th>数值</th><th>环比</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <BoardTableTh text='选座出票量' />
                                <td>{defaultValue(financial(yesterdayData.ticketNum))}</td>
                                <td>{defaultValue(addSign(yesterdayData.ticketNumDayOnDay), '%')}</td>
                            </tr>
                            <tr>
                                <BoardTableTh text='选座交易额' />
                                <td>{defaultValue(financial(yesterdayData.dealAmount))}</td>
                                <td>{defaultValue(addSign(yesterdayData.dealAmountDayOnDay), '%')}</td>
                            </tr>
                            <tr>
                                <BoardTableTh text='选座市占' />
                                <td>{defaultValue(yesterdayData.seatRate, '%')}</td>
                                <td>{defaultValue(addSign(yesterdayData.seatRateDayOnDay), '%')}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

}

