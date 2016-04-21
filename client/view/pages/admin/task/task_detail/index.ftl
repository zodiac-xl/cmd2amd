<style>


    a {
        cursor: pointer;
    }

    .container input[type='text'] {
        width: 80px
    }

    .right {
        float: right;
    }

    .back-to-list {
        margin: 20px 0;
    }

    .pager {
        float: right;
    }
    .disabled {
        border-color: transparent;
        cursor: not-allowed;
        pointer-events: none;
    }

    .disabled input {
        cursor: not-allowed !important;
    }

    #table-detail {
        width: 100%;
    }

    #table-cinema-added {
        width: 100%;
    }

    /*审核单*/
    #template-audit-task label {
        width: 12em;
        text-align: right;
        vertical-align: top;
        margin-bottom: 0;
    }

    #template-audit-task .modal-body>div {
        margin: 10px 0;
    }

    #template-audit-task .modal-body>hr {
        display: block;
        margin: 10px 0;
        border: 1px dashed rgb(153, 152, 152);
    }

    #template-audit-task .wrap-table {
        margin-left: 7em;
    }


    .reject-last {
        display: none;
        color: red;
    }

    .timeRanges, .wrap-movies-task, .attachments {
        display: inline-block;
    }

    .group-movies-task {
        display: flex;
    }

    .wrap-movies-task {
        flex: 1;
    }

    .files {
        display: inline-block;
    }

    textarea {
        height: inherit;
        width: 50%;
    }

</style>


<div>
    <a href="/admin/task/task_list">
        <button class="back-to-list btn btn-default">返回任务列表</button>
    </a>

    <div class="J_pager pager">
        <button class="J_previous btn btn-default">《《 上一页</button>
        <span>第 <span class="page_show">1/1</span>页</span>
        <button class="J_next btn btn-default">下一页 》》</button>
        <input class="J_jumpToPages" type="text"/>
        <button class="J_jumpTo btn btn-default">跳转</button>
    </div>
    <div class="warp-table-overview" style="width: 50%"></div>
    <div>
        <button class="J_btn-dele-cinema btn btn-default">删除</button>
        &nbsp;&nbsp;
        <button class="J_btn-add-cinema btn btn-default">追加影院</button>
        &nbsp;&nbsp;
        <button class="J_btn-export-excel btn btn-default">导出影院列表</button>
        <div class="right">
            大区：
            <select class="region">
                <option value="0" selected>全部</option>
            </select>
            分区：
            <select class="sub-region">
                <option value="0" selected>全部</option>
            </select>
            城市：<input class="city"/>
            影院ID/影院名：<input class="cinemaId"/>
            <button class="J_btn-query btn btn-default">查询</button>
        </div>
    </div>
</div>
<br>
<div class="warp-table-detail"></div>

<#include "./fragments/modal-audit-task.ftl">

<#include "./fragments/modal-add-cinema.ftl">
<#include "./fragments/modal-delete-cinema.ftl">

<#include "./fragments/modal-check-remark.ftl">



<#include "./fragments/script.ftl">








