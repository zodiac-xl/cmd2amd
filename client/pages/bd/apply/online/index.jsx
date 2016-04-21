import Table                    from '../../../../components/common/my-table';
import Page, {page}             from '../../../../components/layout/page-layout';
import Ajax                     from '../../../../components/util/bdAjax';
import CinemaPickModal          from './components/cinema-pick-modal';
import ApplyModal               from './components/apply-modal';
import ApplyViewModal           from './components/apply-view-modal';
import PaginationAdvanced       from '../../../../components/common/pagination-advanced'
import Button                   from 'react-bootstrap/lib/Button';
import URL                      from '../../../../components/util/url';

const APPLY_TABLE_THS = ['上线申请ID', '最后编辑时间', '状态', '关联影院(数)', '操作'];

const CINEMA_MODAL_TITLE = {
    NEW_APPLY: '新建影院上线',
    ADD: '添加影院'
};

const CINEMA_MODAL_OPERATE_TEXT = {
    NEW_APPLY: '确认选择影院',
    ADD: '确认添加影院'
};

const CINEMA_MODAL_STATE = {
    NEW_APPLY: 0,
    ADD: 1
};

@page
export default
class Online extends Page {

    state = {
        applies: {
            ths: APPLY_TABLE_THS,
            trs: []
        },
        appliesUrl: "/api/online/apply/bd/" + window.User.misId + "/applies.json",
        showCinemaModalFlag: false,
        showApplyModalFlag: false,
        showApplyViewModalFlag: false,
        applyId: 0,
        applyAudit: {},
        selectedCinemas: [],
        cinemaModalTitle: CINEMA_MODAL_TITLE.NEW_APPLY,
        cinemaModalOperateText: CINEMA_MODAL_OPERATE_TEXT.NEW_APPLY,
        cinemaModalState: CINEMA_MODAL_STATE.NEW_APPLY,
        applyInEditing: true,
        query:{}
    }


    queryHandler(query) {
        let _this = this;

        query = $.extend(_this.state.query, query || {});


        Ajax({
            url: this.state.appliesUrl,
            type: 'GET',
            data: query || {},
            des: '获取上线申请列表'
        }).then((applies) => {
            let totalSize = applies.totalSize;
            let trs = [];
            applies.data.forEach(apply => {
                let tds = [];
                tds.push(apply.id);
                tds.push(apply.modified);
                if (apply.state === 2) {
                    tds.push(`被驳回:${apply.stateDesc}`);
                } else {
                    tds.push(apply.stateDesc);
                }
                tds.push(apply.cinemaDesc);

                if (apply.state === 3 || apply.state === 4) {
                    let click = this.viewApply.bind(this, apply.id, apply);
                    tds.push((<Button onClick={click}>查看上线资料</Button>));
                } else {
                    let click = this.editApply.bind(this, apply.id, apply);
                    tds.push((<Button onClick={click}>编辑</Button>));
                }

                trs.push(tds);
            });
            this.setState({
                applies: {
                    ths: APPLY_TABLE_THS,
                    trs: trs
                },
                query:query
            });
            this.refs.paginationAdvanced.onQuery(query, totalSize);
        })
    }

    normalQueryHandler() {
        let _this = this;
        _this.queryHandler({
            city: _this.refs[`city`].value,
            cinema: _this.refs[`cinema`].value,
            state: _this.refs[`status`].value,
            offset: 0
        });
    }


    editApply(applyId) {
        this.setState({
            showApplyModalFlag: true,
            applyId: applyId,
            selectedCinemas: [],
            applyInEditing: true
        });
    }

    viewApply(applyId, applyAudit) {
        this.setState({
            showApplyViewModalFlag: true,
            applyId: applyId,
            applyAudit: applyAudit,
            selectedCinemas: []
        });
    }

    componentDidMount() {
        const cinema = JSON.parse(URL.getUrlArg("cinema", location.search)||null);
        if (location.search && cinema) {
            if (!cinema[0].canApply) {
                toastr.warning('该影院已创建上线申请，请联系品控组（avatar-sup@meituan.com）处理。');
            } else {
                this.onCinemasSelected(cinema);
            }
        }
    }

