import React, { Component } from 'react';
import  './less/page-footer.less';

export default class Footer extends React.Component {
    static propTypes = {
        className: React.PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    render() {
        return (
            <footer className={`text-muted common-footer ${this.props.className}`}>
                <div className="text-center">
                    猫眼BD后台系统 ©2015
                </div>
            </footer>
        )
    }
}
