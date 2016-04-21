import React                from 'react';
import ReactDOM             from 'react-dom';

import format               from 'date-format';
import {Group,Left,Right}   from '../../common/form-group.js';
import SimpleModal          from '../../common/simple-modal';

import MyTable              from '../../common/my-table';

export default class ViewTarget extends SimpleModal {

    static defaultProps = {
        hide: () => {},
        showDate: '',
        cinemaId: 0,
        show: false
    };

    getStateByProps(props) {
        return {
            isLoading: false,
            title: "查看详情",
            detailInfo: [],
        }
    }

    getInitCondition(props) {
        let _this = this;
        let api = {
            url: `/api/cinema/price/detail.json`,
            data: {
                showDate: props.showDate,
                cinemaId: props.cinemaId
            }
        };
        $.ajax(api).done(function (e) {
            _this.setState({
                detailInfo: e.data
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.getInitCondition(nextProps);
        }
    }

    submit() {}

    renderFooter() {}

    renderBody() {
        let { detailInfo } = this.state;
        if (!detailInfo || detailInfo.length === 0) {
            return;
        }

        let cinemaId = detailInfo[0].cinemaId;
        let cinemaName = detailInfo[0].cinemaName;
        let noticeInfo = '数据为最近2小时更新';
        if (new Date(format("yyyy-MM-dd", new Date())) > new Date(detailInfo[0].showTime)) {
            noticeInfo = '数据为各场次当日最低售价';
        }

        // table data
        let tableData = {
            ths: {
                movieName: "影片",
                hallName: "影厅",
                showTime: "场次时间",
                maoyan: "猫眼售价",
                nuomi: "糯米售价",
                taobao: "淘宝售价",
                wechat: "微票售价",
            },
            trs: []
        };
        let keyMap = {
            maoyan: '猫眼',
            nuomi: '糯米',
            taobao: '淘宝',
            wechat: '微信',
        }

        $.each(detailInfo, (index, trData) => {
            let {movieName, hallName, showTime} = trData;
            let srcPriceData = {};
            $.each(keyMap, (name, key) => {
                let content = <span>-</span>;
                let obj = trData.srcPriceModelMap[key];
                if (obj) {
                    let activity = obj.hasActivity ? <span style={{color: 'red'}}>活</span> : null;
                    let price = obj.price ? <span>{obj.price}</span> : null;
                    content = <span>{activity}{price}</span>;
                }
                srcPriceData[name] = content;
            });
            tableData.trs.push({movieName, hallName, showTime, ...srcPriceData})
        });

        return (
            <div>
                <div>
                    <span>影院 ID: {cinemaId}</span>
                    &nbsp;&nbsp;
                    <span>影院名: {cinemaName}</span>
                    <span className="pull-right">{noticeInfo}</span>
                </div>
                <hr />
                <MyTable data={tableData}></MyTable>
            </div>
        );
    }

}
