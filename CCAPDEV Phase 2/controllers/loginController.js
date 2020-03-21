const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Account = mongoose.model('Account');
//const Account = mongoose.model('../models/Account');

router.get('/', (req, res) => {
    res.render('login', {
        title:'hello'
    });
});

router.post('/', (req, res) => {
    loginRecord(req, res);
});

function loginRecord(req, res){
    var username = req.body.username;
    var password = req.body.password;

    Account.findOne({username: username, password: password}, function(err, user){
        if(err){
            console.log(err);
            res.redirect('/login');
            return res.status(500).send();
        }else if(!user){
            res.redirect('/login');
            return res.status(404).send();
        }else{
            res.redirect('/home');
            return res.status(200).send();
        }
    });

}

module.exports = router;