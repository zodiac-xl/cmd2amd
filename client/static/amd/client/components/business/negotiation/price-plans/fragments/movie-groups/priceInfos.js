'use strict';

define(["/amd/node_modules/uniqid/index.js","/amd/node_modules/react-simple-radio-group/index.js","/amd/node_modules/deep-equal/index.js","/amd/client/components/common/form-group.js","/amd/client/components/common/checkbox-group.js","/amd/client/components/common/super-child.js","/amd/client/components/common/validatemap.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"uniqid":{"index":0,"path":"node_modules/uniqid/index.js"},"react-simple-radio-group":{"index":1,"path":"node_modules/react-simple-radio-group/index.js"},"deep-equal":{"index":2,"path":"node_modules/deep-equal/index.js"},"../../../../../common/form-group":{"index":3,"path":"client/components/common/form-group.js"},"../../../../../common/checkbox-group":{"index":4,"path":"client/components/common/checkbox-group.js"},"../../../../../common/super-child":{"index":5,"path":"client/components/common/super-child.js"},"../../../../../common/validatemap":{"index":6,"path":"client/components/common/validatemap.js"}};
    var cmd2amdModulesRef = arguments;

    var packedModule = (function () {
        var module = {};
        var exports = {};
        var process = { env: { NODE_ENV: 'production' } };

        function cmd2amdLoadModule(moduleName) {
            var refer = null;
            var _thisModule = cmd2amdModules[moduleName];
            if (_thisModule) {
                refer = _thisModule.external && window[_thisModule.external] || cmd2amdModulesRef[_thisModule.index];
            } else {
                console.error(moduleName + 'can not find refer');
            }
            return refer;
        };

        'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _uniqid = cmd2amdLoadModule('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _reactSimpleRadioGroup = cmd2amdLoadModule('react-simple-radio-group');

var _reactSimpleRadioGroup2 = _interopRequireDefault(_reactSimpleRadioGroup);

var _deepEqual = cmd2amdLoadModule('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _commonFormGroup = cmd2amdLoadModule('../../../../../common/form-group');

var _commonCheckboxGroup = cmd2amdLoadModule('../../../../../common/checkbox-group');

var _commonCheckboxGroup2 = _interopRequireDefault(_commonCheckboxGroup);

var _commonSuperChild = cmd2amdLoadModule('../../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _commonValidatemap = cmd2amdLoadModule('../../../../../common/validatemap');

var _commonValidatemap2 = _interopRequireDefault(_commonValidatemap);

var PriceInfos = (function (_SuperChild) {
    _inherits(PriceInfos, _SuperChild);

    function PriceInfos() {
        _classCallCheck(this, PriceInfos);

        _get(Object.getPrototypeOf(PriceInfos.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PriceInfos, [{
        key: 'defaultPriceInfo',
        value: function defaultPriceInfo() {
            return [{
                "halls": [],
                "purchasePrice": [//进价设置，如果不参加活动则为空json数组
                {
                    "showType": 0, //场次类型，0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                    "type": 1, //进价类型，1-最低限价+N，2-协定价，3-折扣价
                    "price": '', //进价，进价类型为1时，表示N；进价类型为2时，表示协定价；进价类型为3时，表示折扣后的加价
                    "discount": '' //折扣，进价类型为3时，表示折扣；进价类型不为3时没意义
                }],
                "priceLimit": true, //是否限价保护
                "specialHall": false //是否是特殊厅
            }];
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var _this = this;
            var valueLink = props.valueLink || {};
            var value = valueLink.value || [_this.defaultPriceInfo()];

            return {
                value: value
            };
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var hallPrices = [];
            var normalhallPrice = undefined;
            var specialhallPrices = [];
            var priceinfos = _this.state.value;

            priceinfos.forEach(function (priceinfo, priceinfoIndex) {
                var versionType = 0;
                if (priceinfo.purchasePrice[0] && priceinfo.purchasePrice[0].showType != 0) {
                    versionType = 1;
                }
                var valuelink = {
                    value: versionType,
                    requestChange: function requestChange(e) {
                        var newState = _this.state;
                        if (e.target.value == 0) {
                            var defaultType = 1;
                            if (priceinfoIndex != 0) {
                                defaultType = 0; //不参加
                            }
                            newState.value[priceinfoIndex].purchasePrice = [{
                                "showType": 0,
                                "type": defaultType,
                                "price": '',
                                "discount": ''
                            }];
                        } else {
                            (function () {
                                var showTypes = undefined;
                                if (!newState.value[priceinfoIndex].specialHall) {
                                    //普通厅
                                    showTypes = [1, 3]; //0-全部 1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                                } else {
                                        switch (newState.value[priceinfoIndex].halls[0].type) {// "type": 1    //影厅类型，1-普通厅，2-IMAX厅，3-DMAX厅，4-4D厅
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

                                var newPurchasePrice = [];
                                showTypes.forEach(function (showType) {
                                    newPurchasePrice.push({
                                        "showType": showType,
                                        "type": 1,
                                        "price": '',
                                        "discount": ''
                                    });
                                });
                                newState.value[priceinfoIndex].purchasePrice = newPurchasePrice;
                            })();
                        }

                        _this.setState(newState);
                    }
                };

                //0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                var showTypeMap = ['所有版本', '2D', 'IMAX2D', '3D', 'IMAX3D', '4D', '巨幕2D', '巨幕3D'];
                var purchasePrice = [];
                priceinfo.purchasePrice.forEach(function (item, index) {
                    var priceInput = undefined;
                    switch (item.type * 1) {
                        case 1:
                            priceInput = _react2['default'].createElement(
                                'span',
                                { key: item.type },
                                '+',
                                _react2['default'].createElement('input', _extends({ title: '最低限价',
                                    valueLink: _this.nestLinkedState(['value', priceinfoIndex, 'purchasePrice', index, 'price'], _this)
                                }, _commonValidatemap2['default'].number, { required: true, step: '0.01',
                                    style: { width: '100px' }
                                })),
                                ' 元'
                            );
                            break;
                        case 2:
                            priceInput = _react2['default'].createElement(
                                'span',
                                { key: item.type },
                                _react2['default'].createElement('input', _extends({ title: '协定价',
                                    valueLink: _this.nestLinkedState(['value', priceinfoIndex, 'purchasePrice', index, 'price'], _this)
                                }, _commonValidatemap2['default'].number, { required: true, min: 0, step: '0.01',
                                    style: { width: '100px' }
                                })),
                                ' 元'
                            );
                            break;
                        case 3:
                            priceInput = _react2['default'].createElement(
                                'span',
                                { key: item.type },
                                _react2['default'].createElement('input', _extends({ title: '折扣价',
                                    valueLink: _this.nestLinkedState(['value', priceinfoIndex, 'purchasePrice', index, 'discount'], _this)
                                }, _commonValidatemap2['default'].number, { required: true, min: 0, step: '0.01',
                                    style: { width: '100px' }
                                })),
                                ' % + ',
                                _react2['default'].createElement('input', _extends({
                                    valueLink: _this.nestLinkedState(['value', priceinfoIndex, 'purchasePrice', index, 'price'], _this)
                                }, _commonValidatemap2['default'].number, { required: true, step: '0.01',
                                    style: { width: '100px' }
                                })),
                                ' 元'
                            );
                            break;

                    }

                    var selectValueLink = {
                        value: String(item.type),
                        requestChange: function requestChange(newValue) {
                            var newState = _this.state;
                            newState.value[priceinfoIndex].purchasePrice[index].type = newValue;
                            _this.setState(newState);
                        }
                    };
                    purchasePrice.push(_react2['default'].createElement(
                        'div',
                        { key: index, style: { padding: '5px 20px' } },
                        _react2['default'].createElement(
                            'span',
                            null,
                            showTypeMap[item.showType],
                            '：'
                        ),
                        _react2['default'].createElement(
                            'select',
                            {
                                valueLink: selectValueLink },
                            _react2['default'].createElement(
                                'option',
                                { value: '0' },
                                '不参加调价'
                            ),
                            _react2['default'].createElement(
                                'option',
                                { value: '1' },
                                '最低限价'
                            ),
                            _react2['default'].createElement(
                                'option',
                                { value: '2' },
                                '协定价'
                            ),
                            _react2['default'].createElement(
                                'option',
                                { value: '3' },
                                '原价折扣'
                            )
                        ),
                        '  ',
                        priceInput
                    ));
                });

                var tip = undefined;
                if (purchasePrice.length > 1 && !priceinfo.specialHall) {
                    tip = _react2['default'].createElement(
                        'p',
                        { style: {
                                paddingLeft: '20px',
                                margin: 0
                            }, key: purchasePrice.length + 1, className: 'text-muted' },
                        '4D、巨幕、IMAX等特殊版本请在相应的特殊厅设置'
                    );
                }
                purchasePrice.push(tip);

                var _thisHall = _react2['default'].createElement(
                    'div',
                    { key: priceinfoIndex, style: { margin: '5px 0' } },
                    priceinfo.specialHall ? priceinfo.halls[0] && priceinfo.halls[0].name : '',
                    _react2['default'].createElement(
                        'select',
                        { value: valuelink.value, onChange: valuelink.requestChange },
                        _react2['default'].createElement(
                            'option',
                            { value: '0' },
                            '所有版本'
                        ),
                        _react2['default'].createElement(
                            'option',
                            { value: '1' },
                            '分版本定价'
                        )
                    ),
                    purchasePrice
                );

                if (priceinfo.specialHall) {
                    specialhallPrices.push(_thisHall);
                } else {
                    if (priceinfo.halls.length > 0 || priceinfos.length == 1) {
                        //普通厅有影厅 或 没有特殊厅时 才展示普通调价
                        normalhallPrice = _thisHall;
                    }
                }
            });

            var normalPrice = null;
            if (normalhallPrice) {
                normalPrice = _react2['default'].createElement(
                    _commonFormGroup.Group,
                    { key: 'normalPrice' },
                    _react2['default'].createElement(
                        _commonFormGroup.Left,
                        null,
                        '结算价'
                    ),
                    '：',
                    _react2['default'].createElement(
                        _commonFormGroup.Right,
                        null,
                        normalhallPrice
                    )
                );
            }

            var specialPrice = null;
            if (specialhallPrices.length >= 1) {
                specialPrice = _react2['default'].createElement(
                    _commonFormGroup.Group,
                    { key: 'specialPrice' },
                    _react2['default'].createElement(
                        _commonFormGroup.Left,
                        null,
                        '特殊厅结算价'
                    ),
                    '：',
                    _react2['default'].createElement(
                        _commonFormGroup.Right,
                        null,
                        specialhallPrices
                    )
                );
            }

            return _react2['default'].createElement(
                'div',
                { style: { paddingTop: '10px' } },
                normalPrice,
                specialPrice
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            readOnly: false
        },
        enumerable: true
    }]);

    return PriceInfos;
})(_commonSuperChild2['default']);

exports['default'] = PriceInfos;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});