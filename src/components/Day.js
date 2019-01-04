import React from 'react'
import { connect } from 'react-redux'

const Day = (props) => {

///// filter which value in Array appearing the most time / coz i getting for every 3h weather, discription/main-weather-status in array for each day
  function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}
const mostAppearingDiscriptionInArray = mode(props.day.weather.slice()) // get new array from 'props.day.weather' array and do function on it

console.log(mostAppearingDiscriptionInArray, props.day.name)


///// returing string which prevent diffrent weather icons loading
//// standard weather mian/discription which i can get from API
const whichIconNumberLoad = () => {
  if (mostAppearingDiscriptionInArray === 'Light snow'){
    return 'snowy'
  } else if (mostAppearingDiscriptionInArray === 'Clear'){
    return 'sunny'
  } else if (mostAppearingDiscriptionInArray === 'Clouds'){
    return 'partlycloudy'
  } else if (mostAppearingDiscriptionInArray === 'Scattered clouds'){
    return 'cloudy'
  } else if (mostAppearingDiscriptionInArray === 'Shower rain'){
    return 'pouring'
  } else if (mostAppearingDiscriptionInArray === 'Rain'){
    return 'pouring'
  } else if (mostAppearingDiscriptionInArray === 'Thunderstorm'){
    return 'lightning'
  } else if (mostAppearingDiscriptionInArray === 'Snow'){
    return 'snowy'
  } else {
    return 'cloudy'
  }
}
  return (
   // className={props.chart === props.day.name ? 'active': null} 
   
      //// dynamic check and add class to card
      <div className={`card day col s6 m3 l2 ${props.chart === props.day.name ? 'active': null}`} onClick={() => {props.changeChart(props.day)}}>
                <div className="card-content">
                  <div className="title flow-text">{props.day.name}</div>
                  <img src={require(`../img/weather-${whichIconNumberLoad()}.png`)} alt="icon"></img>
                  <div className="temp flow-text">
                      <span className="high">{Math.round(Math.max(...props.day.temp_max))}°</span>
                      <span className="low">{Math.round(Math.min(...props.day.temp_min))}°</span>
                  </div>
                </div>
            </div>
  )
}

const mapStateToProps = (state) => {
  return {
    chart: state.chart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeChart: (day) => { dispatch({type: 'CHANGE_CHART', day: day }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Day)
