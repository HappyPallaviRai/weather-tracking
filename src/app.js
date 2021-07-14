const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Defines path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partial')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialPaths)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pallavi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name:'Pallavi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Pallavi',
        message:'This is help message for you'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Error!! Please provide an address'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        else {
            forecast(longitude, latitude, (error, forecastRes) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastRes,
                    location,
                    address: req.query.address
                })  
            })            
        }
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.rating)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        message: 'Help Article not found',
        title: '404',
        name:'Pallavi'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name:'Pallavi'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Pallavi',
//         age: 29
//     }, {
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })



app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})