

const LenghtOfTime = (second) => {
    Validate(["taskYear", "taskMonth", "taskDay"]);


    let first = TodayFormatStamp();

    if (!second) {
        second = document.querySelector("[name='taskMonth']").value + "/" + document.querySelector("[name='taskDay']").value + "/" + document.querySelector("[name='taskYear']").value
    }

    //Wed Dec 22 2021 12:01:44 GMT-0700 (Mountain Standard Time)

    //const first = data.arrival.substring(5,7)+"/"+data.arrival.substring(8,10)+"/"+data.arrival.substring(0,4);
    //const second = data.departure.substring(5,7)+"/"+data.departure.substring(8,10)+"/"+data.departure.substring(0,4);

    function parseDate(str) {

        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }

    function datediff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }


    return datediff(parseDate(first), parseDate(second));


}