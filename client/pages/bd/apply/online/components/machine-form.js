import React, { Component }         from 'react';

import Button                       from 'react-bootstrap/lib/Button';
import Input                        from 'react-bootstrap/lib/Input';
import classNames                   from 'classnames';
import Ajax                         from '../../../../../components/util/bdAjax';
import ReactPathLink                from '../bind/react-path-link';
import ReactCheckedMaskPathLink     from '../bind/react-checked-mask-path-link';
import ReactCheckedEqualPathLink    from '../bind/react-checked-equal-path-link';
import ToggleUnionInput             from './toggle-union-input';

class MachineForm extends Component{

    state = {
        machine: {}
    }

    componentWillMount() {
        this.setState(this.props);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState(nextProps);
    }

    static propTypes = {
        machine: React.PropTypes.object.isRequired
    }

    checkForm(cinema, submit) {
        let machine = this.state.machine || {};
        let machineAssist = machine.assist || {};

        if(machineAssist.needMachineType === 0) {
            machine.machineNum = this.refs.machineNum.value;

            let receiver = machine.receiver || {};
            if(!receiver.name || !receiver.phone) {
                return `${cinema.cinemaName}: 请填写接受人姓名和联系电话！`; 
            }

            if(!receiver.name || !receiver.phone) {
                return `${cinema.cinemaName}: 请填写接受人姓名和联系电话！`; 
            }

            if(machine.useDhcp === 0) {
                let reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                if(!reg.test(machine.ip)) {
                    return `${cinema.cinemaName}: IP设置错误！`;
                }

                if(!reg.test(machine.subnetMask)) {
                    return `${cinema.cinemaName}: 子网设置错误！`;
                }

                if(!reg.test(machine.gatewayIp)) {
                    return `${cinema.cinemaName}: 网关设置错误！`;
                }

                if(!reg.test(machine.dnsIp1)) {
                    return `${cinema.cinemaName}: DNS1设置错误！`;
                }

                if(!reg.test(machine.dnsIp2)) {
                    return `${cinema.cinemaName}: DNS2设置错误！`;
                }
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

    checkedEqualPathLink(key, value) {
        return new ReactCheckedEqualPathLink(this, key, value);
    }

    render() {
        let assist = this.state.machine.assist || {};
        let machineDetailStyle = {
            display: 'block'
        };

        if(assist.needMachineType === 1) {
            machineDetailStyle.display = 'none';
        }

        let netCfgStyle = {
            display: 'block'
        }
        if(this.state.machine.useDhcp === 1) {
            netCfgStyle.display = 'none';
        }

        return (
            <div>
                <div>
                    出票机：
                    <label className="radio-inline">
                        <input type="radio" 
                            checkedLink={this.checkedEqualPathLink('machine.assist.needMachineType', 0)} />
                        需要
                    </label>
                    <select ref="machineNum" className="form-control"
                        valueLink={this.pathLink('machine.machineNum')} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <label className="radio-inline margin-left-10">
                        <input type="radio"
                            checkedLink={this.checkedEqualPathLink('machine.assist.needMachineType', 1)} />
                        不需要
                    </label>
                </div>
                <div style={machineDetailStyle}>
                    <div>
                        <span>出票机接收人：
                            <input type="text" className="form-control input-sm" placeholder="姓名"
                                size="8"
                                valueLink={this.pathLink('machine.receiver.name')} />
                        </span>
                        <span className="margin-left-10">联系电话：
                            <input type="text" className="form-control input-sm"
                                size="20" placeholder="电话"
                                valueLink={this.pathLink('machine.receiver.phone')} />
                        </span>
                    </div>
                    <div>
                        <span>
                            IT联系人（非必填）：
                            <input type="text" className="form-control input-sm" placeholder="姓名"
                                size="8"
                                valueLink={this.pathLink('machine.itContact.name')} />
                        </span>
                        <span className="margin-left-10">
                            联系电话：
                            <input type="text" className="form-control input-sm"
                                size="20" placeholder="电话"
                                valueLink={this.pathLink('machine.itContact.phone')} />
                        </span>
                    </div>
                    <div>
                        可选设备： 
                        <label className="checkbox-inline">
                            <input type="checkbox"
                                checkedLink={this.checkedMaskPathLink('machine.needEquipment', 1)} />
                            无限网卡
                        </label>
                        <label className="checkbox-inline margin-left-10">
                            <input type="checkbox"
                                checkedLink={this.checkedMaskPathLink('machine.needEquipment', 2)} />
                            交换机
                        </label>
                        <label className="checkbox-inline margin-left-10">
                            <input type="checkbox"
                                checkedLink={this.checkedMaskPathLink('machine.needEquipment', 4)} />
                            插线板
                        </label>
                    </div>
                    <div>
                        网线长度：
                        <label className="radio-inline">
                            <input type="radio"
                                checkedLink={this.checkedEqualPathLink('machine.cableLength', 5)} />
                            5m
                        </label>
                        <label className="radio-inline">
                            <input type="radio"
                                checkedLink={this.checkedEqualPathLink('machine.cableLength', 10)} />
                            10m
                        </label>
                    </div>
                    <div>
                        设置网络：
                        <label className="radio-inline">
                            <input type="radio"
                                checkedLink={this.checkedEqualPathLink('machine.useDhcp', 1)} />
                            机器到影院后自动获取
                        </label>
                        <label className="radio-inline">
                            <input type="radio"
                                checkedLink={this.checkedEqualPathLink('machine.useDhcp', 0)} />
                            手工设置
                        </label>
                    </div>
                    <div style={netCfgStyle}>
                        <span>IP设置：
                            <input type="text" className="form-control input-sm"
                                valueLink={this.pathLink('machine.ip')} />
                        </span>
                        <span className="margin-left-10">
                            子网掩码设置：
                            <input type="text" className="form-control input-sm"
                                valueLink={this.pathLink('machine.subnetMask')} />
                        </span>
                        <span className="margin-left-10">
                            网关设置：
                            <input type="text" className="form-control input-sm"
                                valueLink={this.pathLink('machine.gatewayIp')} />
                        </span><br/><br/>
                        <span>DNS 1设置：
                            <input type="text" className="form-control input-sm"
                                valueLink={this.pathLink('machine.dnsIp1')} />
                        </span>
                        <span className="margin-left-10">DNS 2设置：
                            <input type="text" className="form-control input-sm margin-left-10"
                                valueLink={this.pathLink('machine.dnsIp2')} />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default MachineForm;
