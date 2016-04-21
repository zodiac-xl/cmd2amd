import React                    from 'react'
import {Group,Left,Hr,Right}    from '../../common/form-group.js';

//fragments
import Attachments              from '../../common/attachments.js';



export default class TaskInfo extends React.Component {
    static defaultProps = {
        taskInfo: null,
        sellsrc:null,
        cinemaId: null,
        cinemaName: null,
        auditInfo: null,
        showDesignationSystemTips:false,
        readOnly: false
    };

    state = {};


    render() {
        let _this = this;
        let taskInfo = _this.props.taskInfo;

        let designationSystemTips;
        if(_this.props.showDesignationSystemTips){
            designationSystemTips =  <div className='text-danger text-center'>该售票系统影院可自行调价，低于最低限价且差额部分由影城承担的调价可正常申请。</div>;
        }
        return <div>
            <div className='text-danger text-center'>调价内容以“分时段价格”标签下填写内容为准，提交前请仔细核对。</div>
            {designationSystemTips}
            <Group>
                <Left>影院ID</Left>：
                <Right>{_this.props.cinemaId}</Right>
            </Group>
            <Group>
                <Left>影院名</Left>：
                <Right>{_this.props.cinemaName}</Right>
            </Group>
            {(()=> {
                if (taskInfo) {
                    let movieNames = ["全部影院"];
                    let timeRanges = [];

                    if (taskInfo.movies && taskInfo.movies.length > 0) {
                        movieNames = [];
                        $.each(taskInfo.movies, function (i, movie) {
                            movieNames.push(movie.nm);
                        });
                    }
                    movieNames = movieNames.join("，");


                    taskInfo.timeRanges && $.each(taskInfo.timeRanges, function (index, timeRange) {
                        timeRanges.push(
                            <div key={index}>{timeRange.startTime}--{timeRange.endTime}</div>
                        );
                    });
                    return <div>
                        <Group>
                            <Left>任务名</Left>：
                            <Right>{taskInfo.taskName}</Right>
                        </Group>
                        <Group>
                            <Left>任务方案</Left>：
                            <Right>{taskInfo.plan}</Right>
                        </Group>

                        {(()=> {
                            if (taskInfo.movies && taskInfo.movies.length > 0) {
                                return <Group>
                                    <Left>参与任务影片</Left>：
                                    <Right>{movieNames}</Right>
                                </Group>;
                            }
                        })()}

                        {(()=> {
                            if (timeRanges.length > 0) {
                                return <Group>
                                    <Left>任务时间</Left>：
                                    <Right>{timeRanges}</Right>
                                </Group>;
                            }
                        })()}
                        {(()=> {
                            if (_this.props.taskInfo.files && _this.props.taskInfo.files.length > 0) {
                                return <Attachments readOnly={true} file={_this.props.taskInfo.files}></Attachments>
                            }
                        })()}

                    </div>;
                }
            })()}

            {
                (()=> {
                    let auditInfo = _this.props.auditInfo;
                    if (auditInfo) {
                        return <Group>
                            <Left>上次驳回原因</Left>：
                            <Right><span className="text-danger">{auditInfo.reason}</span></Right>
                        </Group>
                    }

                })()
            }




        </div>
    }

};

