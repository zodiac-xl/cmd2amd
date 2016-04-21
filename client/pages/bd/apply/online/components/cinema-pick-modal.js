import React, { Component }     from 'react';

import Modal                    from 'react-bootstrap/lib/Modal';
import Button                   from 'react-bootstrap/lib/Button';
import Input                    from 'react-bootstrap/lib/Input';
import Table                    from '../../../../../components/common/my-table';
import Ajax                     from '../../../../../components/util/bdAjax';
import classNames               from 'classnames';
import modalEnterHelper         from '../dom/modal-enter-helper';

const SEARCH_BUTTON_TEXT = {
    SEARCH: '搜索',
    SEARCHING: '搜索中...'
}

const CINEMA_TABLE_THS = ['选择', '影院名称', '城市', '地址'];

class CinemaPickModal extends Component {
    state = {
        tableData: {
            ths: CINEMA_TABLE_THS,
            trs: []
        },
        searchButtonText: SEARCH_BUTTON_TEXT.SEARCH,
        searchButtonDisabled: false,
        searchUrl: "/api/online/apply/bd/" + window.User.misId + "/applies.json",
        searchInputText: '',
        cinemaMap: {},
        cinemaData: [],
        showCannotApply: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tableData: {
                ths: CINEMA_TABLE_THS,
                trs: []
            },
            searchInputText: '',
            cinemaMap: {},
            cinemaData: [],
            showCannotApply: false
        });
    }

    componentDidMount() {
    }

    onModalHide() {
        console.log('on Modal HIde');
    }

    selectedCinemaChanged(event) {
        let id, checked;
        id = event.target.id;
        checked = event.target.checked;
        if(this.state.cinemaMap[id]) {
            this.state.cinemaMap[id].checked = checked;
        }
    }

    onSearchInputKeyUp(evt) {
        if(evt.keyCode === 13) {
            this.searchCinemas();
        }
    }

    searchCinemas() {
        if(this.state.searchInputText.length === 0) {
            toastr.warning('影院名不能为空！');
            return;
        }
        this.setState({
            searchButtonText: SEARCH_BUTTON_TEXT.SEARCHING,
            searchButtonDisabled: true
        });
        this.searchByCinema(this.state.searchInputText);
    }

    searchByCinema(name) {
        Ajax({
            url: '/api/cinema/search.json?query=' + name
        }).then((data) => {
            this.state.cinemaData = data.data;
            this.updateTable(data.data, false);
        }).fail(() => {

        }).always(() => {
            this.setState({
                searchButtonText: SEARCH_BUTTON_TEXT.SEARCH,
                searchButtonDisabled: false
            });
        });
    }

    updateTable(cinemas, showCannotApply) {
        let trs = this.makeTrs(cinemas, showCannotApply);
        this.setState({
            tableData: {
                ths: CINEMA_TABLE_THS,
                trs: trs
            }
        });
    }

    makeTrs(cinemas, showCannotApply) {
        this.state.cinemaMap = {};
        let canApplyTrs = [], cannotApplyTrs = [];
        cinemas.forEach(info => {
            let checkboxId = `cinema-checkbox-${info.id}`;
            this.state.cinemaMap[checkboxId] = info; 
            let checkbox = (<input type='checkbox' id={checkboxId} onChange={this.selectedCinemaChanged.bind(this)}/>);
            if(info.canApply) {
                canApplyTrs.push([checkbox, info.name, info.city, info.address]);
            } else {
                cannotApplyTrs.push([info.stateDesc, info.name, info.city, info.address]);
            }
        });
        let trs = [].concat(canApplyTrs);
        if(cannotApplyTrs.length !== -1) {
            trs.push([() => {
                return (style, rowSpan, tdKey) => {
                    let text, className;
                    text = showCannotApply ? '收起': '展示';
                    className = classNames('glyphicon', {
                        'glyphicon-chevron-down': !showCannotApply,
                        'glyphicon-chevron-up': showCannotApply
                    });
                    return (<td style={style} rowSpan={rowSpan} key={tdKey} colSpan={CINEMA_TABLE_THS.length}>
                                <a onClick={this.onShowCannotApplyClick.bind(this)}>
                                    <h5><span>{text}</span>全部影院（不可勾选）<i className={className}></i></h5>
                                </a>
                            </td>);
                }
            }]);
            if(showCannotApply) {
               trs = trs.concat(cannotApplyTrs);
            }
        }
        return trs;
    }

    onShowCannotApplyClick() {
        this.updateTable(this.state.cinemaData, !this.state.showCannotApply);
        this.state.showCannotApply = !this.state.showCannotApply;
    }

    onSearchTextChange() {
        this.setState({searchInputText: this.refs.searchInput.getValue().trim()});
    }

    onCinemasSelectedConfirm()  {
        if(this.props.onCinemasSelected) {
            let selectedCinemas = [];
            for(let cinemaId in this.state.cinemaMap) {
                if(this.state.cinemaMap.hasOwnProperty(cinemaId) && this.state.cinemaMap[cinemaId].checked) {
                   selectedCinemas.push(this.state.cinemaMap[cinemaId]);
                }
            }
            if(selectedCinemas.length === 0) {
                this.cinemasSelectedConfirmWarn();
            } else {
                this.reset();
                this.props.onCinemasSelected(selectedCinemas);
            }
        } else {
           this.cinemasSelectedConfirmWarn();            
        }    
    }

    reset() {
        this.state.searchInputText = '';
        this.state.cinemaMap = {};
        this.state.tableData.trs = [];
    }

    onCinemasAddConfirm() {
        cosole.log('onCinemasAddConfirm');
    }

    cinemasSelectedConfirmWarn() {
        toastr.warning("您没有选择影院，无法完成申请！");
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.onModalHide.bind(this)}
                onEnter={modalEnterHelper}
                className="bd-home">
                <Modal.Header>
                    <Button className="close" onClick={this.props.closeCinemaModal}>
                        <span aria-hidden="true">&times;</span>
                    </Button>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>选择影院</h4>
                    <div className="form-inline">
                        <Input type="text" ref="searchInput" onChange={this.onSearchTextChange.bind(this)} value={this.state.searchInputText}
                            onKeyUp={this.onSearchInputKeyUp.bind(this)} />
                        <Button bsStyle="primary" disabled={this.state.searchButtonDisabled} style={{'marginLeft': '5px'}}
                             onClick={this.searchCinemas.bind(this)}>{this.state.searchButtonText}</Button>
                    </div>
                    <br />
                    <Table data={this.state.tableData} />
                </Modal.Body>
                <Modal.Footer>
                    <span className="inform-message">提示：如果没有找到您需要的影院，请先缩小搜索的关键词（如：搜索"CGV"，而不是 "CGV奥体店"）。若确认影院尚未入库，请在邮件中注明影院8位编码，联系城市品控（
                    <span className="red-tip">qc.avatar@meituan.com</span>
                    ）新建影院。
                    </span>
                    <Button bsStyle="info" onClick={this.onCinemasSelectedConfirm.bind(this)}>{this.props.operateText}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CinemaPickModal;
