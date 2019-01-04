import React from 'react'
import Chart from "react-apexcharts";
import { connect } from 'react-redux'

const TempChart = (props) => {
  
  const { data } = props

  const chartData = {
    options: {
      chart: {
        shadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 1
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: data.cityName + " - " + data.country,
        align: 'left',
        offsetY: 10,
        offsetX: 30,
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        
        size: 6
      },
      xaxis: {
        categories: props.day.date,
          title: {
            text: props.day.day + " - " + props.day.chart_discri_day,
            style: {
                fontSize:  '20px',
                color:  '#263238'
              }
          }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        min: Math.round(Math.min(...props.day.temp_min)) - 2,
        max: Math.round(Math.max(...props.day.temp_max)) + 2,
        labels: {
              formatter: function (y) {
                  return Math.round(y) + "°";
              }
          }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -30,
        offsetX: 0
      }
    },
    series: [
      {
          name: "Max temp",
          data: props.day.temp_max
      },
      {
          name: "Min temp",
          data: props.day.temp_min
      }

    ],
  }

///////////////////////////////////////////////////////////

  if (data.chart === props.day.name) {
      return (

          <div id="chart">
              <Chart options={chartData.options} series={chartData.series} type="line" height="350" />
          </div>
        
      )
  } else {
      return null
  }
        
}

const mapStateToProps = (state) => {
    return {
        data: state,

        
    }
}

export default connect(mapStateToProps)(TempChart)