<div class="modal fade" id="template-add-cinema" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <table id="table-cinema-added" class="table table-striped table-bordered table-hover z-table">
                    <thead>
                    <tr>
                        <td>影院ID</td>
                        <td>影院名</td>
                        <td>大区</td>
                        <td>城市</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <br/>
                <label>请输入影院ID：（多个影院时用英文逗号隔开）</label>
                <br/>
                <input class="J_ids-added"/>&nbsp;
                <button class="J_btn-show-cinemas">展示影院</button>
                <br/>

                <div class="wrap-fileUploader inline-block">
                    <input type="file" class="m10 J_input-upload hide"/>
                    <button type="button" class="J_btn-upload">上传txt文件，每行写一个影院id</button>
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
