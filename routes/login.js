const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

//Login sahifasi
router.get('/', async(req, res) => {
    res.render('login');
});

router.post('/', async(req, res) => {
    let {email, password} = req.body;

    if(!email || !password) {
        res.status(404).send('Barcha inputlar to`ldirilishi kerak');
        return;
    }

    let user = await User.findOne({email});

    if(!user) {
        res.status(400).send('Email yoki parol xato');
        return;
    }

    let isVallidPassword = await bcrypt.compare(password, user.password);

    if(!isVallidPassword) {
        res.status(400).send('Email yoki parol xato');
        return;
    }
    res.redirect('home');
});

module.exports = router;
