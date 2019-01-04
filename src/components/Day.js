import React from 'react'
import { connect } from 'react-redux'

const Day = (props) => {

  return (
   // className={props.chart === props.day.name ? 'active': null} 
   
      //// dynamic check and add class to card
      <div className={`card day col s6 m3 l2 ${props.chart === props.day.name ? 'active': null}`} onClick={() => {props.changeChart(props.day)}}>
                <div className="card-content">
                  <div className="title flow-text">{props.day.name}</div>
                  <img src={require(`../img/weather-cloudy.png`)} alt="icon"></img>
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
