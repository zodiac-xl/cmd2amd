import '../react-autosuggest.less';
import Autosuggest                  from 'react-autosuggest';
import bdAjax                       from '../../util/bdAjax';





import React, { Component }     from 'react';

export default class SuggestCity extends Component {


    static defaultProps = {
        placeholder: '输入城市进行模糊搜索',
        style: {width:'240px'},
        url: '/api/org/searchCity.json'
    };
    state = {
        id: '',
        name: ''
    };

    getSuggest(query, response) {

        bdAjax({
            url: this.props.url,
            data: {
                orgLevel: 2,
                name: query,
            },
            des: '获取城市推荐'
        }).done(function (e) {
            response(null, e.data)
        })
    }

    onSuggestionSelected(suggestion, e) {

        let name;
        let id = null;
        if (Object.prototype.toString.apply(suggestion) == '[object String]') {
            name = suggestion;
        } else {
            name = suggestion.name;
            id = suggestion.id;
        }
        this.props.onSuggestionSelected && this.props.onSuggestionSelected(suggestion, e);
        this.setState({
            id: id,
            name: name
        })
    }

    onChange(value){
        if(this.state.name && value != this.state.name){
            this.setState({name:'',id:''});
        }


    }

    render() {
        let suggestionRenderer = (suggestion, input)=> {
            let name;
            let id = null;
            if (Object.prototype.toString.apply(suggestion) == '[object String]') {
                name = suggestion;
            } else {
                name = suggestion.name;
                id = suggestion.id;
            }
            return (
                <span><strong>{name.slice(0, input.length)}</strong>{`${name.slice(input.length)}`}</span>
            );
        };

        let suggestionValue = (suggestion)=> {
            let name;
            if (Object.prototype.toString.apply(suggestion) == '[object String]') {
                name = suggestion;
            } else {
                name = suggestion.name;
            }
            return name
        };

        return <Autosuggest inputAttributes={{placeholder:this.props.placeholder,style:this.props.style,onChange:this.onChange.bind(this)}}
                            suggestions={this.getSuggest.bind(this)} suggestionRenderer={suggestionRenderer}
                            suggestionValue={suggestionValue}
                            onSuggestionSelected={this.onSuggestionSelected.bind(this)}/>


    }
};
