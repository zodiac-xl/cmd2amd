import React                    from 'react';
import ReactDOM                 from 'react-dom';
import Button                   from 'react-bootstrap/lib/Button';

import SimpleModal              from '../../common/simple-modal';
import MyTable                  from '../../common/my-table';
import bdAjax                   from '../../util/bdAjax';





export default class AddCinema extends SimpleModal {

    static defaultProps = {
        taskId: '',
        freshParent: function () {
        }
    };
    state = {
        cinemaIds: '',
        show: true,
        title: '增加影院',
        tableData: {
            ths: ['影院ID', '影院名', '大区', '城市', '操作'],
            trs: []
        }

    }


    submit() {
        let _this = this;
        let taskId = _this.props.taskId;
        let cinemaIds = _this.state.cinemaIds;
        if (cinemaIds == "") {
            toastr.warning("请导入影院id");
            this.refs.idsfile.focus();
            return;
        }
        _this.onSubmit({
            url: "/api/activity/task/" + taskId + "/cinemas.json",
            type: "POST",
            dataType: "json",
            data: {cinemaIds: cinemaIds},
            des: '增加影院'
        }).done(function (res) {
            var failedText = "";
            if (res.data && res.data.failedCinemaIds && res.data.failedCinemaIds.length > 0) {
                failedText = "，添加失败影院ID为：" + res.data.failedCinemaIds.join(",");
            }
            if (failedText) {
                toastr.warning(res.message + failedText);
            }
            _this.props.freshParent();
        })
    }

    showCinema() {
        let _this = this;
        let cinemaIds = _this.state.cinemaIds;
        if (cinemaIds == "") {
            toastr.warning("请导入影院id");
            this.refs.idsfile.focus();
            return;
        }


        bdAjax({
            url: "/api/cinema/cinemas.json?cinemaIds=" + cinemaIds,
            des: '获取影院信息'
        }).done(function (e) {
            if (e.data) {
                var cinemasData = [];
                $.each(e.data, function (index, item) {
                    cinemasData.push({
                        cinemaId: item.id,
                        cinemaName: item.cinemaName,
                        regionName: item.regionName,
                        cityName: item.cityName,
                        operate: function ($td) {
                            return <button type='button' onClick={_this.deleteCinema.bind(_this,index)}>删除</button>;
                        }
                    })
                });
                let newState = _this.state;
                newState.tableData.trs = cinemasData;
                _this.setState(newState);
            }
        })

    }

    deleteCinema(index) {
        let newState = this.state;
        newState.tableData.trs.splice(index, 1);
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

            _this.setState({
                cinemaIds: cinemaIds.join(',')
            })
        };
        if (inputFile.files[0]) {
            reader.readAsText(inputFile.files[0]);
        } else {
            toastr.warning('请先选择导入文件！');
        }
    }

    renderBody() {
        let _this = this;
        return <div>
            <MyTable data={_this.state.tableData}></MyTable>
            <br/>
            <label>请输入影院ID：（多个影院时用英文逗号隔开）</label>
            <br/>
            <input valueLink={_this.nestLinkedState(['cinemaIds'],_this)} ref='idsfile'/>&nbsp;
            <Button  onClick={_this.showCinema.bind(_this)}>展示影院</Button>
            <br/>

            <div>
                <input type="file" className='hide' onChange={_this.fileChange.bind(_this)} ref='uploadFile'/>
                <Button  onClick={_this.triggerFile.bind(_this)}>上传txt，每行写一个影院id</Button>
            </div>
        </div>

    }

}
