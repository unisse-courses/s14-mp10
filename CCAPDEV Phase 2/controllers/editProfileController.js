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

    Account.update(
        {"username": req.session.username},
        {$set: {"firstName" : req.body.firstName}},
        {$set: {"lastName" : req.body.lastName}},
        {$set: {"address" : req.body.address}},
        {$set: {"contactNumber" : req.body.contactNumber}}
    )

    req.session.firstName = fName;
    req.session.lastName = lName;
    req.session.address = newAddress;
    req.session.contactNumber = newNumber;
}

module.exports = router;