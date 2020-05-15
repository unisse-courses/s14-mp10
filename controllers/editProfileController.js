const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const cookikie = require('cookie-parser');
const Account = mongoose.model('Account');

router.get('/', (req, res) => {
    res.render('editProfile', {
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        address: req.session.address,
        contactNumber: req.session.contactNumber
    });
});

router.post('/', (req,res) => {
    updatingRecord(req,res);
})

function updatingRecord(req,res){
    Account.findOneAndUpdate({username: req.session.username}, req.body, {new: true}, (err, doc) => {
        if(!err){
            req.session.firstName = req.body.firstName;
            req.session.lastName = req.body.lastName;
            req.session.address = req.body.address;
            req.session.contactNumber = req.body.contactNumber;
            res.redirect('/profile');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render('editProfile');
            }
            else{
                console.log("Error during record update: "+ err);
            }
        }
    })
}


module.exports = router;