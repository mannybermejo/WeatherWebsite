console.log('Client side is loaded')

const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const message = document.querySelector('h4')
const message2 = document.querySelector('.message2')
const tempText = document.querySelector('.Temp')
const weatherText = document.querySelector('.weatherDescription')
const feelsLikesText = document.querySelector('.feelsLikes')
const rainText = document.querySelector('.rain')
const humidityText = document.querySelector('.humidity')
const uvText = document.querySelector('.uvIndex')
const windInfo = document.querySelector('.windInfo')
const visibility = document.querySelector('.visible')


const addressTitle = document.querySelector('.addressTitle')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = address.value

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
       if(data.error) {
           console.log(data.error)
       } else {

           message.innerHTML = data.location
           tempText.innerHTML = data.temp + '°'
           weatherText.innerHTML = data.overcast
           feelsLikesText.innerHTML = data.feelsLike + '°'
           rainText.innerHTML = data.rain + '%'
           humidityText.innerHTML = data.humidity + '%'
           uvText.innerHTML = data.uvIndex
           windInfo.innerHTML = data.windSpeed 
           visibility.innerHTML = data.visibility + ' mi'


       }

    })

    
})

})


