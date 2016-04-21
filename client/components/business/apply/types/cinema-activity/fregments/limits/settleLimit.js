import RadioGroup               from 'react-simple-radio-group';


import {Group,Left,Right,Hr}    from '../../../../../../common/form-group';
import SuperChild               from '../../../../../../common/super-child';
import ValidateMap              from '../../../../../../common/validatemap';


export default class SettleLimit extends SuperChild {

    defaultValue() {
        return true;  //结算价限量
    }

    static defaultProps = {
        valueLink: null,
        readOnly: false,
        disableNoLimit: false
    };


    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value != undefined ? valueLink.value : this.defaultValue();
        return {
            value: value
        }
    }


    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;

        let value = _this.state.value;
        let settleLimit = value;


        let rightDom;
        if (readOnly) {
            rightDom = <Right><span>{settleLimit ? '需要对结算价限量，且与以上限量相同。' : '不需要对结算价限量'}</span></Right>;
        } else {
            rightDom = <Right>
                <input type="checkbox" checked={settleLimit} onChange={function(e){
                    let settleLimit = e.target.checked;
                    _this.setState({value:settleLimit});
                }}/>需要对结算价限量，且与以上限量相同。
            </Right>;
        }

        return (
            <Group>
                <Left>
                    结算价限量
                </Left>
                ：
                {rightDom}
            </Group>
        )
    }
};
