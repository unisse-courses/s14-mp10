const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const cookikie = require('cookie-parser');
const Account = mongoose.model('Account');

router.get('/', (req, res) => {
    res.render('register', {
        title:'hello'
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res){
    var account = new Account();
    account.firstName = req.body.firstName;
    account.lastName = req.body.lastName;
    account.username = req.body.username;
    account.password = req.body.password;
    account.address = req.body.address;
    account.contactNumber = req.body.contactNumber;
    req.session.username = req.body.username;
    req.session.firstName = req.body.firstName;
    req.session.lastName = req.body.lastName;
    req.session.address = req.body.address;
    req.session.contactNumber = req.body.contactNumber;
    account.save((err, doc) => {
        if(!err){
            res.redirect('/home');
        }
    });
}

module.exports = router;