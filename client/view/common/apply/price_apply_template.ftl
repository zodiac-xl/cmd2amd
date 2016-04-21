<#--模板集合-->
<div id="templates" class="hide">

<#--模板---分时段价格 -->
    <div id="template-price-tab">
        <li>
            <a href="#pricePaneTab" id="priceTab" data-toggle="tab">分时段价格</a>
        </li>
    </div>
    <div id="template-price-tab-panel">
        <div id="pricePaneTab" class="tab-pane" role="tabpanel">
            <div class="tble">
                <div class="timeRange">
                    <div class="timeSegment">
                        <div class="timeSegment-title">
                            <p>时段1:</p>
                        </div>
                        <div class="timeSegment-content">
                            <p>
                                场次开始日期：
                                <input class="startDate" param-datepicker-type="date" type="text" />
                                场次结束日期：
                                <input class="endDate" param-datepicker-type="date" type="text" />
                                <label>
                                    <input type="checkbox" name="checkbox" class="makeContractOffline" />
                                    至合同下线
                                </label>
                            </p>
                            <p>
                                时段：
                                <input class="startTime timepicker" type="text" />
                                结束时间：
                                <input class="endTime timepicker" type="text" />
                            </p>
                            <p class="weekdays">
                                星期：
                                <label>
                                    <input class="weekdays1" type="checkbox" /> 周一
                                </label>
                                <label>
                                    <input class="weekdays2" type="checkbox" /> 周二
                                </label>
                                <label>
                                    <input class="weekdays3" type="checkbox" /> 周三
                                </label>
                                <label>
                                    <input class="weekdays4" type="checkbox" /> 周四
                                </label>
                                <label>
                                    <input class="weekdays5" type="checkbox" /> 周五
                                </label>
                                <label>
                                    <input class="weekdays6" type="checkbox" /> 周六
                                </label>
                                <label>
                                    <input class="weekdays7" type="checkbox" /> 周日
                                </label>
                            </p>
                            <p>
                                <label class="addTips">若不同时段的定价相同，请点击</label>
                                <input type="button" value="增加" onclick="seat_price.addTimeRange(event);" />
                                <br/>
                                <label class="addTips">若不同时段的定价不同，请点击上方Tab栏的“新增分时段价格”按钮</label>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="wrap-settings-movies"></div>
            </div>
        </div>
    </div>

