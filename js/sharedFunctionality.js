
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

const toggleMobileNav = (whichElem) => {

    if (whichElem === "mobileNav") {
        if (document.querySelector(".collapse[data-toggle='mobileNav']")) {
            document.querySelector("[data-toggle='mobileNav']").classList.remove("collapse");
            document.querySelector("[data-toggle='mobileNav']").classList.add("show");
        } else {
            document.querySelector("[data-toggle='mobileNav']").classList.remove("show");
            document.querySelector("[data-toggle='mobileNav']").classList.add("collapse");
        }

    }


}

/*
                    <li class="nav-item">
                        <a class="nav-link active" href="https://aaronrs2002.github.io/time-clock/">Time Clock</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://aaronrs2002.github.io/task-master/">Task Master</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://aaronrs2002.github.io/analyze-bank-files/">Budget</a>
                    </li>
*/

let navData = [{ name: "Clock In Clock Out", address: "https://aaronrs2002.github.io/time-clock/" }, { name: "Task Master", address: "https://aaronrs2002.github.io/task-master/" }, { name: "Analyze bank records", address: "https://aaronrs2002.github.io/analyze-bank-files/" }];
let navLinkHTML = "";
for (let i = 0; i < navData.length; i++) {
    let active = "";
    if (navData[i].name === document.querySelector("title").innerHTML) {
        active = "active";
    }
    navLinkHTML = navLinkHTML + "<li class='nav-item'> <a class='nav-link " + active + "' href=" + navData[i].address + ">" + navData[i].name + "</a></li>";
}
document.getElementById("navLinkTarget").innerHTML = navLinkHTML;