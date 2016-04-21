import React, { Component }         from 'react';
import  './less/page-header.less';

import Feedback                     from '../business/feedback';
import cookie                       from '../util/cookie';
import TopNotice                    from './top-notice';


export default class Header extends Component {

    state = {
        showFeedback: false
    };

    onFeedback() {
        this.setState({
            showFeedback: true
        })
    }

    hideFeedback() {
        this.setState({
            showFeedback: false
        })
    }

    render() {
        let _this = this;
        let env = 'online';
        let href = location.hostname;
        if (/st[.]/.test(href)) {
            env = 'staging'
        } else if (/sankuai/.test(href)) {
            env = 'online'
        } else {
            env = 'development'
        }

        let apiProxy = cookie.get('apiProxy') || '';
        if (/staging/.test(apiProxy)) {
            env = 'staging';
        } else if (/office/.test(apiProxy)) {
            env = 'office';
        }
        return (
            <div>
                <TopNotice env={env}/>

                <nav className="navbar navbar-default navbar-static-top navbar-dashboard">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse">
                            <a href="/" className="navbar-brand">
                                <span className="logo-img"></span>
                            <span>
                                猫眼BD后台系统
                            </span>
                            </a>
                            <ul className="nav nav-pills pull-right">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <span>Hi, {window.User.name}</span>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/">
                                        <span>首页</span>
                                    </a>
                                </li>

                                <li className="nav-item" onClick={_this.onFeedback.bind(_this)}>
                                    <a className="nav-link" href="#">
                                        <span>反馈</span>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/account/logout">
                                        <i className="glyphicon glyphicon-log-out"></i>
                                        <span>退出</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Feedback show={_this.state.showFeedback} hide={_this.hideFeedback.bind(_this)}/>
                </nav>
            </div>
        )
    }
}
