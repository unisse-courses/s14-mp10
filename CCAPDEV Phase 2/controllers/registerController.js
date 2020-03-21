const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
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
    account.save((err, doc) => {
        if(!err){
            res.redirect('/home');
        }
    });
}

module.exports = router;