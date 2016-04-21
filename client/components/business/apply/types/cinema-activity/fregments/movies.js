import Autosuggest              from 'react-autosuggest';
import {nestObject}             from 'react-nest-link-state';
import '../../../../../common/react-autosuggest.less';

import {Group,Left,Right,Hr}    from '../../../../../common/form-group';
import SuperChild               from '../../../../../common/super-child';
import bdAjax                   from '../../../../../util/bdAjax';


export default class Movies extends SuperChild {

    defaultValue() {
        return {
            "inverse": false,//是否反选
            "data": [//影片列表
            ]
        }
    }

    static defaultProps = {
        valueLink: null,
        readOnly: false,
        movieOptions: []
    };


    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value || this.defaultValue();
        return {
            value: value
        }
    }

    getMovieSuggestions(input, callback) {
        const regex = new RegExp('^' + input, 'i');
        let _this = this;
        let query = input;
        let suggestions;
        if (_this.props.movieOptions.length > 0) {
            suggestions = _this.props.movieOptions.filter(suburb =>regex.test(suburb.nm));
            setTimeout(() => callback(null, suggestions), 300); // Emulate API call
        } else {
            bdAjax({
                url: "/api/movie/suggest.json",
                des: "获取推荐电影列表",
                data: {
                    query: query
                }
            }).done(function (e) {
                suggestions = e.data.filter(suburb => regex.test(suburb.nm));
                setTimeout(() => callback(null, suggestions), 300); // Emulate API call
            });
        }
    }

    addMovie(stateArr, suggestion, e) {
        let _this = this;
        let newState = _this.state;
        let alreadyHas = false;
        let movies = _this.state.value.data;

        e.preventDefault();
        let input = $(e.target).closest('.react-autosuggest').get(0).querySelector('input');

        movies.some(function (movie) {
            if (movie.id == suggestion.id) {
                alreadyHas = true;
                return true;
            }
        })

        if (alreadyHas) {
            toastr.warning(`${suggestion.nm}已经添加`);
            return;
        }


        newState = nestObject(this.state, stateArr).arrPush(suggestion);//为当前添加影院
        this.setState(newState,function(){
            input.value = ''
        });
    }

    deleMovie(stateArr, movieIndex) {
        let _this = this;
        let newState = nestObject(_this.state, stateArr).arrSplice(movieIndex, 1);
        this.setState(newState);
    }


    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;
        let value = _this.state.value;

        let rightDom;

        if (readOnly) {
            let movieNams;
            if (value.data.length > 0) {
                movieNams = value.data.map(function (single) {
                    return single.nm;
                }).join(';');
            } else {
                movieNams = '全部影片';
            }
            rightDom = <Right>
                {movieNams}
            </Right>;
        } else {

            let movieStyle = {
                display: 'inline-block',
                marginRight: 10,
                marginBottom: 5,
                border: '1px solid #4fb4e7',
                verticalAlign: 'top',
                cursor: 'pointer'
            };
            let moviesData = value.data;
            let movies = [];
            $.each(moviesData, function (movieIndex, movieData) {
                movies.push(
                    <span style={movieStyle} key={movieIndex}
                          onClick={_this.deleMovie.bind(_this,["value","data"],movieIndex)}>
                                                <span>{movieData.nm}</span>
                                                <span aria-hidden="true" style={{
                                                        marginLeft: '5px',
                                                        borderLeft: '1px solid #4fb4e7'

                                                }}>&times;</span>
                                            </span>
                )
            });
            if (movies.length == 0) {
                movies = <span style={movieStyle}>全部影片</span>;
            }

            rightDom = <Right>
                <div>
                    {movies}
                    <br/>
                </div>
                <Autosuggest inputAttributes={{placeholder:`输入影片关键字，查找并选择参加活动的影片`,style:{width:'22em'}}}
                             suggestions={_this.getMovieSuggestions.bind(_this)} suggestionRenderer={(suggestion, input)=>{
                                                              return (
                                                                     <span>
                                                                     <strong>{suggestion.nm.slice(0, input.length)}</strong>
                                                                     {`${suggestion.nm.slice(input.length)} ${suggestion.rt}`}</span>
                                                                    );
                                                            }}
                             suggestionValue={(suggestion)=>{return `${suggestion.nm} ${suggestion.rt}`}}
                             onSuggestionSelected={_this.addMovie.bind(_this,["value","data"])}/>
            </Right>;
        }

        return (
            <Group>
                <Left>
                    活动影片
                </Left>
                ：
                {rightDom}
            </Group>
        )
    }
};
