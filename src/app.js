const express = require('express')
const path = require('path')
const hbs = require('hbs')
// const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


//define path for Express config
// using static files requires the whole directory path.
const publicDirectoryPath = path.join(__dirname, '../public')
// defining views path. note default dir root_appfolder/views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// to set handlebars and views location settings in express.js
app.set('view engine', 'hbs')
app.set('views', viewsPath)
// hbs function that take partials path.
hbs.registerPartials(partialsPath)

//allows us to customize our server
// here will use static files for routes present in the provided directory.
app.use(express.static(publicDirectoryPath))

// rendering html using handlebars
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhi Ranjan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!!',
        name: 'Abhi Ranjan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Node.JS!',
        img: '/img/NodeJS-Cover.png',
        name: 'Abhi Ranjan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an Address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send(error)
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location : location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Abhi Ranjan',
        errorMessage: 'Help article not found.'
    }) 
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Abhi Ranjan',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})