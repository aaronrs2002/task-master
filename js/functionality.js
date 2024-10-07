let toGetList = [];

const buildList = (data) => {
    try {
        if (JSON.parse(localStorage.getItem("toGetList"))) {
            let strigObj = JSON.parse(localStorage.getItem("toGetList"));
            for (let i = 0; i < strigObj.length; i++) {
                if ((typeof strigObj[i]) === "number") {
                    toGetList.push(strigObj[i])
                }

            }
        }
    } catch (error) {
        console.log("error: " + error)
    }




    console.log("toGetList: " + toGetList);
    console.log("(typeof toGetList): " + (typeof toGetList));

    console.log("JSON.stringify(data[0].item.brand.name): " + JSON.stringify(data[0].item.brand.name));
    let groceryListHTML = "";
    console.log("data.length:" + data.length);
    for (let i = 0; i < data.length; i++) {

        let description;
        let colorCode = "list-group-item-success";

        if (toGetList.indexOf(i) !== -1) {
            colorCode = "list-group-item-danger";
        }

        try {
            if (data[i].item.description) {
                description = data[i].item.description;
            }
        } catch (error) {
            description = "Description not available.";
        }



        groceryListHTML = groceryListHTML + "<a href='#' onClick='editList(" + i + ")' class='list-group-item pointer " + colorCode + "' data-num='" + i + "' data-name='" + description + "' >" + description + "</a>"
    }
    document.getElementById("groceryListTarget").innerHTML = groceryListHTML;
}



let groceryListOBJ = [];
async function getPostByUrl() {
    try {
        const response = await fetch("../localData/groceryList.json");
        groceryListOBJ = await response.json();



        buildList(groceryListOBJ[0].data.products);

        //writePost(bloggerData)
    } catch (error) {
        console.error("Error:", error);

    }
}
if (groceryListOBJ.length === 0) {
    getPostByUrl();
}



const filterList = () => {
    let searchFor = document.querySelector("[name='filter']").value.toLowerCase();

    [].forEach.call(document.querySelectorAll("[data-name]"), (e) => {

        console.log("e.dataset.name: " + e.dataset.name);
        if (e.dataset.name.toLowerCase().indexOf(searchFor) === -1) {
            e.classList.add("hide");
        } else {
            e.classList.remove("hide");
        }
    });
    //setSearchThis((searchThis) => name);
    // searchThis = searchFor;
}

const editList = (num) => {
    console.log("toGetList: " + toGetList)
    console.log("toGetList.indexOf(num): " + toGetList.indexOf(num))


    let tempList = [];
    if (toGetList.indexOf(num) === -1) {
        toGetList = [...toGetList, num];
        document.querySelector("[data-num='" + num + "']").classList.remove("list-group-item-success");
        document.querySelector("[data-num='" + num + "']").classList.add("list-group-item-danger");
    } else {
        document.querySelector("[data-num='" + num + "']").classList.add("list-group-item-success");
        document.querySelector("[data-num='" + num + "']").classList.remove("list-group-item-danger");
        for (let i = 0; i < toGetList.length; i++) {
            if (toGetList[i] !== num) {
                tempList = [...tempList, i];

            }
        }
        toGetList = [];
        toGetList = tempList;
    }
    let cKList = [];
    for (let i = 0; i < toGetList.length; i++) {
        if ((typeof toGetList[i]) === "number") {
            cKList = [...cKList, toGetList[i]];
        }

    }
    localStorage.setItem("toGetList", JSON.stringify(cKList));
}


async function searchForItem() {
    let whichItem = document.querySelector("[name='searchStore']").value;
    if (whichItem === "") {
        globalAlert("danger", "What are you searching for?");
        return false;
    } else {




        /*   var settings = {
               "async": true,
               "crossDomain": true,
               "url": "https://api.kroger.com/v1/products?filter.term="+whichItem+"&",
               "method": "GET",
               "headers": {
                   "Accept": "application/json",
                   "Authorization": "Bearer {{TOKEN}}"
               }
           }
   
           $.ajax(settings).done(function (response) {
               console.log(response);
           });*/



        try {
            const response = await fetch("https://api.kroger.com/v1/products?filter.term=" + whichItem + "&");
            result = await response.json();
            if (response.status > 399 && response.status < 500) {
                globalAlert("alert-danger", "ERROR response.status: " + response.status);
                return false;
            }
            if (response.status >= 500) {
                globalAlert("alert-danger", "ERROR response.status: " + response.status);
                return false;
            }
            result = result.data;
            localStorage.setItem("result", JSON.stringify(result));



        } catch (error) {
            console.log("Fetch Error: " + error);

            return false;
        }





    }
}
