import Page, {page}              from '../../../../components/layout/page-layout'
import MyTable                  from '../../../../components/common/my-table'
import PaginationAdvanced       from '../../../../components/common/pagination-advanced'

@page
export default
class taskList extends Page {


    state = {
        taskListData: []
    };



    queryHandler(query) {
        let _this = this;
        let api = {
            url: "/api/activity/tasks.json",
            des: "获取总部任务列表",
            data: query
        };

        this.ajax(api).done(function (e) {
            if (e.data) {
                let newState = _this.state;
                let totalSize = e.totalSize || 0;
                newState.taskListData = e.data;
                _this.setState(newState);
                _this.refs.paginationAdvanced.onQuery(query, totalSize);
            }
        });
    }


    renderMain() {

        let _this = this;
        let tableData = {
            ths: ["任务ID", "任务名", "任务方案", "任务创建时间", "总影院数", "已处理影院数", "截止时间", "状态"],
            trs: []
        };

        $.each(_this.state.taskListData, function (index, item) {
            var tr = {
                id: item.id,
                name: function ($td) { //任务状态码 1：进行中 2：已完成 3：已关闭
                    let href = `/bd/task/task_detail?`;
                    let search = escape(`id=${item.id}&status=${item.state}`);
                    href = `${href}${search}`;
                    return <a href={href}>{item.name}</a>;
                },
                plan: item.plan,
                created: item.created,
                cinemaNum: item.cinemaNum,
                processedCinemaNum: item.processedCinemaNum,
                endTime: item.endTime,
                state: item.stateDesc
            };
            tableData.trs.push(tr);
        });
        return (

            <div>

                <MyTable data={tableData}></MyTable>
                <div className="pull-right">
                    <PaginationAdvanced onQueryHandler={_this.queryHandler.bind(_this)} ref='paginationAdvanced'/>
                </div>

            </div>
        )
    }


}







