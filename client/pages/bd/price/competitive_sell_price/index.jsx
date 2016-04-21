import Page, {page}             from '../../../../components/layout/page-layout'

import format                   from 'date-format';
import update                   from 'react-addons-update';
import {Input,Button}           from 'react-bootstrap';

import MyTable                  from '../../../../components/common/my-table'
import PaginationAdvanced       from '../../../../components/common/pagination-advanced'
import ViewTarget               from '../../../../components/business/price/competitive-sell-price-detail';

import _                        from 'lodash';

@page
export default
class CompetitiveSellPrice extends Page {

    state = {
        showDate: format("yyyy-MM-dd", new Date()),
        data: [],
        query: {
            limit: 10,
            offset: 0
        },
        competitorsList: [], // 竞对列表
        subsList: [], // bd 分区列表

        showTarget: {
            showDate: '',
            cinemaId: 0,
            show: false
        }
    };


    toggleViewTarget(showTarget) {
        let newState = this.state;
        newState.showTarget = showTarget;
        this.setState(newState);
    }

    hideTarget() {
        let showTarget = {};
        showTarget.show = false;
        this.toggleViewTarget(showTarget);
    }

    showTarget(query) {
        let showTarget = {};
        showTarget.show = true;
        showTarget.showDate = query.showDate;
        showTarget.cinemaId = query.cinemaId;
        this.toggleViewTarget(showTarget);
    }

    getInitCondition() {
        let _this = this;

        // 分区
        let apiSubId = {
            url: `/api/org/subs/${window.User.userId}.json`,
            des: '获取分区'
        };
        this.ajax(apiSubId).done(function (e) {
            _this.setState({
                subsList: e.data
            });
        });
    }

    componentWillMount() {
        this.getInitCondition();
    }

    statusQueryHandler(state = {}) {
        let formData = {
            showDate: this.refs.showDate.value,
            subId: Number(this.refs.subId.value),
            city: this.refs.city.value.trim(),
            cinema: this.refs.cinemaId.value.trim(),
            movie: this.refs.movie.value.trim(),
            offset: 0
        }
        if (new Date(formData.showDate) <= new Date('2016-03-16')) {
            toastr.warning('该日期无影讯，请更换日期查询');
            return;
        }

        if (formData.subId === 0) {
            delete formData.subId;
        }

        state = $.extend(state, formData);
        this.queryHandler(state);
    }

    queryHandler(query = {}) {
        let _this = this;

        if (!query.showDate) {
            query.showDate = this.state.showDate;
        }
        query = $.extend(_this.state.query, query || {});

        let api = {
            url: "/api/cinema/price/list.json",
            des: '获取竞对售价信息',
            data: query
        };

        this.ajax(api).done(function (e) {
            if (e.data) {
                _this.setState({
                    data: e.data,
                    showDate: query.showDate,
                });
                let totalSize = e.totalSize;
                _this.refs.paginationAdvanced.onQuery(query, totalSize);
            }
        });

    }

    renderMain() {
        let _this = this;
        let crawlerOptions = [];
        let subsOptions = [];
        let { subsList, data, showDate, showTarget } = this.state;
        for (let i in subsList) {
            subsOptions.push(
                <option key={subsList[i].id} value={subsList[i].id} >
                    {subsList[i].name}
                </option>
            );
        }

        let noticeInfo = '数据为最近2小时内更新，取当日黄金时段非特殊场次售价';
        if (new Date(format("yyyy-MM-dd", new Date())) > new Date(showDate)) {
            noticeInfo = '数据取当日黄金时段非特殊场次最低售价';
        }

        // table data
        let tableData = {
            ths: {
                cinemaId: "影院ID",
                cinemaName: "影院名",
                regionName: "大区",
                subName: "分区",
                cityName: "城市",
                bdName: "负责BD",
                movieName: "影片",
                nuomi: "糯米售价",
                taobao: "淘宝售价",
                wechat: "微票售价",
                operate: "操作"
            },
            trs: []
        };
        $.each(data, function (index, trData) {
            let cinemaMoviePriceList = [];
            if (trData.cinemaMoviePriceList) {
                $.each(trData.cinemaMoviePriceList, (i, subTrData) => {
                    let nuomi = subTrData.srcPriceModelMap['糯米'] && subTrData.srcPriceModelMap['糯米'].price || '-';
                    let taobao = subTrData.srcPriceModelMap['淘宝'] && subTrData.srcPriceModelMap['淘宝'].price || '-';
                    let wechat = subTrData.srcPriceModelMap['微信'] && subTrData.srcPriceModelMap['微信'].price || '-';
                    cinemaMoviePriceList.push({
                        movieName: subTrData.movieName,
                        nuomi,
                        taobao,
                        wechat
                    });
                });
            } else {
                cinemaMoviePriceList = [{
                    movieName: '',
                    nuomi: '-',
                    taobao: '-',
                    wechat: '-',
                }];
            }

            let cinemaId = trData.cinemaId;
            tableData.trs.push({
                cinemaId: trData.cinemaId,
                cinemaName: trData.cinemaName,
                regionName: trData.regionName,
                subName: trData.subName,
                cityName: trData.cityName,
                bdName: trData.bdName,
                cinemaMoviePriceList: cinemaMoviePriceList,
                operate: () => {
                    return (
                        <Button onClick={_this.showTarget.bind(_this, {showDate, cinemaId})}>查看详情</Button>
                    );
                }
            });
        });

        return (
            <div>
                <div>
                    <span style={{position: 'relative'}}>
                        日期：
                        <input className="J_datePicker" ref="showDate" defaultValue={showDate} />
                        &nbsp;&nbsp;
                        &nbsp;&nbsp;
                        分区：
                        <select ref="subId">
                            <option value="0">全部</option>
                            {subsOptions}
                        </select>

                        <span className="pull-right">{noticeInfo}</span>

                        <br />
                        <br />

                        城市：
                        <input type="text" ref="city" />
                        &nbsp;&nbsp;
                        影院ID/影院名：
                        <input type="text" ref="cinemaId" />
                        &nbsp;&nbsp;
                        影片：
                        <input type="text" ref="movie" />
                        &nbsp;&nbsp;
                        <Button onClick={_this.statusQueryHandler.bind(_this, {})}>查询</Button>
                    </span>
                </div>

                <br/>

                <MyTable data={tableData}></MyTable>

                <div className="pull-right">
                    <PaginationAdvanced
                        onQueryHandler={_this.queryHandler.bind(_this)} ref='paginationAdvanced'
                    />
                </div>

                <ViewTarget {..._this.state.showTarget} hide={this.hideTarget.bind(_this, false)} />
            </div>
        );
    }
}
