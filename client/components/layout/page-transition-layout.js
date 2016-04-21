import React        from 'react';
import ReactDOM     from 'react-dom';
import _            from 'lodash';
import Header       from '../include/header';
import Footer       from '../include/footer';
import SideBar      from '../include/side-bar';
import Debug        from '../debug';

import BasePage     from './page';

import  './less/page-content.less';


//过渡 html和jsx共存页面

export default class PageTransitionLayout extends BasePage {

    static page(Page) {
        console.log('✓', 'Ready');

        $(function () {

            //const fragments
            if (1) {
                let container = document.getElementById('container-header');
                ReactDOM.render(<Header/>, container);
            }

            if (1) {
                let container = document.getElementById('container-sideBar');
                ReactDOM.render(<SideBar/>, container);
            }
            if (1) {
                let container = document.getElementById('container-footer');
                ReactDOM.render(<Footer/>, container);
            }

            if (1) {
                let container = document.getElementById('container-debug');
                ReactDOM.render(
                    <div>
                        <Debug/>
                    </div>, container);
            }
        });

    }


    renderHeader() {
    }


    render() {
        return (
            <div>
                <Header />
                <SideBar />

                <div className="my-page-content">
                    <div className="my-page-header">
                        { /* header */}
                        {this.renderHeader()}
                    </div>
                    <div className="my-page-top-bar">
                        { /* toolbar */}
                        {this.renderTopBar()}
                    </div>
                    <div className="my-page-main">
                        { /* main content */}
                        {this.renderMain()}
                        {this.renderMainExtra()}
                    </div>
                    <div className="my-page-bottom-bar">
                        { /* bottom-toolbar */}
                        {this.renderBottomBar()}
                    </div>
                    <div className="my-page-footer">
                        { /* footer */}
                        {this.renderFooter()}
                    </div>
                </div>
                <Footer />
                {this.renderDebug()}
            </div>
        );
    }
}
