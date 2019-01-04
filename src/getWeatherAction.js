export const getWeather = (city) => {
    return (dispatch) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city.name},${city.code}&APPID=6f7f051af44ea396d568620c70082877`)
        .then(res => res.json())
        .then(data => {
            dispatch({ type: 'GET_WEATHER', data});
        })
        .catch(error => {
            dispatch({ type: 'GET_WEATHER_ERROR', error});
        })
    }
}