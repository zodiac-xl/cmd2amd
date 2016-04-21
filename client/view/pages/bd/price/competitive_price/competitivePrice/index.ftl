<!--天天平价-->
<div id="competitivePrice">

    <div class='competitivePrice__search--bar'>
        <p class='time--line' style="position:relative;">
            <span class='time--select'>开始日期：<input type="text" class="weakCinema-startDate"></span>
            <span class='time--select'>结束日期：<input type="text" class="weakCinema-endDate"></span>
        </p>

        <p class="wrap-search cinema--line J__competitivePrice--search">
            <span class='type--select'>
                劣势竞对：<select class="riva"></select>
            </span>

            <span class='cinema--input'>
                影院ID/影院名：<input type="text" class="cinemaId" />
            </span>
            
            <button class="J_btn-search btn btn-default">查询</button>

            <span class="J_pager pager" style="float: right">
                <button class="J_previous btn btn-default" type="button">《《</button>
                <span>第 <span class="page_show">1/1</span>页</span>
                <button class="J_next btn btn-default" type="button"> 》》</button>
                <input class="J_jumpToPages" type="text" style="margin: 0 5px;"/><button class="J_jumpTo btn btn-default" type="button">跳转</button>
            </span>
        </p>
    </div>

    <div id='wrap-table-statistics'>
    </div>

    <div id="wrap-table-competitivePrice">

    </div>

    <!--modal-查看劣势场次-->
    <#include "./competitivePrice-rivalHall.ftl">

    <!--modal-查看更新处理进度-->
    <#include "./competitivePrice-handleUpdate.ftl">

    <!--modal-查看处理进度-->
    <#include "./competitivePrice-handleRecord.ftl">

</div>
