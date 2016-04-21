import React, { Component }     from 'react';

import Table                    from 'react-bootstrap/lib/Table';

class MyTable extends Component {

    static defaultProps = {
        data: {}
    };

    findMergeKey(trData) {
        let mergeKey;
        $.each(trData, function (key, value) {

            if ($.type(value) == "array") {
                mergeKey = key;
                return false;
            }
        });
        return mergeKey;
    }


    makeTd(tdData, tdKey, rowSpan) {
        let td;
        let valueType = $.type(tdData);
        let style = {
            "verticalAlign": "middle",
            "textAlign": "center"
        };
        switch (valueType) {
            case "function":

                let result = tdData();
                if ($.isFunction(result)) {
                    td = result(style, rowSpan, tdKey);
                } else {
                    td = <td style={style} rowSpan={rowSpan} key={tdKey}>{result}</td>;
                }

                break;
            default :
                td = <td style={style} rowSpan={rowSpan} key={tdKey}>{tdData}</td>;
                break
        }
        return td;
    }


    render() {
        let _this = this;
        let ths = [];
        $.each(this.props.data.ths, function (key, value) {
            let th;
            let valueType = $.type(value);
            let thKey = `th-${key}`;
            let style = {
                "verticalAlign": "middle",
                "textAlign": "center",
                "whiteSpace": "nowrap"
            };
            switch (valueType) {
                case "function":

                    let result = value();
                    if ($.isFunction(result)) {
                        th = result(style, thKey);
                    } else {
                        th = <th style={style} key={thKey}>{value()}</th>;
                    }
                    break;
                default :
                    th = <th style={style} key={thKey}>{value}</th>;
                    break
            }
            ths.push(th);
        });

        let trs = [];
        $.each(this.props.data.trs, function (index, trData) {
            let mergeKey = _this.findMergeKey(trData);
            let mergeTrsData = trData[mergeKey];
            let needMerge = (mergeKey != undefined);
            if (!mergeTrsData || mergeTrsData.length == 0) {
                mergeTrsData = [{}];
            }
            $.each(mergeTrsData, function (i, mergeTrData) {
                let tr;
                let tds = [];
                let rowSpan = 1;

                $.each(trData, function (key, value) {
                    if (key == mergeKey) {
                        $.each(mergeTrData, function (subTdkey, value) {
                            let tdKey = `${index}-${i}-${key}-${subTdkey}`;
                            let td = _this.makeTd(value, tdKey, rowSpan);
                            tds.push(td);
                        });
                    } else {
                        if (needMerge) { //如果需要merge 只有第一次才makeTd
                            if (i == 0) {
                                let tdKey = `${index}-${i}-${key}`;
                                let td = _this.makeTd(value, tdKey, mergeTrsData.length);
                                tds.push(td);
                            }
                        } else {
                            let tdKey = `${index}-${i}-${key}`;
                            let td = _this.makeTd(value, tdKey, rowSpan);
                            tds.push(td);
                        }

                    }
                });
                tr = <tr key={`${index}-${i}`}>{tds}</tr>;
                trs.push(tr);
            })
        });
        if (trs.length == 0) {
            trs.push(
                <tr key="noData">
                    <td style={{textAlign:"center"}} colSpan="1000">没有数据</td>
                </tr>
            )
        }

        var { data,...other } = this.props;
        return (
            <Table striped bordered condensed hover {...other}>
                <thead>
                <tr>{ths}</tr>
                </thead>
                <tbody>
                {trs}
                </tbody>
            </Table>
        )
    }
}
export  default  MyTable;
