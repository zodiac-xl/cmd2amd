import React                    from 'react'

import Autosuggest              from 'react-autosuggest';
import '../../../../../common/react-autosuggest.less';
import uniqid                   from 'uniqid';
import RadioGroup               from 'react-simple-radio-group';
import {nestObject}             from 'react-nest-link-state';

import {Group,Left,Right,Hr}    from '../../../../../common/form-group';
import SuperChild               from '../../../../../common/super-child';
import CheckboxGroup            from '../../../../../common/checkbox-group';
import bdAjax                   from '../../../../../util/bdAjax';


import PriceInfos               from './priceInfos';




export default class MovieGroups extends SuperChild {

    defaultMovieGroup() {
        return {
            "movies": {    //影片信息，全部影片则data为空json数组{"inverse":false, "data":[]}
                "inverse": false,    //是否反选
                "data": [    //影片列表
                ]
            },
            "priceInfos": [
                {
                    "halls": [],
                    "purchasePrice": [    //进价设置，如果不参加活动则为空json数组
                        {
                            "showType": 0,    //场次类型，0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                            "type": 1,    //进价类型，0-不参加 1-最低限价+N，2-协定价，3-折扣价
                            "price": '',    //进价，进价类型为1时，表示N；进价类型为2时，表示协定价；进价类型为3时，表示折扣后的加价
                            "discount": ''    //折扣，进价类型为3时，表示折扣；进价类型不为3时没意义
                        }
                    ],
                    "priceLimit": true,    //是否限价保护
                    "specialHall": false    //是否是特殊厅
                }
            ],
            priceLimit: true //限价保护 ui交互是以MovieGroup 为纬度  提交时手动将这里的priceLimit 传递给priceInfos里面各个调价信息的priceLimit字段
        }
    }

    static defaultProps = {
        valueLink: null,
        readOnly: false,
        cinemaId: null,
        movieOptions: []
    };


    getStateByProps(props) {
        let _this = this;
        let cinemaId = _this.props.cinemaId;
        let valueLink = props.valueLink || {};
        let value = (valueLink.value && valueLink.value.length > 0) ? valueLink.value : [this.defaultMovieGroup()];
        let halls = _this.state && _this.state.halls || null;

        if (!halls) {
            bdAjax({
                url: `/api/hall/${cinemaId}/halls.json`,
                des: `获取影院${cinemaId}：所有影厅`,
                async: false
            }).done((e)=> {
                halls = e.data;
            });
        }

        value.forEach((group, i)=> {
            //如果只有普通厅且影厅为空 则设置为该影院所有影厅
            if (value[i].priceInfos.length == 1 && value[i].priceInfos[0].halls.length == 0) {
                value[i].priceInfos[0].halls = halls;
            }
        });

        //将其他全部放在最后
        let otherMovie = null;
        value.some((group, i)=> {
            if (value[i].movies.inverse) {
                otherMovie = value.splice(i,1);
                value.push(otherMovie[0]);
            }
            return otherMovie;
        });


        return {
            value: value,
            halls: halls
        }
    }

    getSpecialMovies(movieGroups) {
        let specialMovies = [];
        $.each(movieGroups, (movieGroupIndex, movieGroup)=> {
            if (!movieGroup.movies.inverse) {
                $.each(movieGroup.movies.data, (movieIndex, movie)=> {
                    specialMovies.push(movie);
                });
            }
        });
        return specialMovies;
    }

