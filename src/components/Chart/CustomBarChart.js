import React from 'react';
import ChartistGraph from "react-chartist";

var delays2 = 80, durations2 = 500;

export default function CustomBarChart({ galaxy, data }){
    const chart = {
        data: {
          labels: [
            "Planet 1",
            "Planet 2",
            "Planet 3",
            "Planet 4",
            "Planet 5",
            "Planet 6",
            "Planet 7",
            "Planet 8"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ],
        // animation: {
        //   draw: function(data) {
        //     if (data.type === "bar") {
        //       data.element.animate({
        //         opacity: {
        //           begin: (data.index + 1) * delays2,
        //           dur: durations2,
        //           from: 0,
        //           to: 1,
        //           easing: "ease"
        //         }
        //       });
        //     }
        //   }
        // }
      };
    

    return <ChartistGraph
            className="ct-chart"
            data={chart.data}
            type="Bar"
            options={chart.options}
            listener={chart.animation}
            
        />
}