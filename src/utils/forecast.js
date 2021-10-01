const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=da69ae604322ca0c5b6ad961cb2e8084&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json: true}, (error, { body } = {}) => {
    if (error) {
        callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
        callback('Unable to fetch location', undefined)
    } else {
        callback(undefined, {
            temp:  body.current.temperature,
            feelsLike: body.current.feelslike,
            rain: body.current.precip,
            humidity: body.current.humidity,
            uvIndex: body.current.uv_index,
            windSpeed: body.current.wind_speed,
            visibility: body.current.visibility,

            overcast: body.current.weather_descriptions[0]
        })
    }
    
})

}

module.exports = {
    forecast
}