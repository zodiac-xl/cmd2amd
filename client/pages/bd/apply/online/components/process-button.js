import React, { Component }         from 'react';
import Button                       from 'react-bootstrap/lib/Button';

class ProcessButton extends Component {
    onClick() {
        if(this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        let ctx = this.props;
        let processing = ctx.processing;
        let text = processing ? ctx.processingText : ctx.text;
        return (
            <Button {...ctx} disabled={processing}
                onClick={this.onClick.bind(this)}>{text}</Button>
        );
    }
}

export default ProcessButton;
