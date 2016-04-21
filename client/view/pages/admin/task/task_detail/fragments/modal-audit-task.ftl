
<div class="modal fade " id="template-audit-task" tabindex="-1" role="dialog" bsSize="large" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div>
                    <label>影院id：</label><span data-text="cinemaId"></span>
                </div>
                <div>
                    <label>影院名：</label><span data-text="cinemaName"></span>
                </div>
                <div>
                    <label>任务名称：</label><span data-text="taskName"></span>
                </div>
                <div>
                    <label>任务方案：</label><span data-text="plan"></span>
                </div>
                <div>
                    <label>任务时间：</label>

                    <div class="timeRanges">
                    </div>
                </div>
                <div class="group-movies-task">
                    <label>参与任务影片：</label>

                    <div class="wrap-movies-task">
                        <span class="movies-task">全部影片</span>
                    </div>
                </div>
                <div class="reject-last">
                    <label></label><span class="reason"></span>
                </div>
                <div class="wrap-attachments">
                    <label>附件：</label>

                    <div class="attachments"></div>
                </div>
                <hr>
                <div class="feedbacks">

                </div>
                <div class="wrap-pricePlans">

                </div>


                <hr>
                <div class="wrap-table">
                </div>
                <div>
                    <label>调价函/调价邮件截图：</label>

                    <div class="files"></div>
                </div>

                <hr>
                <div class="note">
                    <label>备注：</label><span></span>
                </div>
                <div class="reject hide">
                    <label>驳回原因：</label><textarea rows="3"></textarea>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" data-loading-text="审核通过中..." class="btn btn-submit btn-default btn-info"
                        data-style="expand-right">审核通过
                </button>
                <button type="button" data-loading-text="驳回中..." class="btn btn-reject btn-default btn-info"
                        data-style="expand-right">驳回
                </button>
            </div>
        </div>
    </div>
</div>