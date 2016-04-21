import React, { Component }     from 'react';
import NestLinkedStateMixin     from 'react-nest-link-state';
import deepEqual                from 'deep-equal';

export default class SuperChild extends Component {

    static defaultProps = {
        valueLink: null
    };

    state = this.getStateByProps(this.props);

    componentWillReceiveProps(nextProps) {
        this.getStateByProps && this.setState(this.getStateByProps(nextProps));
    }

    nestLinkedState = NestLinkedStateMixin.nestLinkedState;


    getValue() {
        return this.customGetValue ? this.customGetValue() : this.state.value;
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
            this.renderMain()
        )
    }
};
