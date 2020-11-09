import React from 'react';
import ChartistGraph from "react-chartist";

var Chartist = require("chartist");
var delays = 80, durations = 500;

export default function CustomLineChart({ stat, specialStat, galaxy }){
    var statData;
    var statLabel;
    if(specialStat !== undefined && galaxy !== undefined){
        statData = [[]];
        for(var i=1; i<=8; i++){
            const planet = (galaxy-1)*8+i;
            if(specialStat[planet] === undefined) statData[0].push(0);
            else statData[0].push(specialStat[planet]);
        }

        statLabel = 
        [`Planet ${(galaxy-1)*8+1}`, `Planet ${(galaxy-1)*8+2}`, `Planet ${(galaxy-1)*8+3}`, `Planet ${(galaxy-1)*8+4}`,
         `Planet ${(galaxy-1)*8+5}`, `Planet ${(galaxy-1)*8+6}`, `Planet ${(galaxy-1)*8+7}`, `Planet ${(galaxy-1)*8+8}`];

    } else {
        statData = stat.data;
        statLabel = stat.label;
    }

    const chart = {
        data: {
        labels: statLabel,
        series: statData
        },
        options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
        },
        // for animation
        animation: {
        draw: function(data) {
            if (data.type === "line" || data.type === "area") {
            data.element.animate({
                d: {
                begin: 600,
                dur: 700,
                from: data.path
                    .clone()
                    .scale(1, 0)
                    .translate(0, data.chartRect.height())
                    .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
                }
            });
            } else if (data.type === "point") {
            data.element.animate({
                opacity: {
                begin: (data.index + 1) * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: "ease"
                }
            });
            }
        }
        }
    };

    return <ChartistGraph
            className="ct-chart"
            data={chart.data}
            type="Line"
            options={chart.options}
            listener={chart.animation}
        />

}