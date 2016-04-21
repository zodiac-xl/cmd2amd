import React, { Component }         from 'react';

import Button                       from 'react-bootstrap/lib/Button';
import Input                        from 'react-bootstrap/lib/Input';
import classNames                   from 'classnames';
import Ajax                         from '../../../../../components/util/bdAjax';
import ReactPathLink                from '../bind/react-path-link';
import ReactCheckedMaskPathLink     from '../bind/react-checked-mask-path-link';
import ReactCheckedEqualPathLink    from '../bind/react-checked-equal-path-link';
import ToggleUnionInput             from './toggle-union-input';
import MachineForm                  from './machine-form';


const CINEMA_OPERATE_TEXT = {
    EXPAND: '展开影院',
    SHRINK: '收起影院'
};

class CinemaForm extends Component{

    state = {
        showBody: false,
        cinemaOperateText: CINEMA_OPERATE_TEXT.EXPAND,
        cinema: {}
    }

    componentWillMount() {
        this.setState(this.props);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState(nextProps);
    }

    static propTypes = {
        cinema: React.PropTypes.object.isRequired
    }

    checkForm(submit) {
        let cinema = this.state.cinema;
        if(!(/\d{8}/).test($.trim(cinema.cinemaNo))) {
            return `${cinema.cinemaName}: 影院8位编码不能为空！`;
        }

        if(!(/\d/).test($.trim(cinema.boxOffice))) {
            return `${cinema.cinemaName}: 票房不能为空！`;
        }

        //该input使用datepick导致无法数据绑定,这里用这种方式塞进去
        //以后再研究这种case？
        let cinemaOpenDateInput = this.refs.cinemaOpenDate;
        if(cinemaOpenDateInput) {
            cinema.openDate = cinemaOpenDateInput.getValue();
        }

        if(!(/\d{4}-\d{2}-\d{2}/).test($.trim(cinema.openDate))) {
            return `${cinema.cinemaName}: 开业时间不能为空！`;
        }

        let cinemaContacts = cinema.cinemaContacts || [];
        let idx, ln, cinemaContact;
        ln = cinemaContacts.length;
        for(idx = 0; idx < ln; idx++) {
            cinemaContact = cinemaContacts[idx];
            if(!cinemaContact.name || !cinemaContact.phone) {
                return `${cinema.cinemaName}: 客服联系人姓名或者电话不能为空！`;
            }
        }

        let assist = cinema.assist || {};
        let financeContact = cinema.financeContact || {};
        if(assist.needAccountChecking && (!financeContact.name || !financeContact.phone)) {
            return `${cinema.cinemaName}: 影院独立结账时，财务联系人姓名和电话不能为空！`;
        }

        if(assist.refundType === 0 && !cinema.refundTime) {
            return `${cinema.cinemaName}： 请填写自助退票时间！`;
        }

        if(assist.hasChildPref && !cinema.childPref) {
            return `${cinema.cinemaName}: 儿童票选中时，儿童票描述内容不能为空！`;
        }

        if(assist.glassCheckType === 1) {
            if(!$.isNumeric(assist.glassDeposit) || assist.glassDeposit <= 0){
               return `${cinema.cinemaName}: 选中押金时，请正确填写押金金额！`;
            }
        } else if(assist.glassCheckType === 2) {
            if(!$.isNumeric(assist.glassPurchase) || assist.glassPurchase <= 0){
               return `${cinema.cinemaName}: 选中自费购买时，请正确填写金额！`;
            }
        }

        if(assist.canPark && !cinema.park) {
            return `${cinema.cinemaName}: 可停车厅勾选时，请填写停车位信息!`;
        }

        if(assist.hasIMax && !cinema.imaxHall) {
            return `${cinema.cinemaName}: IMAX厅勾选时，请填写IMAX厅信息!`;
        }

        if(assist.canUseCredit && !cinema.useCredit) {
            return `${cinema.cinemaName}: 可刷卡选项勾选时，请填写刷卡信息！`;
        }

        if(assist.hasCoupleHall && !cinema.coupleHall) {
            return `${cinema.cinemaName}: 情侣厅勾选时，请填写情侣厅信息！`;
        }

        if(assist.hasWifi && !cinema.wifi) {
            return `${cinema.cinemaName}: WIFI勾选时，请填写WIFI信息！`;
        }

        let machineForm = this.refs.machineForm;
        if(machineForm && machineForm.checkForm) {
            return machineForm.checkForm(cinema, submit);
        }

        return true;
    }

