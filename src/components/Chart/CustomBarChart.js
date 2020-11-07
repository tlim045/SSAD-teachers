import React from 'react';
import ChartistGraph from "react-chartist";

var delays2 = 80, durations2 = 500;

export default function CustomBarChart({ galaxy, stat }){
    const chart = {
        data: {
          labels: stat.label,
          series: stat.data
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 10,
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
        animation: {
          draw: function(data) {
            if (data.type === "bar") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays2,
                  dur: durations2,
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
            type="Bar"
            options={chart.options}
            listener={chart.animation}
            
        />
}