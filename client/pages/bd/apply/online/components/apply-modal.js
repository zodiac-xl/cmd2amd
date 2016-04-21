import React, { Component }         from 'react';
import ReactDOM                     from 'react-dom';

import Modal                        from 'react-bootstrap/lib/Modal';
import Button                       from 'react-bootstrap/lib/Button';
import Input                        from 'react-bootstrap/lib/Input';
import Table                        from '../../../../../components/common/my-table';
import Ajax                         from '../../../../../components/util/bdAjax';
import CinemaForm                   from './cinema-form';
import classNames                   from 'classnames';
import UploadedFile                 from './uploaded-file';
import ToggleUnionInput             from './toggle-union-input';
import ReactPathLink                from '../bind/react-path-link';
import ReactCheckedMaskPathLink     from '../bind/react-checked-mask-path-link';
import ReactCheckedHasPathLink      from '../bind/react-checked-has-path-link';
import ReactCheckedEqualPathLink    from '../bind/react-checked-equal-path-link';
import ProcessButton                from './process-button';
import modalEnterHelper             from '../dom/modal-enter-helper';
import fileUpload                   from '../../../../../components/common/fileupload';

const SALE_SYSTEMS_URL = '/api/seat/saleSystem.json';

const SAVE_BUTTON_TEXT = {
    SAVE: '保存并提交申请',
    SAVING: '申请中...'
};

const DRAFT_BUTTON_TEXT = {
    DRAFT: '保存草稿',
    DRAFTING: '保存中...'
};

class ApplyModal extends Component {
    state = {
        saveButton: {
            processing: false,
            text: SAVE_BUTTON_TEXT.SAVE,
            processingText: SAVE_BUTTON_TEXT.SAVING
        },
        draftButton: {
            processing: false,
            text: DRAFT_BUTTON_TEXT.DRAFT,
            processingText: DRAFT_BUTTON_TEXT.DRAFTING 
        },
        apply: {id: 0},
        cinemas: [],
        saleSystems: []
    }

    componentDidMount() {
        this.getSaleSystems();
    }

    componentWillMount() {
        this.fillData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.fillData(nextProps);
    }

