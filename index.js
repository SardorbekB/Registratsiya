const express = require('express');
const app = express();
const mongoose = require('mongoose');

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

mongoose.connect('mongodb://localhost/mysite', {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Mongodbga ulanish amalga oshdi');
    })
    .catch((err) => {
        console.error('Xato yuz berdi', err);
    });

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.set("view engine", "ejs");

    app.use('/login', loginRoute);
    app.use('/register', registerRoute);

    // Home sahifasi
    app.get('/home', async(req, res) => {
        res.render('home');
    });

    //Index sahifaasi
    app.get('/', async(req, res) => {
        res.render('index');
    });
    

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`${port} - portni eshtishni boshladim`);
    });