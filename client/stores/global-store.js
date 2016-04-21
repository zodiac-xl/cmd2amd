import _                from 'lodash';
import flux             from '../alt';
import GlobalActions    from '../actions/global-actions';
import MENU_DATA        from '../components/include/menu-data';

class GlobalStore {

    constructor() {
        this.bindActions(GlobalActions);
    }

    static getSideInfo() {
        let current = window.pageName,
        breads = current.split('/'),
        channel = '/' + breads[1],
        channelName = '',
        channelList = [],
        currentMenuData;

        _.forEach(MENU_DATA, item => {
            channelList.push({
                href: item.href,
                name: item.name
            });
            if (item.href === channel) {
                channelName = item.name;
                currentMenuData = item.children;
            }
        });

        breads.shift();

        return {
            breads: breads,
            channel: channel,
            channelName: channelName,
            channelList: channelList,
            current: current,
            currentMenuData: currentMenuData
        };
    }
}

export default flux.createStore(GlobalStore);
