import React                    from 'react'
import uniqid                   from 'uniqid';
import RadioGroup               from 'react-simple-radio-group';
import deepEqual                from 'deep-equal';

import {Group,Left,Right,Hr}    from '../../../../../common/form-group';
import CheckboxGroup            from '../../../../../common/checkbox-group';
import SuperChild               from '../../../../../common/super-child';

import ValidateMap              from '../../../../../common/validatemap';



export default class PriceInfos extends SuperChild {


    defaultPriceInfo() {
        return [
            {
                "halls": [],
                "purchasePrice": [    //进价设置，如果不参加活动则为空json数组
                    {
                        "showType": 0,    //场次类型，0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                        "type": 1,    //进价类型，1-最低限价+N，2-协定价，3-折扣价
                        "price": '',    //进价，进价类型为1时，表示N；进价类型为2时，表示协定价；进价类型为3时，表示折扣后的加价
                        "discount": ''    //折扣，进价类型为3时，表示折扣；进价类型不为3时没意义
                    }
                ],
                "priceLimit": true,    //是否限价保护
                "specialHall": false    //是否是特殊厅
            }
        ];
    }

    static defaultProps = {
        valueLink: null,
        readOnly: false
    };


    getStateByProps(props) {
        let _this = this;
        let valueLink = props.valueLink || {};
        let value = valueLink.value || [_this.defaultPriceInfo()];


        return {
            value: value
        }
    }


    renderMain() {
        let _this = this;
        let hallPrices = [];
        let normalhallPrice;
        let specialhallPrices = [];
        let priceinfos = _this.state.value;

        priceinfos.forEach((priceinfo, priceinfoIndex)=> {
            let versionType = 0;
            if (priceinfo.purchasePrice[0] && priceinfo.purchasePrice[0].showType != 0) {
                versionType = 1;
            }
            let valuelink = {
                value: versionType,
                requestChange: function requestChange(e) {
                    let newState = _this.state;
                    if (e.target.value == 0) {
                        let defaultType = 1;
                        if (priceinfoIndex != 0) {
                            defaultType = 0;//不参加
                        }
                        newState.value[priceinfoIndex].purchasePrice = [{
                            "showType": 0,
                            "type": defaultType,
                            "price": '',
                            "discount": ''
                        }];
                    } else {
                        let showTypes;
                        if (!newState.value[priceinfoIndex].specialHall) {//普通厅
                            showTypes = [1, 3];//0-全部 1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                        } else {
                            switch (newState.value[priceinfoIndex].halls[0].type) { // "type": 1    //影厅类型，1-普通厅，2-IMAX厅，3-DMAX厅，4-4D厅
                                case 1:
                                    showTypes = [1, 3];
                                    break;
                                case 2:
                                    showTypes = [1, 2, 3, 4];
                                    break;
                                case 3:
                                    showTypes = [1, 3, 6, 7];
                                    break;
                                case 4:
                                    showTypes = [1, 3, 5];
                                    break;
                            }
                        }

                        let newPurchasePrice = [];
                        showTypes.forEach(function (showType) {
                            newPurchasePrice.push({
                                "showType": showType,
                                "type": 1,
                                "price": '',
                                "discount": ''
                            })
                        })
                        newState.value[priceinfoIndex].purchasePrice = newPurchasePrice;
                    }

                    _this.setState(newState)
                }
            };


            //0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
            let showTypeMap = ['所有版本', '2D', 'IMAX2D', '3D', 'IMAX3D', '4D', '巨幕2D', '巨幕3D'];
            let purchasePrice = [];
            priceinfo.purchasePrice.forEach(function (item, index) {
                let priceInput;
                switch (item.type * 1) {
                    case 1:
                        priceInput = <span key={item.type}>
                                                +<input title='最低限价'
                                                        valueLink={_this.nestLinkedState(['value', priceinfoIndex,'purchasePrice',index,'price'],_this)}
                            {...ValidateMap.number} required={true} step='0.01'
                                                        style={{width: '100px'}}
                            />
                            &nbsp;元</span>;
                        break;
                    case 2:
                        priceInput = <span key={item.type}>
                                                <input title='协定价'
                                                       valueLink={_this.nestLinkedState(['value', priceinfoIndex,'purchasePrice',index,'price'],_this)}
                                                    {...ValidateMap.number} required={true} min={0} step='0.01'
                                                       style={{width: '100px'}}
                                                    />
                            &nbsp;元</span>;
                        break;
                    case 3:
                        priceInput = <span key={item.type}>
                                                <input title='折扣价'
                                                       valueLink={_this.nestLinkedState(['value', priceinfoIndex,'purchasePrice',index,'discount'],_this)}
                                                    {...ValidateMap.number} required={true} min={0} step='0.01'
                                                       style={{width: '100px'}}
                                                    />
                            &nbsp;%
                                                    +&nbsp;
                            <input
                                valueLink={_this.nestLinkedState(['value', priceinfoIndex,'purchasePrice',index,'price'],_this)}
                                {...ValidateMap.number} required={true} step='0.01'
                                style={{width: '100px'}}
                                />
                            &nbsp;元</span>;
                        break;

                }

                let selectValueLink = {
                    value: String(item.type),
                    requestChange: function (newValue) {
                        let newState = _this.state;
                        newState.value[priceinfoIndex].purchasePrice[index].type = newValue;
                        _this.setState(newState);
                    }
                }
                purchasePrice.push(
                    <div key={index} style={{padding:'5px 20px'}}>
                        <span>{showTypeMap[item.showType]}：</span>
                        <select
                            valueLink={selectValueLink}>
                            <option value='0'>不参加调价</option>
                            <option value='1'>最低限价</option>
                            <option value='2'>协定价</option>
                            <option value='3'>原价折扣</option>
                        </select>
                        &nbsp;&nbsp;
                        {priceInput}
                    </div>
                )
            });

            let tip;
            if (purchasePrice.length > 1 && !priceinfo.specialHall) {
                tip = <p style={{
                            paddingLeft: '20px',
                            margin: 0
                        }} key={purchasePrice.length+1} className='text-muted'>4D、巨幕、IMAX等特殊版本请在相应的特殊厅设置</p>;
            }
            purchasePrice.push(tip);


            let _thisHall = <div key={priceinfoIndex} style={{margin:'5px 0'}}>
                {priceinfo.specialHall ? (priceinfo.halls[0] && priceinfo.halls[0].name) : ''}
                <select value={valuelink.value} onChange={valuelink.requestChange}>
                    <option value='0'>所有版本</option>
                    <option value='1'>分版本定价</option>
                </select>
                {purchasePrice}
            </div>;

            if (priceinfo.specialHall) {
                specialhallPrices.push(_thisHall);
            } else {
                if (priceinfo.halls.length > 0 || priceinfos.length == 1) {//普通厅有影厅 或 没有特殊厅时 才展示普通调价
                    normalhallPrice = _thisHall;
                }
            }

        })

        let normalPrice = null;
        if (normalhallPrice) {
            normalPrice = <Group key='normalPrice'>
                <Left>
                    结算价
                </Left>：
                <Right>
                    {normalhallPrice}
                </Right>
            </Group>;
        }

        let specialPrice = null;
        if (specialhallPrices.length >= 1) {
            specialPrice = <Group key='specialPrice'>
                <Left>
                    特殊厅结算价
                </Left>：
                <Right>
                    {specialhallPrices}
                </Right>
            </Group>;
        }


        return (
            <div style={{paddingTop:'10px'}}>
                {normalPrice}
                {specialPrice}
            </div>
        )
    }
};
