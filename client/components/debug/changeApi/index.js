import React                    from 'react';
import ReactDOM                 from 'react-dom';
import Button                   from 'react-bootstrap/lib/Button';

import SimpleModal              from '../../common/simple-modal';

import cookie                   from '../../util/cookie';



export default class ChangeApi extends SimpleModal {


    state = {
        origin: cookie.get('apiProxy') || '',
        show: true,
        title: '修改后端接口'
    }

    selectChange(e) {
        let newValue = e.target.value
        this.setState({
            origin: newValue == 0 ? '' : newValue
        })
    }

    submit() {
        let _this = this;
        cookie.set('apiProxy', _this.state.origin);
        _this.hide();
    }

    reset() {
        let _this = this;
        cookie.set('apiProxy', '');
        _this.hide();
    }

    renderFooter() {
        let _this = this;
        let isLoading = _this.state.isLoading;
        return <div>
            <Button disabled={isLoading}
                    onClick={!isLoading ? _this.submit.bind(_this) : null}>
                {isLoading ? '确认中...' : '确认'}</Button>
            <Button onClick={_this.reset.bind(_this)}>恢复默认</Button>
        </div>
    }

    renderBody() {
        let _this = this;
        let origin = _this.state.origin
        let options = [
            <option value='0' key='default'>手动</option>
        ];
        let selectValue = '0';
        window.hostKeys.forEach(function (key) {
            options.push(<option value={key} key={key}>{key}</option>)
        })
        if ($.inArray(origin, window.hostKeys) != -1) {
            selectValue = origin;
        }


        return <div style={{textAlign: 'center'}}>
            <input ref='content' valueLink={_this.nestLinkedState(['origin'],_this)}
                   style={{width: '50%',padding: '0 10px'}}
                   placeholder='http://host:port  or name'></input>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <select onChange={_this.selectChange.bind(_this)} defaultValue={selectValue}>
                {options}
            </select>
        </div>
    }

}
