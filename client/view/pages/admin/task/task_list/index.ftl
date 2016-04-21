<style>

    .name a {
        color: #3361a4;
    }

    .pager {
        float: right;
        margin: 20px 0 10px 0;
    }



    .disabled {
        border-color: transparent;
        cursor: not-allowed;
        pointer-events: none;
    }

    .disabled input {
        cursor: not-allowed !important;
    }


    .m10 {
        margin-bottom: 10px !important;
    }

    .block {
        display: block;
    }

    .inline-block {
        display: inline-block;
    }

    .clear:after {
        content: '.';
        visibility: hidden;
        height: 0;
        display: block;
        clear: both;
    }

    .J_btn-create-task {
        margin: 20px 0 10px 0;
    }

    #table-detail {

        width: 100%;
    }

    .endTime {
        width: initial;
    }

    .operate button {
        margin: 0 5px;
    }

    /*template-task*/
    #template-task label {
        width: 10em;
        text-align: right;
        vertical-align: top;
        margin-bottom: 0;
    }

    #template-task > div {
        margin-bottom: 10px;
    }


    #template-task textarea {
        height: 5em;
        border-color: rgb(200, 190, 190);
    }

    #template-task .label-movie {
        display: inline-block;
        width: initial;
        margin-right: 10px;
        border: 1px solid #4fb4e7;
        cursor: pointer;
    }

    #template-task .label-movie .close-label-movie {
        margin-left: 5px;
        border-left: 1px solid #4fb4e7;
    }

    .wrap-labels {
        max-width: 40em;
        vertical-align: top;
    }
    #template-task .modal-body>div{
        margin: 5px 0;
    }

    .J_node-time button {
        margin-left: 10px;
    }

    #template-task > div:last-child {
        border-top: 1px dashed #5C5D5E;
        padding-top: 10px;
    }

    .wrap-checkbox {
        margin-top: 5px;
    }

    .wrap-checkbox > div {
        text-align: right;
        margin-bottom: 5px;
    }

    .wrap-checkbox input {
        width: 60px;
    }

    .wrap-checkbox > div:first-child input:not([disabled]) {
        margin-right: 54px;
    }

</style>


<div>
    <button class="J_btn-create-task">新建任务</button>

        <span class="pager J_pager">
            <button class="J_previous">《《 上一页</button>
            <span>第 <span class="page_show">1</span>页</span>
            <button class="J_next">下一页 》》</button>
            <input class="J_jumpToPages" type="text"/>
            <button class="J_jumpTo">跳转</button>
        </span>
</div>

<div class="wrap-table"></div>

<#include "./fragments/modal-task.ftl">

<#include "./fragments/modal-close-task.ftl">

<#include "./fragments/modal-delete-task.ftl">



<#include "./fragments/script.ftl">