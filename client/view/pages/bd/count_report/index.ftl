<style>
    a, .day, th {
        cursor: pointer;
    }

    button {
        vertical-align: bottom;
    }

    .pager {
        padding: 0;
        margin: 0;
        float: right;
    }

    .J_jumpToPages {
        width: 50px;
        margin: 0 5px;
    }

    .wrap-table th span {
        position: relative;
    }

    .wrap-table th span:before,.wrap-table  th span:after {
        content: "";
        display: block;
        position: absolute;
        right: -18px;
        border: 7px solid transparent;
        border-top: 7px solid rgb(186, 186, 186);
        height: 0;
        width: 0;
        margin-top: 1px;

    }

    .wrap-table th span:before {
        top: 50%;
        border: 7px solid transparent;
        border-top: 7px solid rgb(186, 186, 186);
        margin-top: 1px;
    }

    .wrap-table th span:after {
        bottom: 50%;
        border: 7px solid transparent;
        border-bottom: 7px solid rgb(186, 186, 186);
        margin-bottom: 1px;
    }

    .wrap-table th.up span:after {
        border-bottom-color: rgb(61, 61, 61);
    }

    .wrap-table th.down span:before {
        border-top-color: rgb(61, 61, 61);
    }

</style>



<#--搜索-->
<p class="wrap-search" style="position: relative;display: inline-block">
    <select class="J_dataType">
        <option checked value="1">核心数据</option>
        <option value="2">选座数据</option>
        <option value="3">选座新客数据</option>
        <option value="4">影院数据</option>
    </select>
    开始日期：<input class="startDate" type="text"/>&nbsp;&nbsp;&nbsp;&nbsp;
    结束日期：<input class="endDate" type="text"/>&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;
    <a class="J_this-mouth">当月</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a class="J_last-mouth">上个月</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a class="J_yesterday">昨天</a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a class="J_this-week">最近7天</a>
</p>

<p>
    分区：
    <select class="sub-region">
        <option value="0" selected>全部</option>
    </select>
    城市：<input class="city"/>&nbsp;&nbsp;&nbsp;&nbsp;
    BD：<input class="mis" type="text" placeholder="mis"/>&nbsp;&nbsp;&nbsp;&nbsp;


    影院ID/影院名：<input class="cinema"/>&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="J_search btn btn-default">查询</button>
    <input type="checkbox" name="hiddenAbnormal" class="J_hiddenAbnormal" checked/>隐藏专资异常数据
</p>

<#--翻页-->
<div class="wrap-pager clearfix">
    <span class="pager J_pager">
        <button class="J_previous btn btn-default" type="button">《《</button>
        <span>第 <span class="page_show">1</span>页</span>
        <button class="J_next btn btn-default" type="button"> 》》</button>
        <input class="J_jumpToPages" type="text"/><button class="J_jumpTo btn btn-default" type="button">跳转</button>
    </span>
</div>

<br/>
<#--详细表-->
<div class="wrap-table">

</div>
<script src="/plugin/typeahead/bootstrap3-typeahead.js"></script>
<script>
    $(function(){
        require([
            //page js
            "bd/count_report/js/count_report"
        ], function (countReport) {
            countReport.init();
        });
    })


</script>
