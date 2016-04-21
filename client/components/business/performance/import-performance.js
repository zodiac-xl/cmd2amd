import React                from 'react';
import ReactDOM             from 'react-dom';

import format                   from 'date-format';

import {Group,Left,Right}   from '../../common/form-group.js';
import SimpleModal          from '../../common/simple-modal';


export default class ImportPerformance extends SimpleModal {


    static defaultProps = {
        type: 0,//请求的类型，0为分区经理1为BD
        targetId: 0,//绩效指标id,
        timeScreen: format("yyyyMM", new Date()),
        performanceType: 0,// 0 为整体绩效  1为poi绩效
        freshParent: function () {
        }
    };


    getStateByProps(props) {
        let title;
        let url;
        let trDes;
        switch (props.performanceType * 1) {
            case 0:
                title = "导入整体绩效";
                url = "/api/admin/performance/list.json"
                trDes = "mis帐号，目标，完成情况，分数。";
                break;
            case 1:
                title = "导入POI绩效";
                url = "/api/admin/performance/cinemas/list.json";
                trDes = "mis账号，影院id，目标，完成情况。";
                break;
        }

        return {
            title: title,
            url: url,
            trDes: trDes,
            show: true
        }
    }

    submit() {
        let _this = this;
        let data = new FormData(ReactDOM.findDOMNode(_this.refs.form));
        let api = {
            url: _this.state.url,
            des: _this.state.title,
            contentType: false,
            processData: false,
            type: "POST",
            data: data
        };
        this.onSubmit(api).done(function () {
            _this.props.freshParent && _this.props.freshParent();
        });
    }

    renderBody() {
        let _this = this;
        let danger = '';
        if (_this.props.performanceType == 1) {
            danger = <p className='text-danger'>请在导入整体绩效后再导入POI绩效</p>;
        }
        return <form ref="form">
            <div style={{"paddingLeft":"6em"}}>
                <input type="hidden" name="timeScreen" value={this.props.timeScreen}/>
                <input type="hidden" name="targetId" value={this.props.targetId}/>
                <input type="hidden" name="type" value={this.props.type}/>

                {danger}

                <p >请上传excel表格，从第一列起按列依次为：</p>

                <p>{_this.state.trDes}</p>

                <p/>

                <p>
                    上传excel：<input type='file' name="file"/>
                </p>
            </div>
        </form>;
    }

}
