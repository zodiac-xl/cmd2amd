import React                    from 'react'
import NestLinkedStateMixin     from 'react-nest-link-state';
import deepEqual                from 'deep-equal';


import FormTemplates            from '../../util/formTemplates.js';
import {mapObject}              from '../../util/dataFormat.js';
import {Group,Left,Right,Hr}    from '../../common/form-group.js';
import SuperChildFrom           from '../../common/super-child-form.js';

export default class CustomFormData extends SuperChildFrom {

    static defaultProps = {
        valueLink: null,
        template: null,
        applyType: 1,
        readOnly: false
    };

    nestLinkedState = NestLinkedStateMixin.nestLinkedState;


    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value;


        let template = props.template || (this.state && this.state.template) || FormTemplates.getTemplateByType(props.applyType);
        let mustChooseOptionsMap = {};
        if ($.isArray(template.mustChoose)) {
            template.mustChoose.forEach(function (item, i) {
                if ($.isPlainObject(item)) {
                    $.extend(mustChooseOptionsMap, item);
                } else {
                    console.log("模板mustChooseOptionsMap获取失败");
                }
            })

        } else if ($.isPlainObject(template.mustChoose)) {
            mustChooseOptionsMap = template.mustChoose;
        }

        if (!template) {
            console.log("没有获取到表单模板")
        }

        if (value == null) {//如果传入的formData 为null 表示是新建 需要根据模板生成数据结构
            let mustChoose = template.mustChoose;
            let newValue = {};

            mapObject(template, function (item, key) {
                newValue[key] = {};
                if (key == "mustChoose") {
                    if ($.isArray(item)) {
                        item.forEach(function (detailItem, detailKey) {
                            let mustChooseItemKey;
                            if ($.isPlainObject(detailItem)) {
                                mustChooseItemKey = Object.keys(detailItem)[0];
                                newValue[key][Object.keys(detailItem)[0]] = mustChooseOptionsMap[mustChooseItemKey][0];
                            } else {
                                mustChooseItemKey = detailItem;
                                newValue[key][detailItem] = mustChooseOptionsMap[mustChooseItemKey][0];
                            }
                        });

                    } else if ($.isPlainObject(item)) {
                        mapObject(item, function (detailItem, detailKey) {
                            newValue[key][detailKey] = mustChooseOptionsMap[detailKey][0];
                        })
                    }

                } else {
                    item.forEach(function (detailItem, detailKey) {
                        newValue[key][detailItem] = "";
                    });
                }
            });
            value = newValue;
        } else {
            if ($.isArray(value)) {
                value = value[0] || {};
            }
            $.each(Object.keys(value), function (index, key) {
                var goup = value[key];
                if ($.isArray(goup)) {
                    goup = goup[0];
                }
                value[key] = goup;
            });
        }

        return {
            template: template,
            value: value,
            mustChooseOptionsMap: mustChooseOptionsMap
        }
    }


    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;

        let groups = mapObject(_this.state.value, (item, key)=> {
            let thisTypeGroups = [];
            if (key == 'mustChoose') {
                thisTypeGroups = mapObject(item, (groupValue, groupKey)=> {
                    let uniqueKey = key + "-" + groupKey;
                    let placeholder = "";
                    let required = false;
                    let options = _this.state.mustChooseOptionsMap[groupKey];

                    if (options) {
                        let mustChooseOptions = options.map((option, optionIndex)=> {
                            let optionUniqueKey = uniqueKey + "-" + optionIndex;
                            return <option value={option} key={optionUniqueKey}>{option}</option>
                        });


                        return <Group key={uniqueKey}>
                            <Left>{groupKey}</Left>
                            ：

                            {
                                (()=> {
                                    if (readOnly) {

                                        return <Right><span>{_this.state.value[key][groupKey]}</span></Right>
                                    } else {
                                        return <Right>
                                            <select valueLink={_this.nestLinkedState(["value",key,groupKey])}>
                                                {mustChooseOptions}
                                            </select>
                                        </Right>
                                    }
                                })()
                            }

                        </Group>
                    } else {
                        console.log("必选项 options无法匹配");
                        let option = _this.state.value[key][groupKey];
                        return <Group key={uniqueKey}>
                            <Left>{groupKey}</Left>
                            ：
                            {
                                (()=> {
                                    if (readOnly) {

                                        return <Right><span>{_this.state.value[key][groupKey]}</span></Right>
                                    } else {
                                        return <Right>
                                            <select valueLink={_this.nestLinkedState(["value",key,groupKey])}>
                                                <option>{option}</option>
                                            </select>
                                        </Right>
                                    }
                                })()
                            }
                        </Group>
                    }


                });
            } else {

                _this.state.template[key].forEach(function (groupKey, groupIndex) {
                    let uniqueKey = key + "-" + groupIndex;
                    let placeholder = "";
                    let required = true;
                    if (key == "notMustFill") {
                        placeholder = "可选";
                        required = false;
                    }
                    thisTypeGroups.push(
                        <div key={uniqueKey}>
                            <Group>
                                <Left>{groupKey}</Left>
                                ：
                                {
                                    (()=> {
                                        if (readOnly) {

                                            return <Right><span>{_this.state.value[key][groupKey]}</span></Right>
                                        } else {
                                            return <Right>
                                                <input required={required} placeholder={placeholder}
                                                       valueLink={_this.nestLinkedState(["value",key,groupKey])}/>
                                            </Right>
                                        }
                                    })()
                                }
                            </Group>
                        </div>
                    );
                })


            }


            return (
                <div key={key}>
                    {thisTypeGroups}
                </div>
            )

        });

        return (
            <div>
                {groups}
            </div>
        )
    }
};
