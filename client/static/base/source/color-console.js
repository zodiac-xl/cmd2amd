var oldConsole = $.extend({}, console);
var logWithColor = {
    makeColorful: function (data, color) {
        var result = '';
        [].forEach.call(data, function (item, i) {
            var prefix = i == 0 ? "%c" : " ";
            result += (prefix + item);
        });
        result = [result, 'color:' + color];
        return result
    },
    log: function () {
        oldConsole.log.apply(this, logWithColor.makeColorful(arguments, '#51a351'));//green
    },
    info: function () {
        oldConsole.info.apply(this, logWithColor.makeColorful(arguments, '#2f96b4'));//blue
    },
    warn: function () {
        oldConsole.log.call(this, '--------------------------------');
        oldConsole.warn.apply(this, logWithColor.makeColorful(arguments, '#f89406'));//yellow
        oldConsole.log.call(this, '--------------------------------');

    },
    error: function () {
        oldConsole.log.call(this, '--------------------------------');
        oldConsole.error.apply(this, logWithColor.makeColorful(arguments, '#bd362f'));//red
        oldConsole.log.call(this, '--------------------------------');
    }
};
$.extend(window.console, logWithColor);

var helloWrold = {
    dayMap: [
        {
            cn: '星期天',
            des: '太阳神日'
        },
        {
            cn: '星期一',
            des: '月亮神日'
        },
        {
            cn: '星期二',
            des: '战神日'
        },
        {
            cn: '星期三',
            des: '主神日'
        },
        {
            cn: '星期四',
            des: '雷神日'
        },
        {
            cn: '星期五',
            des: '爱神日'
        },
        {
            cn: '星期六',
            des: '土神日'
        }
    ],
    cnTime: function () {
        var hour = new Date().getHours();
        var cn;
        var hello;
        var inRange = function (a, b) {
            b = b ? b : 100;
            return a <= hour && hour < b;
        };

        if (inRange(0, 3)) {
            cn = '拂晓';
        } else if (inRange(3, 6)) {
            cn = '黎明';
        } else if (inRange(6, 9)) {
            cn = '清晨';
        } else if (inRange(9, 12)) {
            cn = '上午';
        } else if (inRange(12, 15)) {
            cn = '中午';
        } else if (inRange(15, 18)) {
            cn = '下午';
        } else if (inRange(18, 21)) {
            cn = '傍晚';
        } else if (inRange(21)) {
            cn = '午夜';
        }
        switch (cn) {
            case '拂晓':
            case '黎明':
                hello = '还没休息啊，夜猫子，该休息了';
                break;
            case '清晨':
                hello = '早上好';
                break;
            case '上午':
                hello = '上午好';
                break;
            case '中午':
                hello = '中午好';
                break;
            case '下午':
                hello = '下午好';
                break;
            case '傍晚':
                hello = '傍晚好';
                break;
            case '午夜':
                hello = '晚上好';
                break;
        }

        return hello;
    }
};

console.log(
    '亲爱的' + window.User.name.substr(1) + ',' + helloWrold.cnTime() +
    '\n' +
    '今天是' + helloWrold.dayMap[new Date().getDay()].cn + "，" + helloWrold.dayMap[new Date().getDay()].des + '哦，^_^');