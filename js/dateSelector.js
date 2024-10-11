
let futureYears = "";
let year = new Date().getFullYear();
year = Number(year);
let selectedYr = "";
let arrDeptYrs = "";
for (let i = 2021; i < (year + 10); i++) {

    if (i >= year) {
        arrDeptYrs = arrDeptYrs + "<option value='" + i + "' " + selectedYr + ">" + i + "</option>";
    }
    futureYears = futureYears + "<option value='" + i + "' " + selectedYr + ">" + i + "</option>";
}



[].forEach.call(document.querySelectorAll(".futureYears"), (e) => {
    e.innerHTML = futureYears;

});


let counter = [];
let countersHTML = "";

for (let i = 1; i < 50; i++) {
    if (i < 10) {
        i = "0" + i;
    }
    countersHTML = countersHTML + "<option value='" + i + "'>" + i + "</option>";
    switch (i) {
        case 10:
            [].forEach.call(document.querySelectorAll("select.tenMax"), (e) => {
                e.innerHTML = e.innerHTML + countersHTML;
            });
            break;
        case 12:
            [].forEach.call(document.querySelectorAll("select.monthsNum"), (e) => {
                e.innerHTML = e.innerHTML + countersHTML;
            });
            [].forEach.call(document.querySelectorAll("select.hoursNum"), (e) => {
                e.innerHTML = e.innerHTML + countersHTML;
            });
            break;
        case 31:
            [].forEach.call(document.querySelectorAll("select.daysNum"), (e) => {
                e.innerHTML = e.innerHTML + countersHTML;
            });
            break;
    }

}



const setDayMax = (menuName) => {
    let tempMonth = document.querySelector("[name='" + menuName + "Month']").value;
    let tempYear = document.querySelector("[name='" + menuName + "Year']").value;

    if ((tempYear + tempMonth).indexOf("default") === -1) {
        let monthDays = new Date(parseInt(tempYear), parseInt(tempMonth), 0).getDate();
        let tempCount = "<option value='default'>Select Day</option>";

        for (let i = 1; i < monthDays + 1; i++) {
            if (i < 10) {
                i = "0" + i;
            }
            tempCount = tempCount + "<option value='" + i + "'>" + i + "</option>";

        }
        document.querySelector("[name='" + menuName + "Day']").disabled = false;
        document.querySelector("[name='" + menuName + "Day']").innerHTML = tempCount;

        //  console.log("There are " + monthDays + " days in month: " + tempMonth + " " + tempYear);
    }
    Validate([menuName + "Month", menuName + "Year", menuName + "Day"])
}


document.querySelector(".futureYears").value = TodayFormatStamp().substring(6, 10);
document.querySelector(".monthsNum").value = TodayFormatStamp().substring(0, 2);
document.querySelector(".daysNum").value = TodayFormatStamp().substring(3, 5);