let CRUD = "add";
let editModule = false;
let savedHours = [];
let keyListArr = [];
for (let i = 0; i < localStorage.length; i++) {

    const key = localStorage.key(i);

    //console.log("localStorage.key(i): " + localStorage.key(i))
    if (key.indexOf(":timeClock") !== -1) {
        let exisitngHrs = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (keyListArr.indexOf(key) === -1) {
            savedHours.push({ [localStorage.key(i)]: exisitngHrs });
            keyListArr.push(key);
        }


    }



}


const selectWord = () => {
    let wordSelected = document.querySelector("#localList").value;
    if (wordSelected === "default") {
        return false;
    }

    document.querySelector("[name='updateWord']").value = taskList[wordSelected].task;
    document.querySelector("select[name='taskStatus']").value = taskList[wordSelected].taskStatus;
    document.querySelector("[name='taskDetails']").value = taskList[wordSelected].taskDetails;
    //"details":"info:01/09/2025",


    let detailsDate = taskList[wordSelected].details.substring(taskList[wordSelected].details.length - 4, taskList[wordSelected].details.length);
    let detailYrStr = taskList[wordSelected].details.substring(taskList[wordSelected].details.length - 4, taskList[wordSelected].details.length);
    let detailsMoStr = taskList[wordSelected].details.substring(taskList[wordSelected].details.length - 10, taskList[wordSelected].details.length - 8);
    let detailsDyStr = taskList[wordSelected].details.substring(taskList[wordSelected].details.length - 5, taskList[wordSelected].details.length - 7);

    document.querySelector("[name='taskYear']").value = detailYrStr;
    document.querySelector("[name='taskMonth']").value = detailsMoStr;
    document.querySelector("[name='taskDay']").value = detailsDyStr;

    /*START DATE BEGIN*/
    let startDate = timeStamp();
    if (taskList[wordSelected].startDate !== undefined) {
        startDate = taskList[wordSelected].startDate;
    }

    // let startDate = taskList[wordSelected].details.substring(taskList[wordSelected].details.length - 4, taskList[wordSelected].details.length);
    let startYrStr = startDate.substring(0, 4);
    let startMoStr = startDate.substring(5, 7);
    let startDyStr = startDate.substring(8, 10);

    document.querySelector("[name='startYear']").value = startYrStr;
    document.querySelector("[name='startMonth']").value = startMoStr;
    document.querySelector("[name='startDay']").value = startDyStr;


    /*START DATE END*/


    let taskDetails = taskList[wordSelected].details;
    if (taskDetails.indexOf("info") !== -1) {
        taskDetails = "info";
    }
    if (taskDetails.indexOf("warning") !== -1) {
        taskDetails = "warning";
    }
    if (taskDetails.indexOf("danger") !== -1) {
        taskDetails = "danger";
    }
    document.querySelector("[name='updateDefinition']").value = taskDetails;

}

