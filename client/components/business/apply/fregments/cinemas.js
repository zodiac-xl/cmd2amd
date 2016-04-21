import Button                   from 'react-bootstrap/lib/Button';

import {Group,Left,Right,Hr}    from '../../../common/form-group';
import SuperChild               from '../../../common/super-child';
import MyTable                  from '../../../common/my-table';
import bdAjax                   from '../../../util/bdAjax';


export default class Cinemas extends SuperChild {

    defaultValue() {
        return [];
    }

    static defaultProps = {
        valueLink: null,
        readOnly: false
    };

    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value || this.defaultValue();
        return {
            value: value
        }
    }

    validate() {
        let _this = this;
        let validate = true;
        if (_this.state.value.length == 0) {
            toastr.warning('请添加影院');
            _this.refs.idsfile.focus();
            validate = false;
        }
        return validate;
    }

    deleteCinema(index) {
        let newState = this.state;
        newState.value.splice(index, 1);
        this.setState(newState);
    }

    triggerFile() {
        var event = new Event('click', {bubbles: false});
        this.refs.uploadFile.dispatchEvent(event);
    }

    fileChange(e) {
        let _this = this;
        //上传文件 追加影院
        let reader = new FileReader(),
        inputFile = $(e.target)[0];

        reader.onload = function (e) {

            var cinemaIds = [];
            $.each(e.target.result.split('\n'), function (index, item) {
                var id = item.match(/\d+/g);
                if (id && id[0] != undefined) {
                    cinemaIds.push(id[0]);
                }
            });
            _this.refs.idsfile.value = cinemaIds.join(',');
        };
        if (inputFile.files[0]) {
            reader.readAsText(inputFile.files[0]);
        } else {
            toastr.warning('请先选择导入文件！');
        }
    }

    showCinema() {
        let _this = this;
        let cinemaIds = _this.refs.idsfile.value;
        if (cinemaIds == "") {
            toastr.warning("请导入影院id");
            _this.refs.idsfile.focus();
            return;
        }

        bdAjax({
            url: "/api/cinema/cinemas.json?cinemaIds=" + cinemaIds,
            des: '获取影院信息'
        }).done(function (e) {
            if (e.data) {
                let cinemasData = [];
                let newState = _this.state;
                let ids = [];
                var data = e.data;
                data = data.map(function (item) {
                    return {
                        id: item.id,
                        name: item.cinemaName
                    };
                })
                cinemasData = newState.value.concat(data);
                cinemasData = cinemasData.filter(function (item) {
                    let duplicate = $.inArray(item.id, ids) != -1;
                    if (!duplicate) {
                        ids.push(item.id);
                    }
                    return !duplicate;
                })

                newState.value = cinemasData
                _this.setState(newState);
            }
        })

    }

    renderMain() {
        let _this = this;
        let readOnly = _this.props.readOnly;
        let value = _this.state.value;

        let rightDom;
        let tableData = {
            ths: ['影院ID', '影院名', '操作'],
            trs: []
        };

        value.forEach(function (item, index) {
            let tr = {
                id: item.id,
                name: item.name,
                operate: function ($td) {
                    return <Button onClick={_this.deleteCinema.bind(_this,index)}>删除</Button>;
                }
            };
            if (readOnly) {
                delete tr.operate;
            }
            tableData.trs.push(tr);

        })

        if (readOnly) {
            tableData.ths = tableData.ths.slice(0, 2);
            rightDom = <Right>
                <MyTable data={tableData}></MyTable>
            </Right>;
        } else {
            rightDom = <Right>
                <MyTable data={tableData}></MyTable>

                <p>请输入影院ID：(多个影院时用英文逗号隔开)</p>
                <input ref='idsfile'/>&nbsp;
                <Button onClick={_this.showCinema.bind(_this)}>添加</Button>
                <input type="file" className='hide' onChange={_this.fileChange.bind(_this)} ref='uploadFile'/>
                <Button type="button" onClick={_this.triggerFile.bind(_this)}>上传txt，每行写一个影院id</Button>
            </Right>;
        }

        return (
            <Group>
                <Left>
                    影院
                </Left>
                ：
                {rightDom}
            </Group>
        )
    }
};
