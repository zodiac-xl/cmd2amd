import Page, {page}                 from '../../../../components/layout/page-layout'

import Button                       from 'react-bootstrap/lib/Button';
import NestLinkedStateMixin         from 'react-nest-link-state';

import Url                          from '../../../../components/util/url'
import MyTable                      from '../../../../components/common/my-table'
import PaginationAdvanced           from '../../../../components/common/pagination-advanced'
import RecordForm                   from '../../../../components/business/record-form/record-form';
import Negotiation                  from '../../../../components/business/negotiation/negotiation'





@page
export default
class taskList extends Page {


    state = {
        listData: [],
        query: {
            cinema: Url.getUrlArg('cinemaId'),
            status: '0',
            offset: 0,
            limit: 10
        }
    };
    nestLinkedState = NestLinkedStateMixin.nestLinkedState;


    queryHandler(query) {
        let _this = this;

        query = $.extend(_this.state.query, query || {});

        let api = {
            url: "/api/price/applies.json",
            des: "获取调价申请列表",
            data: query
        };


        this.ajax(api).done(function (e) {
            if (e.data) {
                let newState = _this.state;
                let totalSize = e.totalSize;
                newState.listData = e.data;
                newState.query = query;
                _this.setState(newState);
                _this.refs.paginationAdvanced.onQuery(query, totalSize);

            }

        });

    }


    normalQueryHandler(status) {
        let _this = this;
        this.queryHandler({
            cinema: _this.refs[`cinema`].value,
            status: _this.refs[`status`].value,
            offset: 0
        });
    }

    record(data) {
        let container = ReactDOM.findDOMNode(this.refs['container-record']);
        let props = {
            applyType: 2,
            applyId: data.id,
            cinemaId: data.cinemaId,
            cinemaName: data.cinemaName,
            statusDesc: data.statusDesc
        };
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <RecordForm  {...props}/>,
            container
        );

    }

    negotiation(data, operateType, applyId) {
        let container = ReactDOM.findDOMNode(this.refs['container-negotiation']);
        let props = {

            type: 2,//1-活动调价 2-常规
            sellSrc: data.sellSrc,
            operateType: operateType,
            applyId: applyId,
            taskId: this.props.taskId,
            cinemaId: data.cinemaId,
            cinemaName: data.cinemaName,
            freshParent: this.queryHandler.bind(this)
        };

        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <Negotiation  {...props}/>,
            container
        );
    }


    renderMain() {

        let _this = this;
        let tableData = {
            ths: ["调价申请ID", "影院ID", "影院名", "最近操作时间", "状态", "操作"],
            trs: []
        };

        $.each(_this.state.listData, function (index, item) {
            let tr = {
                id: item.id,
                cinemaId: item.cinemaId,
                cinemaName: item.cinemaName,
                modified: item.modified,
                statusDesc: item.statusDesc,
                operate: function () {
                    return function (style, rowSpan, tdKey) {
                        let canEdit = true;
                        if (item.status == 3 || item.status == 4 || item.status == 5) {
                            canEdit = false;
                        }
                        return <td style={style} rowSpan={rowSpan} key={tdKey}>
                            <Button
                                onClick={_this.negotiation.bind(_this,item,canEdit?'edit':'check',item.id)}>{canEdit ? '修改' : '查看'}</Button>&nbsp;
                            &nbsp;<Button onClick={_this.record.bind(_this,item)}>调价申请记录</Button>
                        </td>
                    }
                }
            };
            tableData.trs.push(tr);
        });

        return (

            <div>
                <div style={{marginBottom:'10px',textAlign:"right"}}>
                    <span>
                        影院ID/影院名：
                        <input type="text" ref='cinema'/>
                        &nbsp;&nbsp;
                        <Button onClick={_this.normalQueryHandler.bind(_this)}>查询</Button>
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>状态：
                        <select defaultValue={-1} ref='status' onChange={function(e){
                                 _this.queryHandler({
                                    status:e.target.value,
                                    offset:0
                                 });
                        }.bind(_this)}>
                            <option value="0">全部</option>
                            <option value="1">待调价</option>
                            <option value="2">被驳回</option>
                            <option value="3">已取消</option>
                            <option value="4">开始调价</option>
                            <option value="5">已完成调价</option>
                        </select>
                    </span>
                </div>

                <MyTable data={tableData}></MyTable>

                <div className="pull-right">
                    <PaginationAdvanced onQueryHandler={_this.queryHandler.bind(_this)} ref='paginationAdvanced'/>
                </div>


                <div ref='container-record'></div>
                <div ref='container-negotiation'></div>
            </div>
        )
    }


}







