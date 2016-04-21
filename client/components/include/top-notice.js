import React from 'react';
import _ from 'lodash';
import ms from 'humanize-ms';

class Alert extends React.Component {

    static propTypes = {
        myStyle: React.PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
        style: React.PropTypes.object,
        icon: React.PropTypes.any,
        iconMapping: React.PropTypes.object,
        children: React.PropTypes.any,
        className: React.PropTypes.string,
        close: React.PropTypes.bool,
        onClose: React.PropTypes.func,
        autoClose: React.PropTypes.number,
    };

    static defaultProps = {
        myStyle: 'info',
        icon: true,
        close: false,
        autoClose: 0,
        onClose() {
        },
        iconMapping: {
            info: 'glyphicon glyphicon-info-sign',
            success: 'glyphicon glyphicon-ok-sign',
            warning: 'glyphicon glyphicon-question-sign',
            danger: 'glyphicon glyphicon-exclamation-sign',
        },
    };

    state = {
        closed: false,
    };

    componentDidMount() {
        const { autoClose } = this.props;
        if (autoClose !== 0) {
            this._timer = setTimeout(() => {
                this.close();
            }, autoClose);
        }
    }

    componentWillUnmount() {
        const { autoClose } = this.props;
        if (autoClose !== 0) {
            clearTimeout(this._timer);
        }
    }

    onClose(event) {
        if (this.props.onClose(event) !== false) {
            this.close();
        }
    }

    close() {
        this.setState({
            closed: true,
        });
    }

    renderIcon() {
        const { icon, myStyle, iconMapping } = this.props;
        if (_.isBoolean(icon) && icon) {
            const _icon = iconMapping[myStyle] || iconMapping[myStyle].info;
            return <i className={`${_icon}`}/>;
        }
        return <i className={`${icon}`}/>;
    }

    renderCloseBtn() {
        return (
            <button
                type="button"
                className="close"
                onClick={this.onClose.bind(this)}
                >
                &times;
            </button>
        );
    }

    render() {
        if (this.state.closed) {
            return <div />;
        }
        return (
            <div
                style={this.props.style}
                className={`cat-alert cat-alert-${this.props.myStyle} ${this.props.className ? this.props.className : ''}`}
                >
                {this.renderCloseBtn()}
                {this.renderIcon()}
                {this.props.children}
            </div>
        );
    }
}

export default class TopNotice extends React.Component {

    static propTypes = {
        env: React.PropTypes.string,
    };

    static defaultProps = {
        env: 'development'
    };

    style = {
        marginBottom: 0,
        padding: '5px',
    };

    render() {
        let content;
        switch (this.props.env) {
            case 'development':
            case 'office':
            {
                content = (
                    <Alert
                        autoClose={ms('10s')}
                        style={this.style}
                        className="text-center"
                        >
                        当前正在使用 <b className="text-primary">线下{this.props.env}</b> 环境。
                    </Alert>
                );
                break;
            }
            case 'staging':
            {
                content = (
                    <Alert
                        autoClose={ms('10s')}
                        style={this.style}
                        myStyle="warning"
                        className="text-center"
                        >
                        当前正在使用 <b className="text-danger">staging</b> 环境，所操作、浏览数据均为线上数据。如需测试、修改数据，请谨慎。
                    </Alert>
                );
                break;
            }
            default:
            {
                content = <div />;
            }
        }
        return content;
    }
}
