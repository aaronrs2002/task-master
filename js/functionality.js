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
    console.log("data.length:" + data.length)
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

/*

"item": {
                        "alcoholFlag": false,
                        "brand": {
                            "name": "Nature Valley",
                            "code": "3422"
                        },
                        "bounceFlag": false,
                        "categories": [
                            {
                                "code": "37",
                                "name": "Snacks"
                            }
                        ],
                        "clickListItem": true,
                        "countriesOfOrigin": "UNITED STATES",
                        "customerFacingSize": "12 ct",
                        "description": "Nature Valley Crunchy Granola Bars Variety Pack",
                        "dimensions": {
                            "height": "5.62 [in_i]",
                            "width": "6.43 [in_i]",
                            "length": "1.89 [in_i]"
                        },
                        "familyCode": [
                            "426",
                            "451"
                        ],
                        "familyTree": {
                            "commodity": {
                                "code": "056",
                                "name": "CNV BREAKFAST&WHOLESOME SNKS"
                            },
                            "department": {
                                "code": "01",
                                "name": "GROC-ALL OTHER"
                            },
                            "subCommodity": {
                                "code": "27601",
                                "name": "GRANOLA BARS WITH FLOUR"
                            }
                        },
                        "hazmatFlag": false,
                        "homeDeliveryItem": true,
                        "images": [
                            {
                                "perspective": "right",
                                "url": "https://www.kroger.com/product/images/xlarge/right/0001600041126",
                                "size": "xlarge"
                            },
                            {
                                "perspective": "right",
                                "url": "https://www.kroger.com/product/images/large/right/0001600041126",
                                "size": "large"
                            },
                            {
                                "perspective": "right",
                                "url": "https://www.kroger.com/product/images/medium/right/0001600041126",
                                "size": "medium"
                            },
                            {
                                "perspective": "right",
                                "url": "https://www.kroger.com/product/images/small/right/0001600041126",
                                "size": "small"
                            },
                            {
                                "perspective": "right",
                                "url": "https://www.kroger.com/product/images/thumbnail/right/0001600041126",
                                "size": "thumbnail"
                            },
                            {
                                "perspective": "back",
                                "url": "https://www.kroger.com/product/images/xlarge/back/0001600041126",
                                "size": "xlarge"
                            },
                            {
                                "perspective": "back",
                                "url": "https://www.kroger.com/product/images/large/back/0001600041126",
                                "size": "large"
                            },
                            {
                                "perspective": "back",
                                "url": "https://www.kroger.com/product/images/medium/back/0001600041126",
                                "size": "medium"
                            },
                            {
                                "perspective": "back",
                                "url": "https://www.kroger.com/product/images/small/back/0001600041126",
                                "size": "small"
                            },
                            {
                                "perspective": "back",
                                "url": "https://www.kroger.com/product/images/thumbnail/back/0001600041126",
                                "size": "thumbnail"
                            },
                            {
                                "perspective": "front",
                                "url": "https://www.kroger.com/product/images/xlarge/front/0001600041126",
                                "size": "xlarge"
                            },
                            {
                                "perspective": "front",
                                "url": "https://www.kroger.com/product/images/large/front/0001600041126",
                                "size": "large"
                            },
                            {
                                "perspective": "front",
                                "url": "https://www.kroger.com/product/images/medium/front/0001600041126",
                                "size": "medium"
                            },
                            {
                                "perspective": "front",
                                "url": "https://www.kroger.com/product/images/small/front/0001600041126",
                                "size": "small"
                            },
                            {
                                "perspective": "front",
                                "url": "https://www.kroger.com/product/images/thumbnail/front/0001600041126",
                                "size": "thumbnail"
                            },
                            {
                                "perspective": "bottom",
                                "url": "https://www.kroger.com/product/images/xlarge/bottom/0001600041126",
                                "size": "xlarge"
                            },
                            {
                                "perspective": "bottom",
                                "url": "https://www.kroger.com/product/images/large/bottom/0001600041126",
                                "size": "large"
                            },
                            {
                                "perspective": "bottom",
                                "url": "https://www.kroger.com/product/images/medium/bottom/0001600041126",
                                "size": "medium"
                            },
                            {
                                "perspective": "bottom",
                                "url": "https://www.kroger.com/product/images/small/bottom/0001600041126",
                                "size": "small"
                            },
                            {
                                "perspective": "bottom",
                                "url": "https://www.kroger.com/product/images/thumbnail/bottom/0001600041126",
                                "size": "thumbnail"
                            },
                            {
                                "perspective": "left",
                                "url": "https://www.kroger.com/product/images/xlarge/left/0001600041126",
                                "size": "xlarge"
                            },
                            {
                                "perspective": "left",
                                "url": "https://www.kroger.com/product/images/large/left/0001600041126",
                                "size": "large"
                            },
                            {
                                "perspective": "left",
                                "url": "https://www.kroger.com/product/images/medium/left/0001600041126",
                                "size": "medium"
                            },
                            {
                                "perspective": "left",
                                "url": "https://www.kroger.com/product/images/small/left/0001600041126",
                                "size": "small"
                            },
                            {
                                "perspective": "left",
                                "url": "https://www.kroger.com/product/images/thumbnail/left/0001600041126",
                                "size": "thumbnail"
                            },
                            {
                                "perspective": "top",
                                "url": "https://www.kroger.com/product/images/xlarge/top/0001600041126",
                                "size": "xlarge"
                            },
                            {
                                "perspective": "top",
                                "url": "https://www.kroger.com/product/images/large/top/0001600041126",
                                "size": "large"
                            },
                            {
                                "perspective": "top",
                                "url": "https://www.kroger.com/product/images/medium/top/0001600041126",
                                "size": "medium"
                            },
                            {
                                "perspective": "top",
                                "url": "https://www.kroger.com/product/images/small/top/0001600041126",
                                "size": "small"
                            },
                            {
                                "perspective": "top",
                                "url": "https://www.kroger.com/product/images/thumbnail/top/0001600041126",
                                "size": "thumbnail"
                            }
                        ],
                        "mainImagePerspective": "front",
                        "privacyRestricted": false,
                        "privacyRestrictedStates": [],
                        "prop65": {
                            "required": false
                        },
                        "ratingsAndReviewsAggregate": {
                            "averageRating": 2.75,
                            "numOfFiveStarRating": 1,
                            "numOfFourStarRating": 0,
                            "numOfOneStarRating": 1,
                            "numOfThreeStarRating": 1,
                            "numOfTwoStarRating": 1,
                            "numberOfReviews": 4
                        },
                        "romanceDescription": "<p>The Original Crunch. Nature Valley Crunchy Variety Pack includes Oats 'n Honey, Peanut Butter and Oats ‘n Dark Chocolate Granola bars. There are no artificial flavors, colors, or sweeteners and they're made with whole grains (20g whole grain per serving; at least 48g recommended daily). Includes six, two-bar pouches, 12 bars total; four Oats 'n Honey, four Peanut Butter, four Oats ‘n Dark Chocolate.</p><ul><li>CRUNCHY GRANOLA BARS: These snack bars combine delicious whole grain oats with wholesome ingredients; 20g whole grain per serving; at least 48g recommended daily</li><li>VARIETY PACK: Mix it up with a variety pack of delicious crunchy bars in a choice of flavors; Oats 'n Honey; Peanut Butter; and Oats 'n Dark Chocolate</li><li>PERFECTLY PORTABLE: Easy bars for snack time or an on the go invigorating treat; Perfect as a part of breakfast; for the pantry; lunch box; and hiking trail</li><li>BREAKFAST SNACK: Hearty whole grain oats with no artificial flavors; artificial colors; or high fructose corn syrup</li><li>CONTAINS: One 8.94 oz Variety Pack of Nature Valley Crunchy Granola Bars; six; two bar pouches; 12 bars total; four Oats 'n Honey; four Peanut Butter; four Oats 'n Dark Chocolate</li></ul>",
                        "seoDescription": "nature-valley-crunchy-granola-bars-variety-pack",
                        "shipToHomeItem": false,
                        "snapEligible": true,
                        "soldInStore": true,
                        "tareValue": 0,
                        "taxGroupCode": "PF050109",
                        "taxonomies": [
                            {
                                "commodity": {
                                    "code": "020",
                                    "name": "Snacks"
                                },
                                "department": {
                                    "code": "01",
                                    "name": "Pantry"
                                },
                                "subCommodity": {
                                    "code": "00027",
                                    "name": "Granola Bars"
                                }
                            }
                        ],
                        "itemTypeCode": "0",
                        "temperatureIndicator": "55688103654",
                        "upc": "0001600041126",
                        "verified": true,
                        "weight": "0.56 [lb_av]"
                    },



*/