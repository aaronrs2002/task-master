//let gaParam = "";
//let url = window.location;

const profile = [{
    serverUrl: "http://localhost:5000",
    companyWebsite: "https://web-presence.biz/",
    companyName: "Web-Presence LLC",
    companyAddress: "YOUR ADDRESS",
    userEmail: "YOUR@EMAIL.COM",
    companyEmail: "INFO@YOUR-COMPANY.biz",
    companyPhone: "555-555-5555",
    companyLogo: "https://web-presence.biz/img/MA_Logo.png",
    relay: "../endpoint/EmailRelay.php",
    client_id: "webpresencegrocerygetter-",
    client_sec: "reobU7igp",
    socialMedia: [
        { link: "https://www.linkedin.com/in/aaronrs2002", theClass: "fab fa-linkedin" },
        { link: "https://github.com/aaronrs2002", theClass: "fab fa-github" },
        { link: "https://www.youtube.com/@web-presence-developer", theClass: "fab fa-youtube" },
        { link: "https://www.instagram.com/aaronrs2002/", theClass: "fab fa-instagram" },
        { link: "mailto:aaron@web-presence.biz", theClass: "far fa-paper-plane" }
    ],
    footerLinks: [
        { link: "https://aaronrs2002.github.io/black-jack/?" + gaParam + "&", name: "21" },
        { link: "https://aaronrs2002.github.io/texas-holdem/?" + gaParam + "&", name: "Poker" },
        { link: "https://aaronrs2002.github.io/bingo/?" + gaParam + "&", name: "Bingo" },
        { link: "https://aaronrs2002.github.io/javascript-slot-machine/index.html?" + gaParam + "&", name: "Slots" },
        { link: "https://aaronrs2002.github.io/word-game/?" + gaParam + "&", name: "WordFun" }],
    content: [{
        title: "TASK-MASTER",
        text: "This application runs off local storage in your browser. Remember to \"download\" your \"todo list\" data before you clear your browser cache. Task-Master is a versatile to-do list application built with vanilla JavaScript. It tracks upcoming events by counting down the days until they arrive. Integrated with the popular \"js- datepicker, \" events are color-coded to indicate priority levels, helping users easily manage urgent tasks. Data is stored locally, and the app allows users to share their task lists through simple download and upload features, making it convenient for collaborative task management.",
    },

        /* {
             title: "settings",
             text: "default",
         }
             ,
         {
             title: "contact",
             text: "default",
         }*/
    ],
    themesList: ["Spacelab", "United", "Slate", "Cerulean", "Darkly", "Litera", "Materia", "Sandstone", "Superhero", "Cosmo", "Flatly", "Lumen", "Minty", "Simplex", "Solar", "Cyborg", "Journal", "Lux", "Pulse", "Sketchy", "Yeti", "Morph", "Quartz", "Vapor", "Zephyr"]


}];

//ADD BRAND
[].forEach.call(document.querySelectorAll(".companyLogo"), (e) => {
    e.setAttribute("src", profile[0].companyLogo);
});

[].forEach.call(document.querySelectorAll(".companyName"), (e) => {
    e.innerHTML = profile[0].companyName;
});

[].forEach.call(document.querySelectorAll(".companyWebsite"), (e) => {
    e.innerHTML = profile[0].companyName;
    e.setAttribute("href", profile[0].companyWebsite);
});

[].forEach.call(document.querySelectorAll(".companyPhone"), (e) => {
    e.innerHTML = profile[0].companyPhone;
});

[].forEach.call(document.querySelectorAll(".companyAddress"), (e) => {
    e.innerHTML = profile[0].companyAddress;
});
[].forEach.call(document.querySelectorAll(".companyEmail"), (e) => {
    e.innerHTML = profile[0].companyEmail;
});
[].forEach.call(document.querySelectorAll(".companyStorageInfo"), (e) => {
    e.innerHTML = profile[0].content[0].text;
})

/*
                <div class='col-md-12'><ul class='list-unstyled' id='groceryListTarget'></ul></div>

*/
