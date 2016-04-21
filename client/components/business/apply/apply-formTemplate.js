import React,{addons,Component}     from 'react';
import update                   from 'react-addons-update';
import ReactDOM                 from 'react-dom';
import NestLinkedStateMixin     from 'react-nest-link-state';


//children
import Button                   from 'react-bootstrap/lib/Button';
import Modal                    from 'react-bootstrap/lib/Modal';
import {Group,Left,Right,Hr}    from '../../common/form-group.js';


//custom util
import bdAjax                   from '../../util/bdAjax.js';
import FormTemplates            from '../../util/formTemplates.js';

export default class ApplyFormTemplate extends Component {

    //region init data
    static defaultProps = {
        applyType: 1
    };

    state = {
        showModal: true,
        type: "new",
        applyType: this.props.applyType,
        mustFill: [""],
        mustChoose: [
            {
                key: "",
                options: [""]
            }
        ],
        notMustFill: [""]
    };

    nestLinkedState =  NestLinkedStateMixin.nestLinkedState;

    nestObject =  NestLinkedStateMixin.nestObject;

    componentWillMount() {
        let template = FormTemplates.getTemplateByType(this.state.applyType);
        if (!template) {
            console.log("没有获取到表单模板")
        } else {

            //变换mustChoose数据格式
            let mustChoose = [];
            Object.keys(template.mustChoose).forEach(function (chooseKey) {
                mustChoose.push({
                    key: chooseKey,
                    options: template.mustChoose[chooseKey]
                })
            });
            template.mustChoose = mustChoose;

            //数据数组为空上设置一个空项 初始化 提交时需要去除空项
            if (!template.mustChoose.length) {
                template.mustChoose = [{
                    key: "",
                    options: [""]
                }];
            }
            if (!template.mustFill.length) {
                template.mustFill = [""];
            }
            if (!template.notMustFill.length) {
                template.notMustFill = [""];
            }

            let newState = update(this.state, {$merge: template});
            newState = update(newState, {$merge: {type: "edit"}});

            this.setState(update(this.state, {$merge: newState}))
        }

    }

    //endregion

    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    addMustFill() {
        let newState = this.nestObject(this.state, ["mustFill"]).arrPush("");
        this.setState(newState);
    }

    deleMustFill(index) {
        let newState = this.nestObject(this.state, ["mustFill"]).arrSplice(index, 1);
        this.setState(newState);
    }

    addNotMustFill() {
        let newState = this.nestObject(this.state, ["notMustFill"]).arrPush("");
        this.setState(newState);
    }

    deleNotMustFill(index) {
        let newState = this.nestObject(this.state, ["notMustFill"]).arrSplice(index, 1);
        this.setState(newState);
    }

    addMustChoose() {
        let newState = this.nestObject(this.state, ["mustChoose"]).arrPush({
            key: "",
            options: ["", ""]
        });
        this.setState(newState);
    }

    deleMustChoose(index) {
        let newState = this.nestObject(this.state, ["mustChoose"]).arrSplice(index, 1);
        this.setState(newState);
    }

    addOption(index) {
        let newState = this.nestObject(this.state, ["mustChoose", index, "options"]).arrPush("");
        this.setState(newState);
    }

    deleOption(index, optionIndex) {
        let newState = this.nestObject(this.state, ["mustChoose", index, "options"]).arrSplice(optionIndex, 1);
        this.setState(newState);
    }

    submit() {
        let _this = this;
        let type = "POST";
        if (this.state.type == "edit") {
            type = "PUT";
        }


        let mustFill = [];
        let notMustFill = [];
        let mustChoose = {};
        this.state.mustFill.forEach(function (item) {
            if (item != "") {
                mustFill.push(item);
            }
        });
        this.state.notMustFill.forEach(function (item) {
            if (item != "") {
                notMustFill.push(item);
            }
        });
        this.state.mustChoose.forEach(function (item) {
            if (item.key != "" && item.options[0] != "") {
                mustChoose[item.key] = item.options;
            }
        });
        bdAjax({
            url: "/api/apply/form/template/" + this.state.applyType + ".json",
            type: type,
            data: {
                formTemplate: JSON.stringify({
                    mustFill: mustFill,
                    mustChoose: mustChoose,
                    notMustFill: notMustFill
                })
            },
            des: "设置模板"
        }).done(function () {
            _this.close();
        });
    }


