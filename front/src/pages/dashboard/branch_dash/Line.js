import React, { Component } from "react";
import Chart from "react-apexcharts";

class Line extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
            id: "basic-bar",
            sparkline: {
                enabled: true
              },
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
              },
              export: {
                csv: {
                  filename: undefined,
                  columnDelimiter: ',',
                  headerCategory: 'category',
                  headerValue: 'value',
                  dateFormatter(timestamp) {
                    return new Date(timestamp).toDateString()
                  }
                },
                svg: {
                  filename: undefined,
                },
                png: {
                  filename: undefined,
                }
              },
              autoSelected: 'zoom' 
            },
        },          
        title: {
            text: 'Best Sales',
            align: 'left',
            style: {
              fontSize: "16px",
              color: '#666'
            }
          },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }, 
        fill: {
          colors: ["#F44336"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        }
      ]
    };
  }

  render() {
    return (
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width= '390px'
              height= '140px'
            />
    );
  }
}

export default Line;