import React, { Component }         from 'react';

//checkbox或者radio和input的结合组件
//checkbox/radio check时input可以输入
class ToggleUnionInput extends Component {

    state = {
        checked: false
    }

    static propTypes =  {
       valueLink: React.PropTypes.object.isRequired,
       checkedLink: React.PropTypes.object.isRequired
    }

    onCheckedChange(evt) {
        let checked = evt.target.checked;
        if(this.props.checkedLink) {
            this.props.checkedLink.requestChange(checked);
        }
    }

    onInputChanged(evt) {
        let value = evt.target.value.trim();
        if(this.props.valueLink) {
            this.props.valueLink.requestChange(value);
        }
    }

    isChecked() {
        return this.checked;
    }

    getValue(ctx) {
        return ctx.value || ctx.valueLink.value;
    }

    getChecked(ctx) {
        if(!ctx.checkedLink) {
            return false;
        }
        return ctx.checked || ctx.checkedLink.value;
    }

    render() {
        let ctx = this.props;
        let value = this.getValue(ctx);;
        let checked = this.getChecked(ctx);

        return (
            <span>
                <label className={ctx.type+'-inline'}>
                    <input type={ctx.type} name={ctx.name}
                        checked={checked}
                        onChange={this.onCheckedChange.bind(this)} />
                    {ctx.title}
                </label>
                {ctx.beforeText}
                <input type="text" className="form-control input-sm"
                    size={ctx.size}
                    disabled={!checked}
                    placeholder={ctx.placeholder}
                    value={value}
                    onChange={this.onInputChanged.bind(this)} />
                {ctx.afterText}
            </span>
        );
    }
}

export default ToggleUnionInput;