const buildList = (data, num) => {
    taskList = data;
    let tempData = [];
    let tempDetails = "No Details";
    let tempStatus = "open";
    for (let i = 0; i < taskList.length; i++) {
        let endStamp = taskList[i].details.substring(taskList[i].details.indexOf(":") + 7, taskList[i].details.indexOf(":") + 11) + "-" +
            taskList[i].details.substring(taskList[i].details.indexOf(":") + 1, taskList[i].details.indexOf(":") + 3) + "-" +
            taskList[i].details.substring(taskList[i].details.indexOf(":") + 4, taskList[i].details.indexOf(":") + 6);
        tempData.push({ title: taskList[i].title, start: taskList[i].startDate, end: endStamp });
    }
    let groceryListHTML = "";
    for (let i = 0; i < data.length; i++) {

        if (data[i].taskDetails === undefined) {

        } else {
            tempDetails = data[i].taskDetails;
        }
        if (data[i].taskStatus === undefined) {

        } else {
            tempStatus = data[i].taskStatus;
        }
        let colorCode = "danger";
        if (data[i].finished) {
            colorCode = "success";
        }
        let urgencyColor = "info";
        if (LenghtOfTime(data[i].details.substring(data[i].details.indexOf(":") + 1)) < 2) {
            urgencyColor = "warning";
        }
        if (LenghtOfTime(data[i].details.substring(data[i].details.indexOf(":") + 1)) < 0) {
            urgencyColor = "danger";
        }
        groceryListHTML = groceryListHTML + "<li onClick='editList(" + i + ")' class='d-flex list-group-item pointer list-group-item-" + colorCode
            + "' data-finished='" + data[i].finished + "'  data-num='" + i + "' data-name='" + data[i].task + "' ><div class='flex-row'><div class='d-flex flex-row mb-3'> <div class='p-2'><button class='btn btn-danger btn-sm' onClick='deleteTask(" + i + ")'><i  class='far fa-trash-alt'></i></button></div><div class='p-2'><label>" + data[i].task + "</label></div><div class='p-2'><span class='badge bg bg-" + urgencyColor + "'>" +
            LenghtOfTime(data[i].details.substring(data[i].details.indexOf(":") + 1)) + " Days until time is up.</span><span class='badge bg bg-" + data[i].details.substring(0, data[i].details.indexOf(":"))
            + "'>" + data[i].details.substring(data[i].details.indexOf(":") + 1) + " STATUS: " + tempStatus.toUpperCase(); + "</span></div></div><div class='hide d-flex flex-row mb-3' data-details='" + i + "' ><div><h5>Task Status: " + tempStatus + "</h5><p>" + tempDetails + "</p></div></div></li>";
    }
    document.getElementById("groceryListTarget").innerHTML = groceryListHTML;
    [].forEach.call(document.querySelectorAll("[data-details]"), (e) => {
        e.classList.add("hide");

    });

    try {
        document.querySelector("[data-details='" + num + "']").classList.remove("hide");
    } catch (error) {
        console.log("Nothing selected yet: " + error);
    }


}

const filterList = () => {
    let searchFor = document.querySelector("[name='filter']").value.toLowerCase();
    [].forEach.call(document.querySelectorAll("[data-name]"), (e) => {
        if (e.dataset.name.toLowerCase().indexOf(searchFor) === -1) {
            e.classList.add("hide");
        } else {
            e.classList.remove("hide");
        }
    });

}

