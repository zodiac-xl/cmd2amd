import React, { Component }         from 'react'; 
import Button                       from 'react-bootstrap/lib/Button';
import classNames                   from 'classnames';

const CINEMA_OPERATE_TEXT = {
    EXPAND: '展开影院',
    SHRINK: '收起影院'
};

const OTHER_COOP_ARR = ['格瓦拉', '时光网', '网票网', '微信', '其他'];
const EQUIPMENT_ARR = ['无线网卡', '交换机', '插线板'];

class CinemaInfoView extends Component {

    state = {
        showBody: false,
        cinemaOperateText: CINEMA_OPERATE_TEXT.EXPAND
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

    getMaskStringValue(totalValue, array) {
        let idx, ln;
        let masked = [];
        ln = array.length;
        for(idx = 0; idx < ln; idx++) {
            if(Math.pow(2, idx) & totalValue) {
                masked.push(array[idx]);
            }
        }
        return masked.join('、');
    }

    render() {
        let cinema = this.props.cinema;
        if(!cinema) {
            return (<div></div>);
        }

        let panelBodyClassNames = classNames('panel-body', 'form-inline', 'com-margin', 'customCollapse', 'panel-collapse', 'collapse', {
            in: this.state.showBody
        }); 

        let otherCoop = '无合作第三方';
        if(cinema.otherCoop) {
            otherCoop = this.getMaskStringValue(cinema.otherCoop, OTHER_COOP_ARR);
        }

        let cinemaContacts = cinema.cinemaContacts || [];

        let financeContact = cinema.financeContact || {};
        let financeStyle = {display: 'none'};
        if(financeContact.name) {
            financeStyle.display = 'inline-block';
        }

        let glassText = '';
        if(cinema.glasses > 0){
            glassText = `需要${cinema.glasses}元押金`;
        } else if(cinema.glasses < 0){
            glassText = `需要${-cinema.glasses}元购买`;
        } else {
            glassText = '不需要押金';
        }

        let machineText = '';
        let machineStyle = {};
        let machine = cinema.machine || {};
        let receiver = machine.receiver || {};

        if(machine.machineNum === 0) {
            machineText = '不需要出票机'
            machineStyle.display = 'none';
        } else {
            machineText = `需要${machine.machineNum}台出票机`;
            machineStyle.display = 'block';
        }

        let equipment = '';
        if(machine.needEquipment !== 0) {
            equipment = this.getMaskStringValue(machine.needEquipment, EQUIPMENT_ARR);
        }

        let netTypeText = '';
        let netTypeStyle = {};
        if(machine.useDhcp === 1) {
            netTypeText = '自动获取';
            netTypeStyle.display = 'none';
        } else {
            netTypeText = '手动设置';
            netTypeStyle.display = 'block';
        }
        
        let cinemaContactUis = [];
        for(let i = 0, ln = cinemaContacts.length; i < ln; i++) {
            let contact = cinemaContacts[i];
            cinemaContactUis.push((
                <div key={`contact${contact.id}`}>
                    <span className='cinema-seg-block'>客服联系人{i+1}：<span>{contact.name}</span></span>
                    <span className='cinema-seg-block'>&nbsp;联系方式：<span>{contact.phone}</span></span>
                </div>
            ));
        }

        return (
           <div className='panel panel-primary'>
                <div className="panel-heading" style={{height: '46px'}}>
                    <span>{cinema.cinemaName}</span>&nbsp;<span>ID:{cinema.cinemaId}</span>
                    <Button className='btn-group-customer btn-sm' bsStyle="info" onClick={this.toggleCinemaInfo.bind(this)}>
                        <span className="hideOrShowCinema">{this.state.cinemaOperateText}</span>
                        <span className="caret"></span>
                    </Button>
                </div>
                <div className={panelBodyClassNames}>
                    <div>
                        <span className="cinema-seg-block">8位编码：<span>{cinema.cinemaNo}</span></span>
                        <span className="cinema-seg-block">2014年票房：<span>{cinema.boxOffice}</span>万</span>
                        <span className="cinema-seg-block">开业时间：<span>{cinema.openDate}</span></span>
                    </div>
                    <div>
                        <span>已合作第三方：<span>{otherCoop}</span></span>
                    </div>

                    <div>
                        {cinemaContactUis}
                    </div>

                    <div style={financeStyle}>
                        <span className="cinema-seg-block">财务联系人：<span>{financeContact.name}</span></span>
                        <span className="cinema-seg-block">联系方式：<span>{financeContact.phone}</span></span>
                    </div>

                    <div>
                        <span>值班电话：<span>{cinema.dutyPhone ? cinema.dutyPhone : '无'}</span></span>
                    </div>

                    <hr />
                    <div>
                        <span>儿童优惠：<span>{cinema.childPref ? cinema.childPref : '无'}</span></span>
                    </div>

                    <div>
                        <span>3D眼镜：<span>{glassText}</span></span>
                    </div>

                    <div>
                        <span>停车信息：<span>{cinema.park ? cinema.park : "无"}</span></span>
                    </div>

                    <div>
                        <span>IMAX厅：<span>{cinema.imaxHall ? cinema.imaxHall : "无"}</span></span>
                    </div>

                    <div>
                        <span>影院公告：<span>{cinema.note ? cinema.note : "无"}</span></span>
                    </div>

                    <div>
                        <span>支持刷卡：<span>{cinema.useCredit ? cinema.useCredit : "无"}</span></span>
                    </div>

                    <div>
                        <span>休息区位置：<span>{cinema.restArea ? cinema.restArea : "无"}</span></span>
                    </div>

                    <div>
                        <span>情侣座：<span>{cinema.coupleHall ? cinema.coupleHall : "无"}</span></span>
                    </div>

                    <div>
                        <span>WI-FI：<span>{cinema.wifi ? cinema.wifi : "无"}</span></span>
                    </div>
                    <hr />

                    <div>
                        <span>出票机设置：<span>{machineText}</span></span>
                    </div>
                    <div style={machineStyle}>
                        <div>
                            <span className="cinema-seg-block">出票机接收人：<span>{receiver.name}</span></span>
                            <span className="cinema-seg-block">联系方式：<span>{receiver.phone}</span></span>
                        </div>
                        <div>
                            <span className="cinema-seg-block">IT联系人：<span>{machine.itContact ? machine.itContact.name : "无"}</span></span>
                            <span className="cinema-seg-block">联系方式：<span>{machine.itContact ? machine.itContact.phone : "无"}</span></span>
                        </div>
                        <div>
                            <span>可选设备：<span>{equipment}</span></span>
                        </div>
                        <div>
                            <span>网线长度：<span>{machine.cableLength}</span>米</span>
                        </div>
                        <div>
                            <span>是否自动获取IP(DHCP)：<span>{netTypeText}</span></span>
                        </div>
                        <div style={netTypeStyle}>
                            <span>IP：<span>{machine.ip}</span></span>
                            <span className="margin-left-10">子网掩码：<span>{machine.subnetMask}</span></span>
                            <span className="margin-left-10">默认网关：<span>{machine.gatewayIp}</span></span>
                            <span className="margin-left-10">DNS1：<span>{machine.dnsIp1}</span></span>
                            <span className="margin-left-10">DNS2（备用DNS）：<span>{machine.dnsIp2}</span></span>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default CinemaInfoView;
