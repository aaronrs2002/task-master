
//START GLOBAL ALERT
function globalAlert(alertLevel, message) {

    document.getElementById("globalAlert").classList.remove("hide");
    document.getElementById("globalAlert").classList.add(alertLevel);
    document.getElementById("globalAlert").classList.add("animated");
    document.getElementById("globalAlert").innerHTML = message;

    setTimeout(function () {
        document.getElementById("globalAlert").classList.add("hide");
        document.getElementById("globalAlert").classList.remove(alertLevel);
    }, 5000);

}

const TodayFormatStamp = () => {

    let today;
    var date = new Date();
    let theMonth = (date.getMonth() + 1);
    if (theMonth < 10) {
        theMonth = "0" + theMonth
    }
    let theDay = date.getDate();
    if (theDay < 10) {
        theDay = "0" + theDay;
    }
    today = theMonth + "/" + theDay + "/" + date.getFullYear();

    return today;

}

const timeStamp = () => {

    let today;
    var date = new Date();
    let theMonth = (date.getMonth() + 1);
    if (theMonth < 10) {
        theMonth = "0" + theMonth
    }
    let theDay = date.getDate();
    if (theDay < 10) {
        theDay = "0" + theDay;
    }
    today = date.getFullYear() + "-" + theMonth + "-" + theDay;

    return today;

}