const editList = (num) => {


    if ((typeof num) === "string") {
        for (let i = 0; i < taskList.length; i++) {
            if (num === taskList[i].task) {
                num = i;
            }
        }
    }


    for (let i = 0; i < taskList.length; i++) {
        if (i === parseInt(num)) {
            if (taskList[i].finished === false) {
                taskList[i].finished = true;
                document.querySelector("[data-num='" + i + "']").setAttribute("data-finished", true);
                document.querySelector("[data-num='" + num + "']").classList.add("list-group-item-success");
                document.querySelector("[data-num='" + num + "']").classList.remove("list-group-item-danger");
            } else {
                taskList[i].finished = false;
                document.querySelector("[data-num='" + i + "']").setAttribute("data-finished", false);
                document.querySelector("[data-num='" + num + "']").classList.remove("list-group-item-success");
                document.querySelector("[data-num='" + num + "']").classList.add("list-group-item-danger");
            }
        }
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
    buildList(taskList, num);
    loadList(taskList);

}

///START CUSTOM TASK LIST OPTIONS
function toggleEdit(hideShow) {
    if (hideShow === "hide") {
        editModule = false;
        document.getElementById("buildingCustom").classList.add("hide");
        document.querySelector("button[data-editpanel='hide']").classList.add("hide");
        document.querySelector("button[data-editpanel='show']").classList.remove("hide");
    } else {
        editModule = true;
        document.querySelector("button[data-editpanel='hide']").classList.remove("hide");
        document.querySelector("button[data-editpanel='show']").classList.add("hide");
        document.getElementById("buildingCustom").classList.remove("hide");
    }
}

function loadList(data) {
    let customListHTML = "<option>Select Word</option>";
    document.getElementById("localList").innerHTML = "";
    let listCk = [];
    let temptaskList = data;

    for (let i = 0; i < temptaskList.length; i++) {
        if (listCk.indexOf(temptaskList[i]) === -1) {
            customListHTML = customListHTML + "<option value='" + i + "'>" + temptaskList[i].task + "</option>";
            listCk.push(temptaskList[i]);
        }
    }
    document.getElementById("localList").innerHTML = customListHTML;
    if (listCk.length === 0) {
        globalAlert("alert-danger", "There are no words loaded. Are you sure your data is good?");
        return false;
    }
}

function updateCRUD(update) {
    document.getElementById("updateBt").innerHTML = "Submit: " + update + " item.";
    [].forEach.call(document.querySelectorAll("[data-edit]"), function (e) {
        e.classList.remove("active");
    });
    document.querySelector("[data-edit='" + update + "']").classList.add("active");

    if (update === "add") {
        document.getElementById("localList").classList.add("hide");
        document.querySelector("input[name='updateWord']").value = ""
        document.querySelector("[name='updateDefinition']").selectedIndex = 0;

        document.querySelector("[name='startYear']").value = timeStamp().substring(0, 4);
        document.querySelector("[name='startMonth']").value = timeStamp().substring(5, 7);
        document.querySelector("[name='startDay']").value = timeStamp().substring(8, 10);

        document.querySelector("[name='taskYear']").value = timeStamp().substring(0, 4);
        document.querySelector("[name='taskMonth']").value = timeStamp().substring(5, 7);
        document.querySelector("[name='taskDay']").value = timeStamp().substring(8, 10);

    } else {
        document.getElementById("localList").classList.remove("hide");
    }
    CRUD = update;
}


function deleteTask(num) {
    let deletedTask = taskList[num].task;
    let tempList = [];
    for (let i = 0; i < taskList.length; i++) {
        if (i !== Number(num)) {
            tempList.push(taskList[i]);
        }
    }
    taskList = tempList;
    localStorage.setItem("taskList", JSON.stringify(taskList));
    buildList(taskList, 0);
    loadList(taskList);
    convertForCalendar("delete");
    runTimeline();
}

function updateCustom() {
    let taskList = [];
    Validate(["updateWord", "taskYear", "taskMonth", "taskDay", "startYear", "startMonth", "startDay"]);
    let detailsStr = "No Details";
    if (document.querySelector("textarea[name='taskDetails']").value !== "" && document.querySelector("textarea[name='taskDetails']").value !== undefined) {

        detailsStr = document.querySelector("textarea[name='taskDetails']").value;
    }
    let taskGoalYears = document.querySelector("[name='taskYear']").value;
    let taskGoalMonths = document.querySelector("[name='taskMonth']").value;
    let taskGoalDays = document.querySelector("[name='taskDay']").value;
    let targetDate = taskGoalMonths + "/" + taskGoalDays + "/" + taskGoalYears;
    let calendarTargetDate = taskGoalYears + "-" + taskGoalMonths + "-" + taskGoalDays;
    document.querySelector("input[name='updateWord']").classList.remove("error");
    let whichIndex = document.getElementById("localList").value;
    update = CRUD;
    let startDateStr = document.querySelector("[name=startYear]").value + "-" + document.querySelector("[name=startMonth]").value + "-" + document.querySelector("[name=startDay]").value;
    if (localStorage.getItem("taskList")) {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }


    if (update === "add") {
        let tempWordList = [];
        document.getElementById("localList").classList.add("hide");
        if (document.querySelector("input[name='updateWord']").value && document.querySelector("[name='updateDefinition']").value) {
            let newWord = document.querySelector("input[name='updateWord']").value.toLowerCase().trimEnd().trimStart();


            if (tempWordList.indexOf(newWord) === -1) {
                taskList = [...taskList, {
                    task: document.querySelector("input[name='updateWord']").value.toLowerCase().trimEnd().trimStart(),
                    taskStatus: document.querySelector("select[name='taskStatus']").value,
                    taskDetails: detailsStr,
                    details: document.querySelector("[name='updateDefinition']").value + ":" + targetDate, finished: false, startDate: startDateStr
                }];
                globalAlert("alert-success", newWord + " added.");
                newWord = "";
                document.querySelector("[name='updateDefinition']").value = "";
            } else {
                globalAlert("alert-danger", "This list already contains " + newWord + ".");
                return false;
            }
        } else {
            document.querySelector("input[name='updateWord']").classList.add("error");
            document.querySelector("[name='updateDefinition']").classList.add("error");
            globalAlert("alert-danger", "We are missing something.");
            return false;
        }
    }

    if (update === "edit") {
        if (document.querySelector("input[name='updateWord']").value && document.querySelector("[name='updateDefinition']").value) {
            let editWord = document.querySelector("input[name='updateWord']").value.toLowerCase();


            /*START UPDATE TIMECLOCK NAMES*/
            let initialWord = document.getElementById("localList").value;
            let keyListArr = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                keyListArr.push(key);

            }

            for (let i = 0; i < keyListArr.length; i++) {

                if (keyListArr[i].indexOf(taskList[initialWord].task) !== -1) {

                    localStorage.setItem(keyListArr[i].substring(0, keyListArr[i].indexOf(":") + 1) + editWord + ":timeClock", localStorage.getItem(keyListArr[i]));

                    localStorage.removeItem(keyListArr[i]);

                }

            }

            /* END TIMECLOCK NAMES*/







            for (let i = 0; i < taskList.length; i++) {
                let tempStatus = "open";
                if (taskList[i].taskStatus === undefined) {
                    taskList[i].taskStatus === tempStatus;
                } else {
                    taskList[i].taskStatus === document.querySelector("select[name='taskStatus']").value;
                }
                if (i === Number(whichIndex)) {
                    taskList[i] = {
                        task: document.querySelector("input[name='updateWord']").value.toLowerCase().trimEnd().trimStart(),
                        taskStatus: document.querySelector("select[name='taskStatus']").value,
                        taskDetails: document.querySelector("textarea[name='taskDetails']").value,
                        details: document.querySelector("[name='updateDefinition']").value + ":" + targetDate, finished: document.querySelector("[data-finished]").getAttribute("data-finished"),
                        startDate: startDateStr
                    };
                }
            }
            globalAlert("alert-success", editWord + " edited.");
        } else {
            document.querySelector("input[name='updateWord']").classList.add("error");
            document.querySelector("[name='updateDefinition']").classList.add("error");
            globalAlert("alert-danger", "We are missing something.");
            return false;
        }
    }
    if (update === "delete") {
        deleteTask(whichIndex);
        return false;
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
    //console.log("JSON.stringify(taskList): " + JSON.stringify(taskList))
    buildList(taskList, 0);
    loadList(taskList);
    runTimeline();
    document.querySelector("input[name='updateWord']").value = "";
    document.querySelector("[name='updateDefinition']").selectedIndex = 0;
    document.querySelector("select[name='taskStatus']").value = "open";
    document.querySelector("[name='taskDetails']").value = "";
    for (let i = 0; i < taskList.length; i++) {
        calendarData.push({ title: taskList[i].task, start: startDateStr, end: calendarTargetDate });
    }

    convertForCalendar("update");
    return false;
}

function downloadData() {
    let tempData = [];
    if (localStorage.getItem("taskList")) {
        tempData = { taskList: JSON.parse(localStorage.getItem("taskList")), invoices: [], timeClock: [], budget: [] };
    }

    if (localStorage.getItem("invoices")) {
        //  tempData = [...tempData, { invoices: JSON.parse(localStorage.getItem("invoices")) }];
        // tempData.push({ invoices: JSON.parse(localStorage.getItem("invoices")) });
        tempData = { taskList: JSON.parse(localStorage.getItem("taskList")), invoices: JSON.parse(localStorage.getItem("invoices")), timeClock: [], budget: [] };

    }
    // console.log("JSON.stringify(savedHours): " + JSON.stringify(savedHours));
    if (savedHours.length > 0) {
        tempData = { taskList: JSON.parse(localStorage.getItem("taskList")), invoices: JSON.parse(localStorage.getItem("invoices")), timeClock: savedHours, budget: [] };
    }
    let tempBudget = [];

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        //  console.log("key: " + key);
        if (key.indexOf(":BUDGET:") !== -1) {
            try {
                tempBudget = [...tempBudget, ...JSON.parse(localStorage.getItem(key))]
            } catch (error) {
                tempBudget = JSON.parse(localStorage.getItem(key));
            }


        }

    }
    // console.log("tempData: " + JSON.stringify(tempData));
    if (tempBudget.length > 0) {
        tempData = { taskList: JSON.parse(localStorage.getItem("taskList")), invoices: JSON.parse(localStorage.getItem("invoices")), timeClock: savedHours, budget: tempBudget };
    }


    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(tempData, null, 2)], {
        type: 'application/json'
    }));
    a.setAttribute("download", "taskList.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
//START FILE READER
const fileReader = new FileReader();
let file;
function handleOnChange(event) {
    if (event.target.files[0]) {
        file = event.target.files[0];

        document.querySelector("#fileUpload").classList.remove("hide");
        document.querySelector("#fileMerge").classList.remove("hide");
        globalAlert("alert-warning", `File selected. Now, Select between \"updoading new data\", or merging with your current data.`);
    } else {
        document.querySelector("#fileUpload").classList.add("hide");
        document.querySelector("#fileMerge").classList.add("hide");
    }
};



function handleOnSubmit(event, type, merge) {
    event.preventDefault();
    if (merge === "default") {
        localStorage.setItem("taskList", "");
    }
    if (file) {
        fileReader.onload = function (event) {
            const tempObj = event.target.result;
            let tempTasks = JSON.parse(tempObj);

            let currentlyStored = [];
            let invoiceList = [];

            try {
                if (localStorage.getItem("invoices")) {
                    currentlyStored = JSON.parse(localStorage.getItem("invoices"));
                    for (let i = 0; i < currentlyStored.length; i++) {
                        invoiceList.push(currentlyStored[i].timestampEmail);

                    }
                }


            } catch (error) {
                console.log("No invoice yet: " + error);

            }
            // console.log("invoiceList: " + invoiceList);
            try {

                for (let i = 0; i < tempTasks.invoices.length; i++) {
                    if (invoiceList.indexOf(tempTasks.invoices[i].timestampEmail) === -1) {
                        currentlyStored.push(tempTasks.invoices[i]);
                        // console.log("we pushed: " + tempTasks.invoices[i].timestampEmail);
                    }

                }

            } catch (error) {

            }
            localStorage.setItem("invoices", JSON.stringify(currentlyStored));
            try {

                let timeClockKeysArr = [];
                for (let i = 0; i < tempTasks.timeClock.length; i++) {
                    timeClockKeysArr.push(Object.keys(tempTasks.timeClock[i]));
                }
                // console.log("timeClockKeysArr.length: " + timeClockKeysArr.length);
                // console.log("timeClockKeysArr: " + timeClockKeysArr);
                for (let i = 0; i < tempTasks.timeClock.length; i++) {
                    let timeClockId = timeClockKeysArr[i];

                    // console.log("Saving each key to local storage - timeClockKeysArr[i]: " + timeClockKeysArr[i])
                    localStorage.setItem(timeClockKeysArr[i], JSON.stringify(tempTasks.timeClock[i][timeClockId]));
                }
            } catch (error) {
                console.log("NO TIME ERROR: " + error);
            }


            /*try {
 
                 console.log("JSON.stringify(tempTasks.budget): " + JSON.stringify(tempTasks.budget))
 
                  for (let i = 0; i < tempTasks.budget.length; i++) {
                      if (key.indexOf(":BUDGET:") !== -1) {
 
                          if (keyListArr.indexOf(key) === -1) {
                                 localStorage.setItem(key,) [key]: JSON.parse(localStorage.getItem(key)) });
                         
                          }
 
 
                      }
  
                  }
 
             } catch (error) {
                 console.log("no budget yet: " + error)
             }*/
            //  console.log("type: " + type + " - merge: " + merge);

            if (type === "json") {
                //   console.log("WE GO PAST type: " + type);
                if (merge === "default") {/*start upload not merge here*/







                    let currentTasksList = [];
                    let taskObj = []

                    try {


                        for (let i = 0; i < tempTasks.budget.length; i++) {
                            //"2025-01-291738182507452:aaron@web-presence.biz:default",

                            let tempTitle = tempTasks.budget[i].itemId.substring(tempTasks.budget[i].itemId.lastIndexOf(":") + 1, tempTasks.budget[i].itemId.length);
                            let tempEmail = tempTasks.budget[i].itemId.substring(tempTasks.budget[i].itemId.indexOf(":") + 1, tempTasks.budget[i].itemId.lastIndexOf(":"));
                            let tempTaskId = tempEmail + ":BUDGET:" + tempTitle;



                            if (localStorage.getItem(tempTaskId)) {
                                let tempObj = JSON.parse(localStorage.getItem(tempTaskId));
                                let iterableObj = [];
                                // tempObj = [...tempObj, tempTasks.budget[i]];
                                if (tempObj.length === undefined) {
                                    iterableObj.push(tempObj);
                                    tempObj = iterableObj;
                                    // console.log("we are trying to BUILD NEW " + tempTaskId);
                                } else {
                                    tempObj = [...tempObj, tempTasks.budget[i]];
                                    // console.log("we are trying to add to exising " + tempTaskId);
                                }
                                localStorage.setItem(tempTaskId, JSON.stringify(tempObj));

                            } else {
                                localStorage.setItem(tempTaskId, JSON.stringify(tempTasks.budget[i]));
                            }
                        }



                    } catch (error) {
                        console.log("no budget data: " + error);
                    }

                    try {

                        for (let i = 0; i < JSON.parse(localStorage.getItem("taskList")).length; i++) {
                            currentTasksList.push(JSON.parse(localStorage.getItem("taskList"))[i].task);
                            taskObj.push(JSON.parse(localStorage.getItem("taskList"))[i]);
                        }
                    } catch (error) {
                        console.log("no task yet: " + error);
                    }

                    for (let i = 0; i < tempTasks.taskList.length; i++) {
                        if (currentTasksList.indexOf(tempTasks.taskList[i].task) === -1) {
                            taskObj.push(tempTasks.taskList[i]);
                        }
                    }


                    buildList(taskObj, 0);
                    loadList(taskObj);
                    localStorage.setItem("taskList", JSON.stringify(taskObj));
                    convertForCalendar("merge");
                    runTimeline();
                } else {   /*START MERGE OPTION*/
                    console.log("MERGING: " + merge);

                    let tempTasksObj = [];





                    try {/*Start merge tasklist*/
                        if (localStorage.getItem("taskList")) {


                            let localTaskList = JSON.parse(localStorage.getItem("taskList"));
                            let localTasks = []

                            for (let i = 0; i < localTaskList.length; i++) {
                                //   console.log(" localTaskList[i].task: " + localTaskList[i].task);
                                if (localTasks.indexOf(localTaskList[i].task) === -1) {
                                    localTasks.push(localTaskList[i].task);
                                    tempTasksObj.push(localTaskList[i]);

                                }

                            }

                            for (let i = 0; i < tempTasks.taskList.length; i++) {
                                //  console.log("tempTasks.taskList[i].task: " + tempTasks.taskList[i].task);
                                if (localTasks.indexOf(tempTasks.taskList[i].task) === -1) {
                                    tempTasksObj.push(tempTasks.taskList[i]);
                                }
                            }
                            localStorage.setItem("taskList", JSON.stringify(tempTasksObj))
                        }
                        //tempTasksObj = [...JSON.parse(localStorage.getItem("taskList")), ...tempTasks.taskList];


                    } catch (error) {
                        console.log("Error: " + error);
                        localStorage.setItem("taskList", JSON.stringify(tempTasks.taskList))
                        //  console.log(" JSON.stringify(tempTasksObj): " + JSON.stringify(tempTasksObj));
                        /* tempTasksObj.push(JSON.parse(localStorage.getItem("taskList")));
                         if (tempTasksObj.length > 0) {
                             tempTasksObj = [...tempTasksObj, ...tempTasks.taskList];
     
                         } else {
                             tempTasksObj = tempTasks.taskList;
     
                         }*/

                    }
                    //  localStorage.setItem("taskList", JSON.stringify(tempTasksObj));

                    /*END MERGE TASK LIST*/


                    /*START HOURS MERGED */

                    try {

                        let timesIn = [];

                        for (let i = 0; i < localStorage.length; i++) {



                            const localKey = localStorage.key(i);

                            //aaron@web-presence.biz:merge hours json:timeClock

                            //for (let i = j; j < tempTasks.timeClock.length; i++) {  
                            // 

                            //for (const key in tempTasks.timeClock) {
                            /* for (const [key, value] of Object.entries(tempTasks.timeClock)) {
                                 console.log("key: " + key + " - localKey: " + localKey);
                                 if (key === localKey) {
                                     let currentHrs = JSON.parse(localStorage.getItem(localKey));
                                     for (let j = 0; j < currentHrs.length; j++) {
                                         timesIn.push(currentHrs[j].timeIn)
 
                                     }
                                     for (let j = 0; j < tempTasks.timeClock.length; j++) {
                                         if (timesIn.indexOf(tempTasks.timeClock[j].timeIn) === -1) {
                                             currentHrs.push(tempTasks.timeClock[j]);
                                         }
                                     }
                                     localStorage.setItem(localKey, JSON.stringify(currentHrs));
                                 } else {
                                     console.log("we just replace the hours key: " + key)
                                     localStorage.setItem(key, JSON.stringify(value))
                                 }
 
                             }*/
                        }
                        /* for (let j = 0; j < tempTaskList.length; j++) {
                             const key = localStorage.key(i);
             
             
                             if (key.indexOf(":timeClock") !== -1) {
             
                                 if (keyListArr.indexOf(key) === -1) {
                                     savedHours.push({ [key]: JSON.parse(localStorage.getItem(key)) });
                                     keyListArr.push(key);
                                 }
             
             
                             }
             
                         }*/




                    } catch (error) {
                        console.log("error: " + error);

                    }



                    /*END HOURS MERGED*/





                    /*start invoices merge*/

                    let currentInvoices = [];
                    let invoiceDomains = [];
                    if (localStorage.getItem("invoices")) {
                        currentInvoices = JSON.parse(localStorage.getItem("invoices"));
                        for (let i = 0; i < currentInvoices.length; i++) {
                            if (invoiceDomains.indexOf(currentInvoices[i].domain) === -1) {
                                invoiceDomains.push(currentInvoices[i].domain);
                            }
                        }

                        for (let i = 0; i < tempTasks.invoices.length; i++) {
                            if (invoiceDomains.indexOf(tempTasks.invoices[i].domain) === -1) {
                                currentInvoices.push(tempTasks.invoices[i])
                            }
                        }

                        localStorage.setItem("invoices", JSON.stringify(currentInvoices));
                    }

                    /*end invoices merge*/




                    buildList(tempTasksObj, 0);
                    loadList(tempTasksObj);
                    runTimeline();
                    // let tempBudget=JSON.parse(localStorage.getItem());
                    /*  for (let i = 0; i < tempTasks.budget.length; i++) {
                          let tempTitle = tempTasks.budget[i].itemId.substring(tempTasks.budget[i].itemId.lastIndexOf(":") + 1, tempTasks.budget[i].itemId.length);
                          if (localStorage.getItem(tempTitle) !== null) {
                              console.log("We have it: " + tempTitle)
                              let merge = JSON.parse(localStorage.getItem(tempTitle));
                              let iterableObj = [];
                              if (merge.length === undefined) {
                                  iterableObj.push(merge);
                                  merge = iterableObj;
                              }
                              merge.push(tempTasks.budget[i]);
                              merge = JSON.stringify(merge);
                              localStorage.setItem(tempTitle, merge);
                          } else {
                              localStorage.setItem(tempTitle, tempTasks.budget[i]);
                          }
     
                      }*/
                    try {
                        let tempBugetObjArr = [];
                        //   console.log(" JSON.stringify(tempTasks.budget): " + JSON.stringify(tempTasks.budget))
                        for (let i = 0; i < tempTasks.budget.length; i++) {
                            //"2025-01-291738182507452:aaron@web-presence.biz:default",

                            let tempTitle = tempTasks.budget[i].itemId.substring(tempTasks.budget[i].itemId.lastIndexOf(":") + 1, tempTasks.budget[i].itemId.length);
                            let tempEmail = tempTasks.budget[i].itemId.substring(tempTasks.budget[i].itemId.indexOf(":") + 1, tempTasks.budget[i].itemId.lastIndexOf(":"));
                            let tempTaskId = tempEmail + ":BUDGET:" + tempTitle;



                            if (localStorage.getItem(tempTaskId)) {
                                console.log("SAVE TO EXISTING tempTaskId: " + tempTaskId)
                                let tempObj = JSON.parse(localStorage.getItem(tempTaskId));
                                let iterableObj = [];
                                // tempObj = [...tempObj, tempTasks.budget[i]];
                                if (tempObj.length === undefined) {
                                    iterableObj.push(tempObj);
                                    tempObj = iterableObj;
                                    console.log("we are trying to BUILD NEW " + tempTaskId);
                                } else {
                                    /*    {
  "itemId": "2025-02-05:aaron@web-presence.biz:another dangtitle",
  "itemName": "found money",
  "itemAmount": 15
}*/
                                    let idNames = [];
                                    for (let i = 0; i < tempObj.length; i++) {
                                        idNames.push(tempObj[i].itemId + tempObj[i].itemName);
                                    }
                                    console.log("idNames: " + idNames);
                                    for (let i = 0; i < tempTasks.budget.length; i++) {
                                        if (idNames.indexOf(tempTasks.budget[i].itemId) !== -1 && idNames.indexOf(tempTasks.budget[i].itemName) === -1) {
                                            console.log("idNames did not have: " + tempTasks.budget[i].itemId + tempTasks.budget[i].itemName);
                                            tempObj.push(tempTasks.budget[i])
                                        }
                                    }


                                    //  tempObj = [...tempObj, tempTasks.budget[i]];
                                    console.log("we are trying to add to exising " + tempTaskId);
                                }
                                localStorage.setItem(tempTaskId, JSON.stringify(tempObj));

                            } else {
                                console.log("THERE WAS NO tempTaskId: " + tempTaskId + " - WE ARE SAVING IT NEW")
                                localStorage.setItem(tempTaskId, JSON.stringify(tempTasks.budget[i]));
                            }
                        }




                    } catch (error) {
                        console.log("no budget data: " + error);
                    }
                    convertForCalendar("upload")
                }
            }
            else {
                console.log("That wasn't json.")
            }
        };
        fileReader.readAsText(file);
    }
    document.querySelector("input[type='file']").value = "";
    document.querySelector("#fileUpload").classList.add("hide");
    document.querySelector("#fileMerge").classList.add("hide");
    toggleEdit();
    globalAlert("alert-success", "Your file was uploaded. The next word should be one you uploaded.");


};
convertForCalendar("onLoad");


/*onload grab all timeclock matches*/

if (localStorage.getItem("taskList")) {
    tempTaskList = JSON.parse(localStorage.getItem("taskList"));
}

//console.log("JSON.stringify(tempTaskList): " + JSON.stringify(tempTaskList) + " - localStorage.length: " + localStorage.length)

/*
if (localStorage.getItem("taskList")) {
    for (let i = 0; i < localStorage.length; i++) {
        for (let j = 0; j < tempTaskList.length; j++) {
            const key = localStorage.key(i);

            console.log("localStorage.key(i): " + localStorage.key(i))
            if (key.indexOf(":timeClock") !== -1) {
                let exisitngHrs = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if (keyListArr.indexOf(key) === -1) {
                    savedHours.push({ [localStorage.key(i)]: exisitngHrs });
                    keyListArr.push(key);
                }


            }

        }

    }
}
for (let i = 0; i < savedHours.length; i++) {
    localStorage.setItem(keyListArr[i], JSON.stringify(savedHours[i].keyListArr[i].keyListArr[0]));
}*/






function goTo(where) {
    window.location.href = "#" + where;
    if (where === "calendar") {
        document.querySelector("[data-button='calendar']").classList.add("active");
        document.querySelector("[data-button='timeline']").classList.remove("active");
    }
    if (where === "timeline") {
        document.querySelector("[data-button='calendar']").classList.remove("active");
        document.querySelector("[data-button='timeline']").classList.add("active");
    }

}
try {
    document.querySelector("[data-details='0']").classList.remove("hide");
} catch (error) {
    console.log("No items yet: " + error);
}
