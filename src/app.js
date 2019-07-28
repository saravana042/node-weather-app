const path = require('path');
const express = require ('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Saravana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name:'Karthick'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query);

if(!req.query.address){
    return res.send({
        error: 'You must provide on address'
    })
}

geocode(req.query.address, (error, {latitude, longitude, location}) => {
    if(error){
        res.send({
            error
        })
    }

    forecast(latitude, longitude, (error, forecastData) => {

        if(error){
            res.send({
                error
            })
        }

        res.send({
            forcast:forecastData,
            location,
            address: req.query.address
        })
    })

})

    // res.send({
    //     forcast:"It is snowing",
    //     location:'chennai',
    //     address: req.query.address
    // })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText:'Some help text',
        name:'kumar'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'saravana karthick',
        errorMessage:'Help artical not'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'saravana karthick',
        errorMessage:'Page not found'
    })
})

app.listen(3000, () =>{
    console.log ("server running")
});