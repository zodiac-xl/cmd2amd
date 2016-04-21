import Page, {page}             from '../../../../components/layout/page-layout'

import Help                     from '../../../../components/business/help'

@page
export default
class PerformanceManage extends Page {

    state = {};


    renderMain() {

        let props ={
            categoryType: '2',//1-产品功能，2-常见问题
            canOperate: true
        }
        return (
            <Help {...props}/>
        )
    }

}







