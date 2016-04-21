import {Group,Left,Right,Hr}    from '../../../../../common/form-group';
import SuperChild               from '../../../../../common/super-child';


export default class SaleDate extends SuperChild {

    defaultValue() {
        return {
            "start": "",
            "end": ""
        }
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

        let rightDom;

        if (readOnly) {
            rightDom = <Right>
                <span>{value.start}</span>
                &nbsp;--&nbsp;
                <span>{value.end}</span>
            </Right>;
        } else {
            rightDom = <Right>

                <div style={{position:'relative'}}>
                    <input required={true}
                           className="J_datePicker"
                           valueLink={_this.nestLinkedState(['value','start'],_this)}/>
                    &nbsp;--&nbsp;
                    <input required={true}
                           className="J_datePicker"
                           valueLink={_this.nestLinkedState(['value','end'],_this)}/>
                </div>
            </Right>;
        }

        return (
            <Group>
                <Left>
                    结算价降价日期
                </Left>
                ：
                {rightDom}
            </Group>
        )
    }
};
