import React                from 'react';
import ReactDOM             from 'react-dom';

import {Group,Left,Right}   from '../../common/form-group.js';
import SimpleModal          from '../../common/simple-modal';


export default class EditPerformance extends SimpleModal {


    static defaultProps = {
        bdPerformanceId: null,
        bdCinemaPerformanceId: null,
        point: "",
        execution: "",
        score: "",
        performanceType: 0// 0 为整体绩效  1为poi绩效

    };


    getStateByProps(props) {

        let title;
        let url;
        let trDes;
        let id;
        let fieldLabelMap;
        let content;
        switch (props.performanceType * 1) {
            case 0:
                id = props.bdPerformanceId;
                title = "调整整体绩效";
                url = `/api/admin/performance/${id}.json`;
                fieldLabelMap = {
                    point: "目标：",
                    execution: "完成情况：",
                    score: "分数："
                };
                content = {
                    id: id,
                    point: props.point,
                    execution: props.execution,
                    score: props.score
                };
                break;
            case 1:
                id = props.bdCinemaPerformanceId;
                title = "调整POI绩效";
                url = `/api/admin/performance/cinemas/${id}.json`;
                fieldLabelMap = {
                    point: "目标：",
                    execution: "完成情况：",
                };
                content = {
                    id: id,
                    point: props.point,
                    execution: props.execution
                };
                break;
        }


        return {
            url:url,
            title: title,
            fieldLabelMap: fieldLabelMap,
            content: content,
            show:true
        }
    }

    submit() {
        let _this = this;

        let api = {
            url: _this.state.url,
            des: _this.state.title,
            type: "PUT",
            data: {
                content: JSON.stringify(_this.state.content)
            }
        };
        this.onSubmit(api).done(function () {
            _this.props.freshParent && _this.props.freshParent();
        });
    }

    renderBody() {
        let _this = this;
        let Groups = [];
        let fieldLabelMap = _this.state.fieldLabelMap;
        $.each(fieldLabelMap, function (key, value) {
            Groups.push(<Group key={key}>
                <Left style={{width:"6em"}}>{fieldLabelMap[key]}</Left>
                <Right>
                    <input type="text" ref={key}
                           valueLink={_this.nestLinkedState(["content",key],_this)} style={{
                                                    display:"inline-block",
                                                    width:"450px"
                                               }}/>
                </Right>
            </Group>);
        });
        return Groups;
    }

}
