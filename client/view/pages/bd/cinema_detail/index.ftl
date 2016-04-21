<style>

    .nav-tabs > li:first-child, .cinema-info {
        margin-left: 20px;
    }

    .cinema-info {
        margin-bottom: 20px;
    }

    .tab-pane {
        padding: 20px;
    }

    .J_synchronize {
        float: right;
    }

    .movie-info {
        margin-top: 20px;
        margin-bottom: 20px;
        padding-top: 20px;
        border-top: 1px dashed black;
    }

    .wrap-table {
        width: 70%;
    }

    .group {
        border-top: 1px dashed black;
        padding-top: 20px;
        margin-top: 20px;
    }

    .group > div {
        margin: 5px 0;
    }

    .group .label-1 {
        display: inline-block;
        width: 10em;
        text-align: right;
    }

    .group .text-1 {
        display: inline-block;
        min-width: 20em;
        vertical-align: top;
    }

    form.cinema-deatail-info label:first-child {
        width: 80px;
        text-align: right;
    }
    form.cinema-deatail-info label:nth-child(2) {
        width: 125px;
    }
    form.cinema-deatail-info > div {
        width: 70%;
        display: flex;
        margin: 10px 0;
    }
    form.cinema-deatail-info > div input[type=text] {
        flex: 1;
    }
    .feacture-halls > div {
        width: 70%;
        display: flex;
        margin: 10px 0;
    }
    .feacture-halls > div > label:first-child {
        width: 80px;
    }
    .feacture-halls > div > label:nth-child(2) {
        width: 125px;
    }
    .feacture-halls > div > input {
        flex: 1;
    }
    form input[type=text] {
        width: 300px;
    }
    #cinema_deatail_info .column2 {
        color: red;
    }
    .glyphicon {
        color: black;
        cursor: pointer;
    }
</style>

<div class="cinema-info">
    影院ID：<span class="cinema-id"></span>
    &nbsp;&nbsp;&nbsp;&nbsp;影院名：<span class="cinema-name"></span>
    &nbsp;&nbsp;&nbsp;&nbsp;城市：<span class="city"></span>
    &nbsp;&nbsp;&nbsp;&nbsp;售票系统：<span class="system"></span>
</div>

