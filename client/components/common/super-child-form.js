import React, { Component }     from 'react';
import NestLinkedStateMixin     from 'react-nest-link-state';
import deepEqual                from 'deep-equal';

export default class SuperChildFrom extends Component {


    static defaultProps = {
        valueLink: null
    };

    state = (this.getStateByProps && this.getStateByProps(this.props) ) || {value: {}};

    componentWillReceiveProps(nextProps) {
        this.getStateByProps && this.setState(this.getStateByProps(nextProps));
    }

    nestLinkedState = NestLinkedStateMixin.nestLinkedState;


    getState() {
        let valueLink = this.props.valueLink || {};
        let value = valueLink.value || this.props.value;

        return {
            value: value
        };
    }

    validate() {

        let _this = this;
        let validate = true;

        let submitBtn = ReactDOM.findDOMNode(_this.refs.submit);
        let form = ReactDOM.findDOMNode(_this.refs.myForm);

        let event = new Event('click', {bubbles: false});
        submitBtn.dispatchEvent(event);

        if (this.state.value == null || !form.checkValidity()) {
            validate = false
        } else if (_this.customValidate) {
            validate = _this.customValidate();
        }
        return validate;
    }

    submit(e) {
        e.preventDefault();
    }

    getValue() {
        if (this.validate()) {
            return this.state.value;
        } else {
            return null;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let valueLink = this.props.valueLink || {};
        let requestChange = valueLink.requestChange;
        if (deepEqual(nextProps, this.props) && requestChange) {//依靠父组件的requestChange进行通信 实现rerender
            requestChange(nextState.value);
            return false;
        } else {// 暴露getValue方法向父组件通信 实现rerender
            return true;
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit} ref="myForm">
                    {
                        this.renderMain ? this.renderMain() : (this.props.children || '')
                    }

                    <input type="submit" style={{display:"none"}} ref="submit"/>
                </form>
            </div>
        )
    }
};
export default SuperChildFrom;
