import React            from 'react';
import _                from 'lodash';
import SlideMenu        from './slide-menu/slide-menu';
import Dropdown         from '@myfe/cat-dropdown';
import GlobalStore      from '../../stores/global-store';

import  './less/page-side.less';



export default class SideBar extends React.Component {
    static propTypes = {
        current: React.PropTypes.string, //当前页面的path
        channelName: React.PropTypes.string,
        channelList: React.PropTypes.array,
        currentMenuData: React.PropTypes.array
    };

    static defaultProps = {
        current: '/dashboard',
        channelName: '',
        channelList: [],
        currentMenuData: []
    };

    render() {
        let { channelName, channelList, current, currentMenuData } = GlobalStore.getSideInfo();

        return (
            <div className="side-bar">
                <SlideMenu data={currentMenuData} selected={current} active={current}/>
            </div>
        )
    }
}
