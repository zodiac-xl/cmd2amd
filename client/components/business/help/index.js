import React, { Component }         from 'react';

import Tabs                         from 'react-bootstrap/lib/Tabs';
import Tab                          from 'react-bootstrap/lib/Tab';
import Button                       from 'react-bootstrap/lib/Button';
import SplitButton                  from 'react-bootstrap/lib/SplitButton';
import MenuItem                     from 'react-bootstrap/lib/MenuItem';

import uniqid                       from 'uniqid';
import MyTable                      from '../../common/my-table'
import myConfirm                    from '../../common/myConfirm'
import bdAjax                       from '../../util/bdAjax'


import CategoriesModal              from './modal-categories'
import FaqsModal                    from './modal-faqs'
import ShowContentModal             from './modal-show-content'




import  '../../util/dateformat'
import  './index.less'



export default class Help extends Component {


    static defaultProps = {
        categoryType: '1',//1-产品功能，2-常见问题
        canOperate: true
    };


    state = (()=> {
        let _this = this;
        return {
            categoriesModal: {
                show: false,
                operateType: 'new',
                content: {
                    categoryId: '',
                    title: '',
                    type: 1,//1-产品功能，2-常见问题
                },
            },
            faqsModal: {
                show: false,
                operateType: 'new',
                content: {
                    categoryId: '',
                    id: '',
                    title: '',
                    url: '',
                    content: ''
                },
            },
            showContentModal: {
                show: false,
                title: '',
                content: {},
            },
            categories: [],
            faqs: [],
            activeCategoryId: null
        }
    })();


    getFaqs(newState) {
        let _this = this;
        let state = newState || _this.state;
        let activeCategoryId = state.activeCategoryId;
        if (activeCategoryId == null) {
            return;
        }
        bdAjax({
            url: `/api/faq/categories/${activeCategoryId}/faqs.json`,
            des: `获取${activeCategoryId}分类下常见问题`,
            bd: true
        }).done(function (e) {
            let state = newState || _this.state; //state已经改变
            state.faqs = e.data;
            _this.setState(state)
        });
    }

    getCategories(first) {
        let _this = this;
        let defer = $.Deferred();
        bdAjax({
            url: '/api/faq/categories.json',
            des: '获取分类列表',
            bd: true
        }).done(function (e) {
            let categories = [];
            e.data.forEach(function (item) {
                if (item.type == _this.props.categoryType) {
                    categories.push(item);
                }
            });
            let newState = _this.state;
            newState.categories = categories;
            newState.activeCategoryId = newState.activeCategoryId != null ? newState.activeCategoryId : ((categories[0] && categories[0]['id']) || null)

            if (first) {//如果是第一次 就resolve 然后获取常见问题列表
                defer.resolve(newState);
            } else {
                _this.setState(newState);
            }

        }).fail(function (e) {
            defer.reject(e);
        });
        return defer.promise();

    }

    componentDidMount() {
        let _this = this;
        let isFirst = true;

        $('body').delegate('.J_toggleCategorie>button:nth-child(1)', 'click', function (e) {
            _this.toggleCategorie($(e.target).parent().data('id'));
        })

        _this.getCategories(isFirst).done(function (newState) {
            _this.getFaqs(newState);
        });
    }


    toggleCategorie(id) {
        let newState = this.state;
        if (newState.activeCategoryId == id) {
            return;
        }
        newState.activeCategoryId = id;
        this.getFaqs(newState);
    }

    //操作分类
    operateCategories(operateType, categoryId, title) {
        let _this = this;
        let categoryType = _this.props.categoryType;
        if (operateType == 'new') {
            categoryId = '';
            title = '';
        } else if (operateType == 'delete') {
            let api = {
                url: `/api/admin/faq/categories/${categoryId}.json`,
                type: 'DELETE',
                des: '删除分类',
            };
            myConfirm(
                <span>改操作会删除该标题及其所有内容。<br/>确认删除<span className='text-danger'>{title}</span>吗？</span>
                , '删除', api
            ).done(function () {
                    _this.getCategories();
                });
            return;
        }


        _this.setState({
            categoriesModal: {
                show: true,
                operateType: operateType,
                content: {
                    categoryId: categoryId || '',
                    title: title || '',
                    type: categoryType,//1-产品功能，2-常见问题
                },
            }
        })

    }

    freshCategories() {
        this.getCategories();
    }

    toggleCategoriesModal(toggle) {
        this.setState({categoriesModal: {show: toggle}})
    }


    //操作常见问题
    operateFaqs(operateType, faqData) {
        let _this = this;
        let categoryType = _this.props.categoryType;

        if (operateType == 'delete') {
            let api = {
                url: `/api/admin/faq/${faqData.id}.json`,
                type: 'DELETE',
                des: '删除问题',
            };
            myConfirm(
                <span>确认删除<span className='text-danger'>{faqData.title}</span>吗？</span>
                , '删除', api
            ).done(function () {
                    _this.getFaqs();
                });
            return;
        }

        _this.setState({
            faqsModal: {
                show: true,
                operateType: operateType,
                content: faqData || {
                    id: '',
                    categoryId: _this.state.activeCategoryId,
                    title: '',
                    url: '',
                    content: ''
                },
            }
        })
    }

