import React, { Component } from 'react'
import Chart from "react-apexcharts";

export default class Gradient extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            options: {
              forecastDataPoints: {
                count: 7
              },
              chart: {
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
              stroke: {
                width: 5,
                curve: 'smooth'
              },
              xaxis: {
                type: 'datetime',
                categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
                tickAmount: 10,
                labels: {
                  formatter: function(value, timestamp, opts) {
                    return opts.dateFormatter(new Date(timestamp), 'dd MMM')
                  }
                }
              },
              title: {
                text: 'Sales',
                align: 'left',
                style: {
                  fontSize: "16px",
                  color: '#666'
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  gradientToColors: [ '#FDD835'],
                  shadeIntensity: 1,
                  type: 'horizontal',
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100, 100, 100]
                },
              },
              yaxis: {
                min: -10,
                max: 40
              }
              },
              series: [{
                name: 'Sales',
                data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
              }],
            };
      }
    
    render() {
        return (
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width= '390px'
              height= '140px'
            />
        )
    }
}
