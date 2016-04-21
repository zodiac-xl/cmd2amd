import React                from 'react';
import ReactDOM             from 'react-dom';

import {Group,Left,Right}   from '../../common/form-group';
import SimpleModal          from '../../common/simple-modal';


export default class CategoriesModal extends SimpleModal {


    static defaultProps = {
        hide: function () {
        },
        freshParent: function () {

        },
        show: false,
        operateType: 'new',
        content: {
            categoryId: '',
            title: '',
            type: 1,//1-产品功能，2-常见问题
        },
        fieldLabelMap: {
            categoryId: {
                label: '分类id',
                hide: true
            },
            title: {
                label: '标题'
            },
            type: {
                label: '类型',
                hide: true

            }
        }
    };

    getStateByProps(props) {
        let titleMap = {
            new: '新建',
            edit: '修改',
            delete: '删除'
        };
        return {
            title: titleMap[props.operateType],
            isLoading: false,
            content: props.content
        }
    }


    submit() {

        let _this = this;
        let des = `${_this.state.title}分类`;
        let apiMap = {
            new: {
                url: '/api/admin/faq/categories.json',
                type: 'post',
                des: des,
                data: _this.state.content
            },
            edit: {
                url: `/api/admin/faq/categories/${_this.state.content.categoryId}.json`,
                type: 'PUT',
                des: des,
                data: _this.state.content
            },
            delete: {
                url: `/api/admin/faq/categories/${_this.state.content.categoryId}.json`,
                type: 'DELETE',
                des: des,
            }
        }
        if (_this.props.operateType != 'delete' && !_this.validate()) {
            return;
        }
        this.onSubmit(apiMap[_this.props.operateType]).done(function () {
            _this.props.freshParent && _this.props.freshParent();
        });
    }


}
