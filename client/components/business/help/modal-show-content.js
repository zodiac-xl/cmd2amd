import React                from 'react';
import ReactDOM             from 'react-dom';

import SimpleModal          from '../../common/simple-modal';

export default class ShowContentModal extends SimpleModal {


    static defaultProps = {
        hide: function () {
        },
        show: false,
        content: ''
    };

    renderFooter = null;

    renderBody() {
        return <div style={{padding: '5%'}}>{this.props.content}</div>
    }
}
