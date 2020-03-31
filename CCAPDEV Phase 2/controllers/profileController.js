const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const cookikie = require('cookie-parser');
const Account = mongoose.model('Account');


router.get('/' ,(req,res) => {
    var nFirst = req.session.firstName;
    var nLast = req.session.lastName;
    var space = ' ';
    var fullNameProfile = nFirst.concat(space, nLast);
    res.render('profile', {
        firstName: nFirst,
        lastName: nLast,
        address: req.session.address,
        contactNumber: req.session.contactNumber
    });
});



module.exports = router;