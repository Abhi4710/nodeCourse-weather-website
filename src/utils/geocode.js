const request = require('request')

// callback functon to get geocode for a location.
// encodeURIComponent : returns a string. Using in case we want to include special character in the url ex: [?] which becomes %3f
const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?&access_token=pk.eyJ1IjoiYWJoaS1yYW5qYW4wOTAxIiwiYSI6ImNrbmhnYzdwbDJ6M3gydm1xdWhwa2l0b2cifQ.QU1RDxEE87YIX0ZM-8Jxsg&limit=1'

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
           callback({error: 'Unable to connect to location services!'}, undefined) 
        } else if (body.features.length === 0) {
            callback({error: 'Unable to find location. Try another search.'}, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode



// Above First code general function methods

// const url2 = "http://api.mapbox.com/geocoding/v5/mapbox.places/12Whathello.json?&access_token=pk.eyJ1IjoiYWJoaS1yYW5qYW4wOTAxIiwiYSI6ImNrbmhnYzdwbDJ6M3gydm1xdWhwa2l0b2cifQ.QU1RDxEE87YIX0ZM-8Jxsg&limit=1"

// request({url: url2, json: true}, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to Weather Forecast.')
//     } else if(response.body.features.length == 0) {
//         console.log('Unable to find location. Try another search.')
//     }else {
//         const data = response.body.features[0]
//         const latitude = data.center[1]
//         const longitude = data.center[0]
//         console.log("Latitude : " + latitude + " & Longitude: " + longitude)
//     }
// })