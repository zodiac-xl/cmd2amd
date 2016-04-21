<#--modal-查看更新劣势反馈-->
<div class="modal fade" id="showHandleUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">劣势反馈</h4>
            </div>
            <div class="modal-body">
				<div class='form'>
					<div class="form-field">
						<label class='form-label'>处理方案：</label>
						<div>
							<label><input type='radio' class='J__select--weak' name='solutionType' value='1' />确认劣势，跟进处理</label>
							<label><input type='radio' class='J__select--notweak' name='solutionType' value='2' />非劣势，无需处理</label>
						</div>
					</div>
					<div class='J__weak'>
						<div class="form-field">
							<label class='form-label'>跟进人：</label>
							<div>
								<label><input type='radio' class='J__weak__peolpel--KA' name='followUpPersonType' value='1' />KA对接</label>
								<label><input type='radio' class='J__weak__peolpel--BD' name='followUpPersonType' value='2' />BD跟进</label>
							</div>
						</div>
						<div class="form-field">
							<label class='form-label'>处理进度：</label>
							<div>
								<label><input type='radio' class='J__weak__status--in' name='followUpSchedule' value='1' />跟进处理中</label>
								<label><input type='radio' class='J__weak__status--not' name='followUpSchedule' value='2' />暂时无法解决</label>
								<label><input type='radio' class='J__weak__status--close' name='followUpSchedule' value='3' />已解决</label>
							</div>
						</div>
						<div class="form-field J__status--not__reason">
							<label class='form-label'>原因：</label>
							<div class='status--not__reason'>
								<label><input type='radio' name='insolvableReason' value='1' />竞对给予更优补贴</label>
								<label><input type='radio' name='insolvableReason' value='2' />无法满足影院需求</label>
								<label><input type='radio' name='insolvableReason' value='100' />其他</label>
							</div>
						</div>
					</div>
					<div class='J__notweak'>
						<div class="form-field">
							<label class='form-label'>原因：</label>
							<div class='notweak__reason'>
								<label><input type='radio' name='noWeakReason' value='1' />结算价无劣势，竞对针对影院全场补贴</label>
								<label><input type='radio' name='noWeakReason' value='2' />结算价无劣势，竞对针对影院部分影片补贴</label>
								<label><input type='radio' name='noWeakReason' value='3' />猫眼正常结算价未生效</label>
								<label><input type='radio' name='noWeakReason' value='4' />结算价无劣势，系统误报</label>
								<label><input type='radio' name='noWeakReason' value='100' />其他</label>
							</div>
						</div>
						<div class="form-field">
							<label class='form-label'>上传附件：</label>
	                        <div class="upload__file">
	                            <button id="haneleUpdateUploadFileBtn" class="btn btn-sm btn-primary">选择附件</button>
	                            <input id="haneleUpdateUploadFile" class='upload--file' type="file" name="file" />
	                            <div id='handleUpdateFileContainer'>
	                            </div>
	                        </div>
						</div>
					</div>
					<div class="form-field">
						<label class='form-label'>备注：</label>
						<textarea></textarea>
					</div>
				</div>

            </div>
            <div class="modal-footer">
		        <button type="button" class="btn btn-primary J__submit--handle--update">提交</button>
		        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	      	</div>
        </div>
    </div>
</div>
