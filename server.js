const express = require('express');
const hbs = require('hbs'); 
const fs = require('fs'); 
var app = express(); 
//set up hbs to use partials to set an item on multiple pages. 
hbs.registerPartials(__dirname + '/views/partials');
// use the hbs -use key value pair= this is where you set to use hbs 
// in my notes lecture 43
app.set('view engine', 'hbs');

//app.use to regiser middle ware, takes function
app.use((req, res, next) => { // next is what to do when done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log); 
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log'); 
        }
    })
    next(); 
}); 
// set up maintenance page to show
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
//use middleware to tweak express, __dirname passed in by wrapper function.-
//__dirname stores path to projects directory.
app.use(express.static(__dirname + '/public'));
//set up hbs helper fuction to put something in that is often done here is the date
// takes 2 arguments, name of the helper as first argument, and function to run as second
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
// another hbs helper to capatalize.  
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(); 
});
// http handler.  - this one is get.  takes 2 arguments, one is file path - here root is '/'
// second is function that says what to send back to the person that made request.
// req has all info on request coming in, body, headers, etc. method. 
// res has bunch of methods to use for responding. 
app.get('/', (req, res) => {
    // res.send('<h1></h1>hello express is great</h1>'); 
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        homeMessage: 'yo this be the home message',
        name: 'brian',
        likes: [
            'climbing',
            'eating'
        ],
    });
});

app.get('/about', (req, res) => {
    // res.send('About me page');  -instead render a template you make with hbs
    // this takes a second arugment an object that you can put what you want into it for info
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        message: 'error Message', 
    });
}); 
// need to tell app where to listen for input, app.listen can take a second argument
// a function and tells what server it's on. 
app.listen(8000, () => {
    console.log('server up on port 8000');
});