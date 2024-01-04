const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express();

// Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: "Shubham Bodhare"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        age: "27",
        name: "Shubham Bodhare"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: "Shubham Bodhare"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error: 'Address must be provided'
        })
    }
    console.log(req.query.address)
    res.send('My current address is ' + req.query.address)
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Search string must be provided'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: "Shubham Bodhare",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: "Shubham Bodhare",
        errorMessage: "Page not found"
    })
})



app.listen(3000, () => {
    console.log("Server is up on port 3000");
});