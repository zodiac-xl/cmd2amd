import RadioGroup               from 'react-simple-radio-group';
import arrayUnique              from 'array-unique';


import {Group,Left,Right,Hr}    from '../../../../../../common/form-group';
import SuperChild               from '../../../../../../common/super-child';
import ValidateMap              from '../../../../../../common/validatemap';
import CheckboxGroup            from '../../../../../../common/checkbox-group';


export default class SubsidyRules extends SuperChild {

    defaultSubsidyRule() {
        return {
            "version": 0, //版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，例如1111110=126表示除2D外所有版本。全部用0表示 -1表示全不选 （不提交全不选 提交时清除）
            "rules": [
                {
                    "maxSettle": '',
                    "minSettle": '',
                    "type": 1,  //1-每张补贴，2-一口价，3-服务费
                    "price": ''
                }
            ],
            "additional": ""
        };
    }

    static defaultProps = {
        valueLink: null,
        readOnly: false,
        form: '票补'
    };

    validate() {
        let _this = this;
        let validate = true;
        let value = _this.state.value;
        let subsidyRules = value;

        subsidyRules.some(function (subsidyRule) {
            if (subsidyRule.version == -1) {
                validate = false;
                toastr.warning('补贴规则请至少选择一个版本');
            }
            return !validate;
        })

        //“版本”默认选择全部勾选。提交时若版本重复勾选，则无法提交，并提示“补贴规则版本选择重复”。
        if (validate) {

            //版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，
            // 例如1111110=126表示除2D外所有版本。全部用0表示 -1表示全不选 （不提交全不选 提交时清除）
            let repeated = false;
            let totalActiveVersion = [];
            let versionsState = {};

            subsidyRules.some(function (subsidyRule) {
                let version = subsidyRule.version * 1 == 0 ? 127 : subsidyRule.version * 1;
                let activeVersions = _this.getActiveVersions(version);
                if (arrayUnique(totalActiveVersion.concat(activeVersions)).length < (totalActiveVersion.length + activeVersions.length)) {
                    repeated = true;
                } else {
                    totalActiveVersion = totalActiveVersion.concat(activeVersions)
                }
                return repeated;
            })
            if (repeated) {
                validate = false;
                toastr.warning('补贴规则版本选择重复');
            }
        }

        //maxSettle >minSettle
        if (validate) {
            subsidyRules.some(function (subsidyRule) {//所有版本和需要等于127
                subsidyRule.rules.some(function (rule) {//所有版本和需要等于127
                    if (rule.maxSettle * 1 <= rule.minSettle * 1) {
                        validate = false;
                        toastr.warning('请检查结算价价格区间');
                    }
                    return !validate;
                })
                return !validate;
            })
        }


        //二maxSettle >minSettle 价格段重叠
        if (validate) {
            subsidyRules.some(function (subsidyRule, subsidyRuleIndex) {//所有版本和需要等于127
                let priceArr = [];
                subsidyRule.rules.forEach(function (rule, ruleIndex) {//所有版本和需要等于127
                    priceArr.push({
                        minSettle: rule.minSettle * 1,
                        maxSettle: rule.maxSettle * 1,
                        des: `补贴规则${subsidyRuleIndex * 1 + 1}中价格区间${ruleIndex * 1 + 1}`
                    });
                });

                for (let i = 0; i < priceArr.length - 1; i++) {
                    let pre = priceArr[i];
                    let preDistance = pre.maxSettle - pre.minSettle;

                    for (let j = i + 1; j < priceArr.length; j++) {
                        let next = priceArr[j];
                        let nextDistance = next.maxSettle - next.minSettle;
                        // {startNum:1,endNum:3}  {startNum:4,endNum:5}    (5-1) > ((3-1) +(5-4))   ok
                        // {startNum:1,endNum:3}  {startNum:2,endNum:5}    (5-1) < ((3-1) +(5-2))   重叠
                        if ((preDistance + nextDistance) > (Math.max(pre.maxSettle, next.maxSettle) - Math.min(pre.minSettle, next.minSettle))) {
                            toastr.warning(`价格区间重叠，请修改${next.des}`);
                            validate = false;
                            break;
                        }
                    }
                    if (!validate) {
                        break;
                    }
                }
                return !validate;

            })
        }

        //当“价格”中选择“每张补贴”时，若结算价左区间数值小于等于每张补贴数值，无法提交。
        if (validate && _this.props.form != '服务费减免') {
            subsidyRules.some(function (subsidyRule) {//所有版本和需要等于127
                subsidyRule.rules.some(function (rules) {//所有版本和需要等于127
                    if (rules.type == 1 && rules.minSettle * 1 <= rules.price * 1) {
                        validate = false;
                        toastr.warning('每张补贴 结算价左区间数值必须大于每张补贴数值');
                    }
                    return !validate;
                })
                return !validate;
            })
        }

        return validate;

    }

    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value || [this.defaultSubsidyRule()];
        return {
            value: value
        }
    }

    getPriceRulesDom(subsideRule, subsideRuleIndex, readOnly) {
        let _this = this;
        let form = _this.props.form;
        let rules = subsideRule.rules;
        let priceRulesDom = [];
        rules.forEach(function (rule, ruleIndex) {
            let fragment;
            if (form != '服务费减免') {
                // "type": 1,  //1-每张补贴，2-一口价，3-服务费
                let radioValue = rule.type;
                let radioGroupValueLink = _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'type'], _this);
                fragment = <div>
                    <RadioGroup name={`rule-${subsideRuleIndex}-${ruleIndex}`} value={radioGroupValueLink.value}
                                onChange={radioGroupValueLink.requestChange}
                        >
                        <div style={{padding:'5px 0'}}>
                            <input type="radio" value="1"/>
                            每张补贴&nbsp;
                            <input
                                {...ValidateMap.number} min={'0'} step='0.01' placeholder='数字，包括服务费'
                                                        required={radioValue==1?true:false}
                                                        valueLink={radioValue==1?_this.nestLinkedState(["value",subsideRuleIndex, 'rules',ruleIndex,'price'],_this):null}
                                />&nbsp;元
                        </div>
                        <div style={{padding:'5px 0'}}>
                            <input type="radio" value="2"/>
                            一口价&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                {...ValidateMap.number} min={'0'} step='0.01'
                                                        required={radioValue==2?true:false}
                                                        valueLink={radioValue==2?_this.nestLinkedState(["value",subsideRuleIndex, 'rules',ruleIndex,'price'],_this):null}
                                />&nbsp;元
                        </div>
                    </RadioGroup>
                </div>;
            } else {
                fragment = <div style={{padding:'5px 0'}}>
                    服务费：&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        {...ValidateMap.number} min={'0'} step='0.01'
                                                required='true'
                                                style={{width:'50px'}}
                                                valueLink={_this.nestLinkedState(["value",subsideRuleIndex, 'rules',ruleIndex,'price'],_this)}
                        />&nbsp;元
                </div>;
            }

            let priceRuleDom;
            if (!readOnly) {
                priceRuleDom = <div key={ruleIndex} style={{margin:'5px 0'}}>
                    <div>
                        <input
                            {...ValidateMap.number} min={'1'}
                                                    required='true' step='0.01'
                                                    style={{width:'85px'}}
                                                    valueLink={_this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex,'minSettle'],_this)}
                            />
                        &nbsp;元&nbsp;&nbsp;&lt;&nbsp;&nbsp;结算价&nbsp;&nbsp;&lt;=&nbsp;&nbsp;
                        <input
                            {...ValidateMap.number} min={'1'}
                                                    required='true' step='0.01'
                                                    style={{width:'85px'}}
                                                    valueLink={_this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex,'maxSettle'],_this)}
                            />
                        &nbsp;元
                        {(()=> {
                            if (ruleIndex != 0) {
                                return <button className='pull-right' type='button'
                                               onClick={_this.deletePriceRuleHandle.bind(_this,subsideRuleIndex,ruleIndex)}>
                                    删除</button>
                            }
                        })()}
                    </div>
                    {fragment}
                </div>;
            } else {
                let typeDesMap = ['每张补贴', '一口价', '服务费'];
                priceRuleDom = <div key={ruleIndex}>
                    {rule.minSettle}元&nbsp;&lt;&nbsp;结算价&nbsp;&lt;=&nbsp;
                    {rule.maxSettle}，{typeDesMap[rule.type * 1 - 1]}<span>{rule.price}</span>元
                </div>;
            }
            priceRulesDom.push(
                priceRuleDom
            );
        });
        return priceRulesDom;
    }

    getSubsidyRulesDom(subsidyRules, readOnly) {
        let subsidyRulesDom = [];
        let _this = this;

        subsidyRules.forEach(function (subsideRule, subsideRuleIndex) {
            let version = subsideRule.version;

            let activeVersions;
            let totalCheckBoxChecked;
            let subsideRuleCheckBoxName = `subsideRule${subsideRuleIndex}`;

            if (version == 0) {//全部用0表示
                totalCheckBoxChecked = true;
                activeVersions = _this.getActiveVersions(127);
            } else {
                if (version == -1) {//全不选
                    activeVersions = [];
                } else {
                    activeVersions = _this.getActiveVersions(version);
                }
                totalCheckBoxChecked = false;
            }

            let subsideRuleCheckBoxHandleChange = (subsideRuleIndex)=> {
                let newState = _this.state;
                let newActiveVersions = _this.refs[subsideRuleCheckBoxName].getCheckedValues();
                let newActiveVersions2 = "0000000"; //2进制
                let newActiveVersions10;//10进制

                newActiveVersions2 = newActiveVersions2.split('');
                newActiveVersions.forEach((item, i)=> {
                    newActiveVersions2[item * 1] = 1;
                });
                newActiveVersions2 = newActiveVersions2.join('');
                newActiveVersions10 = parseInt(newActiveVersions2, 2);
                //全不选用-1表示
                if (newActiveVersions10 == 127) {//0表示全选
                    newActiveVersions10 = 0;
                } else if (newActiveVersions10 == 0) {//-1 表示全不选
                    newActiveVersions10 = -1;
                }
                newState['value'][subsideRuleIndex]['version'] = newActiveVersions10;

                _this.setState(newState);
            };
            let totalCheckBoxHandleChange = (subsideRuleIndex, e)=> {
                let newState = _this.state;
                let checked = e.target.checked;
                newState['value'][subsideRuleIndex]['version'] = checked ? 0 : -1;//全选和全不选
                _this.setState(newState);
            };

            let subsidyRuleDom;
            if (!readOnly) {
                subsidyRuleDom = <div key={subsideRuleIndex} style={{
                    margin: '10px 0',
                    border: '1px solid #5F5F5F',
                    padding: '20px'
                }}>
                    <div>
                        <div style={{margin:'10px 0'}}>版本：
                            {(()=> {
                                if (subsideRuleIndex != 0) {
                                    return <button type='button' className='pull-right'
                                                   onClick={_this.deleteSubsidyRuleHandle.bind(_this,subsideRuleIndex)}>
                                        删除</button>;
                                }
                            })()}

                        </div>
                        <div>
                            <span style={{width: '6em',display: 'inline-block',padding: '2px 0'}}>
                                <input type="checkbox" checked={totalCheckBoxChecked}
                                       onChange={totalCheckBoxHandleChange.bind(_this,subsideRuleIndex)}
                                       name={`${subsideRuleCheckBoxName}-total`}/>全部
                            </span>
                            <CheckboxGroup style={{display:'inline'}} name={subsideRuleCheckBoxName}
                                           ref={subsideRuleCheckBoxName}
                                           onChange={subsideRuleCheckBoxHandleChange.bind(_this,subsideRuleIndex)}
                                           value={activeVersions}>
                                <span style={{width: '6em',display: 'inline-block',padding: '2px 0'}}><input
                                    type="checkbox" value="6"/>2D</span>
                                <span style={{width: '6em',display: 'inline-block',padding: '2px 0'}}><input
                                    type="checkbox" value="5"/>2DIMAX</span>
                                <span style={{width: '6em',display: 'inline-block',padding: '2px 0'}}><input
                                    type="checkbox" value="4"/>3D</span>
                                <span style={{width: '6em',display: 'inline-block',padding: '2px 0'}}><input
                                    type="checkbox" value="3"/>3DIMAX</span>
                                <span style={{width: '6em',display: 'inline-block',padding: '2px 0'}}><input
                                    type="checkbox" value="2"/>4D</span>
                                <span style={{width: '6em',display: 'inline-block',padding: '2px 0'}}><input
                                    type="checkbox" value="1"/>2D巨幕</span>
                                <span style={{width: '6em',display: 'inline-block',padding: '2px 0'}}><input
                                    type="checkbox" value="0"/>3D巨幕</span>
                            </CheckboxGroup>
                        </div>
                    </div>
                    <div>
                        <div style={{margin:'10px 0'}}>
                            价格：
                            <button type='button' onClick={_this.addPriceRuleHandle.bind(_this,subsideRuleIndex)}>
                                增加价格区间
                            </button>
                        </div>

                        <div>
                            {_this.getPriceRulesDom(subsideRule, subsideRuleIndex, readOnly)}
                        </div>
                    </div>
                </div>;
            } else {
                let versions = _this.getVersionNames(version);
                subsidyRuleDom = <div key={subsideRuleIndex}>
                    <div style={{display:'flex',margin:'5px 0'}}>版本： <span
                        style={{flex:'1'}}>{versions.join('，')}</span></div>
                    <div style={{display:'flex',margin:'5px 0'}}>
                        价格：
                        <div style={{flex:'1'}}>
                            {_this.getPriceRulesDom(subsideRule, subsideRuleIndex, readOnly)}
                        </div>
                    </div>
                </div>;
            }
            subsidyRulesDom.push(
                subsidyRuleDom
            );
        })

        return subsidyRulesDom;

    }

    addSubsidyRuleHandle() {
        let newState = this.state;
        newState.value.push(
            this.defaultSubsidyRule()
        )
        this.setState(newState);
    }

    deleteSubsidyRuleHandle(subsideRuleIndex) {
        let newState = this.state;
        newState.value.splice(subsideRuleIndex, 1);
        this.setState(newState);

    }

    addPriceRuleHandle(subsideRuleIndex) {
        let newState = this.state;
        newState.value[subsideRuleIndex].rules.push({
            "maxSettle": '',
            "minSettle": '',
            "type": 1,  //1-每张补贴，2-一口价，3-服务费
            "price": ''
        })
        this.setState(newState);
    }


    deletePriceRuleHandle(subsideRuleIndex, ruleIndex) {
        let newState = this.state;
        newState.value[subsideRuleIndex].rules.splice(ruleIndex, 1);
        this.setState(newState);
    }


    getVersionNames(version) {
        let versionNames = [];
        let versionNameMap = ['2D', '2DIMAX', '3D', '3DIMAX', '4D', '2D巨幕', '3D巨幕'];
        versionNameMap.reverse();
        let activeVersions = this.getActiveVersions(version);

        if (activeVersions.length > 0) {
            activeVersions.forEach(function (activeVersion) {
                versionNames.push(versionNameMap[activeVersion]);
            });
        } else {
            versionNames = ['全部'];
        }
        return versionNames;
    }

    getActiveVersions(version) {
        let activeVersions = [];
        version = ("0000000" + parseInt(version).toString(2)).slice(-7);
        for (let i = 0; i < 7; i++) {//版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，例如1111110=126表示除2D外所有版本。全部用0表示
            if (version[i] == 1) {
                activeVersions.push(String(i));
            }
        }
        return activeVersions;
    }


    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;
        let value = _this.state.value;
        let subsidyRules = value;


        let rightDom;
        let addSubsidyRuleBtn = <button type='button' onClick={_this.addSubsidyRuleHandle.bind(_this)}>增加补贴规则</button>;

        let subsidyRulesDom = _this.getSubsidyRulesDom(subsidyRules, readOnly);
        if (readOnly) {
            rightDom = <Right>
                {subsidyRulesDom}
            </Right>;
        } else {
            rightDom = <Right>
                <button type='button' onClick={_this.addSubsidyRuleHandle.bind(_this)}>增加补贴规则</button>

                <div>
                    {subsidyRulesDom}
                </div>
            </Right>;
        }

        return (
            <Group>
                <Left>
                    补贴规则
                </Left>
                ：
                {rightDom}
            </Group>
        )
    }
};
