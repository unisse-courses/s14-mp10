const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const cookikie = require('cookie-parser');
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
            res.render('login', {
                message: "Account cannot be found"
            });
        }else{
            req.session.username = username;
            req.session.firstName = user.firstName;
            req.session.lastName = user.lastName;
            req.session.address = user.address;
            req.session.contactNumber = user.contactNumber;
            res.redirect('/home');
            return res.status(200).send();
        }
    });

}

module.exports = router;

router.get('/:id', (req,res,next) => {

    Product.findById(req.params.id).exec(function (err, product) {
        Comment.find({commentProduct: req.params.id}).exec(function(err, comment){
            if (err) {
                console.error('Error retrieving all product by id!');
            } else {
                // console.log(comment); //testing
                res.render('product', 
                    {_id: product._id, 
                    imagePath: product.imagePath, 
                    title: product.title, 
                    description: product.description, 
                    price: product.price,
                    comments: comment
                });
            }
        })
    })
});
