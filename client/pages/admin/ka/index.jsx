import './less/ka.less';

import {Component} from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import Page, {page} from '../../../components/layout/page-layout';
import myConfirm from '../../../components/common/myConfirm';
import MisSearch from '../../../components/common/mis-search';
import bdAjax from '../../../components/util/bdAjax';

@page
export default class KaManagement extends Page {
    state = {
        kaList: [],
        updatedKaId: ''
    };

    componentDidMount() {
        bdAjax({
            url: '/api/admin/ka/kas.json',
            type: 'GET',
            des: '获取 KA 列表'
        }).done(
            result => this.setState({kaList: result.data || []})
        );
    }

    showAddKaModal() {
        let kaList = Object.assign(this.state.kaList);
        let ajaxOptions = {
            url: '/api/admin/ka/kas.json',
            type: 'POST',
            des: '增加 KA 和影院列表'
        };
        let onChange = (cinemaIds=[], ka) => {
            kaList.push(ka);
            ajaxOptions.data = {userId: ka.userId, cinemaIds: JSON.stringify(cinemaIds)};
        };
        myConfirm(
                <KaModalBody onChange={onChange}/>,
                '增加 KA',
                ajaxOptions, {
                    isCanSubmit: () => {
                        let {userId} = ajaxOptions.data || {};
                        if (!userId) toastr.error('KA 不能为空');
                        return userId;
                    }
                })
            .done( () => this.setState({kaList}) );
    }

    showUpdateKaModal(ka) {
        let isUpdate = true;
        let ajaxOptions = {
            url: `/api/admin/ka/${ka.userId}/cinemas.json`,
            type: 'PUT',
            des: '更新 KA 影院列表'
        };
        let onChange = (cinemaIds=[]) => {
            ajaxOptions.data = {cinemaIds: JSON.stringify(cinemaIds)};
        };
        myConfirm(
                <KaModalBody {...{onChange, isUpdate, ka}} />,
                '替换影院列表',
                ajaxOptions, {
                    isCanSubmit: () => {
                        let {cinemaIds} = ajaxOptions.data || {};
                        let canSubmit = cinemaIds && !!JSON.parse(cinemaIds).length;
                        if (!canSubmit) toastr.error('影院列表不能为空');
                        return canSubmit;
                    }
                })
            .done( () => this.setState({updatedKaId: ka.userId}) );
    }

    showDeleteKaModal(ka) {
        let ajaxOptions = {
            url: `/api/admin/ka/${ka.userId}.json`,
            type: 'DELETE',
            des: '删除 KA'
        };
        myConfirm(
                <DeleteKaModalBody ka={ka}/>,
                '删除 KA',
                ajaxOptions)
            .done( () => this.setState({
                kaList: this.state.kaList.filter(iterKa => iterKa.userId !== ka.userId)
            }) );
    }

    renderKaList() {
        let {kaList, updatedKaId} = this.state;
        return kaList.map(ka => {
            return (
                <tr key={ka.key}>
                    <td>{fmtKaName(ka)}</td>
                    <td>
                        <ShowCinemasButton ka={ka} isUpdated={ka.userId === updatedKaId} />
                        <Button className='btn-operate'
                            onClick={this.showUpdateKaModal.bind(this, ka)}>替换影院列表</Button>
                        <Button className='btn-operate'
                            onClick={this.showDeleteKaModal.bind(this, ka)}>删除</Button>
                    </td>
                </tr>
            );
        });
    }

    renderMain() {
        return (
            <div className='ka-panel'>
                <b className='btn btn-danger btn-add-ka' onClick={this.showAddKaModal.bind(this)}>增加 KA</b>
                <Table className='table-striped table-bordered'>
                    <thead><tr><th>KA</th><th>操作</th></tr></thead>
                    <tbody>{this.renderKaList()}</tbody>
                </Table>
            </div>
        );
    }
}

class KaModalBody extends Component {
    state = {
        fileName: ''
    }

    constructor(props) {
        super(props);
        this.ka = props.ka || {};
        this.cinemaIds = [];
    }

