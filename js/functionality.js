

let taskList = [];
let CRUD = "add";
let editModule = false;



let toGetList = [];
if (localStorage.getItem("toGetList")) {

    let tempArr = [];
    let storageList = localStorage.getItem("toGetList");
    for (let i = 0; i < storageList.length; i++) {
        if (storageList[i] !== ",") {
            tempArr = [...tempArr, parseInt(storageList[i])]
        }

    }
    toGetList = tempArr;
}



const buildList = (data) => {
    taskList = data;
    let tempData = [];
    for (let i = 0; i < taskList.length; i++) {
        let endStamp = taskList[i].details.substring(taskList[i].details.indexOf(":") + 7, taskList[i].details.indexOf(":") + 11) + "-" +
            taskList[i].details.substring(taskList[i].details.indexOf(":") + 1, taskList[i].details.indexOf(":") + 3) + "-" +
            taskList[i].details.substring(taskList[i].details.indexOf(":") + 4, taskList[i].details.indexOf(":") + 6);

        tempData.push({ title: taskList[i].title, start: timeStamp(), end: endStamp });

    }
    renderCalendar(tempData);

    let groceryListHTML = "";

    for (let i = 0; i < data.length; i++) {
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
            + "' data-finished='" + data[i].finished + "'  data-num='" + i + "' data-name='" + data[i].task + "' ><div class='p-2 flex-grow-1'>" + data[i].task + "</div> <div class='p-2'><span class='badge bg bg-" + urgencyColor + "'>" + LenghtOfTime(data[i].details.substring(data[i].details.indexOf(":") + 1)) + " Days until time is up.</span><span class='badge bg bg-" + data[i].details.substring(0, data[i].details.indexOf(":"))
            + "'>" + data[i].details.substring(data[i].details.indexOf(":") + 1) + "</span></div> <div class='p-2'><i onClick='deleteTask(" + i + ")' class='pointer fas fa-trash'></i></div></li>"
    }
    document.getElementById("groceryListTarget").innerHTML = groceryListHTML;

}




const filterList = () => {
    let searchFor = document.querySelector("[name='filter']").value.toLowerCase();

    [].forEach.call(document.querySelectorAll("[data-name]"), (e) => {

        // console.log("e.dataset.name: " + e.dataset.name);
        if (e.dataset.name.toLowerCase().indexOf(searchFor) === -1) {
            e.classList.add("hide");
        } else {
            e.classList.remove("hide");
        }
    });

}


const editList = (num) => {
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
    buildList(taskList);
    loadList(taskList);

    let tempData = [];
    for (let i = 0; i < taskList.length; i++) {
        let endStamp = taskList[i].details.substring(taskList[i].details.indexOf(":") + 7, taskList[i].details.indexOf(":") + 11) + "-" +
            taskList[i].details.substring(taskList[i].details.indexOf(":") + 1, taskList[i].details.indexOf(":") + 3) + "-" +
            taskList[i].details.substring(taskList[i].details.indexOf(":") + 4, taskList[i].details.indexOf(":") + 6);

        tempData.push({ title: taskList[i].title, start: timeStamp(), end: endStamp });

    }
    renderCalendar(tempData);


}



///START CUSTOM TASK LIST OPTIONS


function toggleEdit(hideShow) {
    if (hideShow === "hide") {
        editModule = false;
        document.getElementById("buildingCustom").classList.add("hide");
        // document.querySelector("i[data-sound]").dataset.sound = false;
        document.querySelector("button[data-editpanel='hide']").classList.add("hide");
        document.querySelector("button[data-editpanel='show']").classList.remove("hide");
    } else {
        editModule = true;
        document.querySelector("button[data-editpanel='hide']").classList.remove("hide");
        document.querySelector("button[data-editpanel='show']").classList.add("hide");
        document.getElementById("buildingCustom").classList.remove("hide");
        // document.querySelector("i[data-sound]").dataset.sound = true;
    }

}

function loadList(data) {
    /*  if ((typeof data) === "string") {
          data = data.split(",");
      }*/


    let customListHTML = "<option>Select Word</option>";
    document.getElementById("localList").innerHTML = "";
    let listCk = [];
    let temptaskList = data;

    /*
        try {
            temptaskList = JSON.parse(temptaskList);
        } catch (error) {
            console.error(error);
            globalAlert("alert-danger", "That data looks strange. Are your sure that is one of ours? Clear your local storage or cache.");
            return false;
        }
    */


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
    buildList(taskList);
    loadList(taskList);

    let tempData = [];
    for (let i = 0; i < taskList.length; i++) {
        let endStamp = taskList[i].details.substring(taskList[i].details.indexOf(":") + 7, taskList[i].details.indexOf(":") + 11) + "-" +
            taskList[i].details.substring(taskList[i].details.indexOf(":") + 1, taskList[i].details.indexOf(":") + 3) + "-" +
            taskList[i].details.substring(taskList[i].details.indexOf(":") + 4, taskList[i].details.indexOf(":") + 6);

        tempData.push({ title: taskList[i].title, start: timeStamp(), end: endStamp });

    }
    renderCalendar(tempData);


    document.querySelector("input[name='updateWord']").value = ""
    document.querySelector("[name='updateDefinition']").selectedIndex = 0;
    globalAlert("alert-success", deletedTask + " deleted.");


}

