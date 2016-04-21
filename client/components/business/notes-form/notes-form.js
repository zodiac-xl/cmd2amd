import React                from 'react';
import ReactDOM             from 'react-dom';
import MyTable              from '../../common/my-table'
import {Group,Left,Right}   from '../../common/form-group.js';
import SimpleModal          from '../../common/simple-modal';
import bdAjax               from '../../util/bdAjax.js';


export default class NotesForm extends SimpleModal {


    static defaultProps = {
        taskId: null,
        cinemaId: null,
        operateType: "check"
    };



    state = function () {
        let _this = this;
        let trs = [];
        let title;
        switch (_this.props.operateType) {
            case "check":
                title = "查看备注";
                if (!_this.defaultRenderFooter) {
                    let defaultRenderFooter = _this.renderFooter;//for 防止对象引用
                    _this.defaultRenderFooter = defaultRenderFooter;
                }
                _this.renderFooter = _this.emptyFooter;

                let api = {
                    url: `/api/activity/task/${_this.props.taskId}/cinema/${_this.props.cinemaId}/note.json`,
                    des: "获取影院备注",
                    async: false
                };
                bdAjax(api).done(function (e) {
                    if (e.data) {
                        $.each(e.data, function (index, item) {
                            trs.push({
                                noterAccount: item.noterAccount,
                                noteTime: item.noteTime,
                                content: item.content
                            });
                        });
                    }
                });

                break;
            case "add":
                title = "添加备注";
                if(_this.defaultRenderFooter){
                    _this.renderFooter = _this.defaultRenderFooter;
                }
                break;
        }
        return {
            show: true,
            isLoading: false,
            title: title,
            tableData: {
                ths: ["添加人", "添加时间", "添加内容"],
                trs: trs
            }
        }

    }.bind(this)();

    emptyFooter() {
        return;
    }


    submit() {
        let _this = this;
        let note = _this.refs.note.value;
        if (!note) {
            toastr.warning(`备注不能为空`);
            return;
        }

        let api = {
            url: `/api/activity/task/${_this.props.taskId}/cinema/${_this.props.cinemaId}/note.json`,
            des: "添加影院备注",
            type: "POST",
            data: {
                note: note
            }
        };
        this.onSubmit(api);
    }

    renderBody() {
        let _this = this;
        let body;
        switch (_this.props.operateType) {
            case "check":
                body = <MyTable data={_this.state.tableData}></MyTable>;
                break;
            case "add":
                body = <textarea rows="3" placeholder="请输入内容" ref="note" style={{width: "100%"}}>
                </textarea>;
                break;
        }
        return body;
    }

}
