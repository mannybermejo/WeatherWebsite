const request = require('request')


const location = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFubnliZXJtZWpvIiwiYSI6ImNrMjBtMnRyaTAxazAzaG1scnZmc3Z2NmwifQ.7j1KZvSmY3maS6Z1STeFpg&limit=1'
    
    request({ url: url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to mapbox service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                locationName: body.features[0].place_name
            })

        }

    })
}

module.exports = {
    location
}