function updateCustom() {
    /* if (document.querySelector("input[name='updateWord']").value === "") {
         document.querySelector("input[name='updateWord']").classList.add("error");
         globalAlert("alert-warning", "Write in a task.");
         return false;
     }*/
    Validate(["updateWord", "taskYear", "taskMonth", "taskDay"]);

    let taskGoalYears = document.querySelector("[name='taskYear']").value;
    let taskGoalMonths = document.querySelector("[name='taskMonth']").value;
    let taskGoalDays = document.querySelector("[name='taskDay']").value;

    let targetDate = taskGoalMonths + "/" + taskGoalDays + "/" + taskGoalYears;
    let calendarTargetDate = taskGoalYears + "-" + taskGoalMonths + "-" + taskGoalDays;

    document.querySelector("input[name='updateWord']").classList.remove("error");
    // document.querySelector("[name='updateDefinition']").classList.remove("error");
    let whichIndex = document.getElementById("localList").value;
    update = CRUD;
    if (localStorage.getItem("taskList")) {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }

    if (update === "add") {
        let tempWordList = [];
        document.getElementById("localList").classList.add("hide");



        if (document.querySelector("input[name='updateWord']").value && document.querySelector("[name='updateDefinition']").value) {
            let newWord = document.querySelector("input[name='updateWord']").value.toLowerCase().trimEnd().trimStart();
            if (tempWordList.indexOf(newWord) === -1) {
                taskList = [...taskList, { task: document.querySelector("input[name='updateWord']").value.toLowerCase().trimEnd().trimStart(), details: document.querySelector("[name='updateDefinition']").value + ":" + targetDate, finished: false }];
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

            for (let i = 0; i < taskList.length; i++) {
                if (i === Number(whichIndex)) {
                    taskList[i] = { task: document.querySelector("input[name='updateWord']").value.toLowerCase().trimEnd().trimStart(), details: document.querySelector("[name='updateDefinition']").value + ":" + targetDate, finished: document.querySelector("[data-finished]").getAttribute("data-finished") };
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


    buildList(taskList);
    loadList(taskList);
    document.querySelector("input[name='updateWord']").value = "";
    document.querySelector("[name='updateDefinition']").selectedIndex = 0;
    //tempWordList.push(document.querySelector("input[name='updateWord']").value);

    for (let i = 0; i < taskList.length; i++) {

        calendarData.push({ title: taskList[i].task, start: timeStamp(), end: calendarTargetDate });

    }
    renderCalendar(calendarData);

}




function selectWord() {
    let whichIndex = document.getElementById("localList").value;
    if (whichIndex === "default") {
        return false;
    }
    document.querySelector("input[name='updateWord']").value = taskList[whichIndex].task;
    let priorityMenu;
    if (taskList[whichIndex].details.indexOf("info") !== -1) {
        priorityMenu = 0;
    }
    if (taskList[whichIndex].details.indexOf("warning") !== -1) {
        priorityMenu = 1;
    }
    if (taskList[whichIndex].details.indexOf("danger") !== -1) {
        priorityMenu = 2;
    }
    document.querySelector("[name='updateDefinition']").selectedIndex = priorityMenu;
}

function downloadData() {
    let tempData = [];
    if (localStorage.getItem("taskList")) {
        tempData = JSON.parse(localStorage.getItem("taskList"));
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
        console.log("event.target.files[0]: " + event.target.files[0]);
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
            if (type === "json") {

                //loadList(tempObj);

                if (merge === "default") {
                    buildList(JSON.parse(tempObj));
                    loadList(JSON.parse(tempObj));
                    localStorage.setItem("taskList", tempObj);
                } else {
                    let tempTasks = [...JSON.parse(localStorage.getItem("taskList")), ...JSON.parse(tempObj)];
                    buildList(tempTasks);
                    loadList(tempTasks);
                    localStorage.setItem("taskList", JSON.stringify(tempTasks));
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


if (localStorage.getItem("taskList")) {
    buildList(JSON.parse(localStorage.getItem("taskList")));
    loadList(JSON.parse(localStorage.getItem("taskList")));
    let tempData = [];
    let tempTasKList = JSON.parse(localStorage.getItem("taskList"));
    for (let i = 0; i < tempTasKList.length; i++) {
        let endStamp = tempTasKList[i].details.substring(tempTasKList[i].details.indexOf(":") + 7, tempTasKList[i].details.indexOf(":") + 11) + "-" +
            tempTasKList[i].details.substring(tempTasKList[i].details.indexOf(":") + 1, tempTasKList[i].details.indexOf(":") + 3) + "-" +
            tempTasKList[i].details.substring(tempTasKList[i].details.indexOf(":") + 4, tempTasKList[i].details.indexOf(":") + 6);

        tempData.push({ title: tempTasKList[i].task, start: timeStamp(), end: endStamp });

    }
    renderCalendar(tempData);
}
