import {Group,Left,Right,Hr}    from '../../../../../common/form-group';
import SuperChild               from '../../../../../common/super-child';


export default class TimeRange extends SuperChild {

    defaultValue() {
        return {
            "startTime": "",
            "endTime": ""
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
                <span>{value.startTime}</span>
                &nbsp;--&nbsp;
                <span>{value.endTime}</span>
            </Right>;
        } else {
            rightDom = <Right>

                <input required={true}
                       className="J_datePicker"
                       valueLink={_this.nestLinkedState(["value","startTime"],_this)}/>
                &nbsp;--&nbsp;
                <input required={true}
                       className="J_datePicker"
                       valueLink={_this.nestLinkedState(["value","endTime"],_this)}/>
            </Right>;
        }

        return (
            <Group>
                <Left>
                    活动日期
                </Left>
                ：
                {rightDom}
            </Group>
        )
    }
};
