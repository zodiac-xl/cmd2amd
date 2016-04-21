<#include "../style.ftl">
<div class="wrap-btns">
    <a href="/admin/org-manage/region" class="J_backToParent">
        <button class="btn btn-default">返回大区列表</button>
    </a>
</div>
<br>

<div>
    大区：<span class="nav-parent"></span>
</div>
<br>

<div class="wrap-table">

</div>

<div class="modal fade" id="add-region" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div>
                    <label>分区：</label>
                    <input class="name" placeholder="请填写分区名">
                </div>
                <br>
                <div>
                    <label>分区经理：</label>

                    <div>
                        <input class="mis">

                        <div class="wrap-labels"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" data-loading-text="确认中..." class="btn btn-submit  btn-default btn-info"
                        data-style="expand-right">确认
                </button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="edit-region" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div>
                    <label>分区：</label>
                    <div>
                        <input class="name">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" data-loading-text="确认中..." class="btn btn-submit  btn-default btn-info"
                        data-style="expand-right">确认
                </button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="move-region" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div>
                    <label>当前分区：</label>
                    <span class="name"></span>
                </div>
                <br>
                <div>
                    <label>移动至：</label>

                    <div>
                        <input class="parentId" placeholder="请填写大区名,进行模糊搜索">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" data-loading-text="确认中..." class="btn btn-submit  btn-default btn-info"
                        data-style="expand-right">确认
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="dele-region" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div class="text-danger">该操作会删除分区及分区以下所有BD</div>
                <div>
                    确认删除<span class="region text-danger"></span>吗？
                </div>
                <input class="id" type="hidden">
            </div>
            <div class="modal-footer">
                <button type="button" data-loading-text="确认中..." class="btn btn-submit btn-default btn-info"
                        data-style="expand-right">确认
                </button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="add-mis" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div>
                    <label>分区：</label>
                    <span class="region"></span>
                </div>
                <div>
                    <label>分区经理：</label>

                    <div>
                        <input class="mis">

                        <div class="wrap-labels"></div>
                    </div>
                    <input class="id" type="hidden">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" data-loading-text="确认中..." class="btn btn-submit  btn-default btn-info"
                        data-style="expand-right">确认
                </button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="dele-mis" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div>
                    确认删除分区经理<span class="mis text-danger"></span>吗？
                </div>
                <input class="id" type="hidden">
            </div>
            <div class="modal-footer">
                <button type="button" data-loading-text="确认中..." class="btn btn-submit btn-default btn-info"
                        data-style="expand-right">确认
                </button>
            </div>
        </div>
    </div>
</div>




<#include "../script.ftl">