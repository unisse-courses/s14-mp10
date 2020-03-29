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
    var valid = true;
    valid = checkField(req.body.firstName, valid);
    valid = checkField(req.body.lastName, valid);
    valid = checkField(req.body.address, valid);
    valid = checkField(req.body.contactNumber, valid);

    // Account.update({"username": req.session.username}, 
    // {$set: {"firstName": req.body.firstName, 
    // "lastName": req.body.lastName, 
    // "address": req.body.address, 
    // "contactNumber": req.body.contactNumber}
    // });

    if(valid == true){
        console.log("All fields have been changed")
    }
    res.redirect('/profile');
}

function checkField(field, val){
    var valid = val;
    var validSplit = valid.split(".")[2];

    if(field.val() ==''){
        vaild = false;
    }else{
        Account.update({"username": req.session.username},
        {$set :{validSplit: field}})
    }   

    return valid;
}

module.exports = router;