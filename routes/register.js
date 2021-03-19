const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

//register sahifasi
router.get('/', async(req, res) => {
    res.render('register');
});

router.post('/', async(req, res) => {
    let {name, email, password} = req.body;
    if(!name || !email || !password) {
        res.status(404).send('Barcha inputlar to`ldirilishi kerak');
        return;
    }

    let user = await User.findOne({email});
    if(user) {
        res.status(400).send('Bu foydalanuvchi bazada mavjud');
        return;
    }

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    user = new User({
        name,
        email,
        password
    });

    await user.save()
        .then(() => {
            res.status(201).send('succesfull registr');
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
