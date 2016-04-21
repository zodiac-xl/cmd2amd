import React                from 'react';
import ReactDOM             from 'react-dom';

import SimpleModal          from '../../common/simple-modal';
import bdajax               from '../../util/bdAjax';




export default class CancelPriceApply extends SimpleModal {


    static defaultProps = {
        id: '',
        done: function () {
        }
    }

    state = {
        show: true,
        title: '取消调价申请'
    }

    submit() {
        let _this = this;

        let api = {
            url: `/api/price/${_this.props.id}/operation.json`,
            data: {
                operationType: 3
            },
            type: 'POST',
            des: '取消调价申请'
        }
        _this.onSubmit(api).done(function(){
            _this.props.done();
        });
    }

    renderBody() {
        return <div style={{padding: '10px'}}>
            取消调价申请调价组将不再进行调价。取消当前调价申请 ？
        </div>
    }

}
