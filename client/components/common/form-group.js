import React, {Component} from 'react';

class Group extends Component {
    render() {

        var style = {
            marginBottom: "10px",
            display: "flex"

        };
        let className = this.props.className || "";
        return (
            <div style={style} className={className}>
                {this.props.children}
            </div>
        )
    }
}
class Hr extends Component {

    static defaultProps = {
        style: {}
    };

    render() {
        let _this = this;
        let style = {
            borderBottom: "1px dashed black",
            display: "block",
            borderTopWidth: 0,
            transform: 'translateX(0)'
        };
        return (
            <hr style={style}/>
        )
    }
}

class Left extends Component {
    static defaultProps = {
        style: {}
    };

    render() {
        let _this = this;

        let style = {
            display: "inline-block",
            width: "11em",
            textAlign: "right",
            verticalAlign: "top"
        };
        $.extend(style, _this.props.style);
        return (
            <div style={style}>
                {this.props.children}
            </div>
        )
    }
}
class Right extends Component {
    static defaultProps = {
        style: {}
    };
    render() {
        let _this = this;
        let style = {
            display: "inline-block",
            verticalAlign: "top",
            flex: 1
        };
        $.extend(style, _this.props.style);
        return (
            <div style={style}>
                {this.props.children}
            </div>
        )
    }
}

export default {
    Group: Group,
    Hr: Hr,
    Left: Left,
    Right: Right
};