import {Group,Left,Right,Hr}    from '../../../../../common/form-group';
import SuperChild               from '../../../../../common/super-child';


export default class ActivityType extends SuperChild {

    defaultValue() {
        return '票补';
    }

    static defaultProps = {
        valueLink: null,
        readOnly: false
    };


    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value || this.defaultValue();
        return {
            value: value
        }
    }


    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;

        let value = _this.state.value;
        let form = value;
        return (
            <Group>
                <Left>
                    活动形式
                </Left>
                ：
                {
                    (()=> {
                        if (readOnly) {

                            return <Right><span>{form}</span></Right>
                        } else {
                            return <Right>
                                <select valueLink={_this.nestLinkedState(["value"],_this)}>
                                    <option value='票补'>票补</option>
                                    <option value='第三方补贴'>第三方补贴</option>
                                    <option value='服务费减免'>服务费减免</option>
                                </select>
                            </Right>
                        }
                    })()
                }
            </Group>
        )
    }
};
