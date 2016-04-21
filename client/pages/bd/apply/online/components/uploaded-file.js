import React, { Component }     from 'react';

class UploadedFile extends Component {
    static propTypes = {
        file: React.PropTypes.object.isRequired,
        deleteFile: React.PropTypes.func.isRequired
    }

    render() {
        var file = this.props.file;

        let isImage = false;
        let target = "";
        let name = file.name;
        let href = file.url;
        if (/.(png|jpg|jpeg)/.test(name)) {
            isImage = true;
        }
        if (isImage) {
            target = "_blank";

        }
        return (
            <span>
                <a href={href} data-id={file.id} target={target}>{file.name}</a>
                &nbsp;&nbsp;
                <a onClick={this.props.deleteFile}>删除文件</a>
                <br />
            </span>
        );
    }
}

export default UploadedFile;
