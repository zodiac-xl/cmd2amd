import bdAjax from './bdAjax.js';



let FormTemplates = {
    templates: [],
    inited: false,

    init(){
        let _this = this;
        bdAjax({
            url: "/api/apply/form/templates.json",
            type: "GET",
            async: false,
            des:"获取表单模板列表"
        }).done(function (e) {
            _this.templates = e.data;
        });

    },
    getTemplateByType(applyType){
        let template = null;
        this.init();

        this.templates.some(function (item) {
            if (item.applyType == applyType) {
                template = item.formTemplate;
                return true
            }
        });
        return template
    }
};

export default FormTemplates;
