import React, { Component } from 'react'
import Day from './Day'
import { connect } from 'react-redux'
import { getWeather } from '../getWeatherAction'
import TempChart from './TempChart'

class Home extends Component {
  state = { 
      name:'krakow',
      code:'pl',
  }
  componentDidMount(){
    this.props.getWeather(this.state)  
  }
  handlerChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handlerClick = (e) => {
    e.preventDefault();
    if (this.state.name.length > 0 && this.state.code.length > 0){
      this.props.getWeather(this.state);
    } else {
      this.props.formError();
    }
  }
  render() {
   const { data } = this.props

    return (
      <div className="container row">
        
        <div className="card red-white col s12 m12 l12"> 
          <form action="" onSubmit={this.handlerClick}>
            <div className="input-field col s12 m6 ">
              <textarea id="name" className="materialize-textarea" onChange={this.handlerChange}></textarea>
              <label htmlFor="name">City Name</label>
            </div>
            <div className="input-field col s6 m4">
              <textarea id="code" className="materialize-textarea" onChange={this.handlerChange}></textarea>
              <label htmlFor="code">Country Code</label>
            </div>
            <div className="input-field col s6 m2">
              <div className="waves-effect waves-light btn-large light-blue lighten-2" onClick={this.handlerClick}><i className="material-icons">search</i></div>
            </div>
          </form>
        </div>

        { data.Error ? <div className="red-text col s12 m12 l12">{data.Error}</div> : null}

        <div className="card col s12 m12 l12">       
          { data.days && data.days.map(day => {
              if (day.date.length !== 0) {
                return <TempChart day={day} key={day.id}/>
              } else {
                return null
              }
            })}
        </div>

        { data.days && data.days.map(day => {
            if (day.date.length !== 0) {
              return <Day day={day} key={day.id}/>
            } else {
              return null
            }
          })}
      
      </div>
        
    )
  }
}

const mapStateToProps = (state) => {
  return{
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: (city) => { dispatch(getWeather(city)) },  
    formError: () => { dispatch({ type: 'FORM_ERROR'}) } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
