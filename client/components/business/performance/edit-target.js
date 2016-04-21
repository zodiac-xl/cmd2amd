import React                from 'react';
import ReactDOM             from 'react-dom';

import {Group,Left,Right}   from '../../common/form-group.js';
import SimpleModal          from '../../common/simple-modal';


export default class EditTarget extends SimpleModal {


    static defaultProps = {
        bdPerformanceId: null,
        bdCinemaPerformanceId: null,
        point: "",
        performanceType: 0,// 0 为整体绩效  1为poi绩效
        fieldLabelMap: {
            point: "目标："
        }
    };

    getStateByProps(props) {
        let _this = this;
        let title;
        let url;
        let id;
        let content;
        let data;
        switch (props.performanceType * 1) {
            case 0:
                id = props.bdPerformanceId;
                title = "调整整体目标";
                url = "/api/performance/" + id + ".json";
                content = {
                    id: id,
                    point: props.point,
                    execution: props.execution,
                    score: props.score
                };
                break;
            case 1:
                id = props.bdCinemaPerformanceId;
                title = "调整POI目标";
                url = "/api/performance/cinemas/" + id + ".json";
                content = {
                    bdCinemaPerformanceId: id,
                    point: props.point,
                    execution: props.execution,
                    score: props.score
                };
                break;
        }
        return {
            title: title,
            url: url,
            content: content,
            show: true
        }
    }

    submit() {
        let _this = this;
        let content = _this.state.content;
        let data;
        if (_this.props.performanceType * 1 == 0) {
            data = {
                content: JSON.stringify(content)
            }
        } else {
            data = content;
        }

        let api = {
            url: _this.state.url,
            des: _this.state.title,
            type: "PUT",
            data: data
        };

        if (!_this.validate()) {
            return;
        }

        this.onSubmit(api).done(function () {
            _this.props.freshParent && _this.props.freshParent();
        });
    }

    renderBody() {
        let _this = this;
        let Groups = [];
        $.each(_this.props.fieldLabelMap, function (key, value) {
            Groups.push(<Group key={key}>
                <Left style={{width:"6em"}}>{_this.props.fieldLabelMap[key]}</Left>
                <Right>
                                        <textarea ref={key}
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
