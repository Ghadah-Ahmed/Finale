import React, { Component } from 'react'
import Chart from "react-apexcharts";

function generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
  
      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  
  function getRandom() {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  }
    
export default class Bubble extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            options: {
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
                plotOptions: {
                  bubble: {
                    dataLabels: {
                      enabled: false
                    }
                  }
                },
                colors: ["#734CEA", "#34bfa3", "#f4516c", "#00c5dc"],
                fill: {
                  opacity: 0.8,
                  gradient: {
                    enabled: false
                  }
                },
                title: {
                  text: 'Social Media Reach'
                },
                xaxis: {
                  tickAmount: 12,
                  type: 'category',
                  min: -50,
                  max: 850
                },
                yaxis: {
                  max: 70
                }
              },
              series: [{
                name: 'Facebook',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                  min: 10,
                  max: 60
                })
              },
              {
                name: 'Twitter',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                  min: 10,
                  max: 60
                })
              },
              {
                name: 'Youtube',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                  min: 10,
                  max: 60
                })
              },
              {
                name: 'LinkedIn',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                  min: 10,
                  max: 60
                })
              }
            ]  
        }
      }
    render() {
        return (
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bubble"
              width= '390px'
              height= '140px'
            />
        )
    }
}
