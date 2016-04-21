<div id="updatePriceApply" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn btn-default pull-right" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">关闭</span>
                </button>
                <div id="priceEditMode">
                    <button id="priceApplySubmit" type="button" class="btn btn-default pull-right">
                        <span>提交</span>
                    </button>
                    <button type="button" id="newPartTimePrice" class="btn btn-default pull-right">
                        <span>新增分时段定价</span>
                    </button>
                </div>
                <div id="priceViewMode">
                    <button id="cancelPriceApplyBtn" data-id="0" type="button" class="btn btn-danger cancelPriceApply pull-right">
                        取消调价申请
                    </button>
                    <button id="updatePriceApplyModalBtn" type="button" class="btn btn-info pull-right">
                        修改调价申请
                    </button>
                </div>
                <ul id="partTimeTabs" class="nav nav-tabs tab-price part-time-tabs" role="tablist">
                    <li class="active">
                        <a href="#baseInfo" data-toggle="tab">基础信息</a>
                    </li>
                </ul>
                <!-- <h4 class="modal-title">修改调价申请</h4> -->
            </div>
            <div class="modal-body timePrice">
                <div id="priceTabs" class="tab-content price-tabs">
                    <div id="baseInfo" class="tab-pane active" role="tabpanel">
                        <div class="tble">
                            <input id="priceApplyIdHidden" type="hidden" value="0"/>

                            <p class="warning-message text-center">调价内容以“分时段价格”标签下填写内容为准，提交前请仔细核对。</p>
                            <p class="warning-message text-center designationSystemTips">
                                该售票系统影院可自行调价，低于最低限价且差额部分由影城承担的调价可正常申请。
                            </p>
                            <p id="rejectMessage" class="warning-message">
                                <span class="lefttble">驳回原因：</span>
                                <span class="righttble rejectMsg"></span>
                            </p>

                            <div><span class="lefttble">影院ID：</span><span class="righttble cinemaId">99</span></div>
                            <div><span class="lefttble">影院名：</span><span class="righttble cinemaName">UME国际影城（安贞店）</span>
                            </div>
                            <!--<div>
                                <span class="lefttble"> 参与调价影厅：</span>
                                <span class="righttble halls">
                                    <label><input id="checkboxAll" type='checkbox' name='hall' value='0'/>全部&nbsp;&nbsp;
                                    </label>
                                </span>
                            </div>-->
                            <div><span class="lefttble"> 备注：</span><span class="righttble">
                                    <textarea class="form-control backup" name="backup" id="" cols="30" rows="10"
                                              placeholder="本次调价申请的生效时间默认为开始调价时间。如有特殊要求请在此说明。"> </textarea></span></div>
                            <div>
                                <span class="lefttble">调价函/调价邮件截图：</span>
                                    <span class="righttble picUpload">
                                        <input id="uploadPicFile" type="file" name="file" onchange="home.fileChange()"/>
                                        <button id="uploadPicBtn" class="btn btn-sm btn-primary" type="button">上传文件</button>
                                        <br/>
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="modal-footer">
                <button id="priceApplySubmit" data-loading-text="修改中..." type="button" class="btn btn-info"
                    autocomplete="off">确认修改
                </button>
            </div>-->
            <div id="loading">
                <img src="/images/loading.gif" alt="上传中..."/>
            </div>
        </div>
    </div>
</div>
<!--更新调价申请-->
