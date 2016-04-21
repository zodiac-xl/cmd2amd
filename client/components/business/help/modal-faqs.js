import React                from 'react';
import ReactDOM             from 'react-dom';

import {Group,Left,Right}   from '../../common/form-group';
import SimpleModal          from '../../common/simple-modal';
import SuperChildForm       from '../../common/super-child-form';
import RadioGroup           from 'react-simple-radio-group';

export default class FaqsModal extends SimpleModal {


    static defaultProps = {
        hide: function () {
        },
        freshParent: function () {

        },
        show: false,
        operateType: 'new',
        content: {
            id: '',
            title: '',
            url: '',
            content: ''
        }
    };

    getStateByProps(props) {
        let titleMap = {
            new: '新建',
            edit: '修改',
            delete: '删除'
        };

        let checkBoxValue = 1;
        if (props.content.content) { //1为链接地址 2为内容
            checkBoxValue = 2;
        }
        return {
            title: titleMap[props.operateType],
            isLoading: false,
            content: props.content,
            checkBoxValue: checkBoxValue
        }
    }

    submit() {

        let _this = this;
        let data = _this.state.content;
        let id = data.id;
        let des = `${_this.state.title}问题`;
        if (_this.state.checkBoxValue == 1) {  //如果配置的是url则没有content字段
            data.content = null;
        }


        let eidtData = data;
        delete eidtData.created;//for 后端不需要这个字段  而且使用的特定的dao不能吧int处理为时间
        delete eidtData.id;//for 后端不需要这个字段  而且使用的特定的dao不能吧str处理为int


        let newData = data;
        delete newData.id;//for 后端不需要这个字段  而且使用的特定的dao不能吧str处理为int


        let apiMap = {
            new: {
                url: '/api/admin/faq.json',
                type: 'post',
                des: des,
                data: newData
            },
            edit: {
                url: `/api/admin/faq/${id}.json`,
                type: 'PUT',
                des: des,
                data: eidtData
            },
            delete: {
                url: `/api/admin/faq/${id}.json`,
                type: 'DELETE',
                des: des,
            }
        }
        if (_this.props.operateType != 'delete' && !_this.refs.form.validate()) {
            return;
        }
        _this.onSubmit(apiMap[_this.props.operateType]).done(function () {
            _this.props.freshParent && _this.props.freshParent();
        });
    }


    renderBody() {
        let _this = this;

        let checkboxValueLink = _this.nestLinkedState(['checkBoxValue'], _this);
        return <SuperChildForm ref='form'>

            <Group>
                <Left>标题</Left>：
                <Right>
                    <input type="text" style={{width:'300px'}}
                           valueLink={_this.nestLinkedState(["content",'title'],_this)} required/>
                </Right>
            </Group>

            <Group>
                <Left>配置</Left>：
                <Right>
                    <RadioGroup name='setting' style={{marginBottom:'10px'}}
                                onChange={checkboxValueLink.requestChange}
                                value={checkboxValueLink.value}>
                        <span><input type="radio" value='1'/>链接地址</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><input type="radio" value='2'/>内容</span>
                    </RadioGroup>

                    {
                        (()=> {
                            if (checkboxValueLink.value == 1) {
                                return <input type='text' style={{width:'300px'}}
                                              valueLink={_this.nestLinkedState(["content",'url'],_this)}
                                              placeholder='例如 http://bd.movie.sankuai.com/' required></input>;
                            } else {
                                return <textarea required style={{width:'300px',height:'200px'}}
                                                 valueLink={_this.nestLinkedState(["content",'content'],_this)}></textarea>;
                            }
                        })()
                    }
                </Right>
            </Group>
        </SuperChildForm>
    }


}