    deleteCinema() {
        if(this.props.deleteCinema) {
            this.props.deleteCinema(this.props.cinema.cinemaId);
        }
    }
    
    toggleCinemaInfo() {
        if(this.state.cinemaOperateText === CINEMA_OPERATE_TEXT.EXPAND) {
            this.setState({
                showBody: true,
                cinemaOperateText: CINEMA_OPERATE_TEXT.SHRINK
            });
        } else {
            this.setState({
                showBody: false,
                cinemaOperateText: CINEMA_OPERATE_TEXT.EXPAND
            });
        }
    }

    pathLink(key)  {
        return new ReactPathLink(this, key);
    }

    checkedMaskPathLink(key, value) {
        return new ReactCheckedMaskPathLink(this, key, value);
    }

    checkedEqualPathLink(key, value) {
        return new ReactCheckedEqualPathLink(this, key, value);
    }

    addCinemaContact() {
        var contacts = this.state.cinema.cinemaContacts || [];
        if(contacts.length < 5) {
            contacts.push({});
        } else {
            toastr.warning('最多添加5个客服联系人!');
        }
        this.setState({
            cinema: this.state.cinema
        });
    }

    deleteCinemaContact(idx) {
        let contacts = this.state.cinema.cinemaContacts || [];
        contacts.splice(idx, 1);
        this.setState({
            cinema: this.state.cinema
        });
    }

