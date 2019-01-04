import moment from 'moment'

const initState = {
    chart: "",  // this variables control which chart is active and which card day has class active(border)
    country: '', cityName: '', Error: null
}
const rootReducer = (state = initState, action) => {
    if (action.type === 'GET_WEATHER'){
        console.log(action.data)
        const array = action.data.list
        
        //////// editing response from OpenWeatherMap APPI to get and set 3arrays in each day (data=time(every3hours/min-temp/max-temp) ) to put in Chart

        const MonArr ={date:[], temp_min:[], temp_max:[], weather: [], day: 'Monday', name: 'Mon', id: 1}
        const TueArr ={date:[], temp_min:[], temp_max:[], weather: [], day: 'Tuesday', name: 'Tue', id: 2}
        const WedArr ={date:[], temp_min:[], temp_max:[], weather: [], day: 'Wednesday', name: 'Wed', id: 3}
        const ThuArr ={date:[], temp_min:[], temp_max:[], weather: [], day: 'Thursday', name: 'Thu', id: 4}
        const FriArr ={date:[], temp_min:[], temp_max:[], weather: [], day: 'Friday', name: 'Fri', id: 5}
        const SatArr ={date:[], temp_min:[], temp_max:[], weather: [], day: 'Saturday', name: 'Sat', id: 6}
        const SunArr ={date:[], temp_min:[], temp_max:[], weather: [], day: 'Sunday', name: 'Sun', id: 7}

        for(let i=0;i<array.length;i++){

            function convert(day, i){
                day.date.push(moment(new Date(array[i].dt_txt)).format('LT'));
                day.temp_min.push((Math.round((array[i].main.temp_min - 273.15) * 100)/100).toFixed(1));
                day.temp_max.push(Number((Math.round((array[i].main.temp_max - 273.15) * 100)/100).toFixed(1)));
                day.weather.push(array[i].weather[0].main);

                day.chart_discri_day = moment(new Date(array[i].dt_txt)).format('LL');
            }

            if (new Date(array[i].dt_txt).getDay() === 0) {
                convert(SunArr, i)
            } else if (new Date(array[i].dt_txt).getDay() === 1) {
                convert(MonArr, i)
            } else if (new Date(array[i].dt_txt).getDay() === 2) {
                convert(TueArr, i)
            } else if (new Date(array[i].dt_txt).getDay() === 3) {
                convert(WedArr, i)
            } else if (new Date(array[i].dt_txt).getDay() === 4) {
                convert(ThuArr, i)
            } else if (new Date(array[i].dt_txt).getDay() === 5) {
                convert(FriArr, i)
            } else if (new Date(array[i].dt_txt).getDay() === 6) {
                convert(SatArr, i)
            } 
        }
        const actualday = new Date(array[0].dt_txt).getDay() ///// this valuue is from 0-6 which mean 0 = Sunday, 1 = Monday... so on

        ///// When i requesting data from appi i am getting data which are started from actual day and time, so i wanted to display cards from actual day / returning ordered data which depends from data which i get
        if (actualday === 0) {
            return {
                ...state,
              days: [{...SunArr}, {...MonArr},{...TueArr},{...WedArr},{...ThuArr},{...FriArr},{...SatArr}],
              chart: 'Sun',
              country: action.data.city.country, cityName: action.data.city.name, Error: null
            }
        } else if (actualday === 1) {
            return {
                ...state,
              days: [{...MonArr},{...TueArr},{...WedArr},{...ThuArr},{...FriArr},{...SatArr},{...SunArr}],
              chart: 'Mon',
              country: action.data.city.country, cityName: action.data.city.name, Error: null
            }
        } else if (actualday === 2) {
            return {
                ...state,
              days: [{...TueArr},{...WedArr},{...ThuArr},{...FriArr},{...SatArr},{...SunArr},{...MonArr}],
              chart: 'Tue',
              country: action.data.city.country, cityName: action.data.city.name, Error: null
            }
        } else if (actualday === 3) {
            return {
                ...state,
              days: [{...WedArr},{...ThuArr},{...FriArr},{...SatArr},{...SunArr},{...MonArr},{...TueArr}],
              chart: 'Wed',
              country: action.data.city.country, cityName: action.data.city.name, Error: null
            }
        } else if (actualday === 4) {
            return {
                ...state,
              days: [{...ThuArr},{...FriArr},{...SatArr},{...SunArr}, {...MonArr},{...TueArr},{...WedArr}],
              chart: 'Thu',
              country: action.data.city.country, cityName: action.data.city.name, Error: null
            }
        } else if (actualday === 5) {
            return {
                ...state,
              days: [{...FriArr},{...SatArr},{...SunArr}, {...MonArr},{...TueArr},{...WedArr},{...ThuArr}],
              chart: 'Fri',
              country: action.data.city.country, cityName: action.data.city.name, Error: null
            }
        } else if (actualday === 6) {
            return {
                ...state,
              days: [{...SatArr},{...SunArr}, {...MonArr},{...TueArr},{...WedArr},{...ThuArr},{...FriArr}],
              chart: 'Sat',
              country: action.data.city.country, cityName: action.data.city.name, Error: null
            }
        } else {
            return state
        }
     

    } else if (action.type === 'GET_WEATHER_ERROR') {
        console.log('Get weather ERROR', action.error)
        return {
            ...state,
            Error: 'City not found'
        }
    } else if (action.type === 'FORM_ERROR') {
        console.log('form error')
        return {
            ...state,
            Error: 'You must fill all inputs'
        }
    } else if (action.type === 'CHANGE_CHART') {
        console.log('chart changed')
        return {
            ...state,
            chart: action.day.name
        }
    } else {
        return state
    }
}

export default rootReducer