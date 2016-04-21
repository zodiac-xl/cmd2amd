'use strict';

define(["/amd/node_modules/react-autosuggest/dist/Autosuggest.js","css!/amd/client/components/common/react-autosuggest.css","/amd/node_modules/uniqid/index.js","/amd/node_modules/react-simple-radio-group/index.js","/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js","/amd/client/components/common/checkbox-group.js","/amd/client/components/util/bdAjax.js","/amd/client/components/business/negotiation/price-plans/fragments/movie-groups/priceInfos.js"], function (ref_1,ref_2,ref_3,ref_4,ref_5,ref_6,ref_7,ref_8,ref_9,ref_10) {

    var cmd2amdModules = {"react":{"external":"React","index":null,"path":null},"react-autosuggest":{"index":0,"path":"node_modules/react-autosuggest/dist/Autosuggest.js"},"../../../../../common/react-autosuggest.less":{"index":1,"path":"client/components/common/react-autosuggest.less"},"uniqid":{"index":2,"path":"node_modules/uniqid/index.js"},"react-simple-radio-group":{"index":3,"path":"node_modules/react-simple-radio-group/index.js"},"react-nest-link-state":{"index":4,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"../../../../../common/form-group":{"index":5,"path":"client/components/common/form-group.js"},"../../../../../common/super-child":{"index":6,"path":"client/components/common/super-child.js"},"../../../../../common/checkbox-group":{"index":7,"path":"client/components/common/checkbox-group.js"},"../../../../../util/bdAjax":{"index":8,"path":"client/components/util/bdAjax.js"},"./priceInfos":{"index":9,"path":"client/components/business/negotiation/price-plans/fragments/movie-groups/priceInfos.js"}};
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = cmd2amdLoadModule('react');

var _react2 = _interopRequireDefault(_react);

var _reactAutosuggest = cmd2amdLoadModule('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

cmd2amdLoadModule('../../../../../common/react-autosuggest.less');

var _uniqid = cmd2amdLoadModule('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _reactSimpleRadioGroup = cmd2amdLoadModule('react-simple-radio-group');

var _reactSimpleRadioGroup2 = _interopRequireDefault(_reactSimpleRadioGroup);

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

var _commonFormGroup = cmd2amdLoadModule('../../../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _commonCheckboxGroup = cmd2amdLoadModule('../../../../../common/checkbox-group');

var _commonCheckboxGroup2 = _interopRequireDefault(_commonCheckboxGroup);

var _utilBdAjax = cmd2amdLoadModule('../../../../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var _priceInfos = cmd2amdLoadModule('./priceInfos');

var _priceInfos2 = _interopRequireDefault(_priceInfos);

var MovieGroups = (function (_SuperChild) {
    _inherits(MovieGroups, _SuperChild);

    function MovieGroups() {
        _classCallCheck(this, MovieGroups);

        _get(Object.getPrototypeOf(MovieGroups.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MovieGroups, [{
        key: 'defaultMovieGroup',
        value: function defaultMovieGroup() {
            return {
                "movies": { //影片信息，全部影片则data为空json数组{"inverse":false, "data":[]}
                    "inverse": false, //是否反选
                    "data": [//影片列表
                    ]
                },
                "priceInfos": [{
                    "halls": [],
                    "purchasePrice": [//进价设置，如果不参加活动则为空json数组
                    {
                        "showType": 0, //场次类型，0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                        "type": 1, //进价类型，0-不参加 1-最低限价+N，2-协定价，3-折扣价
                        "price": '', //进价，进价类型为1时，表示N；进价类型为2时，表示协定价；进价类型为3时，表示折扣后的加价
                        "discount": '' //折扣，进价类型为3时，表示折扣；进价类型不为3时没意义
                    }],
                    "priceLimit": true, //是否限价保护
                    "specialHall": false //是否是特殊厅
                }],
                priceLimit: true //限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
            };
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var _this = this;
            var cinemaId = _this.props.cinemaId;
            var valueLink = props.valueLink || {};
            var value = valueLink.value && valueLink.value.length > 0 ? valueLink.value : [this.defaultMovieGroup()];
            var halls = _this.state && _this.state.halls || null;

            if (!halls) {
                (0, _utilBdAjax2['default'])({
                    url: '/api/hall/' + cinemaId + '/halls.json',
                    des: '获取影院' + cinemaId + '：所有影厅',
                    async: false
                }).done(function (e) {
                    halls = e.data;
                });
            }

            value.forEach(function (group, i) {
                //如果只有普通厅且影厅为空 则设置为该影院所有影厅
                if (value[i].priceInfos.length == 1 && value[i].priceInfos[0].halls.length == 0) {
                    value[i].priceInfos[0].halls = halls;
                }
            });

            //将其他全部放在最后
            var otherMovie = null;
            value.some(function (group, i) {
                if (value[i].movies.inverse) {
                    otherMovie = value.splice(i, 1);
                    value.push(otherMovie[0]);
                }
                return otherMovie;
            });

            return {
                value: value,
                halls: halls
            };
        }
    }, {
        key: 'getSpecialMovies',
        value: function getSpecialMovies(movieGroups) {
            var specialMovies = [];
            $.each(movieGroups, function (movieGroupIndex, movieGroup) {
                if (!movieGroup.movies.inverse) {
                    $.each(movieGroup.movies.data, function (movieIndex, movie) {
                        specialMovies.push(movie);
                    });
                }
            });
            return specialMovies;
        }
    }, {
        key: 'deleMovie',
        value: function deleMovie(stateArr, movieIndex, groupIndex) {
            var _this = this;
            var movieGroups = _this.state.value;
            var newState = (0, _reactNestLinkState.nestObject)(_this.state, stateArr).arrSplice(movieIndex, 1);

            if ((0, _reactNestLinkState.nestObject)(newState, stateArr).getValue().length == 0) {
                // 当删除影片后该movieGroup 的影片数组长度0   则直接删除该movieGroup
                var specialMovies = _this.getSpecialMovies(newState.value);
                newState.value.splice(groupIndex, 1);
                if (newState.value.length == 1) {
                    //变为全部
                    newState.value[newState.value.length - 1].movies.data = [];
                    newState.value[newState.value.length - 1].movies.inverse = false;
                } else {
                    //修正其他全部的反选
                    newState.value[newState.value.length - 1].movies.data = specialMovies;
                }
            }
            this.setState(newState);
        }
    }, {
        key: 'getMovieSuggestions',
        value: function getMovieSuggestions(input, callback) {
            var regex = new RegExp('^' + input, 'i');
            var _this = this;
            var query = input;
            var suggestions = undefined;
            if (_this.props.movieOptions.length > 0) {
                suggestions = _this.props.movieOptions.filter(function (suburb) {
                    return regex.test(suburb.nm);
                });
                setTimeout(function () {
                    return callback(null, suggestions);
                }, 300); // Emulate API call
            } else {
                    (0, _utilBdAjax2['default'])({
                        url: "/api/movie/suggest.json",
                        des: "获取推荐电影列表",
                        data: {
                            query: query
                        }
                    }).done(function (e) {
                        suggestions = e.data.filter(function (suburb) {
                            return regex.test(suburb.nm);
                        });
                        setTimeout(function () {
                            return callback(null, suggestions);
                        }, 300); // Emulate API call
                    });
                }
        }
    }, {
        key: 'addMovie',
        value: function addMovie(stateArr, suggestion, e) {
            var _this = this;
            var specialMovies = undefined;
            var newState = _this.state;
            var alreadyHas = false;
            var movieGroups = _this.state.value;
            var isThisOtherAll = false;

            e.preventDefault();
            var input = $(e.target).closest('.react-autosuggest').get(0).querySelector('input');
            setTimeout(function () {
                input.value = '';
            }, 300);

            specialMovies = _this.getSpecialMovies(movieGroups);
            specialMovies.some(function (movie) {
                if (movie.id == suggestion.id) {
                    alreadyHas = true;
                    return true;
                }
            });

            if (alreadyHas) {
                toastr.warning(suggestion.nm + '已经添加');
                return;
            }
            if (this.state.value[stateArr[1]].movies.inverse) {
                isThisOtherAll = true;
            }

            specialMovies.push(suggestion);
            if (movieGroups.length == 1) {
                newState = (0, _reactNestLinkState.nestObject)(this.state, stateArr).arrPush(suggestion); //为当前添加影院

                //添加其他全部
                var newMovieGroup = _this.defaultMovieGroup();
                newMovieGroup.movies.data = specialMovies;
                newMovieGroup.movies.inverse = true;
                newState.value.push(newMovieGroup);
            } else if (movieGroups.length > 1 && isThisOtherAll) {
                //已经有其他全部 应该将其他变为特殊 然后 重新添加其他全部

                //其他变为特殊
                newState.value[newState.value.length - 1].movies.inverse = false;
                newState.value[newState.value.length - 1].movies.data = [suggestion];

                // 重新添加其他全部
                var newMovieGroup = _this.defaultMovieGroup();
                newMovieGroup.movies.data = specialMovies;
                newMovieGroup.movies.inverse = true;
                newState.value.push(newMovieGroup);
            } else {
                newState = (0, _reactNestLinkState.nestObject)(this.state, stateArr).arrPush(suggestion); //为当前添加影院
                newState.value[newState.value.length - 1].movies.data = specialMovies; //修正其他
            }

            this.setState(newState);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var hallsData = _this.state.halls;
            var halls = [];
            $.each(hallsData, function (hallIndex, hallData) {
                halls.push(_react2['default'].createElement(
                    'span',
                    { key: hallIndex },
                    _react2['default'].createElement('input', { type: 'checkbox', value: hallData.id }),
                    hallData.name,
                    '  '
                ));
            });

            var movieGroupsData = _this.state.value;
            var movieGroups = [];
            $.each(movieGroupsData, function (groupIndex, group) {
                var hallsCheckBoxName = 'halls-' + (0, _uniqid2['default'])() + '-' + groupIndex;
                var activeHalls = [];
                var priceInfos = _this.state.value[groupIndex].priceInfos;
                var normalPriceInfo = undefined;
                var specialPriceInfos = [];

                priceInfos.forEach(function (item) {
                    if (item.specialHall) {
                        specialPriceInfos.push(item);
                    } else {
                        normalPriceInfo = item;
                        item.halls && item.halls.forEach(function (hall) {
                            activeHalls.push(hall.id);
                        });
                    }
                });
                if (specialPriceInfos.length == 0) {
                    activeHalls.push(-1);
                }

                var hallsCheckBoxkBoxHandleChange = function hallsCheckBoxkBoxHandleChange(groupIndex, e) {

                    var newActiveHalls = _this.refs[hallsCheckBoxName].getCheckedValues();
                    var newState = _this.state;
                    var activeId = e.target.value;
                    var targetHall = undefined;

                    if (activeId == -1) {
                        toggleAllHalls(groupIndex, e);
                        return;
                    }
                    if (!e.target.checked) {
                        //普通厅变特殊厅
                        normalPriceInfo.halls = normalPriceInfo.halls.filter(function (hall) {
                            if (hall.id != activeId) {
                                return true;
                            } else {
                                targetHall = hall;
                                return false;
                            }
                        });

                        specialPriceInfos.push({
                            halls: [targetHall],
                            purchasePrice: [//进价设置，如果不参加活动则为空json数组
                            {
                                "showType": 0, //场次类型，0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                                "type": 0, //进价类型，1-最低限价+N，2-协定价，3-折扣价 0-不参加
                                "price": '', //进价，进价类型为1时，表示N；进价类型为2时，表示协定价；进价类型为3时，表示折扣后的加价
                                "discount": '' //折扣，进价类型为3时，表示折扣；进价类型不为3时没意义
                            }],
                            priceLimit: true, //是否限价保护
                            specialHall: true //是否是特殊厅

                        });
                    } else {
                            //特殊厅变普通厅
                            specialPriceInfos.some(function (specialPriceInfo, index, arr) {
                                var hall = specialPriceInfo.halls[0];
                                if (hall.id == activeId) {
                                    targetHall = hall;
                                    specialPriceInfos.splice(index, 1);
                                }
                                return hall.id == activeId;
                            });
                            normalPriceInfo.halls.push(targetHall);
                        }
                    newState['value'][groupIndex]['priceInfos'] = [normalPriceInfo].concat(specialPriceInfos);
                    _this.setState(newState);
                };

                var toggleAllHalls = function toggleAllHalls(groupIndex, e) {
                    var newState = _this.state;
                    if (!e.target.checked) {
                        //普通厅变特殊厅
                        normalPriceInfo.halls.forEach(function (hall) {
                            specialPriceInfos.push({
                                halls: [hall],
                                purchasePrice: [//进价设置，如果不参加活动则为空json数组
                                {
                                    "showType": 0, //场次类型，0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                                    "type": 0, //进价类型，1-最低限价+N，2-协定价，3-折扣价
                                    "price": '', //进价，进价类型为1时，表示N；进价类型为2时，表示协定价；进价类型为3时，表示折扣后的加价
                                    "discount": '' //折扣，进价类型为3时，表示折扣；进价类型不为3时没意义
                                }],
                                priceLimit: true, //是否限价保护
                                specialHall: true //是否是特殊厅
                            });
                        });
                        normalPriceInfo.halls = [];
                    } else {
                        //特殊厅变普通厅
                        specialPriceInfos.forEach(function (specialPriceInfo) {
                            normalPriceInfo.halls.push(specialPriceInfo.halls[0]);
                        });
                        specialPriceInfos = [];
                    }
                    newState['value'][groupIndex]['priceInfos'] = [normalPriceInfo].concat(specialPriceInfos);

                    _this.setState(newState);
                };

                var totalRadio = _react2['default'].createElement(
                    'span',
                    { key: (0, _uniqid2['default'])() },
                    _react2['default'].createElement('input', { type: 'checkbox', value: '-1'
                    }),
                    '全部  '
                );
                var _thisGroupHalls = [totalRadio].concat(halls);

                var movieGroup = _react2['default'].createElement(
                    'div',
                    { key: groupIndex },
                    _react2['default'].createElement(
                        _commonFormGroup.Group,
                        null,
                        _react2['default'].createElement(
                            _commonFormGroup.Left,
                            null,
                            '影片'
                        ),
                        '：',
                        _react2['default'].createElement(
                            _commonFormGroup.Right,
                            null,
                            _react2['default'].createElement(
                                'div',
                                null,
                                (function () {
                                    var movieStyle = {
                                        display: 'inline-block',
                                        marginRight: 10,
                                        marginBottom: 5,
                                        border: '1px solid #4fb4e7',
                                        verticalAlign: 'top',
                                        cursor: 'pointer'
                                    };
                                    var moviesData = group.movies.data;
                                    if (movieGroupsData.length == 1) {
                                        return _react2['default'].createElement(
                                            'span',
                                            { key: (0, _uniqid2['default'])(), style: movieStyle },
                                            '全部影片'
                                        );
                                    } else if (group.movies.inverse == true) {
                                        return _react2['default'].createElement(
                                            'span',
                                            { key: (0, _uniqid2['default'])(), style: movieStyle },
                                            '其他影片'
                                        );
                                    } else {
                                        var _ret = (function () {
                                            var movies = [];

                                            $.each(moviesData, function (movieIndex, movieData) {
                                                movies.push(_react2['default'].createElement(
                                                    'span',
                                                    { style: movieStyle, key: movieIndex,
                                                        onClick: _this.deleMovie.bind(_this, ["value", groupIndex, "movies", "data"], movieIndex, groupIndex) },
                                                    _react2['default'].createElement(
                                                        'span',
                                                        null,
                                                        movieData.nm
                                                    ),
                                                    _react2['default'].createElement(
                                                        'span',
                                                        { 'aria-hidden': 'true', style: {
                                                                marginLeft: '5px',
                                                                borderLeft: '1px solid #4fb4e7'

                                                            } },
                                                        '×'
                                                    )
                                                ));
                                            });
                                            return {
                                                v: movies
                                            };
                                        })();

                                        if (typeof _ret === 'object') return _ret.v;
                                    }
                                })(),
                                _react2['default'].createElement('br', null)
                            ),
                            _react2['default'].createElement(_reactAutosuggest2['default'], { inputAttributes: { placeholder: '输入影片关键字，查找并选择需要调价的影片' },
                                suggestions: _this.getMovieSuggestions.bind(_this), suggestionRenderer: function (suggestion, input) {
                                    return _react2['default'].createElement(
                                        'span',
                                        null,
                                        _react2['default'].createElement(
                                            'strong',
                                            null,
                                            suggestion.nm.slice(0, input.length)
                                        ),
                                        suggestion.nm.slice(input.length) + ' ' + suggestion.rt
                                    );
                                },
                                suggestionValue: function (suggestion) {
                                    return suggestion.nm + ' ' + suggestion.rt;
                                },
                                onSuggestionSelected: _this.addMovie.bind(_this, ["value", groupIndex, "movies", "data"]) })
                        )
                    ),
                    _react2['default'].createElement(
                        _commonFormGroup.Group,
                        null,
                        _react2['default'].createElement(
                            _commonFormGroup.Left,
                            null,
                            '影厅'
                        ),
                        '：',
                        _react2['default'].createElement(
                            _commonFormGroup.Right,
                            null,
                            _react2['default'].createElement(
                                _commonCheckboxGroup2['default'],
                                { name: hallsCheckBoxName, ref: hallsCheckBoxName,
                                    onChange: hallsCheckBoxkBoxHandleChange.bind(_this, groupIndex),
                                    value: activeHalls },
                                _thisGroupHalls
                            ),
                            _react2['default'].createElement(
                                'p',
                                { className: 'text-muted' },
                                '若特殊影厅不参加活动或价格不同，请取消勾选'
                            )
                        )
                    ),
                    _react2['default'].createElement(_priceInfos2['default'], { valueLink: _this.nestLinkedState(['value', groupIndex, "priceInfos"], _this) }),
                    _react2['default'].createElement(
                        _commonFormGroup.Group,
                        null,
                        _react2['default'].createElement(
                            _commonFormGroup.Left,
                            null,
                            '限价保护'
                        ),
                        '：',
                        _react2['default'].createElement(
                            _commonFormGroup.Right,
                            null,
                            _react2['default'].createElement('input', { type: 'checkbox', name: (0, _uniqid2['default'])(), onChange: (function (groupIndex, e) {
                                    var newState = this.state;
                                    newState.value[groupIndex].priceLimit = e.target.checked;
                                    _this.setState(newState);
                                }).bind(_this, groupIndex), checked: _this.state.value[groupIndex].priceLimit }),
                            _react2['default'].createElement(
                                'span',
                                null,
                                '若结算价低于最低限价，则以最低限价结算'
                            ),
                            _react2['default'].createElement('br', null),
                            _react2['default'].createElement(
                                'span',
                                { className: 'text-muted' },
                                '若低于最低限价部分由影院补贴，请取消勾选'
                            )
                        )
                    )
                );
                movieGroups.push(movieGroup);
            });

            return _react2['default'].createElement(
                'div',
                null,
                movieGroups
            );
        }
    }], [{
        key: 'defaultProps',
        value: {
            valueLink: null,
            readOnly: false,
            cinemaId: null,
            movieOptions: []
        },
        enumerable: true
    }]);

    return MovieGroups;
})(_commonSuperChild2['default']);

exports['default'] = MovieGroups;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});