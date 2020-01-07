export function formatDate(date){
    var year= date.getFullYear()
    var month= date.getMonth()+1
    var day = date.getDate()
    if (month < 10 ){
        month = '0' + month
    }
    if (day < 10 ){
        day = '0' + day
    }
    return year + month + day
}

export function formatDate2(date){
    var year= date.getFullYear()
    var month= date.getMonth()+1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()

    if (month < 10 ){
        month = '0' + month
    }
    if (day < 10 ){
        day = '0' + day
    }
    if (hour < 10 ){
        hour = '0' + hour
    }
    if (minute < 10 ){
        minute = '0' + minute
    }
    return `${year}-${month}-${day} ${hour}:${minute}`
}

export function parseDate(str){
    if(!/^(\d){8}$/.test(str)) throw "invalid date"
    var y = str.substr(0,4),
        m = str.substr(4,2) - 1,
        d = str.substr(6,2);
    return new Date(y, m, d);
}

export function addDays(date, n){
    var time = date.getTime()
    var changedDate = new Date(time + (n * 24 * 60 * 60 * 1000));
    var newDate = new Date()
    newDate.setTime(changedDate.getTime())
    return newDate
}


var scrollHandler;
export function listenScrollBottom(callback){
    scrollHandler = function(){
        var scrollTop =  document.documentElement.scrollTop || document.body.scrollTop
        if(scrollTop!==0 &&scrollTop+document.documentElement.clientHeight===document.documentElement.scrollHeight){
            callback()
        }
    }
    window.addEventListener('scroll', scrollHandler);
}

export function removeListenScrollBottom(){
    window.removeEventListener('scroll', scrollHandler)
}