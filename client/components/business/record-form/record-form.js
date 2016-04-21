import React,{addons}           from 'react'
import ReactDOM                 from 'react-dom';

import uniqid                   from 'uniqid';


//children
import Modal                    from 'react-bootstrap/lib/Modal';
import Table                    from 'react-bootstrap/lib/Table';
import Button                   from 'react-bootstrap/lib/Button';


//custom util
import bdAjax                   from '../../util/bdAjax.js';


const RecordForm = React.createClass({
    getDefaultProps () {
        return {
            applyType: 1,//1-单影院活动申请 2-调价申请
            applyId: null,
            versionType: 1,////1-新流程 2-老流程  单影院活动有用
            cinemaId: "",
            cinemaName: "",
            hide: null,
            statusDesc: ''
        };
    },
    getInitialState() {


        return this.getStateByProps(this.props);
    },


    getStateByProps(props){
        let _this = this;
        let applyId = props.applyId;
        let applyType = props.applyType;
        let records = [];
        let showModal = props.showModal == undefined ? true : props.showModal;

        let api;
        switch (applyType * 1) {
            case 1:
                api = {
                    url: "/api/apply/" + applyId + "/history.json",
                    type: "GET",
                    async: false,
                    des: '获取申请记录列表',
                    data: {
                        type: _this.props.versionType
                    }
                };
                break;
            case 2:
                api = {
                    url: "/api/price/" + applyId + "/record.json",
                    type: "GET",
                    async: false,
                    des: '获取调价申请记录列表',
                };
                break;
        }
        if (applyId != undefined && applyId != null && applyId != '') {
            bdAjax(api).done(function (e) {
                records = e.data;
            })
        }
        return {
            showModal: showModal,
            records: records
        };
    },
    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateByProps(nextProps));
    },

    open() {
        this.setState({showModal: true});
    },
    close() {
        if (this.props.hide) {
            this.props.hide();
        } else {
            this.setState({showModal: false});
        }
    },
    render() {

        let _this = this;
        let applyType = _this.props.applyType;
        let trs = [];
        _this.state.records.forEach(function (record, index) {
            let operateType;
            let operateDes;
            let name;
            let operationTime;
            let desc;
            let operationStatus = {
                "1": "新建", "2": "修改", "3": "取消", "4": "驳回", "5": "开始调价",
                "6": "完成调价", '0': '未知'
            };
            let priceStatus = {"1": "待调价", "2": "被驳回", "3": "已取消", "4": "开始调价", "5": "已完成调价"};

            let checkButton;
            switch (applyType * 1) {//1-单影院活动申请 2-调价申请
                case 1:
                    operateType = record.operation.value;


                    name = record.operator.name;
                    operationTime = record.operationTime;
                    operateDes = record.operation.desc;
                    desc = record.state.desc;
                    if (operateType == 4) {
                        operateDes = "驳回原因：" + (record.reason || "");
                    }
                    if (record.applyId != undefined) {//单影院活动申请 申请记录中已上线 状态可以查看
                        checkButton =
                            <Button className='J_check_in_record-apply' data-applyid={record.applyId} data-applytype={record.applyType}>查看</Button>;
                    }
                    break;
                case 2:
                    operateType = record.operationType || '0';

                    name = record.operator;
                    operationTime = record.created;
                    operateDes = operationStatus[operateType];
                    desc = priceStatus[record.status] || '未知';
                    if (operateType == 4) {
                        operateDes = "驳回原因：" + (record.operationContent || "");
                    }
                    break;
            }

            trs.push(
                <tr key={index}>
                    <td>{name}</td>
                    <td>{operationTime}</td>
                    <td>{operateDes}</td>
                    <td><span>{desc}</span>&nbsp;&nbsp;&nbsp;&nbsp;{checkButton}</td>
                </tr>
            )
        });
        if (trs.length == 0) {
            trs.push(
                <tr key={uniqid()}>
                    <td colSpan="1000" style={{textAlign:"center"}}>没有记录</td>
                </tr>
            )
        }

        return (
            <div className="modal-container">
                <Modal show={this.state.showModal}
                       onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>申请记录</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{marginBottom:"5px"}}>
                            申请ID：{this.props.applyId}
                            &nbsp;&nbsp;&nbsp;&nbsp;影院ID：{this.props.cinemaId}
                            &nbsp;&nbsp;&nbsp;&nbsp;影院名：{this.props.cinemaName}
                        </div>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>操作人</th>
                                <th>操作时间</th>
                                <th>操作内容</th>
                                <th>申请状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            {trs}
                            </tbody>

                        </Table>
                    </Modal.Body >
                </Modal >
            </div>
        )
    }
});

export default RecordForm;