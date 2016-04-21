import React, { Component }     from 'react';
import BDAjax                   from '../util/bdAjax';


import  './less/page-content.less';


export default class Page extends Component {

    constructor(props) {
        super(props);
        this.initial();
    }

    ajax() {
        return BDAjax.apply(this, arguments);
    }

    initial() {
    }

    renderHeader() {
    }

    renderTopBar() {
    }

    renderMain() {
    }

    renderMainExtra() {
    }

    renderBottomBar() {
    }

    renderFooter() {
    }

    renderDebug() {

    }

    render() {
        return (
            <div>
                <h1>I'm an base page!</h1>
                {this.renderHeader()}
                {this.renderTopBar()}
                {this.renderMain()}
                {this.renderMainExtra()}
                {this.renderBottomBar()}
                {this.renderFooter()}
                {this.renderDebug()}
            </div>
        );
    }

    componentDidMount() {
    }

};
