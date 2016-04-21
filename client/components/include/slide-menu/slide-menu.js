import React, { Component }         from 'react';
import SlideUl                      from './slide-ul';
import _                            from 'lodash';
import  '../less/slide-menu.less';

export default class SlideMenu extends Component {

    static propTypes = {
        data: React.PropTypes.array,
        selected: React.PropTypes.string,
        active: React.PropTypes.string
    };

    static defaultProps = {
        data: [],
        selected: '',
        active: ''
    };

    shouldComponentUpdate() {
        return false;
    }


    render() {
        return (
            <div className="slide-menu">
                <SlideUl
                    {...this.props}
                    show={true}
                    />
            </div>
        )
    }
}


