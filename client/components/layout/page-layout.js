import React        from 'react';
import ReactDOM     from 'react-dom';
import _            from 'lodash';
import Header       from '../include/header';
import Footer       from '../include/footer';
import SideBar      from '../include/side-bar';
import Debug        from '../debug';

import BasePage     from './page';




export default class PageLayout extends BasePage {


    static page(Page) {
        $(function () {
            console.log('✓', 'Ready');
            let container = document.getElementById('app');
            ReactDOM.render(<Page/>, container);
        });


    }

    renderDebug() {

        var debugDom;
        debugDom = <div>
            <Debug/>
        </div>;
        return debugDom;
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
