const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8796d5ebb97b615fb2bbbcd7db7be0e2&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m';
    request({ url, json: true }, (error, {body: {error:bodyError, current: {weather_descriptions, temperature, feelslike, humidity}}} = {}) => {
        if (error) {
            callback('Unable to connect server')
        } else if (bodyError) {
            callback('Unable to find location!')
        }
        else {
           callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature +' degree out. It feels like '+ feelslike +' degress out.' + ' Humitdity here is ' + humidity) 
        }
    })

}

module.exports = forecast