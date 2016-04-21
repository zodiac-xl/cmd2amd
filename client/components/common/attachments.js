import React, { Component }     from 'react';
import Button                   from 'react-bootstrap/lib/Button';


import bdAjax                   from '../util/bdAjax.js';
import {Group,Left,Right}       from './form-group.js';
export default class Attachments extends Component {


    static defaultProps = {
        valueLink: null,
        readOnly: false,
        file: [],
        label: '附件'
    };
    state = {
        attachments: this.getStateByProps(this.props)
    };

    getStateByProps(props) {
        let valueLink = props.valueLink || {};
        let value = valueLink.value || props.file || [];


        let attachments = [];
        value.forEach(function (item, i) {

            let isImage = false;
            let url = item.url;
            let target = "";
            let name = item.name;

            if (/.(png|jpg|jpeg)/.test(name)) {
                isImage = true;
            }
            if (isImage) {
                target = "_blank";
            }
            attachments.push({
                id: item.id,
                url: url,
                target: target,
                name: name,
                isImage: isImage
            });
        });
        return attachments;
    }

    componentWillReceiveProps(nextProps) {
        let attachments = this.getStateByProps(nextProps);
        this.setState({
            attachments: attachments
        });
    }

    onComponentChange(data) {
        let valueLink = this.props.valueLink || {};
        let requestChange = valueLink.requestChange;
        if (requestChange) {
            requestChange(data);
        }
    }

    add(data) {
        let valueLink = this.props.valueLink;
        let attachments = valueLink.value || [];

        attachments.push(data);
        this.onComponentChange(attachments);
    }

    delete(i) {
        let valueLink = this.props.valueLink;
        let attachments = valueLink.value;
        attachments.splice(i, 1);
        this.onComponentChange(attachments);
    }

    uploadFile() {
        var event = new Event('click', {bubbles: false});
        this.refs.uploadFile.dispatchEvent(event);
    }

    fileChange(e) {
        let _this = this;
        let file = e.target.files[0];
        let formData = new FormData();


        //大小限制为1M  图片、excel（包括xis、xlsx）、word（包括doc、docx）、txt、pdf
        let extArray = [".jpg", "jpeg", ".png", ".txt", ".xls", "xlsx", ".doc", ".docx", ".pdf"];
        let ext = file.name.slice(file.name.indexOf(".")).toLowerCase();
        let rightExt = false;
        for (let i = 0; i < extArray.length; i++) {
            if (extArray[i] == ext) {
                rightExt = true;
                break;
            }
        }
        if (!rightExt) {
            toastr.warning("非法的文件后缀");
            return;
        }
        if (file.size > 1024 * 1024) {
            toastr.warning("文件大小限制为1M");
            return;
        }


        _this.setState({isLoading: true});

        formData.append('file', file);

        bdAjax({
            url: '/api/fileUpload',
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (data) {
            let file = data[0];
            _this.add(file);
        }).fail(function () {
            console.log("上传文件失败");
        }).always(function () {
            _this.setState({isLoading: true});
        })
    }

    render() {

        let hideStyle = {
            display: "none"
        };
        let _this = this;
        let readOnly = _this.props.readOnly;

        var attachments = this.state.attachments.map(function (attachment, i) {
            let href = attachment.url;
            return (
                <div key={i} style={{margin: '5px 0'}}>
                    <a target={attachment.target} href={href}><span></span>{attachment.name}
                    </a>

                    {(() => {
                        if (!readOnly) {
                            return <Button onClick={_this.delete.bind(_this,i)}>删除</Button>
                        } else {
                            return ""
                        }
                    })()}

                </div>
            )
        });

        return (

            <Group>
                <Left>
                    {_this.props.label}
                </Left>
                ：
                <Right>
                    {
                        (()=> {
                            if (!readOnly) {
                                return <div>
                                    <input type="hidden" className="files"/>
                                    <input type="file" style={hideStyle} ref="uploadFile"
                                           onChange={this.fileChange.bind(this)}/>
                                    <Button onClick={this.uploadFile.bind(this)}>上传</Button>
                                </div>
                            }
                        })()
                    }
                    <div>
                        {attachments}
                    </div>
                </Right>
            </Group>
        )
    }
};

