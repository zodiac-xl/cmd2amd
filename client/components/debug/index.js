import React,{Component}        from 'react';
import ReactDOM                 from 'react-dom';



import ChangeApi                from './changeApi'
import Url                      from '../util/url'


import './index.less';

export default class ChangeUrl extends Component {

    static defaultProps = {};

    state = {}

    changeApi() {
        let container = ReactDOM.findDOMNode(this.refs['container-changeApi']);
        ReactDOM.unmountComponentAtNode(container);
        let component = ReactDOM.render(
            <ChangeApi/>,
            container
        );
    }


    componentDidMount() {
        $(function () {
            var $miao = $("#miaoLabel");
            $miao.mouseup(function (event) {
                $miao.click();
            });
        })
    }

    render() {
        let showPet= Url.getUrlArg('pet') == 'miao'||window.DEBUG;
        return (
            <div className={showPet?'':'hide'}>
                <div className="drop-left-top miaoLabel">
                    <div id="miaoLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <object type="application/x-shockwave-flash" data="/media/miao.swf" width="84" height="90"
                                id="miaoicon"
                                style={{visibility: 'visible'}}>
                            <param name="wmode" value="transparent"/>
                        </object>
                    </div>
                    <div className="dropdown-menu" aria-labelledby="miaoLabel">
                        <a href="/admin" className="funny-button green">Admin</a>
                        <a href="/bd" className="funny-button green">BD</a>
                        <a  className="funny-button green" onClick={this.changeApi.bind(this)}>修改后端api</a>
                    </div>
                </div>
                <div ref='container-changeApi'></div>
            </div>
        )
    }
}
