
/*START CALENDAR*/
let calendarData = [];
let taskList = [];
let dateTxt = null;
let updateCalendar = true;
let activePad = "default";
let whichMonth = "";







const renderCalendar = (data, from) => {


    console.log("render calendar FROM: " + from);
    if (data.length === 0) {
        globalAlert("alert-info", "There is no data for this pad withing this month.");
        return false;
    }


    console.log("JSON.stringify(data): " + JSON.stringify(data));


    [].forEach.call(document.querySelectorAll("[data-daynum]"), (e) => {
        //e.innerHTML = "";

        e.innerHTML = '';

    });


    [].forEach.call(document.querySelectorAll("[data-daynum]"), (e) => {
        e.innerHTML = "";
        let dayVal = e.getAttribute("data-daynum");
        let calendarCellHTML = dayVal.substring(8, 10);
        for (let i = 0; i < data.length; i++) {
            let tempStart = data[i].start;
            let tempEnd = data[i].end;


            // e.innerHTML = dayVal.substring(8, 10)

            let sqDay = e.dataset.daynum.replaceAll("-", "");
            sqDay = parseInt(sqDay);
            let tempStartDyNum = tempStart.replaceAll("-", "");
            tempStartDyNum = parseInt(tempStartDyNum);
            let tempEndDyNum = tempEnd.replaceAll("-", "");
            tempEndDyNum = parseInt(tempEndDyNum);
            console.log("data[i].title: " + data[i].title);



            if (data[i].title) {

                console.log("calendarCellHTML: " + calendarCellHTML);
                if (Number(sqDay) >= tempStartDyNum && Number(sqDay) <= tempEndDyNum && calendarCellHTML.indexOf(" title='" + data[i].title + "' ") === -1) {
                    let customName = data[i].title;
                    calendarCellHTML = calendarCellHTML + "<span class='badge rounded-pill bg-dark' data-daynum='" + dayVal + "' title='" + customName + "'>  " + customName.substring(0, 2) + "</span>";

                    console.log("data[i].start: " + data[i].start);
                    console.log("data[i].end: " + data[i].end);



                }


            }

        }

        e.innerHTML = calendarCellHTML;
        /*
    
 e.innerHTML

      let dayListHTML = "";
        for (let j = 0; j < dayList.length; j++) {

            if (Number(sqDay) >= tempStartDyNum && Number(sqDay) <= tempEndDyNum) {
                let customName = dayList[j].title;
                console.log("document.querySelector(span[data - daynum= ' + dayVal + '][title = ' + customName + ']): " + document.querySelector("span[data-daynum='" + dayVal + "'][title='" + customName + "']"))

                dayListHTML = dayListHTML + "<span class='badge rounded-pill bg-dark' data-daynum='" + dayVal + "' title='" + customName + "'>  " + customName.substring(0, 2) + "</span>";


            }

        }

        e.innerHTML = dayListHTML;
        */


    });





    updateCalendar = false;


    return false;

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
        console.log('Calendar hidden.');

        [].forEach.call(document.querySelectorAll("[data-daynum]"), (e) => {
            //e.innerHTML = "";

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
        /* let tempData = [];
         let tempTasKList = JSON.parse(localStorage.getItem("taskList"));
         for (let i = 0; i < tempTasKList.length; i++) {
             let endStamp = tempTasKList[i].details.substring(tempTasKList[i].details.indexOf(":") + 7, tempTasKList[i].details.indexOf(":") + 11) + "-" +
                 tempTasKList[i].details.substring(tempTasKList[i].details.indexOf(":") + 1, tempTasKList[i].details.indexOf(":") + 3) + "-" +
                 tempTasKList[i].details.substring(tempTasKList[i].details.indexOf(":") + 4, tempTasKList[i].details.indexOf(":") + 6);
 
             tempData.push({ title: tempTasKList[i].task, start: timeStamp(), end: endStamp });
 
         }
         renderCalendar(tempData);*/

        [].forEach.call(document.querySelectorAll("[data-daynum]"), (e) => {
            //e.innerHTML = "";

            e.innerHTML = '';

        });

        renderCalendar(taskList, "monthChange");

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


[].forEach.call(document.querySelectorAll("[data-direction='0']"), (e) => {
    let fistTxt = e.innerHTML;

    if (fistTxt.length === 1) {
        fistTxt = "0" + fistTxt;
    }
    e.dataset.daynum = whichMonth + "-" + fistTxt;
});


