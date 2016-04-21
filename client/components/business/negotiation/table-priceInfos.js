import React, { Component }     from 'react';

import MyTable                  from '../../common/my-table';
import bdAjax                   from '../../util/bdAjax';

export default class PriceInfosTable extends Component {

    static defaultProps = {
        taskId: null,
        cinemaId: null
    };

    state = {
        data: null
    };

    componentWillMount() {
        this.getNegotiationInfo();
    }

    getNegotiationInfo() {
        let _this = this;
        bdAjax({
            url: `/api/activity/task/${_this.props.taskId}/cinema/${_this.props.cinemaId}/negotiationInfo.json`,
            async: false,
            des: '获取跟进结果'
        }).done(function (e) {
            let newState = _this.state;
            newState.data = _this._makePriceAdjustContents(e.data.priceAdjustContents);
            _this.setState(newState);
        })
    }

    _makePriceAdjustContents(priceAdjustContents) {
        if (priceAdjustContents.length == 0) {
            return;
        }
        let tableData = {
            ths: [
                '序号',
                '影厅',
                '版本',
                '影片',
                '时段',
                '进价类型',
                '售价类型',
                '限价保护'
            ],
            trs: []
        };

        let showTypeMap = ['所有版本', '2D', 'IMAX2D', '3D', 'IMAX3D', '4D', '巨幕2D', '巨幕3D'];

        $.each(priceAdjustContents, function (i, item) {

            var timeRanges = item.timeRanges.map(function (timeRange) {
                var weekDays = timeRange.weekDays;
                var weekDaysMap = ['一', '二', '三', '四', '五', '六', '七']
                var weekDays2 = ("0000000" + parseInt(weekDays).toString(2)).slice(-7);
                let activeDays = [];
                for (var i = 0; i < 7; i++) {
                    if (weekDays2[i] == 1) {
                        activeDays.push(String(i));
                    }
                }
                activeDays = activeDays.map(function (key) {
                    return weekDaysMap[key]
                }).join('/');

                return timeRange.startDate + '至' + timeRange.endDate + " " + timeRange.startTime + '至' + timeRange.endTime + ' ' + activeDays;
            }).join("<br/>");

            var  halls = item.halls.map(function (hall) {
                return hall.name;
            });

            var movies;
            if (item.movies.data.length == 0) {
                movies = item.movies.inverse?'其他':'全部';
            }else {
                movies = item.movies.data.map(function (movie) {
                    return "《" + movie.nm + "》";
                }).join("<br/>")
            }


            var buyDes = '';
            var price = item.purchasePrice.price;
            var discount = item.purchasePrice.discount;
            switch (item.purchasePrice.type * 1) {
                case 1:
                    buyDes = '最低限价:+' + price;
                    break;
                case 2:
                    buyDes = '协定价:' + price;
                    break;
                case 3:
                    buyDes = '折扣价:' + discount + "% + " +price ;
                    break;
            }
            //"type": 3,    //进价类型，1-最低限价+N，2-协定价，3-折扣价

            tableData.trs.push({
                index: tableData.trs.length + 1,
                halls: halls.join('\\'),
                showType: showTypeMap[item.purchasePrice.showType * 1],
                movies: movies,
                timeRange: timeRanges,
                buyDes: buyDes,
                saleDes: '加价3',
                priceLimit:item.priceLimit?'是':'否'
            })
        })
        return tableData;
    }


    render() {
        if (this.state.data) {
            return (
                <MyTable data={this.state.data}></MyTable>
            )
        } else {
            return <div></div>
        }

    }

}