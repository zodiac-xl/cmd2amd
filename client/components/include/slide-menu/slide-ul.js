import React, { Component } from 'react';
import _ from 'lodash';
import SlideLi from './slide-li';

export default class SlideUl extends Component {

    static propTypes = {
        data: React.PropTypes.array,
        show: React.PropTypes.bool,
        selected: React.PropTypes.string,
        active: React.PropTypes.string
    };

    static defaultProps = {
        data: [],
        show: true,
        selected: '',
        active: ''
    };

    state = {
        active: this.props.active
    };

    _updateUI = newName => {
        this.setState({
            active: newName
        });
    };

    render() {
        let { data, show, selected } = this.props,
            { active } = this.state,
            divStyle = {
                display: show ? 'block' : 'none'
            };

        return (
            <ul style={divStyle}>
                {
                    _.map(data, item => {
                        return (
                            <SlideLi
                                key={item.name}
                                data={item}
                                selected={selected}
                                active={active}
                                onClick={this._updateUI}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

