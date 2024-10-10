

let customDictionary = [];
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
    customDictionary = data;

    let groceryListHTML = "";

    for (let i = 0; i < data.length; i++) {
        let colorCode = "danger";
        if (data[i].finished) {
            colorCode = "success";
        }


        groceryListHTML = groceryListHTML + "<li onClick='editList(" + i + ")' class='d-flex list-group-item pointer list-group-item-" + colorCode
            + "' data-finished='" + data[i].finished + "'  data-num='" + i + "' data-name='" + data[i].task + "' ><div class='p-2 flex-grow-1'>" + data[i].task + "</div> <div class='p-2'><span class='badge bg bg-" + data[i].details.substring(0, data[i].details.indexOf(":"))
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
    for (let i = 0; i < customDictionary.length; i++) {
        if (i === parseInt(num)) {
            if (customDictionary[i].finished === false) {
                customDictionary[i].finished = true;
                document.querySelector("[data-num='" + i + "']").setAttribute("data-finished", true);
                document.querySelector("[data-num='" + num + "']").classList.add("list-group-item-success");
                document.querySelector("[data-num='" + num + "']").classList.remove("list-group-item-danger");
            } else {
                customDictionary[i].finished = false;
                document.querySelector("[data-num='" + i + "']").setAttribute("data-finished", false);
                document.querySelector("[data-num='" + num + "']").classList.remove("list-group-item-success");
                document.querySelector("[data-num='" + num + "']").classList.add("list-group-item-danger");
            }
        }


    }

    localStorage.setItem("customDictionary", JSON.stringify(customDictionary));
    buildList(customDictionary);
    loadList(customDictionary);

}



///START CUSTOM DICTIONARY OPTIONS


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
    let tempCustomDictionary = data;

    /*
        try {
            tempCustomDictionary = JSON.parse(tempCustomDictionary);
        } catch (error) {
            console.error(error);
            globalAlert("alert-danger", "That data looks strange. Are your sure that is one of ours? Clear your local storage or cache.");
            return false;
        }
    */


    for (let i = 0; i < tempCustomDictionary.length; i++) {
        if (listCk.indexOf(tempCustomDictionary[i]) === -1) {
            customListHTML = customListHTML + "<option value='" + i + "'>" + tempCustomDictionary[i].task + "</option>";
            listCk.push(tempCustomDictionary[i]);
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
    let deletedTask = customDictionary[num].task;
    let tempList = [];
    for (let i = 0; i < customDictionary.length; i++) {
        if (i !== Number(num)) {
            tempList.push(customDictionary[i]);
        }
    }
    customDictionary = tempList;
    localStorage.setItem("customDictionary", JSON.stringify(customDictionary));
    buildList(customDictionary);
    loadList(customDictionary);
    document.querySelector("input[name='updateWord']").value = ""
    document.querySelector("[name='updateDefinition']").selectedIndex = 0;
    globalAlert("alert-success", deletedTask + " deleted.");
}

function updateCustom() {
    if (document.querySelector("input[name='updateWord']").value === "") {
        document.querySelector("input[name='updateWord']").classList.add("error");
        globalAlert("alert-warning", "Write in a task.");
        return false;
    }
    document.querySelector("input[name='updateWord']").classList.remove("error");
    // document.querySelector("[name='updateDefinition']").classList.remove("error");
    let whichIndex = document.getElementById("localList").value;
    update = CRUD;
    if (localStorage.getItem("customDictionary")) {
        customDictionary = JSON.parse(localStorage.getItem("customDictionary"));
    }

    if (update === "add") {
        let tempWordList = [];
        document.getElementById("localList").classList.add("hide");



        if (document.querySelector("input[name='updateWord']").value && document.querySelector("[name='updateDefinition']").value) {
            let newWord = document.querySelector("input[name='updateWord']").value.toLowerCase().trimEnd().trimStart();
            if (tempWordList.indexOf(newWord) === -1) {
                customDictionary = [...customDictionary, { task: document.querySelector("input[name='updateWord']").value, details: document.querySelector("[name='updateDefinition']").value + ":" + TodayFormatStamp(), finished: false }];
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

            for (let i = 0; i < customDictionary.length; i++) {
                if (i === Number(whichIndex)) {
                    customDictionary[i] = { task: document.querySelector("input[name='updateWord']").value, details: document.querySelector("[name='updateDefinition']").value + ":" + TodayFormatStamp(), finished: document.querySelector("[data-finished]").getAttribute("data-finished") };
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
    localStorage.setItem("customDictionary", JSON.stringify(customDictionary));
    buildList(customDictionary);
    loadList(customDictionary);
    document.querySelector("input[name='updateWord']").value = ""
    document.querySelector("[name='updateDefinition']").selectedIndex = 0;
    //tempWordList.push(document.querySelector("input[name='updateWord']").value);

}




function selectWord() {
    let whichIndex = document.getElementById("localList").value;
    document.querySelector("input[name='updateWord']").value = customDictionary[whichIndex].task;
}

function downloadData() {
    let tempData = [];
    if (localStorage.getItem("customDictionary")) {
        tempData = JSON.parse(localStorage.getItem("customDictionary"));
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
        globalAlert("alert-warning", `File selected. Now, Click the RED <i class="fas fa-file-upload"></i> "Upload" button.`);
    } else {
        document.querySelector("#fileUpload").classList.add("hide");
    }
};
function handleOnSubmit(event, type) {
    event.preventDefault();
    localStorage.setItem("customDictionary", "");
    if (file) {
        fileReader.onload = function (event) {
            const tempObj = event.target.result;
            if (type === "json") {
                localStorage.setItem("customDictionary", tempObj);
                //loadList(tempObj);

                buildList(JSON.parse(tempObj));

                loadList(JSON.parse(tempObj));
            }
            else {
                console.log("That wasn't json.")
            }
        };
        fileReader.readAsText(file);
    }
    document.querySelector("input[type='file']").value = "";
    document.querySelector("#fileUpload").classList.add("hide");
    toggleEdit();
    globalAlert("alert-success", "Your file was uploaded. The next word should be one you uploaded.");
};


if (localStorage.getItem("customDictionary")) {
    buildList(JSON.parse(localStorage.getItem("customDictionary")));
    loadList(JSON.parse(localStorage.getItem("customDictionary")));
}
