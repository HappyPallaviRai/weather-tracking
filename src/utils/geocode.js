const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicGFsbGF2aTEwOTIxIiwiYSI6ImNrcXJ3YmQ0azExc2syb28xYTZlbzFyMHoifQ.9A2Ex692sf74k1pT8b98BA&limit=1'
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
        callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Not a valid location!', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
})
}

module.exports = geocode