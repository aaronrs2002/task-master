
//START GLOBAL ALERT
/*function globalAlert(alertLevel, message) {

    document.getElementById("globalAlert").classList.remove("hide");
    document.getElementById("globalAlert").classList.add(alertLevel);
    document.getElementById("globalAlert").classList.add("animated");
    document.getElementById("globalAlert").innerHTML = message;

    setTimeout(function () {
        document.getElementById("globalAlert").classList.add("hide");
        document.getElementById("globalAlert").classList.remove(alertLevel);
    }, 5000);

}*/

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

let navData = [{ name: "Task Master", address: "https://aaronrs2002.github.io/task-master/" }, { name: "Time-Clock", address: "https://aaronrs2002.github.io/time-clock/" }, { name: "Budget", address: "https://aaronrs2002.github.io/budget-app/" }, { name: "Analyze bank records", address: "https://aaronrs2002.github.io/analyze-bank-files/" }, { name: "Invoice Builder", address: "https://aaronrs2002.github.io/invoice-builder/" }];
let navLinkHTML = "";
for (let i = 0; i < navData.length; i++) {
    let active = "";
    if (navData[i].name === document.querySelector("title").innerHTML) {
        active = "active";
    }
    navLinkHTML = navLinkHTML + "<li class='nav-item'> <a class='nav-link " + active + "' href=" + navData[i].address + ">" + navData[i].name + "</a></li>";
}
document.getElementById("navLinkTarget").innerHTML = navLinkHTML;

/*UPDATED 1-27-2025 GRAB ALL TIMELOCK RTASK, NOT JUST THE ACTIVE ONES FROM THE TASKMASTER*/
function buildTaskMenu() {
    let taskListHTML = document.getElementById("taskTarget").innerHTML;
    let tempTasks = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.indexOf(":timeClock") !== -1) {
            let taskName = key.substring(key.indexOf(":") + 1, key.length - 10);
            if (tempTasks.indexOf(taskName) === -1 && taskName !== ":") {
                taskListHTML = taskListHTML + "<option value-='" + taskName + "'>" + taskName + "</option>";
                tempTasks.push(taskName);
            }



        }
    }
    document.getElementById("taskTarget").innerHTML = taskListHTML;


    if (localStorage.getItem("taskList")) {
        let taskListHTML = document.getElementById("taskTarget").innerHTML;
        let tempList = JSON.parse(localStorage.getItem("taskList"));
        for (let i = 0; i < tempList.length; i++) {
            if (tempTasks.indexOf(tempList[i].task) === -1) {
                taskListHTML = taskListHTML + "<option value-='" + tempList[i].task + "'>" + tempList[i].task + "</option>";
                tempTasks.push(tempList[i].task);
            }

        }

        document.getElementById("taskTarget").innerHTML = taskListHTML;

    }

}