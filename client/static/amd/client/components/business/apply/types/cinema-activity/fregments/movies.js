'use strict';

define(["/amd/node_modules/react-autosuggest/dist/Autosuggest.js","/amd/node_modules/react-nest-link-state/NestLinkedStateMixin.js","css!/amd/client/components/common/react-autosuggest.css","/amd/client/components/common/form-group.js","/amd/client/components/common/super-child.js","/amd/client/components/util/bdAjax.js"], function (ref_0,ref_1,ref_2,ref_3,ref_4,ref_5) {

    var cmd2amdModules = {"react-autosuggest":{"index":0,"path":"node_modules/react-autosuggest/dist/Autosuggest.js"},"react-nest-link-state":{"index":1,"path":"node_modules/react-nest-link-state/NestLinkedStateMixin.js"},"../../../../../common/react-autosuggest.less":{"index":2,"path":"client/components/common/react-autosuggest.less"},"../../../../../common/form-group":{"index":3,"path":"client/components/common/form-group.js"},"../../../../../common/super-child":{"index":4,"path":"client/components/common/super-child.js"},"../../../../../util/bdAjax":{"index":5,"path":"client/components/util/bdAjax.js"}};
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

var _reactAutosuggest = cmd2amdLoadModule('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _reactNestLinkState = cmd2amdLoadModule('react-nest-link-state');

cmd2amdLoadModule('../../../../../common/react-autosuggest.less');

var _commonFormGroup = cmd2amdLoadModule('../../../../../common/form-group');

var _commonSuperChild = cmd2amdLoadModule('../../../../../common/super-child');

var _commonSuperChild2 = _interopRequireDefault(_commonSuperChild);

var _utilBdAjax = cmd2amdLoadModule('../../../../../util/bdAjax');

var _utilBdAjax2 = _interopRequireDefault(_utilBdAjax);

var Movies = (function (_SuperChild) {
    _inherits(Movies, _SuperChild);

    function Movies() {
        _classCallCheck(this, Movies);

        _get(Object.getPrototypeOf(Movies.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Movies, [{
        key: 'defaultValue',
        value: function defaultValue() {
            return {
                "inverse": false, //是否反选
                "data": [//影片列表
                ]
            };
        }
    }, {
        key: 'getStateByProps',
        value: function getStateByProps(props) {
            var valueLink = props.valueLink || {};
            var value = valueLink.value || this.defaultValue();
            return {
                value: value
            };
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
            var newState = _this.state;
            var alreadyHas = false;
            var movies = _this.state.value.data;

            e.preventDefault();
            var input = $(e.target).closest('.react-autosuggest').get(0).querySelector('input');

            movies.some(function (movie) {
                if (movie.id == suggestion.id) {
                    alreadyHas = true;
                    return true;
                }
            });

            if (alreadyHas) {
                toastr.warning(suggestion.nm + '已经添加');
                return;
            }

            newState = (0, _reactNestLinkState.nestObject)(this.state, stateArr).arrPush(suggestion); //为当前添加影院
            this.setState(newState, function () {
                input.value = '';
            });
        }
    }, {
        key: 'deleMovie',
        value: function deleMovie(stateArr, movieIndex) {
            var _this = this;
            var newState = (0, _reactNestLinkState.nestObject)(_this.state, stateArr).arrSplice(movieIndex, 1);
            this.setState(newState);
        }
    }, {
        key: 'renderMain',
        value: function renderMain() {
            var _this = this;
            var readOnly = _this.props.readOnly;
            var value = _this.state.value;

            var rightDom = undefined;

            if (readOnly) {
                var movieNams = undefined;
                if (value.data.length > 0) {
                    movieNams = value.data.map(function (single) {
                        return single.nm;
                    }).join(';');
                } else {
                    movieNams = '全部影片';
                }
                rightDom = React.createElement(
                    _commonFormGroup.Right,
                    null,
                    movieNams
                );
            } else {
                (function () {

                    var movieStyle = {
                        display: 'inline-block',
                        marginRight: 10,
                        marginBottom: 5,
                        border: '1px solid #4fb4e7',
                        verticalAlign: 'top',
                        cursor: 'pointer'
                    };
                    var moviesData = value.data;
                    var movies = [];
                    $.each(moviesData, function (movieIndex, movieData) {
                        movies.push(React.createElement(
                            'span',
                            { style: movieStyle, key: movieIndex,
                                onClick: _this.deleMovie.bind(_this, ["value", "data"], movieIndex) },
                            React.createElement(
                                'span',
                                null,
                                movieData.nm
                            ),
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true', style: {
                                        marginLeft: '5px',
                                        borderLeft: '1px solid #4fb4e7'

                                    } },
                                '×'
                            )
                        ));
                    });
                    if (movies.length == 0) {
                        movies = React.createElement(
                            'span',
                            { style: movieStyle },
                            '全部影片'
                        );
                    }

                    rightDom = React.createElement(
                        _commonFormGroup.Right,
                        null,
                        React.createElement(
                            'div',
                            null,
                            movies,
                            React.createElement('br', null)
                        ),
                        React.createElement(_reactAutosuggest2['default'], { inputAttributes: { placeholder: '输入影片关键字，查找并选择参加活动的影片', style: { width: '22em' } },
                            suggestions: _this.getMovieSuggestions.bind(_this), suggestionRenderer: function (suggestion, input) {
                                return React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
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
                            onSuggestionSelected: _this.addMovie.bind(_this, ["value", "data"]) })
                    );
                })();
            }

            return React.createElement(
                _commonFormGroup.Group,
                null,
                React.createElement(
                    _commonFormGroup.Left,
                    null,
                    '活动影片'
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
            movieOptions: []
        },
        enumerable: true
    }]);

    return Movies;
})(_commonSuperChild2['default']);

exports['default'] = Movies;
;
module.exports = exports['default'];;

        return module == {} ? null : !module.exports ? exports : module.exports;
    })();
    return packedModule;
});