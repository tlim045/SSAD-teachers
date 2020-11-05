import React from 'react';
import ChartistGraph from "react-chartist";

var Chartist = require("chartist");
var delays = 80, durations = 500;

export default function CustomLineChart({ stat }){
    const chart = {
        data: {
        labels: stat.label,
        series: stat.data 
        },
        options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
        },
        // for animation
        // animation: {
        // draw: function(data) {
        //     if (data.type === "line" || data.type === "area") {
        //     data.element.animate({
        //         d: {
        //         begin: 600,
        //         dur: 700,
        //         from: data.path
        //             .clone()
        //             .scale(1, 0)
        //             .translate(0, data.chartRect.height())
        //             .stringify(),
        //         to: data.path.clone().stringify(),
        //         easing: Chartist.Svg.Easing.easeOutQuint
        //         }
        //     });
        //     } else if (data.type === "point") {
        //     data.element.animate({
        //         opacity: {
        //         begin: (data.index + 1) * delays,
        //         dur: durations,
        //         from: 0,
        //         to: 1,
        //         easing: "ease"
        //         }
        //     });
        //     }
        // }
        // }
    };

    return <ChartistGraph
            className="ct-chart"
            data={chart.data}
            type="Line"
            options={chart.options}
            listener={chart.animation}
        />

}