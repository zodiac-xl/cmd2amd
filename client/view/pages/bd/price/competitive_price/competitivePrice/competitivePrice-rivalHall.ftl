<#--modal-查看劣势场次-->
<div class="modal fade" id="showRivalHall" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">价格劣势场次</h4>
            </div>
            <div class="modal-body">
                <p>
                    影院ID：<span class="cinemaId"></span>
                    影院名：<span class="cinemaName"></span>
                    城市：<span class="city"></span>
                </p>


                <p class="wrap-search">
                    <div style="position:relative;">
                        开始日期：<input type="text" class="weakHall-startDate">
                        结束日期：<input type="text" class="weakHall-endDate">
                    </div>
                    <div>
                        劣势竞对：<select class="riva"></select>
                        <button class="J_btn-rival-search">查询</button>
                        <button class="J_btn-rival-handle">处理</button>

                         <span class="J_pager pager">
                            <button class="J_previous" type="button">《《</button>
                            <span>第 <span class="page_show">1/1</span>页</span>
                            <button class="J_next" type="button"> 》》</button>
                            <input class="J_jumpToPages" type="text"/><button class="J_jumpTo" type="button">跳转</button>
                        </span>
                    </div>
                </p>

                <div id="wrap-table-rival-hall">

                </div>
            </div>
        </div>
    </div>
</div>