    onChangeFile(e) {
        let file = e.target.files[0];
        let reader = new FileReader();

        this.setState({fileName: file.name}, () => {
            reader.onload = event => {
                this.cinemaIds = filterCinemaIds(event.target.result);
                this.bubbleChange();
            };
            reader.readAsText(file);
        });

    }

    onChangeKa(ka) {
        this.ka = ka;
        this.bubbleChange();
    }

    bubbleChange() {
        if (this.cinemaIds && this.ka.userId) {
            this.props.onChange(this.cinemaIds, this.ka);
        }
    }

    render() {
        let {fileName} = this.state;
        let {isUpdate} = this.props;
        let misSearchProps = {
            inputClassName: 'form-control',
            placeholder: '请输入完整 mis 账号名',
            onChange: this.onChangeKa.bind(this)
        };
        return (
            <form className='form-horizontal form-ka'>
                <div className='form-group'>
                    <label className='control-label col-xs-2'>{isUpdate ? '' : 'KA'}</label>
                    <div className='col-xs-6'>
                        {isUpdate
                            ? '上传的影院列表将完全替换原影院列表'
                            : <MisSearch {...misSearchProps} />}
                    </div>
                </div>
                <div className='form-group'>
                    <label className='control-label col-xs-2'>影院</label>
                    <div className='col-xs-6'>
                        {fileName
                            ? (<span className='file-name'>{`已读取文件：${fileName}`}</span>)
                            : (<div>
                                <input type='file' className='hidden'
                                    onChange={this.onChangeFile.bind(this)} />
                                <Button className='btn-operate'
                                    onClick={e => e.target.previousSibling.click()}>上传 txt，每行写一个影院 id</Button>
                            </div>)}
                    </div>
                </div>
            </form>
        );
    }
}

class DeleteKaModalBody extends Component {
    render() {
        let {ka} = this.props;
        return (
            <div>确认删除 KA <span>{fmtKaName(ka)}</span>吗？</div>
        );
    }
}

class ShowCinemasButton extends Component {
    state = {cinemas: [], showModal: false};

    componentDidMount() {
        this.fetchCinemas();
    }

    componentWillReceiveProps(props) {
        if (props.isUpdated) this.fetchCinemas();
    }

    fetchCinemas() {
        let {ka} = this.props;

        bdAjax({
            url: `/api/admin/ka/${ka.userId}/cinemas.json`,
            type: 'GET'
        }).done(result => this.setState({cinemas: result.data || []}));
    }

    render() {
        let {ka} = this.props;
        let {cinemas, showModal} = this.state;
        let show = () => this.setState({showModal: true});
        let close = () => this.setState({showModal: false});
        return (
            <b className='btn btn-default btn-operate' onClick={show}>
                {`查看 ${cinemas.length} 家影院`}
                <CinemasModal {...{ka, cinemas, close}} show={showModal} />
            </b>
        );
    }
}

class CinemasModal extends Component {
    renderCinemas() {
        let {cinemas} = this.props;
        return cinemas.map(cinema => {
            return (
                <tr key={cinema.id}>
                    <td>{cinema.id}</td>
                    <td>{cinema.cinemaName}</td>
                    <td>{cinema.cityName}</td>
                </tr>
            );
        });
    }

    render() {
        let {ka, close, show} = this.props;
        return (
            <Modal show={show} onHide={close}>
                <Modal.Header>
                    <Button ref='closeBtn' className="close" onClick={close}>×</Button>
                    <Modal.Title>KA 管理影院</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>{`KA：${fmtKaName(ka)}`}</p>
                        <Table className='table-striped table-bordered'>
                            <thead><tr><th>影院ID</th><th>影院名</th><th>城市</th></tr></thead>
                            <tbody>{this.renderCinemas()}</tbody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

function fmtKaName(ka) {
    return `${ka.name}（${ka.key}）`;
}

function filterCinemaIds(cinemaIdsStr) {
    let cinemaIds = cinemaIdsStr.split(/\r?\n/);
    let filtered = new Set();
    cinemaIds.map(id => {
        id = Number(id);
        id && filtered.add(id);
    });
    return [...filtered];
}
