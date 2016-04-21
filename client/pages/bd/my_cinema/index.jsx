import React                        from 'react';
import ReactDOM                     from 'react-dom';
import Page, {page}                 from '../../../components/layout/page-layout'
import MyTable                      from '../../../components/common/my-table'
import PaginationAdvanced           from '../../../components/common/pagination-advanced'

import Tabs                         from 'react-bootstrap/lib/Tabs';
import Tab                          from 'react-bootstrap/lib/Tab';
import Button                       from 'react-bootstrap/lib/Button';



import Apply                        from '../../../components/business/apply/apply';
import Negotiation                  from '../../../components/business/negotiation/negotiation'
import CityAutoSuggest              from '../../../components/common/autoSuggest/city'


import './index.less';

@page
export default
class MyCinema extends Page {
    static defaultProps = {
        tabMap: {
            online: {
                title: '上线中',
                state: 1
            },
            waitOnline: {
                title: '已签约待上线',
                state: 4
            },
            waitExpand: {
                title: '未签约待拓展',
                state: 0
            },
            notInclude: {
                title: '猫眼未收录',
                state: 5
            },
            offline: {
                title: '已手动下线',
                state: 3
            },
            outOfDate: {
                title: '已到期待续约',
                state: 2
            }
        },
    };
    state = {
        online: {
            data: [],
            totalSize: 0
        },
        waitOnline: {
            data: [],
            totalSize: 0
        },
        notInclude: {
            data: [],
            totalSize: 0
        },
        waitExpand: {
            data: [],
            totalSize: 0
        },
        outOfDate: {
            data: [],
            totalSize: 0
        },
        offline: {
            data: [],
            totalSize: 0
        },
        activeKey: (function (component) {
            let defaultActiveKey = 'waitOnline';
            let match = location.hash.match(/[^#]+/gim);
            match = match && match[0] || '';
            if (component.props.tabMap[match]) {
                defaultActiveKey = match;
            }
            return defaultActiveKey;
        })(this),
        query: {}
    }


    componentDidMount() {
        this.count();
    }

    count() {
        let _this = this;
        _this.ajax({
            url: `/api/cinema/bd/${window.User.misId}/counts.json`,
            des: '获取统计',
        }).done(function (e) {
            //1.上线   2.到期   3.下线  4.待上线
            let data = e.data;
            let newState = _this.state;
            for (var key in data) {
                if (key == "1") {
                    newState['online'].totalSize = data[key];
                } else if (key == "2") {
                    newState['outOfDate'].totalSize = data[key];
                } else if (key == "3") {
                    newState['offline'].totalSize = data[key];
                } else if (key == "4") {
                    newState['waitOnline'].totalSize = data[key];
                } else if (key == "0") {
                    newState['waitExpand'].totalSize = data[key];
                } else if (key == 5) {
                    newState['notInclude'].totalSize = data[key];
                }
            }
            _this.setState(newState);

        })
    }

    apply(data, operateType) {
        let container = ReactDOM.findDOMNode(this.refs['container-apply']);
        let props = {
            applyId: null,
            applyType: 1,
            operateType: operateType,
            cinemaId: data.id,
            cinemaName: data.name
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <Apply  {...props}/>,
            container
        );
    }

    negotiation(data, operateType) {
        let container = ReactDOM.findDOMNode(this.refs['container-negotiation']);
        let props = {
            type: 2,//1-活动调价 2-常规

            operateType: operateType,
            sellSrc: data.sellSrc,
            taskId: this.props.taskId,
            cinemaId: data.id,
            cinemaName: data.name,
        };

        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <Negotiation  {...props}/>,
            container
        );
    }

    queryHandler(key, state, title, query) {
        let _this = this;

        query = $.extend(_this.state[key].query || {}, query || {});

        let api = {
            url: `/api/cinema/bd/${window.User.misId}/cinemas.json?state=${state}`,
            des: `获取我的影院筛选${title}`,
            data: query
        };


        this.ajax(api).done(function (e) {
            if (e.data) {
                let newState = _this.state;
                let totalSize = e.totalSize || e.data.length || 0;
                newState[key].data = e.data;
                newState[key].query = query;
                _this.setState(newState);
                _this.refs[`paginationAdvanced_${key}`].onQuery(query, totalSize);

            }

        });
    }

    normalQueryHandler(key, state, title) {
        let _this = this;
        let query = {
            cinema: _this.refs[`cinema_${key}`].value,
            cityName: _this.refs[`city_${key}`].state.name,
            cityId: _this.refs[`city_${key}`].state.id,
            offset: 0
        };
        if (state == 5) {
            query.uniqueNo = _this.refs[`uniqueNo_${key}`].value;

        }
        _this.queryHandler(key, state, title, query);
    }

    renderMain() {

        let _this = this;
        let tabs = [];
        let tabMap = _this.props.tabMap;

        Object.keys(tabMap).forEach((key)=> {
                let value = tabMap[key];
                let tableData;
                let ths;
                let trs = [];
                switch (key) {
                    case 'waitOnline':
                    case 'online':
                    case 'offline':
                    case 'outOfDate':
                        ths = {
                            id: '影院ID',
                            name: '影院名',
                            city: '城市',
                            sellSrcDesc: '售票系统',
                            onlineDate: '上线日期',
                            offlineDate: '下线日期',
                            operate: '操作'
                        };
                        break;
                    case 'waitExpand':
                        ths = {
                            id: '影院ID',
                            name: '影院名',
                            city: '城市',
                            operate: '操作'
                        };
                        break;
                    case 'notInclude':
                        ths = {
                            code: '影院编码',
                            name: '影院名',
                            province: '省份',
                            city: '城市',
                            theaterChain: '院线名称',
                        };
                        break;
                }

                _this.state[key].data.forEach((item, index)=> {
                    let tr = {};
                    Object.keys(ths).forEach((thKey)=> {
                        if (thKey && thKey != 'operate' && thKey != 'name') {
                            tr[thKey] = item[thKey];
                        } else if (thKey == 'name') {
                            let href = "/bd/cinema_detail?";
                            href = href + escape("cinemaId=" + item.id + "&cinemaName=" +
                                    item.name + "&city=" + item.city + "&sellSrcDesc=" + item.sellSrcDesc);

                            tr[thKey] = function () {

                                if (key == 'notInclude') {
                                    return item.name;
                                } else {
                                    return <a href={href}>{item.name}</a>
                                }
                            };
                        } else {
                            let newPriceRuleBtn = <Button key={'newPriceRuleBtn'}
                                                          onClick={_this.negotiation.bind(_this,item,'new')}>申请调价</Button>;
                            let newCinemaApplyBtn = <Button key={'newCinemaApplyBtn'}
                                                            onClick={_this.apply.bind(_this,item,'new')}>申请活动</Button>;
                            let reportBtn = <Button key={'reportBtn'}
                                                    onClick={function(data){
                                                     let search = escape(`cinemaId=${data.id}&cinemaName=${data.name}&sellSrc=${data.sellSrcDesc}&city=${data.city}&backurl=${encodeURIComponent(location.href)}`);
                                                        location.href = "/bd/my_cinema/sub_page/seat_report?" + search;
                                                    }.bind(_this,item)}
                                >统计报表</Button>;
                            let btns;
                            switch (key) {
                                case 'waitOnline':
                                    btns = <div>
                                        {newPriceRuleBtn}&nbsp;&nbsp;
                                        {newCinemaApplyBtn}&nbsp;&nbsp;
                                    </div>;
                                    break;
                                case 'online':
                                    btns = <div>
                                        {newPriceRuleBtn}&nbsp;&nbsp;
                                        {newCinemaApplyBtn}&nbsp;&nbsp;
                                        {reportBtn}
                                    </div>;
                                    break;
                                case 'offline':
                                case 'outOfDate':
                                    btns = <div>
                                        {reportBtn}
                                    </div>;
                                    break;
                                case 'waitExpand':
                                    btns = <Button
                                        onClick={() => {
                                                window.open(`/bd/apply/online?cinema=[${JSON.stringify(item)}]`);
                                            }}
                                        >
                                        新建上线申请
                                    </Button>;
                                    break;
                            }
                            tr[thKey] = function () {
                                return btns;
                            }
                        }

                    })
                    trs.push(tr)
                })
                tableData = {
                    ths: ths,
                    trs: trs
                }
                let title = <span>{value.title}<span className='badge'>{_this.state[key].totalSize}</span></span>;
                let table = _this.state.activeKey == key ? <MyTable data={tableData}></MyTable> : '';
                let uniqueNoQuery;
                let des;
                if (value.state == 5) {
                    uniqueNoQuery = <span> <span>影院八位编码: </span><input type="text" ref={`uniqueNo_${key}`}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;</span>
                    des = <p>说明：下方为猫眼未收录影院，请在MDC（<a href='http://mdc.sankuai.com/' target='_blank'>http://mdc.sankuai.com/</a>）查询或创建对应的POI后提交至城市品控（qc.avatar@meituan.com），协助我们及时收录至猫眼影院库中。</p>;
                }

                let zibCityUrl = '/api/org/zjb/searchCity.json';
                let cityprops = {};
                let cineamLable = '影院ID/影院名';
                if (key == 'notInclude') {
                    cityprops = {url: zibCityUrl};
                    cineamLable = '影院名称';
                }


                tabs.push(
                    <Tab key={key} eventKey={key} title={title}>
                        <div style={{textAlign:"right"}}>
                            <span>城市: </span>

                            <div style={{position:'relative',display:'inline-block',textAlign:"left"}}>
                                <CityAutoSuggest ref={`city_${key}`} {...cityprops}/>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span><span>{cineamLable}</span>: </span><input type="text" ref={`cinema_${key}`}/>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {uniqueNoQuery}
                            <Button
                                onClick={_this.normalQueryHandler.bind(_this,key,value.state,value.title)}>查询</Button>
                        </div>
                        <br/>
                        {des}

                        {table}
                        <div className="pull-right">
                            <PaginationAdvanced ref={`paginationAdvanced_${key}`}
                                                onQueryHandler={_this.queryHandler.bind(_this,key,value.state,value.title)}
                                                limit={20}/>
                        </div>
                    </Tab>
                );
            }
        )
        return (

            <div>
                <Tabs activeKey={_this.state.activeKey} onSelect={function(activeKey){
                    location.hash= activeKey;
                    this.setState({
                        activeKey:activeKey
                    });
                }.bind(_this)} ref='tabs' id='myCinamaTabs'>
                    {tabs}
                </Tabs>

                <div ref='container-apply'></div>
                <div ref='container-negotiation'></div>
            </div>
        )
    }
}
