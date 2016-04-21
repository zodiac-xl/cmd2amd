import React                    from 'react';
import ReactDOM                 from 'react-dom';
import Apply                    from '../../../../components/business/apply/apply';
import RecordForm               from '../../../../components/business/record-form/record-form';
import Page, {page}             from '../../../../components/layout/page-transition-layout'

@page
export default
class CinemaActivity extends Page {

}


$(function () {

    let $body = $("body");
    let applyContainer = document.getElementById("container-apply");
    let applyRecordContainer = document.getElementById("container-record-apply");


    //多影院新建申请操作
    $body.delegate(".J_create_cinema_activity", "click", function () {
        ReactDOM.unmountComponentAtNode(applyContainer);
        let component = ReactDOM.render(
            <Apply/>,
            applyContainer
        );
    });


    //申请操作
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
            versionType: apply.versionType,
            applyType: apply.applyType,
            operateType: apply.operateType,
            cinemaId: cinemaId,
            checkAndEdit:apply.checkAndEdit,
            cinemaName: cinemaName

        };
        $(applyContainer).data('apply',apply);
        ReactDOM.unmountComponentAtNode(applyContainer);
        let component = ReactDOM.render(
            <Apply {...props}/>,
            applyContainer
        );
    });


    //申请记录
    $body.delegate(".J_record-apply", "click", function () {
        let $_this = $(this);
        let apply = $_this.closest("td").data("apply");
        let props = {
            applyId: apply.applyId,
            applyType: 1,
            versionType: apply.versionType,
            cinemaId: apply.cinemaId,
            cinemaName: apply.cinemaName,
            checkApply:function(record){

            }
        };
        $(applyRecordContainer).data('apply',apply);
        ReactDOM.unmountComponentAtNode(applyRecordContainer);
        let component = ReactDOM.render(
            <RecordForm {...props} />,
            applyRecordContainer
        );
    });


    //查看的时候可以修改
    $body.delegate('.J_checkAndEdit','click',function(){
        let apply = $(applyContainer).data('apply');
        let props = {
            applyId: apply.applyId,
            versionType: apply.versionType,
            applyType: apply.applyType,
            operateType: 'edit'

        };
        ReactDOM.unmountComponentAtNode(applyContainer);
        let component = ReactDOM.render(
            <Apply {...props}/>,
            applyContainer
        );
    })


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