    render() {

        let margin5 = {
            margin: "5px"
        };
        let _this = this;
        return (
            <div className="modal-container">
                <Modal show={this.state.showModal} onHide={this.close.bind(_this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>BD反馈模板设置</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>请设置单影院活动中需要BD反馈的内容。</p>

                        <p><span className="text-danger">活动时间、成本默认需要BD反馈，无需再进行设置。</span></p>
                        <Hr></Hr>

                        <Group>
                            <Left>必填项表头：</Left>

                            {(()=> {

                                let items = this.state.mustFill.map((item, index)=> {
                                    if (index == 0) {
                                        return <div key={index}>
                                            <div>
                                                <input valueLink={this.nestLinkedState(["mustFill",index],_this)}/><Button
                                                onClick={this.addMustFill.bind(this)} style={margin5}>增加</Button>
                                            </div>
                                        </div>
                                    } else {
                                        return <div key={index}>
                                            <div>
                                                <input valueLink={this.nestLinkedState(["mustFill",index],_this)}/><Button
                                                onClick={this.deleMustFill.bind(this,index)} style={margin5}>删除</Button>
                                            </div>
                                        </div>
                                    }
                                });
                                return <Right>
                                    {items}
                                </Right>
                            })()}
                        </Group>
                        <Group>
                            <Left>必选项表头：</Left>


                            {(()=> {
                                let textRightStyle = {
                                    textAlign: "right"
                                };
                                let minInput = {
                                    width: "60px"
                                };


                                let items = this.state.mustChoose.map((item, index)=> {
                                    let selectionBtn;
                                    let optionBtn;
                                    let options = [];
                                    if (index == 0) {
                                        selectionBtn = <Button onClick={_this.addMustChoose.bind(this)} style={margin5}>增加</Button>
                                    } else {
                                        selectionBtn =
                                            <Button onClick={_this.deleMustChoose.bind(this,index)} style={margin5}>删除</Button>
                                    }
                                    item.options.forEach(function (option, optionIndex) {
                                        if (optionIndex == 0) {
                                            optionBtn = <Button onClick={_this.addOption.bind(_this,index)}
                                                                style={margin5}>增加</Button>
                                        } else {
                                            optionBtn = <Button onClick={_this.deleOption.bind(_this,index,optionIndex)}
                                                                style={margin5}>删除</Button>
                                        }
                                        options.push(
                                            <div key={optionIndex}>
                                                <input style={minInput}
                                                       valueLink={_this.nestLinkedState(["mustChoose",index,"options",optionIndex],_this)}
                                                    />
                                                {optionBtn}
                                            </div>
                                        )
                                    });

                                    return <div key={index}>
                                        <div>
                                            <input valueLink={_this.nestLinkedState(["mustChoose",index,"key"],_this)}/>
                                            {selectionBtn}
                                            <div style={textRightStyle}>
                                                {options}

                                            </div>

                                        </div>
                                    </div>
                                });


                                return <Right style={{flex: 'initial'}}>
                                    {items}
                                </Right>
                            })()}
                            <Right>
                                <div>


                                </div>
                            </Right>
                        </Group>
                        <Group>
                            <Left>非必填项表头：</Left>
                            {(()=> {
                                let items = this.state.notMustFill.map((item, index)=> {
                                    if (index == 0) {
                                        return <div key={index}>
                                            <div>
                                                <input valueLink={this.nestLinkedState(["notMustFill",index],_this)}/><Button
                                                onClick={this.addNotMustFill.bind(this)} style={margin5}>增加</Button>
                                            </div>
                                        </div>
                                    } else {
                                        return <div key={index}>
                                            <div>
                                                <input valueLink={this.nestLinkedState(["notMustFill",index],_this)}/><Button
                                                onClick={this.deleNotMustFill.bind(this,index)}
                                                style={margin5}>删除</Button>
                                            </div>
                                        </div>
                                    }
                                });
                                return <Right>
                                    {items}
                                </Right>
                            })()}
                        </Group>
                        <Modal.Footer>
                            <Button onClick={this.submit.bind(this)}>确认</Button>
                        </Modal.Footer>
                    </Modal.Body >
                </Modal >
            </div>
        )
    }
};
