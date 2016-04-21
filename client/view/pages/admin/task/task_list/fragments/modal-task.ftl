
<div class="modal fade" id="template-task" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <input name="id" value="0" class="hide"/>
                <br>

                <div>
                    <label>审核类型：</label>&nbsp;<span class="wrap-auditType"><input name="auditType" type="radio" value="1" checked/>&nbsp;需要审核&nbsp;&nbsp;&nbsp;&nbsp;<input
                        name="auditType" type="radio" value="2"/>&nbsp;无需审核</span>
                </div>
                <div>
                    <label>调价类型：</label>&nbsp;<span class="wrap-type"><input name="type" type="radio" value="2" checked/>&nbsp;需要调价&nbsp;&nbsp;&nbsp;&nbsp;<input
                        name="type" type="radio" value="1"/>&nbsp;无需调价</span>
                </div>
                <div>
                    <label>任务名称：</label>&nbsp;<input name="name" data-warn="请填写任务名称"/>
                </div>
                <div>
                    <label>任务方案：</label>&nbsp;<textarea name="plan" data-warn="请填写任务方案"></textarea>
                </div>
                <div class="for-adjust-price">
                    <label>参与任务影片：</label>

                    <div class="inline-block wrap-labels  inline-block">
                        <label class="label-movie m10 all">全部影片</label>
                        <br/>
                        <input id="movieSuggest"/>
                    </div>
                </div>
                <div class="nodes-time for-adjust-price">
                    <label>任务时间：</label>

                    <div class="inline-block wrap-nodes-time inline-block">
                        <div class="J_node-time m10 first" style="position: relative">
                            <input class="startTime-task J_dateTimePicker" data-warn="请填写任务开始时间" />&nbsp;一&nbsp;<input
                                class="endTime-task J_dateTimePicker"  data-warn="请填写任务结束时间"/>
                            <button>增加时段</button>
                        </div>
                    </div>
                </div>
                <div style="position:relative;">
                    <label>截止时间：</label>&nbsp;<input name="endTime" class="J_dateTimePicker" data-warn="请填写影院汇总截止时间" />
                </div>
                <div class="wrap-file ">
                    <label>参与任务影院：</label>

                    <div class="wrap-fileUploader inline-block">
                        <input class="hide m10" id="fileIds" name="cinemas"/>
                        <input type="file" class="m10 hide" accept="text/plain"/>
                        <button type="button" class="btn-upload">上传txt，每行写一个影院id</button>
                    </div>
                </div>
                <div class="wrap-file-img">
                    <label>上传附件：</label>

                    <div class="wrap-fileUploader inline-block">
                        <input type="file" class="m10 hide" accept="*"/>
                        <button type="button" class="btn-upload">选择附件</button>
                        <div class="attachments">
                        </div>
                    </div>
                </div>
                <div class="wrap-feedback">
                    <div>
                        <label>需BD反馈内容：</label>
                        （可选）
                    </div>
                    <div>
                        <label>必填项表头：</label>

                        <div class="inline-block">
                            <div class="m10">
                                <input class="mustFill">&nbsp;&nbsp;
                                <button class="btn-default btn J_btn-add">增加</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>必选项表头：</label>

                        <div class="inline-block">
                            <div class="m10">
                                <input class="mustChoose">&nbsp;&nbsp;
                                <button class="btn-default btn J_btn-add">增加</button>
                                <div class="wrap-checkbox ">
                                    <div>
                                        选项：<input class="option-mustChoose unnecessary" data-warn="请填写选项">&nbsp;&nbsp;
                                    </div>

                                    <div>
                                        <input class="option-mustChoose unnecessary" data-warn="请填写选项">&nbsp;&nbsp;
                                        <button class="btn-default btn J_btn-add">增加</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>非必填项表头：</label>

                        <div class="inline-block">
                            <div class="m10">
                                <input class="notMustFill">&nbsp;&nbsp;
                                <button class=" btn-default btn J_btn-add">增加</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" data-loading-text="确认中..." class="btn btn-submit btn-default btn-info"
                        data-style="expand-right">确认
                </button>
            </div>
        </div>
    </div>
</div>