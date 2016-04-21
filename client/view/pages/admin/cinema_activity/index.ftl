<style>

    table td button{
        margin: 0 5px;
    }
    .wrap-table-overview {
        width: 50%;
    }
</style>
<div id="cinemaActivity">
    <div class='bar-search'>
        <p class='time-line' style="position: relative">
            <span class='time-select'>开始日期：<input type="text" data-datepicker class="J_startTime"></span>
            &nbsp;&nbsp;<span class='time-select'>结束日期：<input type="text" data-datepicker class="J_endTime"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="J_thisWeek">本周</a>
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="J_lastWeek">上周</a>
        </p>

        <div style="float: right">
            <button class="btn btn-default J_export">导出申请列表</button>
            <button class="btn btn-default J_edit-template">BD反馈模板设置</button>
        </div>

        <p class="wrap-search">
            大区：
            <select class="region">
                <option value="0" selected>全部</option>
            </select>
            &nbsp;&nbsp;分区：
            <select class="sub-region">
                <option value="0" selected>全部</option>
            </select>
            &nbsp;&nbsp;城市：<input class="city">
            &nbsp;&nbsp;影院ID/影院名：<input type="text" class="id-cinema"/>
            &nbsp;&nbsp;
            <button class="J_btn-search btn btn-default">查询</button>
        </p>
        <div class='wrap-table-overview'>

        </div>
        <p>
            状态：
            <select class="state">
                <option value="0" selected>全部</option>
                <option value="3">待BD一审</option>
                <option value="4">待BD二审</option>
                <option value="2">被驳回</option>
                <option value="6">待上线</option>
                <option value="7">已上线</option>
                <option value="9">待运营线下设置</option>
            </select>
             <span class="J_pager pager" style="float: right">
                <button class="J_previous btn btn-default" type="button">《《</button>
                <span>第 <span class="page_show">1/1</span>页</span>
                <button class="J_next btn btn-default" type="button"> 》》</button>
                <input class="J_jumpToPages " type="text"/><button class="J_jumpTo btn btn-default" type="button">跳转</button>
            </span>
        </p>

    </div>

    <div class="wrap-table-cinemaActivity">
    </div>
</div>

<div id="container-apply"></div>
<div id="container-apply-form-template"></div>
<div id="container-record-apply"></div>
<script>
    window.isAdmin = true;
</script>
<script src="/business/cinema_activity/cinema_activity.js"></script>