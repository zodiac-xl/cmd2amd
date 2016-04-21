import React, { Component }     from 'react';

import Pagination               from 'react-bootstrap/lib/Pagination';

class PaginationAdvanced extends Component {

    static defaultProps = {
        onQueryHandler: function () {

        }
    };

    state = {
        query: {
            offset: 0,
            limit: this.props.limit || 20
        },
        prev: true,
        next: true,
        first: true,
        last: true,
        ellipsis: true,
        items: 1,
        maxButtons: 5,
        activePage: 1,
        onSelect: this.onPaging.bind(this),
        inited: false
    };


    componentDidMount() {
        this.onPaging(1);
    }

    onQuery(query, totalSize) {
        let _this = this;
        let newState = _this.state;
        newState.query = $.extend({}, newState.query, query||{});
        if(newState.query && newState.query.offset == 0){
            newState.activePage = 1;
        }

        if (totalSize != undefined && totalSize != null) {
            newState.items = Math.ceil(totalSize / newState.query.limit)
        }
        _this.setState(newState);
    }

    onPaging(e) {
        let _this = this;
        let newState = _this.state;
        let activePage;
        let text;
        if ($.isNumeric(e)) {
            text = e;
        } else {
            text = e.target && e.target.textContent || 1;
        }

        switch (text) {
            case "›"://next
                activePage = newState.activePage + 1;
                break;
            case "»"://last
                activePage = newState.items;
                break;
            case "‹"://Previous
                activePage = newState.activePage - 1;
                break;
            case "«"://First
                activePage = 1;
                break;
            default:// 数字
                activePage = text * 1;
                break;
        }

        newState.activePage = activePage;

        newState.query.offset = (activePage - 1 ) * newState.query.limit;

        _this.props.onQueryHandler(newState.query);
    }

    render() {


        return (
            <Pagination {...this.state}/>
        )
    }
}
export  default  PaginationAdvanced;
