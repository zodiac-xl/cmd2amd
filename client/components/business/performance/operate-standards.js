import React                from 'react';
import ReactDOM             from 'react-dom';


import format                   from 'date-format';
import Modal                    from 'react-bootstrap/lib/Modal';
import Button                   from 'react-bootstrap/lib/Button';
import {Group,Left,Right}       from '../../common/form-group.js';
import SimpleModal              from '../../common/simple-modal';
import bdAjax                   from '../../util/bdAjax.js';

export default class OperateStandards extends SimpleModal {


    static defaultProps = {
        operateType: "new",
        performanceTarget: "",
        evaluationCriteria: "",
        weight: "",
        bdTargetId: null,
        type: 0,
        timeScreen: format("yyyyMM", new Date()),
        fieldLabelMap: {
            performanceTarget: "绩效指标：",
            evaluationCriteria: "评估标准：",
            weight: "权重："
        }
    };

    getStateByProps(props) {
        let title;
        switch (this.props.operateType) {
            case "new":
                title = "新增绩效指标";
                break;
            case "edit":
                title = "编辑绩效指标";
                break;
            case "delete":
                title = "删除绩效指标";
                break;
        }
        return {
            title: title,
            content: {
                performanceTarget: props.performanceTarget,
                evaluationCriteria: props.evaluationCriteria,
                weight: props.weight,
                id: props.bdTargetId,
                type: props.type,
                timeScreen: props.timeScreen
            },
            show:true
        }
    }

    submit() {
        let _this = this;
        let operateType = _this.props.operateType;
        let apiMap = {
            new: {
                url: "/api/admin/target/targets.json",
                des: "创建绩效指标",
                type: "POST",
                data: {
                    content: JSON.stringify(_this.state.content)
                }
            },
            edit: {
                url: "/api/admin/target/" + _this.state.content.id + ".json",
                des: "编辑绩效指标",
                type: "PUT",
                data: {
                    content: JSON.stringify(_this.state.content)
                }
            },
            delete: {
                url: "/api/admin/target/" + _this.state.content.id + ".json",
                des: "删除绩效指标",
                type: "DELETE",
                data: {}
            }
        };


        if (operateType != "delete") {
            if (!_this.validate()) {
                return;
            }
        }

        let api = apiMap[operateType];

        this.onSubmit(api).done(function () {
            _this.props.freshParent && _this.props.freshParent();
        });
    }

    renderBody() {

        let _this = this;
        let body;
        let Groups = [];
        $.each(_this.props.fieldLabelMap, function (key, value) {

            Groups.push(<Group key={key}>
                <Left style={{width:"6em"}}>{_this.props.fieldLabelMap[key]}</Left>
                <Right>
                    <input type="text" ref={key}
                           valueLink={_this.nestLinkedState(["content",key],_this)} style={{
                                                    display:"inline-block",
                                                    width:"450px"
                                               }}/>
                </Right>
            </Group>);
        });
        if (_this.props.operateType == "delete") {
            body = <div style={{textAlign:"center",lineHeight:"50px"}}>确定删除该绩效指标吗？</div>;
        } else {
            body = Groups;
        }

        return (
            <div>
                {body}
            </div>
        )
    }
}

