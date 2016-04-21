'use strict';

define(["/amd/node_modules/react-simple-radio-group/index.js","/amd/node_modules/array-unique/index.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js","/amd/client/components/common/validatemap.js","/amd/client/components/common/checkbox-group.js","/amd/client/components/util/binary.js"], function (ref_0,ref_1,ref_2,ref_3,ref_4,ref_5,ref_6) {

    var cmd2amdModules = {"react-simple-radio-group":{"index":0,"path":"node_modules/react-simple-radio-group/index.js"},"array-unique":{"index":1,"path":"node_modules/array-unique/index.js"},"../../../../../../common/form-group":{"index":2,"path":"client/components/common/form-group.js"},"../../../../../../common/super-child":{"index":3,"path":"client/components/common/super-child.js"},"../../../../../../common/validatemap":{"index":4,"path":"client/components/common/validatemap.js"},"../../../../../../common/checkbox-group":{"index":5,"path":"client/components/common/checkbox-group.js"},"../../../../../../util/binary":{"index":6,"path":"client/components/util/binary.js"}};
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

var _reactSimpleRadioGroup = cmd2amdLoadModule('react-simple-radio-group');

var _reactSimpleRadioGroup2 = _interopRequireDefault(_reactSimpleRadioGroup);

var _arrayUnique = cmd2amdLoadModule('array-unique');

var _arrayUnique2 = _interopRequireDefault(_arrayUnique);

var _commonFormGroup = cmd2amdLoadModule('../../../../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _commonValidatemap = cmd2amdLoadModule('../../../../../../common/validatemap');

var _commonValidatemap2 = _interopRequireDefault(_commonValidatemap);

var _commonCheckboxGroup = cmd2amdLoadModule('../../../../../../common/checkbox-group');

var _commonCheckboxGroup2 = _interopRequireDefault(_commonCheckboxGroup);

var _utilBinary = cmd2amdLoadModule('../../../../../../util/binary');

var _utilBinary2 = _interopRequireDefault(_utilBinary);

var SubsidyRules = (function (_SuperChild) {
    _inherits(SubsidyRules, _SuperChild);

    function SubsidyRules() {
        _classCallCheck(this, SubsidyRules);

        _get(Object.getPrototypeOf(SubsidyRules.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(SubsidyRules, [{
        key: 'defaultSubsidyRule',
        value: function defaultSubsidyRule() {
            return {
                "version": 0, //版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，例如1111110=126表示除2D外所有版本。全部用0表示 -1表示全不选 （不提交全不选 提交时清除）
                "rules": [{
                    "maxSettle": '',
                    "minSettle": '',
                    "type": 1, //1-每张补贴，2-一口价，3-服务费 4-动态售价
                    "price": '',
                    "competitors": 0, //竞对，"type"为4-动态售价时生效，其余传0。二进制表示，第n位分别代表：1-"豆瓣",2-"时光网",5-"格瓦拉",7-"QQ",8-"点评",9-"微信",10-"糯米", 11-"淘宝"。例如11100010000=1808表示"淘宝","糯米","微信","格瓦拉"。
                    "maxSubsidy": 0, //最多补贴，"type"为4-动态售价时生效，其余传0
                    "minSubsidy": 0 //最少补贴，"type"为4-动态售价时生效，其余传0
                }],
                "additional": ""
            };
        }
    }, {
        key: 'validate',
        value: function validate() {
            var _this = this;
            var validate = true;
            var value = _this.state.value;
            var subsidyRules = value;

            subsidyRules.some(function (subsidyRule) {
                if (subsidyRule.version == -1) {
                    validate = false;
                    toastr.warning('补贴规则请至少选择一个版本');
                }
                return !validate;
            });

            //“版本”默认选择全部勾选。提交时若版本重复勾选，则无法提交，并提示“补贴规则版本选择重复”。
            if (validate) {
                (function () {

                    //版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，
                    // 例如1111110=126表示除2D外所有版本。全部用0表示 -1表示全不选 （不提交全不选 提交时清除）
                    var repeated = false;
                    var totalActiveVersion = [];
                    var versionsState = {};

                    subsidyRules.some(function (subsidyRule) {
                        var version = subsidyRule.version * 1 == 0 ? 127 : subsidyRule.version * 1;
                        var activeVersions = _this.getActiveVersions(version);
                        if ((0, _arrayUnique2['default'])(totalActiveVersion.concat(activeVersions)).length < totalActiveVersion.length + activeVersions.length) {
                            repeated = true;
                        } else {
                            totalActiveVersion = totalActiveVersion.concat(activeVersions);
                        }
                        return repeated;
                    });
                    if (repeated) {
                        validate = false;
                        toastr.warning('补贴规则版本选择重复');
                    }
                })();
            }

            //maxSettle >minSettle
            if (validate) {
                subsidyRules.some(function (subsidyRule) {
                    //所有版本和需要等于127
                    subsidyRule.rules.some(function (rule) {
                        //所有版本和需要等于127
                        if (rule.maxSettle * 1 <= rule.minSettle * 1) {
                            validate = false;
                            toastr.warning('请检查结算价价格区间');
                        }
                        return !validate;
                    });
                    return !validate;
                });
            }

            //二maxSettle >minSettle 价格段重叠
            if (validate) {
                subsidyRules.some(function (subsidyRule, subsidyRuleIndex) {
                    //所有版本和需要等于127
                    var priceArr = [];
                    subsidyRule.rules.forEach(function (rule, ruleIndex) {
                        //所有版本和需要等于127
                        priceArr.push({
                            minSettle: rule.minSettle * 1,
                            maxSettle: rule.maxSettle * 1,
                            des: '补贴规则' + (subsidyRuleIndex * 1 + 1) + '中价格区间' + (ruleIndex * 1 + 1)
                        });
                    });

                    for (var i = 0; i < priceArr.length - 1; i++) {
                        var pre = priceArr[i];
                        var preDistance = pre.maxSettle - pre.minSettle;

                        for (var j = i + 1; j < priceArr.length; j++) {
                            var next = priceArr[j];
                            var nextDistance = next.maxSettle - next.minSettle;
                            // {startNum:1,endNum:3}  {startNum:4,endNum:5}    (5-1) > ((3-1) +(5-4))   ok
                            // {startNum:1,endNum:3}  {startNum:2,endNum:5}    (5-1) < ((3-1) +(5-2))   重叠
                            if (preDistance + nextDistance > Math.max(pre.maxSettle, next.maxSettle) - Math.min(pre.minSettle, next.minSettle)) {
                                toastr.warning('价格区间重叠，请修改' + next.des);
                                validate = false;
                                break;
                            }
                        }
                        if (!validate) {
                            break;
                        }
                    }
                    return !validate;
                });
            }

            //当“价格”中选择“每张补贴”时，若结算价左区间数值小于等于每张补贴数值，无法提交。
            if (validate && _this.props.form != '服务费减免') {
                subsidyRules.some(function (subsidyRule) {
                    //所有版本和需要等于127
                    subsidyRule.rules.some(function (rules) {
                        //所有版本和需要等于127
                        if (rules.type == 1 && rules.minSettle * 1 <= rules.price * 1) {
                            validate = false;
                            toastr.warning('每张补贴 结算价左区间数值必须大于每张补贴数值');
                        }
                        return !validate;
                    });
                    return !validate;
                });
            }

            //当选择动态售价时，竞对不能为空。且最多补贴必须大于等于最少补贴
            if (validate && _this.props.form != '服务费减免') {
                subsidyRules.some(function (subsidyRule) {
                    //所有版本和需要等于127
                    subsidyRule.rules.some(function (rule) {
                        //所有版本和需要等于127
                        if (rule.type == 4) {

                            if (rule.competitors == 0) {
                                validate = false;
                                toastr.warning('请选择跟进竞对');
                            } else if (rule.maxSubsidy < rule.minSubsidy) {
                                validate = false;
                                toastr.warning('最多补贴必须大于等于最少补贴');
                            }
                        }
                        return !validate;
                    });

                    return !validate;
                });
            }

            return validate;
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value || [this.defaultSubsidyRule()];
            return {
                value: value
            };
        }
    }, {
        key: 'getPriceRulesDom',
        value: function getPriceRulesDom(subsideRule, subsideRuleIndex, readOnly) {
            var _this = this;
            var form = _this.props.form;
            var rules = subsideRule.rules;
            var priceRulesDom = [];
            rules.forEach(function (rule, ruleIndex) {
                var fragment = undefined;
                if (form != '服务费减免') {
                    (function () {
                        // "type": 1,  //1-每张补贴，2-一口价，3-服务费
                        var radioValue = rule.type;
                        var radioGroupValueLink = _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'type'], _this);

                        var priceType = 1; //固定票价
                        if (rule.type == 4) {
                            priceType = 2; //活动调价
                        }

                        fragment = React.createElement(
                            'div',
                            null,
                            React.createElement(
                                _reactSimpleRadioGroup2['default'],
                                { name: 'type-price-' + subsideRuleIndex + '-' + ruleIndex, value: priceType,
                                    onChange: function (newValue) {
                                        var newState = _this.state;
                                        if (newValue == 2) {
                                            newState.value[subsideRuleIndex]['rules'][ruleIndex].type = 4;
                                        } else {
                                            newState.value[subsideRuleIndex]['rules'][ruleIndex].type = 1;
                                            newState.value[subsideRuleIndex]['rules'][ruleIndex].maxSubsidy = 0;
                                            newState.value[subsideRuleIndex]['rules'][ruleIndex].minSubsidy = 0;
                                            newState.value[subsideRuleIndex]['rules'][ruleIndex].competitors = 0;
                                        }

                                        _this.setState(newState);
                                    } },
                                React.createElement('input', { type: 'radio', value: '1' }),
                                '固定售价     ',
                                React.createElement('input', { type: 'radio', value: '2' }),
                                '动态售价'
                            ),
                            (function () {
                                var rs = undefined;
                                if (priceType == 1) {
                                    rs = React.createElement(
                                        _reactSimpleRadioGroup2['default'],
                                        { name: 'rule-' + subsideRuleIndex + '-' + ruleIndex,
                                            value: radioGroupValueLink.value,
                                            onChange: radioGroupValueLink.requestChange
                                        },
                                        React.createElement(
                                            'div',
                                            { style: { padding: '5px 0' } },
                                            React.createElement('input', { type: 'radio', value: '1' }),
                                            '每张补贴 ',
                                            React.createElement('input', _extends({}, _commonValidatemap2['default'].number, { min: '0', step: '0.01', placeholder: '数字，包括服务费',
                                                required: radioValue == 1 ? true : false,
                                                valueLink: radioValue == 1 ? _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'price'], _this) : null
                                            })),
                                            ' 元'
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { padding: '5px 0' } },
                                            React.createElement('input', { type: 'radio', value: '2' }),
                                            '一口价    ',
                                            React.createElement('input', _extends({}, _commonValidatemap2['default'].number, { min: '0', step: '0.01',
                                                required: radioValue == 2 ? true : false,
                                                valueLink: radioValue == 2 ? _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'price'], _this) : null
                                            })),
                                            ' 元'
                                        )
                                    );
                                } else {
                                    (function () {
                                        var binaryArr = _utilBinary2['default'].int2binaryArr(rule.competitors, 11);
                                        var competitorsName = 'competitors-' + subsideRuleIndex + '-' + ruleIndex;
                                        var maxSubsidyValueLinK = _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'maxSubsidy'], _this);
                                        var minSubsidyValueLinK = _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'minSubsidy'], _this);

                                        rs = React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                _commonCheckboxGroup2['default'],
                                                { style: { display: 'inline' },
                                                    onChange: function () {
                                                        var newArrValue = _this.refs[competitorsName].getCheckedValues();
                                                        var num10 = _utilBinary2['default'].binaryArr2int(newArrValue, 11);
                                                        var newState = _this.state;
                                                        newState.value[subsideRuleIndex]['rules'][ruleIndex].competitors = num10;
                                                        _this.setState(newState);
                                                    },
                                                    name: competitorsName,
                                                    ref: competitorsName,
                                                    value: binaryArr },
                                                '跟进竞对  ',
                                                React.createElement('input', { type: 'checkbox', value: '10' }),
                                                '糯米     ',
                                                React.createElement('input', { type: 'checkbox', value: '11' }),
                                                '淘宝     ',
                                                React.createElement('input', { type: 'checkbox', value: '9' }),
                                                '微票     ',
                                                React.createElement('input', { type: 'checkbox', value: '5' }),
                                                '格瓦拉'
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { padding: '5px 0' } },
                                                '比竞对优势 ',
                                                React.createElement('input', _extends({}, _commonValidatemap2['default'].number, {
                                                    valueLink: _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'price'], _this),
                                                    step: '0.1', required: true })),
                                                '  元'
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { padding: '5px 0' } },
                                                '最多补贴     ',
                                                React.createElement('input', _extends({}, _commonValidatemap2['default'].number, {
                                                    value: maxSubsidyValueLinK.value || '',
                                                    min: 0.1,
                                                    onChange: function (e) {
                                                        maxSubsidyValueLinK.requestChange(e.target.value);
                                                    },
                                                    placeholder: '数字，包括服务费', required: true, step: '0.1' })),
                                                ' 元'
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { padding: '5px 0' } },
                                                '最少补贴     ',
                                                React.createElement('input', _extends({}, _commonValidatemap2['default'].number, {
                                                    value: minSubsidyValueLinK.value || '',
                                                    min: 0.1,
                                                    onChange: function (e) {
                                                        minSubsidyValueLinK.requestChange(e.target.value);
                                                    },
                                                    placeholder: '数字，包括服务费', required: true, step: '0.1' })),
                                                ' 元'
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { padding: '5px 0' } },
                                                '跟进最低目标价，若超过最多补贴，按最少补贴跟进'
                                            )
                                        );
                                    })();
                                }
                                return rs;
                            })()
                        );
                    })();
                } else {
                    fragment = React.createElement(
                        'div',
                        { style: { padding: '5px 0' } },
                        '服务费：    ',
                        React.createElement('input', _extends({}, _commonValidatemap2['default'].number, { min: '0', step: '0.01',
                            required: 'true',
                            style: { width: '50px' },
                            valueLink: _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'price'], _this)
                        })),
                        ' 元'
                    );
                }

                var priceRuleDom = undefined;
                if (!readOnly) {
                    priceRuleDom = React.createElement(
                        'div',
                        { key: ruleIndex, style: { margin: '5px 0' } },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('input', _extends({}, _commonValidatemap2['default'].number, { min: '1',
                                required: 'true', step: '0.01',
                                style: { width: '85px' },
                                valueLink: _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'minSettle'], _this)
                            })),
                            ' 元  <  结算价  <=  ',
                            React.createElement('input', _extends({}, _commonValidatemap2['default'].number, { min: '1',
                                required: 'true', step: '0.01',
                                style: { width: '85px' },
                                valueLink: _this.nestLinkedState(["value", subsideRuleIndex, 'rules', ruleIndex, 'maxSettle'], _this)
                            })),
                            ' 元',
                            (function () {
                                if (ruleIndex != 0) {
                                    return React.createElement(
                                        'button',
                                        { className: 'pull-right', type: 'button',
                                            onClick: _this.deletePriceRuleHandle.bind(_this, subsideRuleIndex, ruleIndex) },
                                        '删除'
                                    );
                                }
                            })()
                        ),
                        fragment
                    );
                } else {
                    if (rule.type != 4) {
                        var typeDesMap = ['每张补贴', '一口价', '服务费'];
                        priceRuleDom = React.createElement(
                            'div',
                            { key: ruleIndex },
                            rule.minSettle,
                            '元 < 结算价 <= ',
                            rule.maxSettle,
                            '，',
                            typeDesMap[rule.type * 1 - 1],
                            React.createElement(
                                'span',
                                null,
                                rule.price
                            ),
                            '元'
                        );
                    } else {
                        (function () {

                            var binaryArr = _utilBinary2['default'].int2binaryArr(rule.competitors, 11);

                            //，第n位分别代表：1-"豆瓣",2-"时光网",5-"格瓦拉",7-"QQ",8-"点评",9-"微票",10-"糯米", 11-"淘宝"。例如11
                            var competitorsMap = ["豆瓣", "时光网", '', '', "格瓦拉", '', "QQ", "点评", "微票", "糯米", "淘宝"];
                            var competitors = [];
                            binaryArr.forEach(function (item) {
                                competitors.push(competitorsMap[item - 1]);
                            });
                            competitors = competitors.join('、');
                            priceRuleDom = React.createElement(
                                'div',
                                { key: ruleIndex },
                                rule.minSettle,
                                '元 < 结算价 <= ',
                                rule.maxSettle,
                                '元时，跟进',
                                competitors,
                                '，',
                                React.createElement('br', null),
                                '比竞对优势',
                                rule.price,
                                '元，最多补贴',
                                rule.maxSubsidy,
                                '元，最少补贴',
                                rule.minSubsidy,
                                '元'
                            );
                        })();
                    }
                }
                priceRulesDom.push(priceRuleDom);
            });
            return priceRulesDom;
        }
    }, {
        key: 'getSubsidyRulesDom',
        value: function getSubsidyRulesDom(subsidyRules, readOnly) {
            var subsidyRulesDom = [];
            var _this = this;

            subsidyRules.forEach(function (subsideRule, subsideRuleIndex) {
                var version = subsideRule.version;

                var activeVersions = undefined;
                var totalCheckBoxChecked = undefined;
                var subsideRuleCheckBoxName = 'subsideRule' + subsideRuleIndex;

                if (version == 0) {
                    //全部用0表示
                    totalCheckBoxChecked = true;
                    activeVersions = _this.getActiveVersions(127);
                } else {
                    if (version == -1) {
                        //全不选
                        activeVersions = [];
                    } else {
                        activeVersions = _this.getActiveVersions(version);
                    }
                    totalCheckBoxChecked = false;
                }

                var subsideRuleCheckBoxHandleChange = function subsideRuleCheckBoxHandleChange(subsideRuleIndex) {
                    var newState = _this.state;
                    var newActiveVersions = _this.refs[subsideRuleCheckBoxName].getCheckedValues();
                    var newActiveVersions2 = "0000000"; //2进制
                    var newActiveVersions10 = undefined; //10进制

                    newActiveVersions2 = newActiveVersions2.split('');
                    newActiveVersions.forEach(function (item, i) {
                        newActiveVersions2[item * 1] = 1;
                    });
                    newActiveVersions2 = newActiveVersions2.join('');
                    newActiveVersions10 = parseInt(newActiveVersions2, 2);
                    //全不选用-1表示
                    if (newActiveVersions10 == 127) {
                        //0表示全选
                        newActiveVersions10 = 0;
                    } else if (newActiveVersions10 == 0) {
                        //-1 表示全不选
                        newActiveVersions10 = -1;
                    }
                    newState['value'][subsideRuleIndex]['version'] = newActiveVersions10;

                    _this.setState(newState);
                };
                var totalCheckBoxHandleChange = function totalCheckBoxHandleChange(subsideRuleIndex, e) {
                    var newState = _this.state;
                    var checked = e.target.checked;
                    newState['value'][subsideRuleIndex]['version'] = checked ? 0 : -1; //全选和全不选
                    _this.setState(newState);
                };

                var subsidyRuleDom = undefined;
                if (!readOnly) {
                    subsidyRuleDom = React.createElement(
                        'div',
                        { key: subsideRuleIndex, style: {
                                margin: '10px 0',
                                border: '1px solid #5F5F5F',
                                padding: '20px'
                            } },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { style: { margin: '10px 0' } },
                                '版本：',
                                (function () {
                                    if (subsideRuleIndex != 0) {
                                        return React.createElement(
                                            'button',
                                            { type: 'button', className: 'pull-right',
                                                onClick: _this.deleteSubsidyRuleHandle.bind(_this, subsideRuleIndex) },
                                            '删除'
                                        );
                                    }
                                })()
                            ),
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'span',
                                    { style: { width: '6em', display: 'inline-block', padding: '2px 0' } },
                                    React.createElement('input', { type: 'checkbox', checked: totalCheckBoxChecked,
                                        onChange: totalCheckBoxHandleChange.bind(_this, subsideRuleIndex),
                                        name: subsideRuleCheckBoxName + '-total' }),
                                    '全部'
                                ),
                                React.createElement(
                                    _commonCheckboxGroup2['default'],
                                    { style: { display: 'inline' }, name: subsideRuleCheckBoxName,
                                        ref: subsideRuleCheckBoxName,
                                        onChange: subsideRuleCheckBoxHandleChange.bind(_this, subsideRuleIndex),
                                        value: activeVersions },
                                    React.createElement(
                                        'span',
                                        { style: { width: '6em', display: 'inline-block', padding: '2px 0' } },
                                        React.createElement('input', {
                                            type: 'checkbox', value: '6' }),
                                        '2D'
                                    ),
                                    React.createElement(
                                        'span',
                                        { style: { width: '6em', display: 'inline-block', padding: '2px 0' } },
                                        React.createElement('input', {
                                            type: 'checkbox', value: '5' }),
                                        '2DIMAX'
                                    ),
                                    React.createElement(
                                        'span',
                                        { style: { width: '6em', display: 'inline-block', padding: '2px 0' } },
                                        React.createElement('input', {
                                            type: 'checkbox', value: '4' }),
                                        '3D'
                                    ),
                                    React.createElement(
                                        'span',
                                        { style: { width: '6em', display: 'inline-block', padding: '2px 0' } },
                                        React.createElement('input', {
                                            type: 'checkbox', value: '3' }),
                                        '3DIMAX'
                                    ),
                                    React.createElement(
                                        'span',
                                        { style: { width: '6em', display: 'inline-block', padding: '2px 0' } },
                                        React.createElement('input', {
                                            type: 'checkbox', value: '2' }),
                                        '4D'
                                    ),
                                    React.createElement(
                                        'span',
                                        { style: { width: '6em', display: 'inline-block', padding: '2px 0' } },
                                        React.createElement('input', {
                                            type: 'checkbox', value: '1' }),
                                        '2D巨幕'
                                    ),
                                    React.createElement(
                                        'span',
                                        { style: { width: '6em', display: 'inline-block', padding: '2px 0' } },
                                        React.createElement('input', {
                                            type: 'checkbox', value: '0' }),
                                        '3D巨幕'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { style: { margin: '10px 0' } },
                                '价格：',
                                React.createElement(
                                    'button',
                                    { type: 'button', onClick: _this.addPriceRuleHandle.bind(_this, subsideRuleIndex) },
                                    '增加价格区间'
                                )
                            ),
                            React.createElement(
                                'div',
                                null,
                                _this.getPriceRulesDom(subsideRule, subsideRuleIndex, readOnly)
                            )
                        )
                    );
                } else {
                    var versions = _this.getVersionNames(version);
                    subsidyRuleDom = React.createElement(
                        'div',
                        { key: subsideRuleIndex },
                        React.createElement(
                            'div',
                            { style: { display: 'flex', margin: '5px 0' } },
                            '版本： ',
                            React.createElement(
                                'span',
                                {
                                    style: { flex: '1' } },
                                versions.join('，')
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { display: 'flex', margin: '5px 0' } },
                            '价格：',
                            React.createElement(
                                'div',
                                { style: { flex: '1' } },
                                _this.getPriceRulesDom(subsideRule, subsideRuleIndex, readOnly)
                            )
                        )
                    );
                }
                subsidyRulesDom.push(subsidyRuleDom);
            });

            return subsidyRulesDom;
        }
    }, {
        key: 'addSubsidyRuleHandle',
        value: function addSubsidyRuleHandle() {
            var newState = this.state;
            newState.value.push(this.defaultSubsidyRule());
            this.setState(newState);
        }
    }, {
        key: 'deleteSubsidyRuleHandle',
        value: function deleteSubsidyRuleHandle(subsideRuleIndex) {
            var newState = this.state;
            newState.value.splice(subsideRuleIndex, 1);
            this.setState(newState);
        }
    }, {
        key: 'addPriceRuleHandle',
        value: function addPriceRuleHandle(subsideRuleIndex) {
            var newState = this.state;
            newState.value[subsideRuleIndex].rules.push({
                "maxSettle": '',
                "minSettle": '',
                "type": 1, //1-每张补贴，2-一口价，3-服务费
                "price": '',
                "competitors": 0, //竞对，"type"为4-动态售价时生效，其余传0。二进制表示，第n位分别代表：1-"豆瓣",2-"时光网",5-"格瓦拉",7-"QQ",8-"点评",9-"微信",10-"糯米", 11-"淘宝"。例如11100010000=1808表示"淘宝","糯米","微信","格瓦拉"。
                "maxSubsidy": 0, //最多补贴，"type"为4-动态售价时生效，其余传0
                "minSubsidy": 0 //最少补贴，"type"为4-动态售价时生效，其余传0
            });
            this.setState(newState);
        }
    }, {
        key: 'deletePriceRuleHandle',
        value: function deletePriceRuleHandle(subsideRuleIndex, ruleIndex) {
            var newState = this.state;
            newState.value[subsideRuleIndex].rules.splice(ruleIndex, 1);
            this.setState(newState);
        }
    }, {
        key: 'getVersionNames',
        value: function getVersionNames(version) {
            var versionNames = [];
            var versionNameMap = ['2D', '2DIMAX', '3D', '3DIMAX', '4D', '2D巨幕', '3D巨幕'];
            versionNameMap.reverse();
            var activeVersions = this.getActiveVersions(version);

            if (activeVersions.length > 0) {
                activeVersions.forEach(function (activeVersion) {
                    versionNames.push(versionNameMap[activeVersion]);
                });
            } else {
                versionNames = ['全部'];
            }
            return versionNames;
        }
    }, {
        key: 'getActiveVersions',
        value: function getActiveVersions(version) {
            var activeVersions = [];
            version = ("0000000" + parseInt(version).toString(2)).slice(-7);
            for (var i = 0; i < 7; i++) {
                //版本，7位二进制数字由低位到高位分别表示2D,2DIMAX,3D,3DIMAX,4D,2D巨幕,3D巨幕，例如1111110=126表示除2D外所有版本。全部用0表示
                if (version[i] == 1) {
                    activeVersions.push(String(i));
                }
            }
            return activeVersions;
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;
            var value = _this.state.value;
            var subsidyRules = value;

            var rightDom = undefined;
            var addSubsidyRuleBtn = React.createElement(
                'button',
                { type: 'button', onClick: _this.addSubsidyRuleHandle.bind(_this) },
                '增加补贴规则'
            );

            var subsidyRulesDom = _this.getSubsidyRulesDom(subsidyRules, readOnly);
            if (readOnly) {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    subsidyRulesDom
                );
            } else {
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    React.createElement(
                        'button',
                        { type: 'button', onClick: _this.addSubsidyRuleHandle.bind(_this) },
                        '增加补贴规则'
                    ),
                    React.createElement(
                        'div',
                        null,
                        subsidyRulesDom
                    )
                );
            }

            return React.createElement(
                _commonFormGroup.Group,
                null,
                React.createElement(
                    _commonFormGroup.Left,
                    null,
                    '补贴规则'
                ),
                '：',
                rightDom
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            readOnly: false,
            form: '票补'
        },
        enumerable: true
    }]);

    return SubsidyRules;
})(_commonSuperChild2['default']);

exports['default'] = SubsidyRules;
;
module.exports = exports['default'];
/* 1-"豆瓣",2-"时光网",5-"格瓦拉",7-"QQ",8-"点评",9-"微票",10-"糯米", 11-"淘宝"。*/;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});