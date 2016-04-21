import React, { Component }     from 'react';
import ReactDOM                 from 'react-dom';


//children
import Modal                    from 'react-bootstrap/lib/Modal';
import Button                   from 'react-bootstrap/lib/Button';


//custom util
import bdAjax                   from '../util/bdAjax';
import NestLinkedStateMixin     from 'react-nest-link-state';
import {Group,Left,Right}       from './form-group';

export default class SimpleModal extends Component {

    state = this.getStateByProps ? this.getStateByProps(this.props) : {};

    componentWillReceiveProps(nextProps) {
        this.getStateByProps && this.setState(this.getStateByProps(nextProps));
    }

    nestLinkedState = NestLinkedStateMixin.nestLinkedState;

    validate() {
        let _this = this;
        let validate = true;
        $.each(_this.props.fieldLabelMap, function (key, value) {
            if (!_this.props.fieldLabelMap[key].hide && _this.state.content && _this.state.content[key] == "") {
                validate = false;
                toastr.warning(`${value}不能为空`);
                ReactDOM.findDOMNode(_this.refs[key]).focus();
                return false;
            }
        });
        return validate;
    }

    hide() {
        this.setState({
            show: false
        });
    }

    renderFooter() {
        let {isLoading} = this.state;
        let {show, hide, hideCancelBtn} = this.props;
        return (
            <div>
                {!hideCancelBtn
                    ? <Button onClick={show != undefined ? hide : this.hide.bind(this)}>取消</Button>
                    : null
                }
                <Button bsStyle='danger' disabled={isLoading}
                        onClick={!isLoading ? this.submit.bind(this) : null}>
                    {isLoading ? '确认中...' : '确认'}</Button>
            </div>
        );
    }

    onSubmit(api) {
        let defer = $.Deferred();
        let _this = this;
        _this.setState({isLoading: true});
        bdAjax(api).done(function (e) {
            !api.showSuccess && toastr.success(`${e.des}`);
            defer.resolve(e);
        }).always(function () {
            if (_this.props.hide) {
                _this.setState({isLoading: false});
                _this.props.hide()
            } else {
                _this.setState({isLoading: false, show:false});
            }
        }).fail(function (e) {
            defer.reject(e);
        });
        return defer.promise();
    }


    renderBody() {
        let _this = this;
        let Groups = [];
        _this.props.fieldLabelMap && $.each(_this.props.fieldLabelMap, function (key, value) {
            let fieldLabel = _this.props.fieldLabelMap[key];
            let label = fieldLabel;
            let hide = false;
            if ($.isPlainObject(fieldLabel)) {
                label = fieldLabel.label;
                hide = fieldLabel.hide;
            }

            Groups.push(<Group key={key} className={hide?'hide':''}>
                <Left style={{width:"6em"}}>{label}</Left>：
                <Right>
                    <input type="text" ref={key}
                           valueLink={_this.nestLinkedState(["content",key],_this)}/>
                </Right>
            </Group>);
        });
        return Groups;
    }

    render() {


        let _this = this;


        return (
            <div className="modal-container">
                <Modal show={_this.props.show != undefined?_this.props.show:_this.state.show} bsSize={_this.props.bsSize?_this.props.bsSize:'medium'}
                       onHide={_this.props.show != undefined?_this.props.hide:_this.hide.bind(_this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{_this.state.title || _this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderBody()}
                    </Modal.Body>
                    {
                        (()=> {
                            if (_this.renderFooter) {
                                return <Modal.Footer>
                                    {_this.renderFooter()}
                                </Modal.Footer>;
                            }
                        })()
                    }
                </Modal>
            </div>
        )
    }
}
