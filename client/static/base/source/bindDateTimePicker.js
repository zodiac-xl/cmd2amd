$(function(){
    var bindDateTimePicker = function(){
        var setting = [
            {
                className: "J_dateTimePicker",
                options: {
                    format: "YYYY-MM-DD HH:mm:ss"
                }

            },
            {
                className: "J_datePicker",
                options: {
                    format: "YYYY-MM-DD"
                }
            },
            {
                className: "J_timePicker",
                options: {
                    format: "HH:mm:ss"
                }
            }
        ];

        var allSelectors = '';
        setting.forEach(function(item, index){
            var prefix = ',';
            var $el = $('.'+item.className);

            if (index == 0) {
                prefix = '';
            }
            allSelectors += prefix+'.'+item.className;

            $el.parent().css('position', 'relative');
            $el.each(function(i,single){
                var $_this = $(single);
                if (!$_this.data("DateTimePicker")) {
                    $_this
                        .datetimepicker(item.options)
                        .on("dp.change blur", function (e) {
                            var event = new Event('input', {bubbles: true});
                            e.target.dispatchEvent(event);
                        });
                }
            });


        });
        $(allSelectors).each(function () {
            var defaultDate = $(this).data("defaultDate");
            var DateTimePicker = $(this).data("DateTimePicker");
            if (defaultDate && !DateTimePicker.defaultDate()) {
                DateTimePicker.defaultDate(defaultDate);
            }
        });
    };
    bindDateTimePicker();
    document.addEventListener("DOMNodeInserted", function (event) {
        bindDateTimePicker();
    });
});