    deleMovie(stateArr, movieIndex, groupIndex) {
        let _this = this;
        let movieGroups = _this.state.value;
        let newState = nestObject(_this.state, stateArr).arrSplice(movieIndex, 1);

        if (nestObject(newState, stateArr).getValue().length == 0) {
            // 当删除影片后该movieGroup 的影片数组长度0   则直接删除该movieGroup
            let specialMovies = _this.getSpecialMovies(newState.value);
            newState.value.splice(groupIndex, 1);
            if (newState.value.length == 1) {//变为全部
                newState.value[newState.value.length - 1].movies.data = [];
                newState.value[newState.value.length - 1].movies.inverse = false;
            } else {//修正其他全部的反选
                newState.value[newState.value.length - 1].movies.data = specialMovies;
            }
        }
        this.setState(newState);
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
        let specialMovies;
        let newState = _this.state;
        let alreadyHas = false;
        let movieGroups = _this.state.value;
        let isThisOtherAll = false;

        e.preventDefault();
        let input = $(e.target).closest('.react-autosuggest').get(0).querySelector('input');
        setTimeout(function () {
            input.value = ''
        }, 300);

        specialMovies = _this.getSpecialMovies(movieGroups);
        specialMovies.some(function (movie) {
            if (movie.id == suggestion.id) {
                alreadyHas = true;
                return true;
            }
        })

        if (alreadyHas) {
            toastr.warning(`${suggestion.nm}已经添加`);
            return;
        }
        if (this.state.value[stateArr[1]].movies.inverse) {
            isThisOtherAll = true;
        }

        specialMovies.push(suggestion);
        if (movieGroups.length == 1) {
            newState = nestObject(this.state, stateArr).arrPush(suggestion);//为当前添加影院

            //添加其他全部
            let newMovieGroup = _this.defaultMovieGroup();
            newMovieGroup.movies.data = specialMovies;
            newMovieGroup.movies.inverse = true;
            newState.value.push(newMovieGroup);
        } else if (movieGroups.length > 1 && isThisOtherAll) {//已经有其他全部 应该将其他变为特殊 然后 重新添加其他全部

            //其他变为特殊
            newState.value[newState.value.length - 1].movies.inverse = false;
            newState.value[newState.value.length - 1].movies.data = [suggestion];

            // 重新添加其他全部
            let newMovieGroup = _this.defaultMovieGroup();
            newMovieGroup.movies.data = specialMovies;
            newMovieGroup.movies.inverse = true;
            newState.value.push(newMovieGroup);
        } else {
            newState = nestObject(this.state, stateArr).arrPush(suggestion);//为当前添加影院
            newState.value[newState.value.length - 1].movies.data = specialMovies;//修正其他
        }

        this.setState(newState);
    }


