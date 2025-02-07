
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


    if (localStorage.getItem("taskList")) {
        document.querySelector("#chart").innerHTML = "<div class='loader'></div>";
        let tempTaskList = JSON.parse(localStorage.getItem("taskList"));
        let tempNames = [];
        for (let i = 0; i < tempTaskList.length; i++) {
            if (tempNames.indexOf(tempTaskList[i].task) === -1) {
                let tempEndYr = tempTaskList[i].details.substring(tempTaskList[i].details.length - 4, tempTaskList[i].details.length);

                let tempEndDy = tempTaskList[i].details.substring(tempTaskList[i].details.indexOf(":") + 4, tempTaskList[i].details.indexOf(":") + 6);

                let tempEndMo = tempTaskList[i].details.substring(tempTaskList[i].details.indexOf(":") + 1, tempTaskList[i].details.indexOf(":") + 3);

                let tempEndStr = tempEndYr + "-" + tempEndMo + "-" + tempEndDy;
                console.log("tempEndStr: " + tempEndStr);
                console.log("tempEndYr: " + tempEndYr);
                console.log("tempEndMo: " + tempEndMo);
                console.log("tempEndDy: " + tempEndDy);
                options.series[0].data = [...options.series[0].data, {//'2019-03-12'
                    x: tempTaskList[i].task, y: [new Date(timeStamp()).getTime(),
                    new Date(tempEndStr).getTime()]
                }];
                document.querySelector("#chart").innerHTML = "";

                var chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();
                tempNames.push(tempTaskList[i].task);




            }



        }
        return false;
    } else {
        globalAlert("alert-info", "We have no data for the timeline yet.");
    }


}

runTimeline();