    newApply() {
        this.setState({
            showCinemaModalFlag: true,
            cinemaModalTitle: CINEMA_MODAL_TITLE.NEW_APPLY,
            cinemaModalOperateText: CINEMA_MODAL_OPERATE_TEXT.NEW_APPLY,
            cinemaModalState: CINEMA_MODAL_STATE.NEW_APPLY
        });
    }

    addCinema() {
        this.setState({
            showCinemaModalFlag: true,
            showApplyModalFlag: false,
            cinemaModalTitle: CINEMA_MODAL_TITLE.ADD,
            cinemaModalOperateText: CINEMA_MODAL_OPERATE_TEXT.ADD,
            cinemaModalState: CINEMA_MODAL_STATE.ADD
        });
    }

    onCinemasSelected(cinemas) {
        if (this.state.cinemaModalState === CINEMA_MODAL_STATE.ADD) {
            cinemas = this.state.selectedCinemas.concat(cinemas);
        }

        let newState = {
            showApplyModalFlag: true,
            showCinemaModalFlag: false,
            selectedCinemas: cinemas,
            applyInEditing: false
        };
        //新建申请需要重置applyId
        if (this.state.cinemaModalTitle === CINEMA_MODAL_TITLE.NEW_APPLY) {
            newState.applyId = 0;
            newState.applyInEditing = true;
        }
        this.setState(newState);
    }

    deleteSelectedCinema(cinemaId) {
        let cinemas = this.state.selectedCinemas.filter(cinema => cinema.id !== cinemaId);
        this.setState.selectedCinemas = cinemas;
    }

    closeApplyModal(refresh) {
        this.setState({
            showApplyModalFlag: false
        });

        if (refresh) {
            this.queryHandler();
        }
    }

    closeApplyViewModal() {
        this.setState({
            showApplyViewModalFlag: false
        });
    }

    closeCinemaPickModal() {
        this.setState({
            showCinemaModalFlag: false
        });
    }

    renderMain() {
        let _this = this;
        return (
            <div className="bd-home">
                <Button bsStyle="success" id="newApplyOnline"
                        onClick={this.newApply.bind(this)}>申请上线</Button>

                <div>
                    <span>城市: </span><input type="text" ref={`city`}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>影院ID/影院名: </span><input type="text" ref={`cinema`}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>状态：
                        <select defaultValue={-1} ref='status' onChange={function(e){
                                 _this.queryHandler({
                                    state:e.target.value,
                                    offset: 0
                                 });
                        }.bind(_this)}>
                            <option value="-1">全部</option>
                            <option value="0">草稿</option>
                            <option value="1">等待审核</option>
                            <option value="2">被驳回</option>
                            <option value="3">审核通过，上线处理中</option>
                            <option value="4">上线处理完成</option>
                        </select>
                    </span>
                    &nbsp;&nbsp;
                    <Button
                        onClick={_this.normalQueryHandler.bind(_this)}>查询</Button>
                </div>
                <br/>
                <Table data={this.state.applies}/>

                <div className="pull-right">
                    <PaginationAdvanced onQueryHandler={_this.queryHandler.bind(_this)} ref='paginationAdvanced'/>
                </div>

                <CinemaPickModal show={this.state.showCinemaModalFlag}
                                 onCinemasSelected={this.onCinemasSelected.bind(this)}
                                 title={this.state.cinemaModalTitle}
                                 operateText={this.state.cinemaModalOperateText}
                                 closeCinemaModal={this.closeCinemaPickModal.bind(this)}/>
                <ApplyModal show={this.state.showApplyModalFlag}
                            applyId={this.state.applyId}
                            cinemas={this.state.selectedCinemas}
                            deleteCinema={this.deleteSelectedCinema.bind(this)}
                            closeApplyModal={this.closeApplyModal.bind(this)}
                            addCinema={this.addCinema.bind(this)}
                            inEditing={this.state.applyInEditing}/>
                <ApplyViewModal show={this.state.showApplyViewModalFlag}
                                applyId={this.state.applyId}
                                applyAudit={this.state.applyAudit}
                                closeApplyViewModal={this.closeApplyViewModal.bind(this)}/>
            </div>
        );
    }
}
