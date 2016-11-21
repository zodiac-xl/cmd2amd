import  './dateformat'

let now = new Date();
let yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24).Format("yyyy-MM-dd");
let usefulDate = {
    thisOrLastMonth: (()=> {//本月数据 对于当月1日展示上一个月的数据。
        let todayNum = new Date().getDate();
        let startDate = new Date(new Date().setDate(1));
        let endDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
        if (todayNum == 1) {//对于当月1日展示上一个月的数据。
            startDate = new Date(new Date(endDate.getTime()).setDate(1));
        }
        startDate = startDate.Format('yyyy-MM-dd');
        endDate = endDate.Format('yyyy-MM-dd');
        return {
            startDate,
            endDate
        }

    })(),
    thisMonth: (()=> {//本月 如果为当月1日 则结束时间取今天 否则取昨天
        let startDate;
        let endDate;
        startDate = new Date(new Date().setDate(1)).Format("yyyy-MM-dd");
        if (now.getDate() == 1) {
            endDate = startDate;
        } else {
            endDate = yesterday;
        }
        return {
            startDate,
            endDate
        }

    })(),
    lastMonth: (()=> {
        let startDate;
        let endDate;
        var thisMonth = now.getMonth();
        if (thisMonth == 0) {//1月
            startDate = new Date(new Date().setDate(1));
            startDate = new Date(startDate.setMonth(11));
            startDate = new Date(startDate.setYear(startDate.getFullYear() - 1));
            startDate = startDate.Format("yyyy-MM-dd");
        } else {
            startDate = new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 1)).Format("yyyy-MM-dd");
        }
        endDate = new Date(new Date().setDate(1) - 86400000).Format("yyyy-MM-dd");
        return {
            startDate,
            endDate
        }
    })(),
    yesterday: (()=> {
        let startDate;
        let endDate;

        startDate = yesterday;
        endDate = yesterday;
        return {
            startDate,
            endDate
        }
    })(),
    sevendays: (()=> {//最近7天
        let startDate;
        let endDate;
        startDate = new Date(new Date() - 86400000 * 7).Format("yyyy-MM-dd");
        endDate = yesterday;
        return {
            startDate,
            endDate
        }
    })(),
}

export default  usefulDate;
