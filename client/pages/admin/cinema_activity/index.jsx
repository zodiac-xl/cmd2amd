import React                    from 'react';
import ReactDOM                 from 'react-dom';
import Apply                    from '../../../components/business/apply/apply';
import ApplyFormTemplate        from '../../../components/business/apply/apply-formTemplate';

import RecordForm               from '../../../components/business/record-form/record-form';
import Page, {page}             from '../../../components/layout/page-transition-layout'



@page
export default
class CinemaActivity extends Page {

}


$(function () {
    var $body = $("body");

    //申请操作
    var applyContainer = document.getElementById("container-apply");
    $body.delegate(".J_operate-apply", "click", function () {
        let $_this = $(this);
        let apply = $_this.closest("td").data("apply");
        let cinemaId = null;
        let cinemaName = null;
        if (apply.operateType == 'new') {
            cinemaId = apply.cinemaId;
            cinemaName = apply.cinemaName;
        }
        let props = {
            applyId: apply.applyId,
            applyType: apply.applyType,
            versionType: apply.versionType,
            operateType: apply.operateType,
            cinemaId: cinemaId,
            cinemaName: cinemaName,
            common: apply.common,
            custom: apply.custom
        };

        ReactDOM.unmountComponentAtNode(applyContainer);
        var component = ReactDOM.render(
            <Apply {...props}/>,
            applyContainer
        );

    });

    //BD反馈模板设置
    $(".J_edit-template").click(function () {
        var container = document.getElementById("container-apply-form-template");
        ReactDOM.unmountComponentAtNode(container);
        var component = ReactDOM.render(
            <ApplyFormTemplate/>,
            container
        );
    });


    //申请记录
    var applyRecordContainer = document.getElementById("container-record-apply");
    $body.delegate(".J_record-apply", "click", function () {
        var $_this = $(this);
        var apply = $_this.closest("td").data("apply");
        var props = {
            applyId: apply.applyId,
            applyType: 1,
            versionType: apply.versionType,
            cinemaId: apply.cinemaId,
            cinemaName: apply.cinemaName
        };
        ReactDOM.unmountComponentAtNode(applyRecordContainer);
        var component = ReactDOM.render(
            <RecordForm {...props} />,
            applyRecordContainer
        );
    });

    //申请记录中已上线 状态可以查看
    $body.delegate('.J_check_in_record-apply','click',function(){
        let $this = $(this);
        let props = {
            applyId: $this.data('applyid'),
            applyType:$this.data('applytype'),
            operateType: 'check'

        };
        ReactDOM.unmountComponentAtNode(applyRecordContainer);
        ReactDOM.unmountComponentAtNode(applyContainer);
        let component = ReactDOM.render(
            <Apply {...props}/>,
            applyContainer
        );
    })

});