    fillData(props) {
        if(props.show && props.inEditing) {
            //applyId等于0代表新建
            if(props.applyId === 0) {
                let apply = {id: 0};
                this.setState({
                    apply: apply
                });
                this.addAssistData(apply);
            } else {
                this.getApply(props.applyId);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    deleteCinema(id) {
        let apply = this.state.apply || {};
        let cinemas = apply.cinemas || [];
        let foundCinema = false;
        apply.cinemas = cinemas.filter(cinema => cinema.cinemaId !== id);
        //delete  parent's
        this.props.deleteCinema(id);
        this.forceUpdate();
    }

    getSaleSystems() {
        Ajax({
            url: SALE_SYSTEMS_URL,
            method: 'GET'
        }).then((saleSystems) => {
            this.setState({
                saleSystems: saleSystems.data
            });
        }).fail(() => {
            console.log('get sale system error');
        });
    }

    getApply(applyId) {
        let url = '/api/online/apply/' + applyId + '.json';
        Ajax({
            url: url,
            type: 'GET'
        }).then((apply) => {
            this.addAssistData(apply.data);
            this.setState({
                apply: apply.data
            });
        }).fail(() => {
            console.log('get apply data error', url);
            this.setState({
                apply: {} 
            });
        });
    }
    
    //由于数据和ui并不是一一对应，有的数据代表了多种含义，所以这里将这些
    //数据拆分，用于数据绑定
    //该方法只在拿到新数据时调用
    addAssistData(apply) {
        this.addApplyAssitData(apply);
    }
    
    addApplyAssitData(apply) {
        apply.assist = {};
        if(!apply.contract) {
            apply.contract = {};
        }
        let contract = apply.contract;
        
        if(!contract.contact) {
            contract.contact = {};
        }

        //初始值
        if(!contract.sellSrc) {
            contract.sellSrc = '4';
        }

        let contact = contract.contact;

        //初始化默认不能退票
        if(!('refundType' in contract)) {
            contract.refundType = 0;
        }

        let financeContact = contract.financeContact || {}; 
        if(financeContact.id) {
            apply.assist.accountCheckType = 0;
        } else {
            apply.assist.accountCheckType = 1;
        }

        //400电话
        if(contract.freeContactPhone) {
            apply.assist.$400CheckType = 0;
        } else {
            apply.assist.$400CheckType = 1;
        }

        if(!apply.cinemas) {
            apply.cinemas = [];
        }
        let cinemas = apply.cinemas;
        cinemas.forEach(cinema => {
            this.addCinemaAssistData(apply, cinema);
        });
    }

    addCinemaAssistData(apply, cinema) {
        apply.assist = apply.assist || {};
        cinema.assist = cinema.assist || {};

        //影院是否对账
        if(apply.assist.accountCheckType === 1) {
            cinema.assist.needAccountChecking = true;
        } else {
            cinema.assist.needAccountChecking = false;
        }

        let contract = apply.contract || {};

        //影院是否独立设置退票
        if(contract.refundType === 2) {
            cinema.assist.needTicketReturnSetting= true;
        } else {
            cinema.assist.needTicketReturnSetting = false;
        }

        if(cinema.refundTime && cinema.refundTime > 0) {
            cinema.assist.refundType = 0;
        } else {
            cinema.assist.refundType = 1;
        }

        //儿童票
        if(cinema.childPref) {
            cinema.assist.hasChildPref = true;
        } else {
            cinema.assist.hasChildPref = false;
        }

        if(!('glasses' in cinema)) {
            cinema.glasses = 0;
        }

        //3D眼镜    
        if(cinema.glasses === 0) {
            cinema.assist.glassCheckType = 0;
        } else if(cinema.glasses > 0) {
            cinema.assist.glassCheckType = 1;
            cinema.assist.glassDeposit = cinema.glasses;
        } else {
            cinema.assist.glassCheckType = 2;
            cinema.assist.glassPurchase = -cinema.glasses;
        } 

        //停车
        if(cinema.park) {
            cinema.assist.canPark = true;
        } else {
            cinema.assist.canPark = false;
        }

        //IMAX厅
        if(cinema.imaxHall) {
            cinema.assist.hasIMax = true;
        } else {
            cinema.assist.hasIMax = false;
        }

        //可刷卡
        if(cinema.useCredit) {
            cinema.assist.canUseCredit = true;
        } else {
            cinema.assist.canUseCredit = false;
        }

        //情侣座
        if(cinema.coupleHall) {
            cinema.assist.hasCoupleHall = true;
        } else {
            cinema.assist.hasCoupleHall = false;
        }

        //WI-FI
        if(cinema.wifi) {
            cinema.assist.hasWifi = true;
        } else {
            cinema.assist.hasWifi = false;
        }

        if(!cinema.machine) {
            cinema.machine = {};
        }

        this.addMachineAssistData(cinema.machine);
    }

    addMachineAssistData(machine) {
        machine.assist = machine.assist || {};
        if(machine.machineNum) {
            machine.assist.needMachineType = 0;
        } else {
            machine.assist.needMachineType = 1;
        }
    }

    removeAssistData(apply) {
        let contract = apply.contract || {};
        let financeContact = contract.financeContact || {}; 
        let assist = apply.assist || {};
        if(assist.accountCheckType === 1) {
            delete contract.fananceContact;
        }

        if(assist.$400CheckType === 1) {
            contract.freeContactPhone = '';
        }

        let cinemas = apply.cinemas || [];
        cinemas.forEach(cinema => {
            let cinemaAssist = cinema.assist || {};

            let financeContact = cinema.financeContact || {};
            if(!cinemaAssist.needAccountChecking) {
                delete cinema.financeContact;
            }

            if(!cinemaAssist.needTicketReturnSetting) {
                delete cinema.refundTime;
            } else {
                if(cinemaAssist.refundType === 1) {
                    delete cinema.refundTime;
                }
            }

            if(!cinemaAssist.hasChildPref) {
                delete cinemaAssist.childPref;
            }

            if(cinemaAssist.glassCheckType === 0) {
                cinema.glasses = 0;
            } else if(cinemaAssist.glassCheckType === 1) {
                cinema.glasses = +cinemaAssist.glassDeposit;
            } else {
                cinema.glasses = -cinemaAssist.glassPurchase;
            }

            if(!cinemaAssist.canPark) {
                delete cinemaAssist.park;
            }

            if(!cinemaAssist.hasIMax) {
                delete cinemaAssist.imaxHall;
            }

            if(!cinemaAssist.canUseCredit) {
                delete cinemaAssist.useCredit;
            }

            if(!cinemaAssist.hasCoupleHall) {
                delete cinemaAssist.coupleHall;
            }

            if(!cinemaAssist.hasWifi) {
                delete cinemaAssist.wifi;
            }

            let machine = cinema.machine || {};
            let machineAssist = machine.assist || {};
            if(machineAssist.needMachineType === 1) {
                machine.machineNum = 0;
            } else {
                if(machine.useDhcp === 1) {
                    machine.ip = "";
                    machine.subnetMask = "";
                    machine.gatewayIp = "";
                    machine.dnsIp1 = "";
                    machine.dnsIp2 = "";
                }
            }
        });
    }

    onModalHide() {
    }

    onUploadedFileAdd(e) {
        fileUpload({
            success: data => {
                let apply = this.state.apply;
                let contract = apply.contract || {};
                let files = contract.files || [];
                files.push(data[0]);
                contract.files = files;
                apply.contract = contract;
                this.setState({
                    apply: apply
                });
            },

            fail: () => {
                toastr.error("上传文件失败，请确认图片格式!");
            }
        })(e);
    }

    onUploadedFileDelete(fileId) {
        let apply = this.state.apply;
        let contract = apply.contract || {};
        let files = contract.files || [];
        contract.files = files.filter(file => file.id !== fileId);
        apply.contract = contract;
        this.setState({
            apply: apply
        });
    }

    save() {
        this.state.saveButton.processing = true;
        this.setState(this.state);
        this.doSave(true);
    }

    saveDraft() {
        this.state.draftButton.processing = true;
        this.setState(this.state);
        this.doSave(false);
    }

    backToApplyList() {
        this.props.closeApplyModal(true);
    }

    doSave(submit) {
        let checkResult = this.checkForm(submit);
        if(checkResult !== true) {
            this.resetSaveAndDraftButton();
            toastr.info(checkResult);
        } else {
            let apply = this.state.apply;

            this.removeAssistData(apply);

            let url = '';
            let type = '';
            if(apply.id === 0) {
                url = '/api/online/apply/applies.json';
                type = 'post'
            } else {
                url = `/api/online/apply/${apply.id}.json`;
                type = 'put';
            }

            $.ajax({
                url: url,
                type: type,
                data: {
                    content: JSON.stringify(apply, (key, value) => {
                        if(key !== 'assist') return value;
                    })
                },

                success: data => {
                    if(submit) {
                        if(apply.state === 1) {
                            toastr.success("编辑成功，已经保存。");
                            this.backToApplyList();
                        } else {
                            if(data.success) {
                                $.post("/api/online/apply/" + data.data.id + "/submit.json", data => {
                                    if(data.success) {
                                        toastr.success(data.message);
                                        this.backToApplyList();
                                    } else {
                                        toastr.success(`保存草稿成功，${data.message}`);
                                    }
                                }); 
                            } else {
                                toastr.error("保存草稿失败,无法提交！");
                            }
                        }
                    } else {
                        toastr.info(data.message);
                    }
                },

                complete: () => {
                    this.resetSaveAndDraftButton();
                }
            });
        }
    }

    resetSaveAndDraftButton() {
        this.state.saveButton.processing = false;
        this.state.draftButton.processing = false;
        this.setState(this.state);
    }

    checkForm(submit) {
        let apply = this.state.apply || {};
        let contract = apply.contract || {};
        if(!contract.theaterChain) {
            return '所属院线不能为空！';
        }

        let contact = contract.contact || {};
        if(!contact.name || !contact.phone) {
            return '签约联系人姓名和联系电话不能为空！';
        }

        let assist = apply.assist || {};
        let financeContact = contract.financeContact || {};
        if(assist.accountCheckType === 0) {
            if(!financeContact.name || !financeContact.phone) {
                return '统一对账时，财务联系人姓名和联系电话不能为空！';
            }
        }

        if(contract.refundType === 1 && !contract.refundTime) {
            return '请填写统一自助退票时长！';
        }

        if(assist.$400CheckType === 0 && !contract.freeContactPhone) {
            return '勾选400电话选项时，必须填写400电话！';
        }

        let files = contract.files || [];
        if(submit && files.length < 4) {
            return '所需文件没有达到要求，请最少收集4个文件后重试！';
        }

        let cinemas = apply.cinemas || [];
        if(cinemas.length === 0) {
            return '没有影院关联上线申请，请与影院关联！';
        }

        let i, ln = cinemas.length;
        let cinema, cinemaRes;
        let cinemaKey, cinemaComponent;
        for(i = 0; i < cinemas.length; i++) {
            cinema = cinemas[i];
            cinemaKey = this.getCinemaKey(cinema);
            cinemaComponent = this.refs[cinemaKey];
            if(cinemaComponent && cinemaComponent.checkForm) {
                cinemaRes = cinemaComponent.checkForm(submit);
            }
            if(cinemaRes !== true) {
                return cinemaRes;
            }
        }

        return true;
    }

    pathLink(key)  {
        return new ReactPathLink(this, key);
    }

    checkedMaskPathLink(key, value) {
        return new ReactCheckedMaskPathLink(this, key, value);
    }

    checkedHasPathLink(key, value) {
        return new ReactCheckedHasPathLink(this, key, value);
    }

    checkedEqualPathLink(key, value) {
        return new ReactCheckedEqualPathLink(this, key, value);
    }

    onAccountCheckingChange(type) {
        let apply = this.state.apply;
        apply.assist = apply.assist || {};

        apply.assist.accountCheckType = type;

        let cinemas = apply.cinemas || [];
        cinemas.forEach(cinema => {
            cinema.assist = cinema.assist || {};
            cinema.assist.needAccountChecking = !!type;
        });
        this.setState({
            apply: apply
        });
    }

    onTicketReturnTypeChange(type) {
        let apply = this.state.apply;
        apply.contract = apply.contract || {};

        apply.contract.refundType = type;

        let cinemas = apply.cinemas || [];
        cinemas.forEach(cinema => {
            cinema.assist = cinema.assist || {};
            cinema.assist.needTicketReturnSetting = (type === 2);
        });
        this.setState({
            apply: apply
        });
    }

    getCinemaKey(cinema) {
        return `cinema${cinema.cinemaId}`;
    }

    newCinema(id, name) {
        let cinema = {
            cinemaId: id,
            cinemaName: name
        };
        this.addCinemaAssistData(this.state.apply, cinema);
        return cinema;
    }

    addDistinctCinema(cinema) {
        let found = false;
        let cinemas = this.state.apply.cinemas;
        cinemas.forEach(myCinema => {
            if(myCinema.cinemaId === cinema.cinemaId) {
                found = true;
            }
        });
        if(!found) {
            cinemas.push(cinema);
        }
    }

    render() {
        window.applyModal = this;

        let apply = this.state.apply;
        let assist = apply.assist || {};
        let contract = apply.contract || {};
        let contact = contract.contact || {};
        let files = contract.files || [];
        let financeContact = contract.financeContact || {};
        if(!apply.cinemas) {
            apply.cinemas = [];
        }
        this.props.cinemas.forEach(cinema => {
            this.addDistinctCinema(this.newCinema(cinema.id, cinema.name));
        });

        let cinemas = apply.cinemas;

        return (
            <Modal onHide={this.onModalHide.bind(this)} show={this.props.show}
                onEnter={modalEnterHelper}
                className="bd-home">
                <Modal.Header>
                    <Button className="close" onClick={this.props.closeApplyModal}>×</Button>
                    <Modal.Title>
                        选座影院上线申请
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="contract" className="contract form-group-sm form-inline">
                        <h4>签约信息</h4>

                        <div>
                            <span>所属院线：
                                <Input type="text" placeholder="所属院线"
                                    valueLink={this.pathLink('apply.contract.theaterChain')} />
                            </span>
                            <span className="margin-left-10">售票系统：
                                <select id="saleSystem" className="form-control"
                                    valueLink={this.pathLink('apply.contract.sellSrc')}>
                                    {
                                        this.state.saleSystems.map((saleSystem) => {
                                            return (<option value={saleSystem.id} key={'saleSystem'+saleSystem.id}>{saleSystem.name}</option>);
                                        })
                                    }
                                </select>
                            </span>
                            <Button bsStyle="primary" id="addCinema" onClick={this.props.addCinema}>添加影院</Button>
                        </div>
                        <div>
                            <input type="hidden" id="contactId" value="0"/>
                            <span>签约联系人：
                                <Input type="text" maxLength="5" placeholder="联系人姓名"
                                    valueLink={this.pathLink('apply.contract.contact.name')} />
                            </span>
                            <span className="margin-left-10">联系电话：
                                <input type="text" placeholder="联系电话"
                                    valueLink={this.pathLink('apply.contract.contact.phone')} />
                            </span>
                            <span className="margin-left-10">盖章顺序：
                                <select id="stampOrder" className="form-control" valueLink={this.pathLink('apply.contract.signSequence')}>
                                    <option value="0">影院先盖章</option>
                                    <option value="1">美团先盖章</option>
                                </select>
                            </span>
                        </div>
                        <div>
                            <label className="radio-inline">
                                <input type="radio" name="accounts"
                                    checked={assist.accountCheckType === 0}
                                    onChange={this.onAccountCheckingChange.bind(this, 0)} />
                                统一对账
                            </label>
                            <span className="margin-left-10">财务联系人：
                                <input type="text" className="form-control" placeholder="统一对账联系人姓名" size="20"
                                    disabled={assist.accountCheckType !== 0}
                                    valueLink={this.pathLink('apply.contract.financeContact.name')} />
                            </span>
                            <span>联系电话：
                                <input type="text" className="form-control" placeholder="统一对账联系人电话" size="20"
                                    disabled={assist.accountCheckType !== 0}
                                    valueLink={this.pathLink('apply.contract.financeContact.phone')} />
                            </span>
                            <label className="radio-inline margin-left-10">
                                <input type="radio" name="accounts"
                                    checked={assist.accountCheckType === 1}
                                    onChange={this.onAccountCheckingChange.bind(this, 1)} />
                                各影院独立对账
                            </label>
                        </div>
                        <div>
                            <label className="radio-inline">
                                <input type="radio" name="returnTicket" 
                                    checked={contract.refundType === 1}
                                    onChange={this.onTicketReturnTypeChange.bind(this, 1)} />
                                统一自助退票
                            </label>
                             &nbsp;&nbsp;开场前
                            <input type="text" className="form-control input-sm"
                                size="4"
                                disabled={contract.refundType !== 1}
                                valueLink={this.pathLink('apply.contract.refundTime')} />
                            分钟用户可自助退票

                            <label className="radio-inline margin-left-10">
                                <input type="radio" name="returnTicket" 
                                    checked={contract.refundType === 2}
                                    onChange={this.onTicketReturnTypeChange.bind(this, 2)} />
                                各影院独立设置退票时间
                            </label>
                            <label className="radio-inline margin-left-10">
                                <input type="radio" name="returnTicket"
                                    checked={contract.refundType === 0}
                                    onChange={this.onTicketReturnTypeChange.bind(this, 0)} />
                                不支持用户自助退票
                            </label>
                        </div>
                        <div>
                            <ToggleUnionInput 
                                type="radio"
                                title="有400客服电话"
                                name="servicePhone"
                                placeholder="请填写客服400电话"
                                checkedLink={this.checkedEqualPathLink('apply.assist.$400CheckType', 0)}
                                valueLink={this.pathLink('apply.contract.freeContactPhone')} />
                            <label className="radio-inline margin-left-10">
                                <input type="radio" name="servicePhone"
                                    checkedLink={this.checkedEqualPathLink('apply.assist.$400CheckType', 1)}/>
                                没有400客服电话
                            </label>
                        </div>
                        <div>
                            <div>
                                <h5>上传文件(至少需要放映许可证、商务合作协议(院线影院可用补充协议、授权函)、商家营业执照、开户许可证)</h5>
                                <input type="file" id="onlineFile" name="file"
                                    onChange={this.onUploadedFileAdd.bind(this)}/>
                            </div>
                            <div>
                                {
                                    files.map((file) => {
                                        let deleteFile = this.onUploadedFileDelete.bind(this, file.id);
                                        return (<UploadedFile key={`file${file.id}`} file={file} deleteFile={deleteFile}/>);
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div id="onlineLoading">
                        <img src="/images/loading.gif" alt="上传中..."/>
                    </div>
                    <div className="cinemaCom">
                        {
                            cinemas.map((cinema)=> {
                                return (<CinemaForm key={this.getCinemaKey(cinema)} cinema={cinema}
                                        deleteCinema={this.deleteCinema.bind(this)}
                                        ref={this.getCinemaKey(cinema)}/>);
                            })
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <ProcessButton bsStyle="info" ref="saveButton" onClick={this.save.bind(this)}
                        {...this.state.saveButton} />
                    <ProcessButton bsStyle="success" ref="saveDraftButton" onClick={this.saveDraft.bind(this)}
                        {...this.state.draftButton} />
                    <Button bsStyle="danger" onClick={this.props.closeApplyModal} >退出</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ApplyModal;
