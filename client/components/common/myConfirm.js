import React                from 'react';
import ReactDOM             from 'react-dom';

import SimpleModal          from './simple-modal';

export default class Confirm extends SimpleModal {


    static defaultProps = {

        content: '',
        title: '确认',
        hideCancelBtn: true
    };
    state = {
        show: true
    }

    hide() {
        this.setState({show: false})
        this.props.onHide && this.props.onHide();
    }

    submit() {
        let {isCanSubmit=() => true} = this.props;
        if (!isCanSubmit()) return;

        let _this =this;
        let api = _this.props.api;
        if (api) {
            _this.setState({isLoading: true});
            _this.onSubmit(api).done(function () {
                _this.setState({isLoading: false});
                _this.setState({show: false});
                _this.props.onSubmit();
            });
        } else if ( this.props.onSubmit){
            _this.setState({show: false});
            _this.props.onSubmit();
        }
    }

    renderBody() {
        return <div style={{padding: '5%'}}>{this.props.content}</div>
    }
}

let myConfirm = function (content, title='确认', api, props={}) {
    let defer = $.Deferred();
    let container = document.getElementById('react-confirm-container');

    if (!container) {
        container = document.createElement('div');
        container.id = 'react-confirm-container';
        document.body.appendChild(container);
    }

    let onHide = () => defer.reject();
    let onSubmit = () => defer.resolve();
    props = {...props, content, onHide, onSubmit, api, title};

    ReactDOM.unmountComponentAtNode(container);
    ReactDOM.render(<Confirm {...props}/>, container);
    return defer.promise();
};

export default myConfirm;