<#--模板---特殊厅价格设置 -->
    <div id="template-hall-special">
        <div class="hall-special">
            <div class="hall wrap-price-select">
                <div class="name-hall"></div>

                <div>
                    <input type="radio" name="price-special" class="price" value="0" checked>
                    不参加此次调价
                </div>
                <div>
                    <input type="radio" name="price-special" class="price" value="1">
                    最低限价
                <span class="wrap-input">
                    +
                    <input type="number" value="0" class="" data-warn="请正确输入最低限价"/>元</span>
                </div>
                <div>
                    <input type="radio" name="price-special" value="2"/>
                    协定价
                <span class="wrap-input">
                    <input type="number" data-warn="请正确输入协定价">元
                </span>
                </div>
                <div>
                    <input type="radio" name="price-special" value="3"/>
                    原价折扣
                <span class="wrap-input">
                    <input type="number" data-warn="请正确输入原价折扣" class="zeroToHundred">%
                    +
                    <input type="number" data-warn="请正确输入折扣后的加价">
                </span>
                </div>
                <div>
                    <input type="radio" name="price-special" value="4">
                    分版本定价
                    <div class="wrap-input types-cinema">

                    <#--normal 普通厅：2D、3D；-->
                    <#--IMAX厅：2D、3D、IMAX2D、IMAX3D；-->
                    <#--DMAX厅：2D、3D、巨幕2D、巨幕3D；-->
                    <#--4D厅：2D、3D、4D。-->
                        <div class="normal IMAX DMAX 4D">
                            2D
                            <select class="wrap-select">
                                <option value="0">不参加此次调价</option>
                                <option value="2">协定价</option>
                                <option value="3">原价折扣</option>
                                <option value="1">最低限价</option>
                            </select>
                            <span class="wrap-input-sl wrap-input-percent-symbol">
                                <input type="number" data-warn="请正确输入2D原价折扣" class="zeroToHundred">%
                            </span>
                            <span class="wrap-input-sl wrap-plus-symbol">
                                +
                            </span>
                            <input type="number" data-warn="请正确输入2D价"/>元
                        </div>

                        <div class="normal IMAX DMAX 4D">
                            3D
                            <select class="wrap-select">
                                <option value="0">不参加此次调价</option>
                                <option value="2">协定价</option>
                                <option value="3">原价折扣</option>
                                <option value="1">最低限价</option>
                            </select>
                            <span class="wrap-input-sl wrap-input-percent-symbol">
                                <input type="number" data-warn="请正确输入3D原价折扣" class="zeroToHundred">%
                            </span>
                            <span class="wrap-input-sl wrap-plus-symbol">
                                +
                            </span>
                            <input type="number" data-warn="请正确输入3D价"/>元
                        </div>

                        <div class="4D">
                            4D
                            <select class="wrap-select">
                                <option value="0">不参加此次调价</option>
                                <option value="2">协定价</option>
                                <option value="3">原价折扣</option>
                                <option value="1">最低限价</option>
                            </select>
                            <span class="wrap-input-sl wrap-input-percent-symbol">
                                <input type="number" data-warn="请正确输入4D原价折扣" class="zeroToHundred">%
                            </span>
                            <span class="wrap-input-sl wrap-plus-symbol">
                                +
                            </span>
                            <input type="number" data-warn="请正确输入4D价"/>元
                        </div>

                        <div class="IMAX">
                            IMAX2D
                            <select class="wrap-select">
                                <option value="0">不参加此次调价</option>
                                <option value="2">协定价</option>
                                <option value="3">原价折扣</option>
                                <option value="1">最低限价</option>
                            </select>
                            <span class="wrap-input-sl wrap-input-percent-symbol">
                                <input type="number" data-warn="请正确输入IMAX2D原价折扣" class="zeroToHundred">%
                            </span>
                            <span class="wrap-input-sl wrap-plus-symbol">
                                +
                            </span>
                            <input type="number" data-warn="请正确输入IMAX2D价"/>元
                        </div>
                        <div class="IMAX">
                            IMAX3D
                            <select class="wrap-select">
                                <option value="0">不参加此次调价</option>
                                <option value="2">协定价</option>
                                <option value="3">原价折扣</option>
                                <option value="1">最低限价</option>
                            </select>
                            <span class="wrap-input-sl wrap-input-percent-symbol">
                                <input type="number" data-warn="请正确输入IMAX3D原价折扣" class="zeroToHundred">%
                            </span>
                            <span class="wrap-input-sl wrap-plus-symbol">
                                +
                            </span>
                            <input type="number" data-warn="请正确输入IMAX3D价"/>元
                        </div>

                        <div class="DMAX">
                            巨幕2D
                            <select class="wrap-select">
                                <option value="0">不参加此次调价</option>
                                <option value="2">协定价</option>
                                <option value="3">原价折扣</option>
                                <option value="1">最低限价</option>
                            </select>
                            <span class="wrap-input-sl wrap-input-percent-symbol">
                                <input type="number" data-warn="请正确输入巨幕2D原价折扣" class="zeroToHundred">%
                            </span>
                            <span class="wrap-input-sl wrap-plus-symbol">
                                +
                            </span>
                            <input type="number" data-warn="请正确输入巨幕2D价"/>元
                        </div>
                        <div class="DMAX">
                            巨幕3D
                            <select class="wrap-select">
                                <option value="0">不参加此次调价</option>
                                <option value="2">协定价</option>
                                <option value="3">原价折扣</option>
                                <option value="1">最低限价</option>
                            </select>
                            <span class="wrap-input-sl wrap-input-percent-symbol">
                                <input type="number" data-warn="请正确输入巨幕3D原价折扣" class="zeroToHundred">%
                            </span>
                            <span class="wrap-input-sl wrap-plus-symbol">
                                +
                            </span>
                            <input type="number" data-warn="请正确输入巨幕3D价"/>元
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<#--模板---普通厅 -->
    <div id="template-hall-normal">
        <div class="hall-normal">
            <input type="checkbox" checked>
            <span class="name-hall"></span>
        </div>
    </div>

