import RadioGroup               from 'react-simple-radio-group';


import {Group,Left,Right,Hr}    from '../../../../../../common/form-group';
import SuperChild               from '../../../../../../common/super-child';
import ValidateMap              from '../../../../../../common/validatemap';


export default class UserLimit extends SuperChild {

    defaultValue() {
        return 2; //每人限量* number 不限为0 默认为“限制 2 张“
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
        let userLimit = value;

        let valueLink = _this.nestLinkedState(['value'], _this);
        let handleChange = (e)=> {
            valueLink.requestChange(e.target.value);
        };
        let radioChangeHandler = (newValue)=> {
            if (newValue == 0) {
                let newState = _this.state;
                newState.value = 0;
                _this.setState(newState)
            }
        };


        //活动形式为“票补”或“第三方补贴”时：“不限”置灰无法选择；默认选择“限制 XX 张”，必填，
        let disableNoLimit = _this.props.disableNoLimit;

        let radioValue; // 0 不限制  1限制
        if (valueLink.value == 0 && !disableNoLimit) {
            radioValue = 0;
        } else {
            radioValue = 1;
        }

        let rightDom;
        if (readOnly) {
            rightDom = <Right><span>{userLimit > 0 ? `${userLimit}张` : '不限'}</span></Right>;
        } else {
            rightDom = <Right>
                <RadioGroup name={'userLimit'} value={radioValue}
                            onChange={radioChangeHandler}>
                    <span style={{color: disableNoLimit?'#C5C5C5':'inherit'}}>
                        <input type="radio" value="0" disabled={disableNoLimit}/>不限
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" value="1"/>限制&nbsp;&nbsp;
                    <input {...ValidateMap.number} min={'1'} value={valueLink.value||''}
                                                   required={radioValue==1} //a.为0 时为不限制 张数为空 非必填 b.为1时 必填
                                                   onChange={handleChange}/>&nbsp;张
                </RadioGroup>
            </Right>;
        }

        return (
            <Group>
                <Left>
                    每人限量
                </Left>
                ：
                {rightDom}
            </Group>
        )
    }
};
