import React, { Component }         from 'react';
import Table                        from '../../../../../components/common/my-table';
import Modal                        from 'react-bootstrap/lib/Modal';
import Button                       from 'react-bootstrap/lib/Button';
import Promise                      from 'promise';
import CinemaInfoView               from './cinema-info-view';
import modalEnterHelper             from '../dom/modal-enter-helper';

class ApplyViewModal extends Component {

    state = {
    }

    onModalHide() {
    }

    getAudits(id) {
        return new Promise((resolve, reject) => {
            $.getJSON(`/api/online/audit/${id}/audits.json`, data => {
                let audits = data.data; 
                if(audits.length === 0) {
                    reject(new Error('can not find audits'));
                } else {
                    resolve(audits);
                }
            }).fail(() => {
                reject(new Error('can not find audits'));
            });
        });
    }
    
    getCinemas(id) {
        return new Promise((resolve, reject) => {
            $.getJSON(`/api/cinema/online/${id}/cinemas.json`, data => {
                let cinemas = data.data; 
                if(cinemas.length === 0) {
                    reject(new Error('can not find cinemas'));
                } else {
                    resolve(cinemas);
                }
            }).fail(() => {
                reject(new Error('can not find cinemas'));
            });
        });
    }

    getApply(id) {
        return new Promise((resolve, reject) => {
            $.getJSON(`/api/online/apply/${id}.json`, data => {
                let apply = data.data; 
                if(!apply) {
                    reject(new Error('can not find apply'));
                } else {
                    resolve(apply);
                }
            }).fail(() => {
                reject(new Error('can not find apply'));
            });
        });
    }

    getSaleSystems() {
        return new Promise((resolve, reject) => {
            $.getJSON('/api/seat/saleSystem.json', saleSystems => {
                resolve(saleSystems.data);
            }).fail(() => {
                reject(new Error('can not find apply'));
            });
        });
    }

    getShowData(id) {
        Promise.all([this.getAudits(id), this.getCinemas(id), this.getApply(id), this.getSaleSystems()]).then(values => {
            this.setState({
                audits: values[0],
                cinemas: values[1],
                apply: values[2],
                saleSystems: values[3]
            });
        }).catch(err => {
            console.error(`error: ${err.message}`);
        });
    }

    componentWillMount() {
        this.fillData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.fillData(nextProps);
    }

    fillData(props) {
        if(props.show) {
            if(props.applyId !== 0) {
                this.getShowData(props.applyId);
            } else {
                this.setState({});
            }
        }
    }

    render() {
        let audits = this.state.audits;
        let cinemas = this.state.cinemas;
        let apply = this.state.apply;
        let saleSystems = this.state.saleSystems;
        if(!audits || !cinemas || !apply || !saleSystems) {
            return (<div></div>);
        }

        let lastestAudit = audits.pop() || {};

        let auditStyle = {
            display: audits.length === 0 ? 'block' : 'none'
        };
        
        let contract = apply.contract || {};
        let idx, ln, saleStr;
        ln = saleSystems.length;
        for(idx = 0; idx < ln; idx++) {
            if(saleSystems[idx].id == contract.sellSrc) {
                saleStr = saleSystems[idx].name;
                break;
            }
        }

        let hasFinanceContact = false;
        let financeText = '';
        let financeContact = contract.financeContact || {};
        let financeStyle = {};
        if(financeContact.name) {
            hasFinanceContact = true;
            financeText = '统一对账';
            financeStyle.display = 'inline-block';
        } else {
            financeText = '各影院独立对账';
            financeStyle.display = 'none';
        }

        let contact = contract.contact || {};

        let returnTicketText = '';
        let returnTicketStyle = {display: 'none'};
        if(contract.refundType === 0) {
            returnTicketText = '不支持用户自助退票';
        } else if(contract.refundType === 1) {
            returnTicketText = '统一自助退票';
            returnTicketStyle.display = 'inline-block';
        } else {
            returnTicketText = '各影院自助退票';
        }

        let files = contract.files || [];

        let tableData = {
            ths: ['影院ID', '影院名称', '城市', '状态'],
            trs: cinemas.map(cinema => [cinema.id, cinema.name, cinema.city, cinema.stateDesc])
        };

        return (
            <Modal onHide={this.onModalHide.bind(this)} show={this.props.show}
                onEnter={modalEnterHelper}
                className="bd-home" >
                <Modal.Header>
                    <Button className="close" onClick={this.props.closeApplyViewModal}>×</Button>
                    <Modal.Title>
                        查看上线信息 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="auditHistory">
                        <div className="checkInfoSeg">
                            <div>提交时间：<span>{lastestAudit.applyTime}</span></div>
                            <div>提交人：<span>{lastestAudit.bdName}</span></div>
                            <div>状态：<span>{lastestAudit.type == 2 ? ("请求被驳回：" + lastestAudit.reason) : this.props.applyAudit.stateDesc}</span></div>
                            <div>审核人：<span>{lastestAudit.auditorName}</span></div>
                            <div>审核通过时间：<span>{lastestAudit.auditTime}</span></div>
                            <h5 style={auditStyle}>审核历史</h5>
    
                            <div>
                                {
                                    audits.map(audit => {
                                        return (
                                            <div key={`audit${audit.id}`}>`${audit.applyTime}，被驳回，原因：${audit.reason}。审核人：${audit.auditorName}`</div>
                                        );
                                    }) 
                                }
                            </div>

                            <hr/>
                        </div>
                    </div>
                    <div>
                        <Table data={tableData} />
                        <hr/>
                    </div>
                    <div id="contractSeg">
                        <h4>签约信息</h4>
    
                        <div>
                            <span className="cinema-seg-block">所属院线：<span>{contract.theaterChain}</span></span>
                            <span className="cinema-seg-block">售票系统：<span>{saleStr}</span></span>
                        </div>
                        <div>
                            <span className="cinema-seg-block">签约联系人：<span>{contact.name}</span></span>
                            <span className="cinema-seg-block">联系电话：<span>{contact.phone}</span></span>
                            <span className="cinema-seg-block">盖章顺序：<span>{contract.signSequence == 1 ? "猫眼先盖章" : "影院先盖章"}</span></span>
                        </div>
                        <div>
                            <span className="cinema-seg-block">对账设置：<span>{financeText}</span></span>
                            <span className="cinema-seg-block" style={financeStyle}>财务联系人：<span>{financeContact.name}</span></span>
                            <span className="cinema-seg-block" style={financeStyle}>联系方式：<span>{financeContact.phone}</span></span>
                        </div>
                        <div>
                            <span className="cinema-seg-block">退票设置：<span>{returnTicketText}</span></span>
                            <span className="cinema-seg-block" style={returnTicketStyle}>开场前：<span>{contract.refundTime}</span>分钟前用户可自助退票</span>
                        </div>
                        <div>
                            <span>400客服电话：<span>{contract.freeContactPhone ? contract.freeContactPhone : "无"}</span></span>
                        </div>
                        <div>
                            <span>已上传文件：<span>
                                {
                                    files.map(file => (<a key={`fileview${file.id}`} target='_blank' href={file.url}>{file.name}</a>))
                                }
                            </span></span>
                        </div>
                    </div>   
                    {
                        apply.cinemas.map(cinema => (<CinemaInfoView key={`civ${cinema.cinemaId}`} cinema={cinema} />))
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

export default ApplyViewModal;