    freshFaqs() {
        this.getFaqs();
    }

    toggleFaqsModal(toggle) {
        this.setState({faqsModal: {show: toggle}})
    }


    toggleShowContentModal(data) {
        let showContentModal = this.state.showContentModal;
        $.extend(showContentModal, data)
        this.setState({showContentModal: showContentModal})
    }


    render() {
        let _this = this;
        let canOperate = _this.props.canOperate;
        let tabsDom = [];

        _this.state.categories.forEach(function (item, index) {
            let tab;
            if (canOperate) {
                tab =
                    <SplitButton bsStyle={_this.state.activeCategoryId != item.id?'default':'danger'} title={item.title}
                                 key={index}
                                 data-id={item.id}
                                 className={_this.state.activeCategoryId == item.id?'active J_toggleCategorie':'J_toggleCategorie'}
                                 id={`split-button-basic-${index}`}
                        >
                        <MenuItem
                            onClick={_this.operateCategories.bind(_this,'edit',item.id,item.title)}>编辑</MenuItem>
                        <MenuItem
                            onClick={_this.operateCategories.bind(_this,'delete',item.id,item.title)}>删除</MenuItem>
                    </SplitButton>
            } else {
                tab = <span className={_this.state.activeCategoryId == item.id?'active dropdown':'dropdown'} key={index}><Button
                    bsStyle={_this.state.activeCategoryId != item.id?'default':'danger'}
                    onClick={_this.toggleCategorie.bind(_this,item.id)}
                    >{item.title}</Button></span>;
            }
            tabsDom.push(
                tab
            );
        });
        if (canOperate) {
            tabsDom.push(
                <Button key={uniqid()} bsStyle="danger" style={{marginLeft:'20px'}}
                        onClick={_this.operateCategories.bind(_this,'new')}>新建</Button>
            );
        }


        let tableData = {
            ths: {
                title: function () {
                    if (canOperate) {
                        return <div className='wrap-th-create'>
                            <Button bsStyle="danger" onClick={_this.operateFaqs.bind(_this,'new',null)}>新建</Button>
                            <span>标题</span>
                        </div>;
                    } else {
                        return <span>
                            标题
                        </span>;
                    }

                },
                created: function () {
                    return function (style, thKey) {
                        $.extend(style, {
                            width: '8em'
                        })
                        return <th style={style} key={thKey}>发布日期</th>
                    }
                },
                operate: function () {
                    return function (style, thKey) {
                        $.extend(style, {
                            width: '12em'
                        })
                        return <th style={style} key={thKey}>操作</th>
                    }
                }
            },
            trs: []
        };
        _this.state.faqs.forEach(function (item) {

            let content = item.content;
            //a.若该项配置为“链接地址”，则点击文案：在新页面打开该项的链接地址。
            //b.若该项配置为“内容”，则点击文案：弹窗展示内容。
            let titleHandle = ()=> {
                if (item.content) {
                    let content = [];
                    item.content.split(/[\n\r]/gim).forEach(function (fra, i) {
                        content.push(<span key={`text-${i}`}>{fra}</span>);
                        content.push(<br key={`br-${i}`}/>);
                    })
                    _this.toggleShowContentModal({
                        show: true,
                        content: content,
                        title: item.title
                    });
                } else if (item.url) {
                    window.open(item.url)
                }
            };

            let tr = {
                title: function () {
                    return function (style,rowSpan,tdKey) {
                        let mystyle = $.extend(style,{
                            'textAlign':'left'
                        });
                        return  <td style={mystyle} rowSpan={rowSpan} key={tdKey}><a onClick={titleHandle}>{item.title}</a></td>;
                    }

                },
                created: new Date(item.created).Format('yyyy-MM-dd'),
                operate: function () {
                    return <div>
                        <Button onClick={_this.operateFaqs.bind(_this,'edit',item)}>编辑</Button>
                        &nbsp;&nbsp;
                        <Button onClick={_this.operateFaqs.bind(_this,'delete',item)}>删除</Button>
                    </div>;
                }
            };
            if (!canOperate) {
                delete tr.operate;
            }
            tableData.trs.push(tr);
        })
        if (!canOperate) {
            delete tableData.ths.operate;
        }

        return (
            <div className='help-page'>
                <div className='wrap-nav'>{tabsDom}</div>

                <br/>
                <MyTable data={tableData}/>


                <CategoriesModal {..._this.state.categoriesModal} hide={_this.toggleCategoriesModal.bind(_this,false)}
                                                                  freshParent={_this.freshCategories.bind(_this)}/>
                <FaqsModal {..._this.state.faqsModal} hide={_this.toggleFaqsModal.bind(_this,false)}
                                                      freshParent={_this.freshFaqs.bind(_this)}/>

                <ShowContentModal {..._this.state.showContentModal}
                    hide={_this.toggleShowContentModal.bind(_this,{show:false})}/>
            </div>
        )
    }
}
