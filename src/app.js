const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const addressLocation = require('./utils/currentLocation.js')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    addressLocation.addressLocation(({latitude, longitude, cityLocation} = {}) => {


       forecast.forecast(latitude, longitude, (error, {temp, feelsLike, rain, overcast, humidity, uvIndex, windSpeed, visibility} = {}) => {

        res.render('index', {
            title: cityLocation,
            currentTemp: temp,
            feelsLikes: feelsLike,
            homeRain: rain,
            homeHumidity: humidity,
            homeUvIndex: uvIndex,
            homeWindInfo: windSpeed,
            homeV: visibility,
            weatherDescription: overcast,
            name: 'Manuel Bermejo'
        })
    })

       })




    
})


app.get('/products', (req, res) => {
    addressLocation.addressLocation((data) => {
        res.send({
            ip: data.ip
        })
    })

})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide address!'
        })
    }
    geocode.location(req.query.address, (error, { latitude, longitude, locationName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast.forecast(latitude, longitude, (error, {temp, rain, overcast, feelsLike, humidity, uvIndex, windSpeed, visibility } = {}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                temp,
                feelsLike,
                rain,
                overcast,
                humidity,
                uvIndex,
                windSpeed,
                visibility,
                location: locationName,

            })
            
        })
    })

    // res.send({
    //     forecast: 'It is cold',
    //     location: req.query.address
    // })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Manuel Bermejo'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manuel Bermejo',
        errorMessage: 'Help article not found'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Manuel Bermejo'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manuel Bermejo',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server has started on port 3000')
})
