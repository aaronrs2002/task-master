
var options = {
    series: [
        {
            data: []
        }
    ],
    chart: {
        height: 350,
        type: 'rangeBar'
    },

    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    xaxis: {
        type: 'datetime'
    }
};


const runTimeline = () => {
    let colorList = ["#008FFB", "#775DD0", "#FEB019", "#FF4560", "#50E2F2", "#262118"];

    if (localStorage.getItem("taskList")) {
        tempTaskList = JSON.parse(localStorage.getItem("taskList"));
    }

    console.log("JSON.stringify(tempTaskList): " + JSON.stringify(tempTaskList));
    document.querySelector("#chart").innerHTML = "<div class='loader'></div>";
    console.log("tempTaskList[0].task: " + tempTaskList[0].task);
    console.log("tempTaskList.length: " + tempTaskList.length);
    let removeExample = [];
    if (tempTaskList[0].task !== "example task") {
        options.series[0].data = [];
        document.querySelector("#chart").innerHTML = "";
        /* for (let i = 0; i < tempTaskList.length.length; i++) {
            if (tempTaskList[0].task !== "example task") {
                removeExample.push(tempTaskList[i])
            }

        }
        tempTaskList = removeExample;
        console.log("tempTaskList[0].task " + tempTaskList[0].task + " - was weeded out");*/
        console.log("tempTaskList: " + JSON.stringify(tempTaskList));
    }


    let tempNames = [];
    for (let i = 0; i < tempTaskList.length; i++) {
        if (tempNames.indexOf(tempTaskList[i].task) === -1) {


            let tempEndYr = tempTaskList[i].details.substring(tempTaskList[i].details.length - 4, tempTaskList[i].details.length);
            let tempEndDy = tempTaskList[i].details.substring(tempTaskList[i].details.indexOf(":") + 4, tempTaskList[i].details.indexOf(":") + 6);
            let tempEndMo = tempTaskList[i].details.substring(tempTaskList[i].details.indexOf(":") + 1, tempTaskList[i].details.indexOf(":") + 3);
            let tempEndStr = tempEndYr + "-" + tempEndMo + "-" + tempEndDy;
            options.series[0].data = [...options.series[0].data, {//'2019-03-12'
                x: tempTaskList[i].task, y: [new Date(timeStamp()).getTime(),
                new Date(tempEndStr).getTime()],
                fillColor: colorList[Math.floor(Math.random() * colorList.length)]
            }];
            document.querySelector("#chart").innerHTML = "";

            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
            tempNames.push(tempTaskList[i].task);




        }



    }
    return false;


}

runTimeline();

