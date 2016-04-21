import React, { Component } from 'react';
import _ from 'lodash';
import SlideUl from './slide-ul';

export default class SlideLi extends Component {

    static propTypes = {
        data: React.PropTypes.object
    };

    static defaultProps = {
        data: {},
    };

    state = {
        open: false
    }

    constructor(props) {
        super(props);
    }

    // Click Event
    _handleClick = event => {
        if (this.props.data.children) {
            event.preventDefault();
        }
        this.setState({
            open: !this.state.open
        });
        if (!this.state.open) {
            this.props.onClick(this.props.data.name);
        }
    }

    // Icon
    _renderIcon(childData) {
        if (!childData) {
            return null;
        } else {
            return <span className="glyphicon glyphicon-chevron-right has-child-icon"></span>;
        }
    }

    // 子Ul
    _renderSubUl(childData, ifOpen, selected) {
        if (!childData) {
            return null;
        } else {
            return <SlideUl data={childData} show={ifOpen} selected={selected}/>;
        }
    };

    // 判断是否selected
    _desideSelected(data, selected) {
        if (data.href === selected) {
            return true;
        }
        if (data.children) {
            return _.some(data.children, 'href', selected);
            // ToDo: 此处已经满足需要，但是为了更加健壮的组件，应该考虑适应更多层级的情况
        }
        return false;
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.active === this.props.data.name
        });
    }

    // 判断是否open
    
    render() {
        let { data, selected, active } = this.props,
            { open } = this.state,
            selectedClassName = this._desideSelected( data, selected ) ? 'selected' : '',
            openClassName = open ? 'opened' : '',
            classes = `${selectedClassName} ${openClassName}`;

        return (
            <li
                className={classes}
            >
                <a
                    href={data.href}
                    onClick={this._handleClick}
                >
                    <span>{data.name}</span>
                    {
                        this._renderIcon(data.children)
                    }
                </a>
                { 
                    this._renderSubUl(data.children, open, selected)
                }
            </li>
        );
    }
}
