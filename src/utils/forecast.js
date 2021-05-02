const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=5920d70a5da1fa56bda8b99651bf3501&query=' + encodeURIComponent(latitude)+',' +encodeURIComponent(longitude)

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback({error :'Unable to connect to weather forecast!'}, undefined)
        } else if (body.error) {
            callback({error: 'Unabel to find location. Try another search.'}, undefined)
        } else {
            callback(undefined, "It is currently " + body.current.temperature + 
            " degrees out. There is a " + body.current.precip + 
            "% chance of rain.")
        }
    })
}

module.exports = forecast



// above functon code  in general form
// const url = 'http://api.weatherstack.com/current?access_key=5920d70a5da1fa56bda8b99651bf3501&query=25.5941,85.1376'

// request({url: url, json: true}, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to Weather Forecast.')
//     } else if(response.body.error) {
//         console.log('Unable to find location.')
//     }else {
//         const data = response.body.current
//         console.log("There is currently " + data.temperature + 
//         " degrees out. There is a " + data.precip + 
//         "% chance of rain.")
//     }
// })