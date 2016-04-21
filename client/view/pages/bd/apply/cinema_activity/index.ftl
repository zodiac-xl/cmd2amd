<#include "/common/setting.ftl">

<#include "./fragments/componentsContainer.ftl">


<div id="cinemaActivity" style="padding: 20px">
    <div class='bar-search'>
        <p class='time-line' style="position: relative">
            开始日期：<input type="text" data-datepicker class="J_startTime">
            &nbsp;&nbsp;
            结束日期：<input type="text" data-datepicker class="J_endTime">
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="J_thisWeek">本周</a>
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="J_lastWeek">上周</a>

            <button class="btn btn-default J_create_cinema_activity  pull-right">申请活动</button>

        </p>
        <p class="wrap-search">
            分区：
            <select class="sub-region">
                <option value="0" selected>全部</option>
            </select>
            城市：<input class="city">
            &nbsp;&nbsp;影院ID/影院名：<input type="text" class="id-cinema"/>
            &nbsp;&nbsp;
            <button class="J_btn-search btn btn-default">查询</button>
        </p>
        <div class='wrap-table-overview' style="width: 50%">

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
                <input class="J_jumpToPages" type="text" style="margin: 0 5px;"/><button class="J_jumpTo btn btn-default" type="button">跳转</button>
            </span>
        </p>


    </div>
    <div class="wrap-table-cinemaActivity">

    </div>

</div>
<script src="/business/cinema_activity/cinema_activity.js"></script>