<!-- Nav tabs -->
<ul class="nav nav-tabs">
    <li role="" class="active">
        <a href="#cinema_deatail_info" aria-controls="cinema_deatail_info" role="tab" data-toggle="tab">影院信息</a>
    </li>

    <li role="presentation" class="">
        <a href="#movies_info" aria-controls="movies_info" role="tab" data-toggle="tab">影讯</a>
    </li>

    <li role="presentation" class="dropdown">
        <a id="dLabel" data-target="#" data-toggle="dropdown" role="button" aria-haspopup="true"
           aria-expanded="false">
            合同
            <span class="caret"></span>
        </a>

        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li role="presentation">
                <a href="#base_info" aria-controls="base_info" role="tab" data-toggle="tab">基本信息</a>
            </li>
            <li role="presentation">
                <a href="#related_cinemas" aria-controls="related_cinemas" role="tab" data-toggle="tab">关联影院</a>
            </li>
        </ul>
    </li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="cinema_deatail_info">
        <div>
            <div class="search" style="position:relative;">
                <div class="wrap-table detailInfoTable">

                </div>
                <div style="width: 70%;">
                    <input type="button" style="margin-bottom: 15px;" class="pull-right" onclick="window.open('http://mdc.sankuai.com/')" value="修改基础信息" />
                </div>
                <br />
                <form class="cinema-deatail-info">
                    <div>
                        <label style="vertical-align: top;">影院公告：</label>
                        <textarea type="text" name="note" style="width: 100%; height: 100px; flex: 1;" placeholder="请填写公示说明，例如：周三女士半价；周五学生证半价，影城内请勿吸烟，勿带宠物进入影厅等"></textarea>
                    </div>
                    <div>
                        <label>2D参考价：</label>
                        <input type="text" name="rpFor2D" placeholder="填写数字,无选座时向用户展示" />
                        <label>3D参考价：</label>
                        <input type="text" name="rpFor3D" placeholder="填写数字,无选座时向用户展示" />
                    </div>
                    <div>
                        <label>3D眼镜：</label>
                        <label>
                            <input type="checkbox" name="3dglass" tag="免押金" />
                            免押金
                        </label>
                        <input type="text" tag="免押金" placeholder="请输入备注信息" />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" name="3dglass" tag="需押金" />
                            需押金
                        </label>
                        <input type="text" tag="需押金" placeholder="请输入押金金额，例如：100元" />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" name="3dglass" tag="自费购买" />
                            自费购买
                        </label>
                        <input type="text" tag="自费购买" placeholder="请输入购买价格，例如：30元/副" />
                    </div>
                    <div>
                        <label>停车信息：</label>
                        <label>
                            <input type="checkbox" tag="可停车" />
                            可停车
                        </label>
                        <input type="text" tag="可停车" placeholder="请填写停车场位置，以及是否免费或凭票根免费，免费多久。举例：商场地下一层有停车场，23:30前停车免费，23:30后凭票跟免费停车3小时" />
                    </div>
                    <div>
                        <label>儿童优惠：</label>
                        <label>
                            <input type="checkbox" tag="儿童票" />
                            儿童票
                        </label>
                        <input type="text" tag="儿童票" placeholder="举例：1.3m（不含）以下儿童观看2D影片免费无座，观看儿童片、3D影片 、VIP厅影片需购票" />
                    </div>
                    <div>
                        <label>情侣座：</label>
                        <label>
                            <input type="checkbox" tag="有情侣座" />
                            有情侣座
                        </label>
                        <input type="text" tag="有情侣座" placeholder="请填写哪些厅有情侣座，举例：3号厅、5号厅和情侣厅有情侣座" />
                    </div>
                    <div>
                        <label>WIFI：</label>
                        <label>
                            <input type="checkbox" tag="有WIFI" />
                            有WIFI
                        </label>
                        <input type="text" tag="有WIFI" placeholder="请填写备注信息，例如：影院有免费WiFi" />
                    </div>
                    <hr />
                </form>
                <div class="isShownFeactureHalls feacture-halls">
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="IMAX厅" disabled />
                            IMAX厅：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="符合IMAX技术规范，采用IMAX放映设备，可放映IMAX片源"></span>
                        <input type="text" tag="IMAX厅" disabled />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="4K厅" disabled />
                            4K厅：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="采用4K放映设备，可以播放4K片源，也兼容2K片源"></span>
                        <input type="text" tag="4K厅" disabled />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="中国巨幕厅" disabled />
                            中国巨幕厅（DMAX）：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="符合IMAX技术规范，采用IMAX放映设备，可放映IMAX片源"></span>
                        <input type="text" tag="中国巨幕厅" disabled />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="杜比全景声厅" disabled />
                            杜比全景声厅：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="杜比全景声提供自然逼真的全方位声场"></span>
                        <input type="text" tag="杜比全景声厅" disabled />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="巨幕厅" disabled />
                            巨幕厅：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="院线自主投资巨幕，如：幸福蓝海UHD巨幕，万达院线X-Land，世茂SPC等（与IMAX和中国巨幕重要区别是没有专用的巨幕片源，清晰度、亮度、对比度等指标都会有所下降）"></span>
                        <input type="text" tag="巨幕厅" disabled />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="real D厅" disabled />
                            real D厅：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="RealD公司提供播放设备，亮度是普通3D放映设备的两倍，解决3D电影普遍亮度偏低的问题"></span>
                        <input type="text" tag="real D厅" disabled />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="4D厅" disabled />
                            4D厅：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="有震动或其他体验效果"></span>
                        <input type="text" tag="4D厅" disabled />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="4DX厅" disabled />
                            4DX厅：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="韩国CJ集团旗下研发的4D影厅。动感座椅配合下雨、喷雾等全方位环境感受"></span>
                        <input type="text" tag="4DX厅" disabled />
                    </div>
                    <div>
                        <label></label>
                        <label>
                            <input type="checkbox" tag="双机3D厅" disabled />
                            双机3D厅：
                        </label>
                        <span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" title="两台放映机进行3D放映，相较于单机3D，立体感强、亮度高"></span>
                        <input type="text" tag="双机3D厅" disabled />
                    </div>
                </div>
                <div style="width: 70%; height: 40px">
                    <input type="button" class="save_cinema_deatail_info pull-right" value="保存修改" />
                </div>
                <div class="isShownHalls">
                    <div class="wrap-table hallsTable">

                    </div>
                    <div style="width: 70%">
                        <input type="button" class="syncBtns pull-right" value="同步影厅和座位图" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div role="tabpanel" class="tab-pane" id="movies_info">
        <div>
            <div class="search" style="position:relative;">
                日期：<input class="date-search" type="text">
                &nbsp;&nbsp;
                <button class="J_search">查询</button>
                <button class="J_synchronize">同步影讯</button>
            </div>
        </div>
        <div class="wrap-info">

        </div>
    </div>
    <div role="tabpanel" class="tab-pane" id="base_info">
        <h4>基本信息</h4>

        <div class="group">
            <div>
                <span class="label-1">合同名称：</span>
                <span class="text-1" data-text="name"></span>
                <span class="label-2">合同编号：</span>
                <span class="text-2" data-text="code"></span>
            </div>
        </div>
        <div class="group">
            <div>
                <span class="label-1">甲方：</span>
                <span class="text-1" data-text="partyAName"></span>
                <span class="label-2">甲方邮编：</span>
                <span class="text-2" data-text="partyAPostcode"></span>
            </div>
            <div>
                <span class="label-1">城市：</span>
                <span class="text-1" data-text="city"></span>
            </div>
            <div>
                <span class="label-1">甲方地址：</span>
                <span class="text-1" data-text="partyAAddress"></span>
            </div>
            <div>
                <span class="label-1">甲方座机：</span>
                <span class="text-1" data-text="partyATelephone"></span>
                <span class="label-2">甲方传真：</span>
                <span class="text-2" data-text="partyAFax"></span>
            </div>
            <div>
                <span class="label-1">甲方联系人：</span>
                <span class="text-1" data-text="partyAContact"></span>
                <span class="label-2">联系方式：</span>
                <span class="text-2" data-text="partyAMobile"></span>
            </div>
        </div>

        <div class="group">
            <div>
                <span class="label-1">乙方：</span>
                <span class="text-1" data-text="partyBName"></span>
            </div>
            <div>
                <span class="label-1">负责BD：</span>
                <span class="text-1" data-text="bdName"></span>
                <span class="label-2">联系方式：</span>
                <span class="text-2" data-text="bdPhone"></span>
            </div>
        </div>

        <div class="group">
            <div>
                <span class="label-1">合同签订日期：</span>
                <span class="text-1" data-text="signDate"></span>
            </div>
            <div>
                <span class="label-1">合同有效期：</span>
                <span class="text-1" data-text="validDate"></span>
            </div>
            <div>
                <span class="label-1">合同总保量：</span>
                <span class="text-1" data-text="quantity"></span>
            </div>
            <div>
                <span class="label-1">合同总押金：</span>
                <span class="text-1" data-text="deposit"></span>
            </div>
            <div>
                <span class="label-1">合同总预付：</span>
                <span class="text-1" data-text="prepayment"></span>
            </div>
        </div>

        <div class="group">
            <div>
                <span class="label-1">合同：</span>
                <span class="text-1" data-attachments="contractFiles">

                </span>
            </div>
            <div>
                <span class="label-1">补充协议：</span>
                <span class="text-1" data-attachments="supplementalAgreementFiles">

                </span>
            </div>
        </div>

    </div>
    <div role="tabpanel" class="tab-pane" id="related_cinemas">
        <h4>关联影院</h4>

        <div class="wrap-table">

        </div>
    </div>
</div>



<#--模板集合-->
<div id="templates" class="hide">
    <div class="movie-info">
        <div>影片名：<span class="movie-name"></span></div>
        <br>

        <div class="wrap-table">

        </div>
    </div>
</div>

<script>
    require(["/bd/cinema_detail/js/cinema_detail.js"], function (cinemaDetail) {
        cinemaDetail.init();
    });
</script>
