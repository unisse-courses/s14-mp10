const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const cookikie = require('cookie-parser');
const Account = mongoose.model('Account');

router.get('/', (req, res) => {
    res.render('editProfile', {
    });
});

router.post('/', (req,res) => {
    updatingRecord(req,res);
})

function updatingRecord(req,res){
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var newAddress = req.body.address;
    var newNumber = req.body.contactNumber;
    var username = req.session.username;

    Account.update({"username": username}, 
    {$set: {"firstName": fName, 
    "lastName": lName, 
    "address": newAddress, 
    "contactNumber": newNumber}
    });

    res.redirect('/profile');
}

module.exports = router;