const request = require('request')



const addressLocation = (callback) => {
    const url = 'https://geo.ipify.org/api/v1?apiKey=at_zrNPx5pV3ZV5lJJ3Zg3GqkGfbsP7r'

request({ url, json:true}, (error, response) => {
    callback({
        ip: response.body.ip,
        cityLocation: response.body.location.city,
        latitude: response.body.location.lat,
        longitude: response.body.location.lng
    })
})
}

module.exports = {
    addressLocation
}