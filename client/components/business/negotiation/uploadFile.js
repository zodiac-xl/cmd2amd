import React, { Component }     from 'react';



import {Group,Left,Hr,Right}    from '../../common/form-group';
import Attachments              from '../../common/attachments';
import SimpleModal              from '../../common/simple-modal';


import bdAjax                   from '../../util/bdAjax';



//fragments
import TaskInfo                 from './task-info';
import PriceInfosTable          from './table-priceInfos';




export default class UploadFile extends SimpleModal {

    static defaultProps = {
        freshParent: function () {
        },

        taskId: null,
        cinemaId: null,
        cinemaName: null,
        taskInfo: null,

        title:'上传附件',
        bsSize:'large'
    };



    state = {
        //ui
        isLoading: false,
        show: true,

        files: []
    };


    submit(commmit) {
        let _this =this;
        let files = this.state.files;
        if (this.state.files.length == 0) {
            toastr.warning('请上传附件');
            return;
        }
        this.onSubmit({
            url: `/api/activity/task/${_this.props.taskId}/cinema/${_this.props.cinemaId}/negotiationInfo/files.json`,
            type: "POST",
            des: '上传附件',
            showSuccess:true,
            data: {files: JSON.stringify(files)},
        }).done(function (e) {
            _this.props.freshParent();
        })
    }


    renderBody() {

        let _this = this;

        let taskInfoProps = {
            ref: "taskInfo",
            taskInfo: _this.props.taskInfo,
            cinemaId: _this.props.cinemaId,
            cinemaName: _this.props.cinemaName,
            readOnly: true
        };

        return <div>

            <TaskInfo {...taskInfoProps}/>
            <Hr/>
            <PriceInfosTable cinemaId={_this.props.cinemaId} taskId={_this.props.taskId}/>

            <Hr/>
            <Attachments readOnly={false} label='调价函/调价邮件截图'
                         valueLink={_this.nestLinkedState(["files"],_this)}/>

            <Hr/>
        </div>;

    }
};
