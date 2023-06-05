const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1/contactDance',{UseNewUrlParser: true});
const port = 8000;

//Define Mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact',contactSchema);

// Express Specific stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())
// Pug specific stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
//Endpoints
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send('This item has been sent to database.')
    }).catch(()=>{
        res.status(400).send("Item was not found in database.")
    })
    //res.status(200).render('contact.pug');
})

// Start the serer
app.listen(port, ()=>{
    console.log(`The application is running successfully on port ${port}`);
})