
/*START CALENDAR*/
let calendarData = [];
let taskList = [];
let dateTxt = null;
let updateCalendar = true;
let activePad = "default";
let whichMonth = "";
let tempTaskList = [{
    "task": "example task", "taskStatus": "open", "taskDetails": "This task is generated because there are no tasks built yet. This is an example to help new users guide their way to success with the Task-Master. Select \"Build your own task list\" and add a new task to automatically delete this example.",
    "details": "info:" + TodayFormatStamp().substring(0, 2) + "/28/" + TodayFormatStamp().substring(6, 10), "finished": false, "startDate": timeStamp()
}];

const writeDayNums = () => {
    [].forEach.call(document.querySelectorAll("[data-direction='0']"), (e) => {
        let fistTxt = e.innerHTML;
        if (fistTxt.length === 1) {
            fistTxt = "0" + fistTxt;
        }
        e.dataset.daynum = whichMonth + "-" + fistTxt;
    });
}

const renderCalendar = (data, from) => {
    if (document.querySelector("[data-daynum]") === null) {
        [].forEach.call(document.querySelectorAll("[data-direction]"), (e) => {
            let fistTxt = e.innerHTML;
            if (fistTxt.length === 1) {
                fistTxt = "0" + fistTxt;
            }
            e.dataset.daynum = whichMonth + "-" + fistTxt;
        });
    }
    if (data.length === 0) {
        globalAlert("alert-info", "There is no data for this pad withing this month.");
        return false;
    }
    [].forEach.call(document.querySelectorAll("[data-daynum]"), (e) => {
        e.innerHTML = '';
    });
    [].forEach.call(document.querySelectorAll("[data-daynum]"), (e) => {
        e.innerHTML = "";
        let dayVal = e.getAttribute("data-daynum");
        let calendarCellHTML = dayVal.substring(8, 10);


        let calendarItems = 1;
        let writeItems = calendarCellHTML;
        for (let i = 0; i < data.length; i++) {

            let tempStart = data[i].start;
            let tempEnd = data[i].end;


            let sqDay = e.dataset.daynum.replaceAll("-", "");
            sqDay = parseInt(sqDay);
            let tempStartDyNum = tempStart.replaceAll("-", "");
            tempStartDyNum = parseInt(tempStartDyNum);
            let tempEndDyNum = tempEnd.replaceAll("-", "");
            tempEndDyNum = parseInt(tempEndDyNum);
            if (data[i].title) {
                if (Number(sqDay) >= tempStartDyNum && Number(sqDay) <= tempEndDyNum && calendarCellHTML.indexOf(" title='" + data[i].title + "' ") === -1) {
                    e.classList.add("alert");
                    e.classList.add("alert-success");
                    let customName = data[i].title;
                    writeItems = calendarCellHTML + `<span class="badge rounded-pill bg-${data[i].colorCode}" onClick="editList(\'${customName}\');window.location.href='#groceryListTarget';" data-daynum="${dayVal}" title="${customName}">  Calendar Items: ${calendarItems++} </span>`

                }
            } else {
                e.classList.remove("alert");
                e.classList.remove("alert-success");

            }
        }

        e.innerHTML = writeItems;
    });

    updateCalendar = false;
    return false;
}

function convertForCalendar(from) {


    if (localStorage.getItem("taskList")) {
        tempTaskList = JSON.parse(localStorage.getItem("taskList"));
    }
    if (from !== "calendar") {
        buildList(tempTaskList);
        loadList(tempTaskList);
    }
    let tempData = [];

    for (let i = 0; i < tempTaskList.length; i++) {
        let whichCode = "danger";
        if (tempTaskList[i].details.indexOf("warning") !== -1) {
            whichCode = "warning";
        }
        if (tempTaskList[i].details.indexOf("info") !== -1) {
            whichCode = "info";
        }

        let endStamp = tempTaskList[i].details.substring(tempTaskList[i].details.indexOf(":") + 7, tempTaskList[i].details.indexOf(":") + 11) + "-" +
            tempTaskList[i].details.substring(tempTaskList[i].details.indexOf(":") + 1, tempTaskList[i].details.indexOf(":") + 3) + "-" +
            tempTaskList[i].details.substring(tempTaskList[i].details.indexOf(":") + 4, tempTaskList[i].details.indexOf(":") + 6);
        let tempStartDate = timeStamp();
        try {
            if (tempTaskList[i].startDate) {
                tempStartDate = tempTaskList[i].startDate;
            }
        } catch (error) {
            console.log("There was no start date: " + error);
        }


        tempData.push({ title: tempTaskList[i].task, start: tempStartDate, end: endStamp, colorCode: whichCode });
    }
    [].forEach.call(document.querySelectorAll("[data-daynum]"), (e) => {
        e.innerHTML = '';
    });

    console.log("JSON.stringify(tempData): " + JSON.stringify(tempData));
    renderCalendar(tempData, from);

}

let picker = datepicker('#datePickerCalendarTarget', {
    // Event callbacks.
    onSelect: instance => {
        // Show which date was selected.
        console.log(instance.dateSelected);
    },
    onShow: instance => {
        if (updateCalendar) {
            let tempMonth = TodayFormatStamp().substring(0, 2);
            whichMonth = instance.currentYear + "-" + tempMonth;
        } else {
            console.log("updateCalendar did not show: " + updateCalendar)
        }
    },
    onHide: instance => {
        [].forEach.call(document.querySelectorAll("[data-daynum]"), (e) => {
            let dayVal = e.getAttribute("data-daynum");
            e.innerHTML = dayVal.substring(8, 10)
        });
    },
    onMonthChange: instance => {

        // Show the month of the selected date. 
        // console.log(instance.currentYear)
        // console.log(instance.currentMonth);
        let tempMonth = instance.currentMonth + 1;
        if (tempMonth < 10) {
            tempMonth = "0" + tempMonth;
        }
        whichMonth = instance.currentYear + "-" + tempMonth;
        writeDayNums("calendar");
        convertForCalendar("calendar")
    },
    // Customizations.
    formatter: (input, date, instance) => {
        // This will display the date as `1/1/2019`.
        input.value = date.toDateString()
    },
    position: 'c', // Top right.
    startDay: 1, // Calendar week starts on a Monday.
    customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    customOverlayMonths: ['😀', '😂', '😎', '😍', '🤩', '😜', '😬', '😳', '🤪', '🤓 ', '😝', '😮'],
    overlayButton: 'Go!',
    overlayPlaceholder: 'Enter a 4-digit year',
    // Settings.
    alwaysShow: true,//Never hide the calendar.
    dateSelected: new Date(), // Today is selected.
    /*events: [
        new Date(2024, 8, 22),
        new Date(2024, 8, 10),
        new Date(2024, 10, 20),
    ],*/
    maxDate: new Date(2099, 0, 1), // Jan 1st, 2099.
    minDate: new Date(2016, 5, 1), // June 1st, 2016.
    startDate: new Date(), // This month.
    showAllDates: false, // Numbers for leading & trailing days outside the current month will show.
    // Disabling things.
    /* noWeekends: true, // Saturday's and Sunday's will be unselectable.
     disabler: date => (date.getDay() === 2 && date.getMonth() === 9), // Disabled every Tuesday in October
     disabledDates: [new Date(2050, 0, 1), new Date(2050, 0, 3)], // Specific disabled dates.
     disableMobile: true, // Conditionally disabled on mobile devices.
     disableYearOverlay: true, // Clicking the year or month will *not* bring up the year overlay.*/
    // ID - be sure to provide a 2nd picker with the same id to create a daterange pair.
    id: 1
});
writeDayNums();