    renderMain() {
        let _this = this;
        let hallsData = _this.state.halls;
        let halls = [];
        $.each(hallsData, (hallIndex, hallData)=> {
            halls.push(
                <span key={hallIndex}><input type="checkbox" value={hallData.id}/>{hallData.name}&nbsp;&nbsp;</span>
            )
        });

        let movieGroupsData = _this.state.value;
        let movieGroups = [];
        $.each(movieGroupsData, function (groupIndex, group) {
            let hallsCheckBoxName = `halls-${uniqid()}-${groupIndex}`;
            let activeHalls = [];
            let priceInfos = _this.state.value[groupIndex].priceInfos;
            let normalPriceInfo;
            let specialPriceInfos = [];

            priceInfos.forEach(function (item) {
                if (item.specialHall) {
                    specialPriceInfos.push(item);
                } else {
                    normalPriceInfo = item;
                    item.halls && item.halls.forEach(function (hall) {
                        activeHalls.push(hall.id);
                    })
                }
            })
            if (specialPriceInfos.length == 0) {
                activeHalls.push(-1);
            }

            let hallsCheckBoxkBoxHandleChange = (groupIndex, e)=> {

                let newActiveHalls = _this.refs[hallsCheckBoxName].getCheckedValues();
                let newState = _this.state;
                let activeId = e.target.value;
                let targetHall;

                if (activeId == -1) {
                    toggleAllHalls(groupIndex, e);
                    return;
                }
                if (!e.target.checked) {//普通厅变特殊厅
                    normalPriceInfo.halls = normalPriceInfo.halls.filter(function (hall) {
                        if (hall.id != activeId) {
                            return true;
                        } else {
                            targetHall = hall;
                            return false;
                        }
                    })

                    specialPriceInfos.push({
                        halls: [targetHall],
                        purchasePrice: [    //进价设置，如果不参加活动则为空json数组
                            {
                                "showType": 0,    //场次类型，0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                                "type": 0,    //进价类型，1-最低限价+N，2-协定价，3-折扣价 0-不参加
                                "price": '',    //进价，进价类型为1时，表示N；进价类型为2时，表示协定价；进价类型为3时，表示折扣后的加价
                                "discount": ''    //折扣，进价类型为3时，表示折扣；进价类型不为3时没意义
                            }
                        ],
                        priceLimit: true,    //是否限价保护
                        specialHall: true    //是否是特殊厅

                    })
                } else {//特殊厅变普通厅
                    specialPriceInfos.some(function (specialPriceInfo, index, arr) {
                        let hall = specialPriceInfo.halls[0];
                        if (hall.id == activeId) {
                            targetHall = hall;
                            specialPriceInfos.splice(index, 1);
                        }
                        return hall.id == activeId;
                    })
                    normalPriceInfo.halls.push(targetHall);
                }
                newState['value'][groupIndex]['priceInfos'] = [normalPriceInfo].concat(specialPriceInfos);
                _this.setState(newState);
            };


            let toggleAllHalls = function (groupIndex, e) {
                let newState = _this.state;
                if (!e.target.checked) {//普通厅变特殊厅
                    normalPriceInfo.halls.forEach(function (hall) {
                        specialPriceInfos.push({
                            halls: [hall],
                            purchasePrice: [    //进价设置，如果不参加活动则为空json数组
                                {
                                    "showType": 0,    //场次类型，0-全部"，1-2D，2-IMAX2D，3-3D，4-IMAX3D，5-4D，6-巨幕2D，7-巨幕3D
                                    "type": 0,    //进价类型，1-最低限价+N，2-协定价，3-折扣价
                                    "price": '',    //进价，进价类型为1时，表示N；进价类型为2时，表示协定价；进价类型为3时，表示折扣后的加价
                                    "discount": ''    //折扣，进价类型为3时，表示折扣；进价类型不为3时没意义
                                }
                            ],
                            priceLimit: true,    //是否限价保护
                            specialHall: true    //是否是特殊厅
                        })
                    })
                    normalPriceInfo.halls = [];
                } else {//特殊厅变普通厅
                    specialPriceInfos.forEach(function (specialPriceInfo) {
                        normalPriceInfo.halls.push(specialPriceInfo.halls[0]);
                    })
                    specialPriceInfos = [];
                }
                newState['value'][groupIndex]['priceInfos'] = [normalPriceInfo].concat(specialPriceInfos);

                _this.setState(newState);
            }


            let totalRadio = <span key={uniqid()}><input type="checkbox" value='-1'
                />全部&nbsp;&nbsp;</span>;
            let _thisGroupHalls = [totalRadio].concat(halls);


            let movieGroup = <div key={groupIndex}>
                <Group>
                    <Left>影片</Left>：
                    <Right>
                        <div>
                            {(()=> {
                                let movieStyle = {
                                    display: 'inline-block',
                                    marginRight: 10,
                                    marginBottom: 5,
                                    border: '1px solid #4fb4e7',
                                    verticalAlign: 'top',
                                    cursor: 'pointer'
                                };
                                let moviesData = group.movies.data;
                                if (movieGroupsData.length == 1) {
                                    return <span key={uniqid()} style={movieStyle}>全部影片</span>
                                } else if (group.movies.inverse == true) {
                                    return <span key={uniqid()} style={movieStyle}>其他影片</span>
                                } else {
                                    let movies = [];

                                    $.each(moviesData, function (movieIndex, movieData) {
                                        movies.push(
                                            <span style={movieStyle} key={movieIndex}
                                                  onClick={_this.deleMovie.bind(_this,["value",groupIndex,"movies","data"],movieIndex,groupIndex)}>
                                                <span>{movieData.nm}</span>
                                                <span aria-hidden="true" style={{
                                                        marginLeft: '5px',
                                                        borderLeft: '1px solid #4fb4e7'

                                                }}>&times;</span>
                                            </span>
                                        )
                                    });
                                    return movies;
                                }

                            })()}
                            <br/>
                        </div>
                        <Autosuggest inputAttributes={{placeholder:`输入影片关键字，查找并选择需要调价的影片`}}
                                     suggestions={_this.getMovieSuggestions.bind(_this)} suggestionRenderer={(suggestion, input)=>{
                                                              return (
                                                                     <span>
                                                                     <strong>{suggestion.nm.slice(0, input.length)}</strong>
                                                                     {`${suggestion.nm.slice(input.length)} ${suggestion.rt}`}</span>
                                                                    );
                                                            }}
                                     suggestionValue={(suggestion)=>{return `${suggestion.nm} ${suggestion.rt}`}}
                                     onSuggestionSelected={_this.addMovie.bind(_this,["value",groupIndex,"movies","data"])}/>

                    </Right>
                </Group>
                <Group>
                    <Left>影厅</Left>：
                    <Right>
                        <CheckboxGroup name={hallsCheckBoxName} ref={hallsCheckBoxName}
                                       onChange={hallsCheckBoxkBoxHandleChange.bind(_this,groupIndex)}
                                       value={activeHalls}>
                            {_thisGroupHalls}
                        </CheckboxGroup>

                        <p className='text-muted'>若特殊影厅不参加活动或价格不同，请取消勾选</p>
                    </Right>
                </Group>
                <PriceInfos valueLink={_this.nestLinkedState(['value', groupIndex, "priceInfos"],_this)}/>
                <Group>
                    <Left>限价保护</Left>：
                    <Right>
                        <input type='checkbox' name={uniqid()} onChange={function(groupIndex,e){
                                            let newState = this.state;
                                            newState.value[groupIndex].priceLimit = e.target.checked;
                                            _this.setState(newState);
                                       }.bind(_this,groupIndex)} checked={_this.state.value[groupIndex].priceLimit}/>
                        <span>若结算价低于最低限价，则以最低限价结算</span>
                        <br/>
                        <span className='text-muted'>若低于最低限价部分由影院补贴，请取消勾选</span>
                    </Right>
                </Group>
            </div>;
            movieGroups.push(movieGroup);
        });


        return (
            <div>
                {movieGroups}
            </div>
        )
    }
};
