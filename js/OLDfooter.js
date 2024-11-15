
[].forEach.call(document.querySelectorAll(".nav-link[data-module]"), (e) => {
    e.classList.remove("active");
});
let toggleCl = ["show", "animated", "fadeIn"];
let mobileNav = true;
let mainLinks = "";
let checkedToken = false;
let themeOptions = "<option value='default'>Select Theme</option>";
for (let i = 0; i < profile[0].themesList.length; i++) {
    themeOptions = themeOptions + "<option value='" + profile[0].themesList[i].toLocaleLowerCase() + "'>Theme: <span class='capitalize'>" + profile[0].themesList[i] + "</span></option>";
}
document.getElementById("themes").innerHTML = themeOptions;
function navigateOut(selected) {
    window.location.href = profile[0].footerLinks[selected].link;
}
(() => {
    let footerLinksHTML = "";
    for (let i = 0; i < profile[0].footerLinks.length; i++) {
        footerLinksHTML = footerLinksHTML + "<button onClick='javascript:navigateOut(" + i + ")' class='btn btn-warning'>" + profile[0].footerLinks[i].name + "</button>";
    }
    document.querySelector("#footerLinks").innerHTML = footerLinksHTML;
})();
document.getElementById("contentTitle").innerHTML = profile[0].content[0].title;
//document.getElementById("contentText").innerHTML = profile[0].content[0].text;
/*START NAVIGATING ANIMATION*/
function tadaRollover(element) {

    document
        .querySelector("[data-tada='" + element + "']")
        .classList.add("tada");
}
function tadaRollout(element) {
    document
        .querySelector("[data-tada='" + element + "']")
        .classList.remove("tada");
}

//START SOCIAL MEDIA
let socialHTML = "";
for (let i = 0; i < profile[0].socialMedia.length; i++) {
    socialHTML = socialHTML + `<a class="p-2 text-primary"  href="${profile[0].socialMedia[i].link
        }" target="_blank" title="${profile[0].socialMedia[i].link}" ><i class="${profile[0].socialMedia[i].theClass
        } animated"  onmouseover="javascript:tadaRollover('${profile[0].socialMedia[i].theClass
        }')" onmouseout="javascript:tadaRollout('${profile[0].socialMedia[i].theClass
        }')" data-tada="${profile[0].socialMedia[i].theClass
        }"></i></a>`;
}
document.querySelector("#socialList").innerHTML = socialHTML;


function toggle(element) {
    [].forEach.call(document.querySelectorAll("[data-toggle]"), function (e) {
        e.classList.add("hide");
    });

    [].forEach.call(document.querySelectorAll("[data-toggle='" + element + "']"), function (e) {
        e.classList.remove("hide");
    });
    window.location = "#info";
}

/*END GLOBAL TOGGLE FUNCTION*/


//SAVE THEME
function changeTheme() {
    let whichTheme = document.getElementById("themes").value;
    if (whichTheme === "default") {
        return false;
    }
    document.getElementById("themedStyle").setAttribute("href", "https://bootswatch.com/5/" + whichTheme + "/bootstrap.css");
    localStorage.setItem("theme", whichTheme);
    /* axios.put(profile[0].serverUrl + "/edit-theme", {
         email: userEmail,
         theme: whichTheme
     }, config).then(
         (res) => {
             document.getElementById("themedStyle").setAttribute("href", "https://bootswatch.com/5/" + whichTheme + "/bootstrap.css");
             localStorage.setItem("theme", whichTheme);
         }, (error) => {
             globalAlert("alert-danger", "Theme Change failed.");
         }
     );*/

}

if (localStorage.getItem("theme")) {
    document.getElementById("themedStyle").setAttribute("href", "https://bootswatch.com/5/" + localStorage.getItem("theme") + "/bootstrap.css");
}
