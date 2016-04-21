import React                from 'react';
import ReactDOM             from 'react-dom';

import SimpleModal          from '../../common/simple-modal';


export default class Feedback extends SimpleModal {


    static defaultProps = {
        hide: function () {
        },
        show: false
    };

    getStateByProps(props) {
        return {
            isLoading: false,
            title: "反馈",
            content: ''
        }
    }


    validate() {
        let _this = this;
        let validate = true;
        if (!_this.state.content) {
            validate = false;
            toastr.warning(`反馈内容不能为空`);
            ReactDOM.findDOMNode(_this.refs['content']).focus();
            return false;
        }
        return validate;
    }

    submit() {
        let _this = this;

        let api = {
            url: "/api/feedbacks.json",
            des: "反馈",
            type: "POST",
            admin:true,
            data: {
                content: _this.state.content
            }
        };

        if (!_this.validate()) {
            return;
        }

        this.onSubmit(api).done(function () {
            _this.props.hide();
        });
    }

    renderBody() {
        let _this = this;
        return <div>
            <textarea ref='content' valueLink={_this.nestLinkedState(['content'],_this)} style={{width: '100%',minHeight: '100px'}}
                      placeholder='亲，您是遇到系统问题了？还是对我们有一些意见和建议？
                      欢迎您提给我们，谢谢！
                      紧急问题请发送邮件至avatar.oda@meituan.com，我们会尽快回复~'></textarea>
        </div>
    }

}