<#--模板---电影设置 -->
    <div id="template-settings-movies">
        <div class="settings-movies">
            <div class="form-group wrap-labels">
                <span class="left">
                    影片:
                </span>

                <div class="right">
                    <label class="label-movie m10 all">全部影片</label>
                    <br/>
                    <input class="movieSuggest form-control" placeholder="输入影片关键字，查找并选择需要调价的影片"/>
                </div>
            </div>
            <div class="form-group wrap-halls">
                <span class="left">影厅:</span>

                <div class="right">
                    <div class="clearfix wrap-halls-normal">
                        <div class="hall-all">
                            <input type="checkbox" name="all" checked>
                            <span class="name-hall">全部</span>
                        </div>
                    </div>

                    <div class="reminder">若特殊影厅不参加活动或价格不同，请取消勾选</div>
                </div>
            </div>

            <div class="form-group">
                <span class="left">结算价:</span>

                <div class="right wrap-price-select normal">
                    <div>
                        <input type="radio" name="price" class="price" value="1" checked>
                        最低限价
                        <span class="wrap-input">
                            +
                            <input type="number" value="0" class="necessary"
                                data-warn="请正确输入最低限价">元
                        </span>
                    </div>
                    <div>
                        <input type="radio" name="price" value="2">
                        协定价
                        <span class="wrap-input">
                            <input type="number" data-warn="请正确输入协定价">元
                        </span>
                    </div>
                    <div>
                        <input type="radio" name="price" value="3">
                        原价折扣
                        <span class="wrap-input">
                            <input type="number" data-warn="请正确输入原价折扣" class="zeroToHundred">%
                            +
                            <input type="number" data-warn="请正确输入折扣后的加价">
                        </span>
                    </div>
                    <div>
                        <input type="radio" name="price" value="4">
                        分版本定价
                        <div class="wrap-input types-cinema">
                            <div>
                                2D
                                <select class="wrap-select">
                                    <option value="0">不参加此次调价</option>
                                    <option value="2">协定价</option>
                                    <option value="3">原价折扣</option>
                                    <option value="1">最低限价</option>
                                </select>
                                <span class="wrap-input-sl wrap-input-percent-symbol">
                                    <input type="number" data-warn="请正确输入2D原价折扣" class="zeroToHundred">%
                                </span>
                                <span class="wrap-input-sl wrap-plus-symbol">
                                    +
                                </span>
                                <input type="number" data-warn="请正确输入2D价">元
                            </div>

                            <div>
                                3D
                                <select class="wrap-select">
                                    <option value="0">不参加此次调价</option>
                                    <option value="2">协定价</option>
                                    <option value="3">原价折扣</option>
                                    <option value="1">最低限价</option>
                                </select>
                                <span class="wrap-input-sl wrap-input-percent-symbol">
                                    <input type="number" data-warn="请正确输入3D原价折扣" class="zeroToHundred">%
                                </span>
                                <span class="wrap-input-sl wrap-plus-symbol">
                                    +
                                </span>
                                <input type="number" data-warn="请正确输入3D价">元
                            </div>
                            <p class="help-block">4D、巨幕、IMAX等特殊版本请在相应的特殊厅设置</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group halls-special">
                <span class="left">特殊厅结算价:</span>

                <div class="right">

                </div>
            </div>

            <div class="form-group">
                <span class="left">限价保护:</span>

                <div class="right warning-message">
                    <input type="checkbox" name="priceLimit">若结算价低于最低限价，则以最低限价结算
                    <div class="reminder">若低于最低限价部分由影院补贴，请取消勾选</div>
                </div>
            </div>

        </div>
    </div>

</div>