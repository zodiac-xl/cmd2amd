import './react-autosuggest.less';

import {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import _debounce from 'lodash/function/debounce';
import bdAjax from '../util/bdAjax';

export default class MisSearch extends Component {
    state = {
        value: '',
        suggestions: []
    };

    debouncedSearchMisAccounts = _debounce(this.searchMisAccounts, 500);

    searchMisAccounts(value, callback) {
        bdAjax({
            url: '/api/admin/user/login/' + value + '.json',
            type: 'GET',
            des: '搜索 MIS 账号'
        })
        .done(result => {
            callback(null, result.data || []);
            // callback(null, [{name: '严文序', key: 'yanwenxu', userId: 112312}]);
        });
    }

    onItemSelect(suggestion) {
        this.props.onChange(suggestion);
    }

    getInputAttrs() {
        let {placeholder='请输入关键字', inputClassName=''} = this.props;
        return {
            className: inputClassName,
            placeholder
        };
    }

    render() {
        return (
            <Autosuggest
                suggestions={this.debouncedSearchMisAccounts}
                onSuggestionSelected={this.onItemSelect.bind(this)}
                suggestionValue={getSuggestionValue}
                suggestionRenderer={renderSuggestion}
                inputAttributes={this.getInputAttrs()} />
        );
    }
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion, input) {
  return (
    <span>{`${suggestion.name}（${suggestion.key}）`}</span>
  );
}