    render() {
        let panelBodyClassNames = classNames('panel-body', 'form-inline', 'com-margin', 'customCollapse', 'panel-collapse', 'collapse', {
            in: this.state.showBody
        }); 

        let cinema = this.state.cinema;
        cinema.assist = cinema.assist || {};

        let accountStyle = {
            display: cinema.assist.needAccountChecking ? 'block' : 'none'
        };

        let ticketReturnStyle = {
            display: cinema.assist.needTicketReturnSetting ? 'block' : 'none'
        };

        let cinemaContacts = cinema.cinemaContacts || [];
        let i, ln;
        ln = cinemaContacts.length;
        let contactComponents = [];
        for(i = 1; i < ln; i++) {
            let contact = cinemaContacts[i];
            contactComponents.push(
                <div key={`contact${contact.id}`}>
                    <span>
                        <input type="text" className="form-control input-sm contacts-margin"
                            placeholder="客服联系人姓名"
                            valueLink={this.pathLink(`cinema.cinemaContacts[${i}].name`)} />
                    </span>
                    <span className="margin-left-10">
                        联系电话：
                        <input type="text" className="form-control input-sm"
                            placeholder="联系电话"
                            valueLink={this.pathLink(`cinema.cinemaContacts[${i}].phone`)} />
                    </span>
                    <Button className="btn-sm margin-left-10" bsStyle="default"
                        onClick={this.deleteCinemaContact.bind(this, i)}>
                        删除联系人
                    </Button>
                </div>
            );
        }

        return (
            <div id="applyComponent">
                <div className="basic panel panel-primary input-group-sm">
                    <div className="panel-heading">
                        <span className="componentCinemaName cinema-name">{cinema.cinemaName}</span>&nbsp;
                        <span className="cinemaIdSpan">{'ID:' + cinema.cinemaId}</span>
                        <span className="btn-group-sm btn-group-customer">
                            <Button bsStyle="info" className="controlCinema" onClick={this.toggleCinemaInfo.bind(this)}>
                                <span className="hideOrShowCinema">{this.state.cinemaOperateText}</span>
                                <span className="caret"></span>
                            </Button>
                            <Button className="deleteCinema" bsStyle="danger" onClick={this.deleteCinema.bind(this)}>删除影院</Button>
                        </span>
                    </div>
                    <div className={panelBodyClassNames}>
                        <div>
                            <span>
                                8位编码：
                                <input className="form-control input-sm" type="text" placeholder="请输入8位编码"
                                    valueLink={this.pathLink('cinema.cinemaNo')}/>
                            </span>
                            <span className="margin-left-10">
                                2014年票房：
                                <input className="form-control input-sm" type="text"
                                       placeholder="新影城请填0" size="15"
                                       valueLink={this.pathLink('cinema.boxOffice')}/>
                                万元
                            </span>
                            <span className="margin-left-10">
                                开业时间：
                                <span style={{position:'relative'}}>
                                     <Input ref="cinemaOpenDate" className="form-control input-sm J_datePicker" size="20" type="text"
                                            placeholder="新影城填预估开业时间"
                                            data-default-date={cinema.openDate}
                                         />
                                </span>
                            </span>
                        </div>
                        <div>已合作第三方：
                            <label className="checkbox-inline margin-left-10">
                                <Input type="checkbox"
                                    checkedLink={this.checkedMaskPathLink('cinema.otherCoop', 1)}/>
                                格瓦拉
                            </label>
                            <label className="checkbox-inline margin-left-10">
                                <Input type="checkbox"
                                    checkedLink={this.checkedMaskPathLink('cinema.otherCoop', 2)}/>
                                时光网
                            </label>
                            <label className="checkbox-inline margin-left-10">
                                <input type="checkbox"
                                    checkedLink={this.checkedMaskPathLink('cinema.otherCoop', 4)}/>
                                网票网
                            </label>
                            <label className="checkbox-inline margin-left-10">
                                <input type="checkbox"
                                    checkedLink={this.checkedMaskPathLink('cinema.otherCoop', 8)}/>
                                微信
                            </label>
                            <label className="checkbox-inline margin-left-10">
                                <input type="checkbox"
                                    checkedLink={this.checkedMaskPathLink('cinema.otherCoop', 16)}/>
                                其他
                            </label>
                        </div>
                        <div className="contactArea">
                            <div>
                                <span>
                                    客服联系人：
                                    <input type="text" className="form-control input-sm"
                                          placeholder="客服联系人姓名"
                                          valueLink={this.pathLink('cinema.cinemaContacts[0].name')} />
                                </span>
                                <span className="margin-left-10">
                                    联系电话：
                                    <input type="text" className="form-control input-sm"
                                        placeholder="联系电话"
                                        valueLink={this.pathLink('cinema.cinemaContacts[0].phone')} />
                                </span>
                                <Button className="btn-sm margin-left-10" bsStyle="default"
                                    onClick={this.addCinemaContact.bind(this)} >增加客服联系人</Button>
                            </div>
                            {contactComponents}
                        </div>
                        <div style={accountStyle}>
                            <span>
                                财务联系人：
                                <input type="text" className="form-control input-sm"
                                   placeholder="财务联系人姓名"
                                   valueLink={this.pathLink('cinema.financeContact.name')} />
                            </span>
                            <span className="margin-left-10">
                                联系电话：
                                <input type="text" className="form-control input-sm" placeholder="联系电话"
                                   valueLink={this.pathLink('cinema.financeContact.phone')} />
                            </span>
                        </div>
                        <div style={ticketReturnStyle}>
                            退票设置：
                            <label className="radio-inline">
                                <input type="radio" name="refundTimeSub"
                                    checkedLink={this.checkedEqualPathLink('cinema.assist.refundType', 0)} />
                                开场前：
                            </label>
                            <input type="text" className="form-control input-sm" size="4"
                                disabled={cinema.assist.refundType !== 0}
                                valueLink={this.pathLink('cinema.refundTime')} />
                            分钟用户可以自助退票
                            <label className="radio-inline margin-left-10">
                                <input type="radio" name="refundTimeSub"
                                    checkedLink={this.checkedEqualPathLink('cinema.assist.refundType', 1)} />
                                不支持用户自主退票
                            </label>
                        </div>
                        <div>
                            值班电话(非必填)：
                            <input type="text" className="form-control input-sm"
                                valueLink={this.pathLink('cinema.dutyPhone')} />
                        </div>
                        <hr/>
                        <div>
                            儿童优惠：
                            <ToggleUnionInput 
                                type="checkbox"
                                title="儿童票"
                                size="40"
                                placeholder="举例：1.3m一下儿童观看2D普通影片免票无座，需家长陪同，3D以及动画片半价"
                                checkedLink={this.pathLink('cinema.assist.hasChildPref')}
                                valueLink={this.pathLink('cinema.childPref')} />
                        </div>
                        <div>
                            3D眼镜：
                            <label className="radio-inline">
                                <input type="radio"
                                    checkedLink={this.checkedEqualPathLink('cinema.assist.glassCheckType', 0)} />
                                免押金
                            </label>
                            <label className="radio-inline margin-left-10">
                                <input type="radio"
                                    checkedLink={this.checkedEqualPathLink('cinema.assist.glassCheckType', 1)} />
                                需要押金
                            </label>
                            <input type="text" className="form-control input-sm" placeholder="金额" size="4"
                                disabled={cinema.assist.glassCheckType !== 1}
                                valueLink={this.pathLink('cinema.assist.glassDeposit')}/>
                            <label className="radio-inline margin-left-10">
                                <input type="radio"
                                    checkedLink={this.checkedEqualPathLink('cinema.assist.glassCheckType', 2)} />
                                不提供3D眼镜，自费购买
                             </label>
                            <input type="text" className="form-control input-sm" placeholder="金额" size="4"
                                disabled={cinema.assist.glassCheckType !== 2}
                                valueLink={this.pathLink('cinema.assist.glassPurchase')}/>
                        </div>
                        <div>
                            停车信息：
                            <ToggleUnionInput 
                                type="checkbox"
                                title="可停车"
                                size="100"
                                placeholder="请填写停车场位置，以及是否免费或凭票根免费，免费多久.举例：商场地下一层有停车场，23：30前免费，23：30后凭票根免费停3个小时"
                                checkedLink={this.pathLink('cinema.assist.canPark')}
                                valueLink={this.pathLink('cinema.park')} />
                        </div>
                        <div>
                            IMAX厅：
                            <ToggleUnionInput 
                                type="checkbox"
                                title="有IMAX厅"
                                size="90"
                                placeholder="请填写IMAX厅描述，如座位数、屏幕尺寸等。举例：468个座位，屏幕尺寸17米*9米"
                                checkedLink={this.pathLink('cinema.assist.hasIMax')}
                                valueLink={this.pathLink('cinema.imaxHall')} />
                        </div>
                        <div>
                            影院公告：
                            <input type="text" className="form-control input-sm" size="90"
                                placeholder="请填写影院要求公示的说明，如：会员卡信息及周二半价日等"
                                valueLink={this.pathLink('cinema.note')} />
                        </div>
                        <div>
                            情侣座：
                            <ToggleUnionInput 
                                type="checkbox"
                                title="情侣座"
                                size="90"
                                placeholder="请填写哪些影厅有情侣座，或某个影厅某几排是情侣座，举例：3号厅，5号厅最后一排有情侣座"
                                checkedLink={this.pathLink('cinema.assist.hasCoupleHall')}
                                valueLink={this.pathLink('cinema.coupleHall')} />
                        </div>
                        <div>
                            WI-FI：
                            <ToggleUnionInput 
                                type="checkbox"
                                title="有WIFI"
                                size="60"
                                placeholder="影院提供免费wifi"
                                checkedLink={this.pathLink('cinema.assist.hasWifi')}
                                valueLink={this.pathLink('cinema.wifi')} />
                        </div>
                        <hr/>
                        <MachineForm ref="machineForm" machine={cinema.machine || {}} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CinemaForm;
