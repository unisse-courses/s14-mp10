const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cookikie = require('cookie-parser');
var Account = mongoose.model('Account');
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Comment = require('../models/comments');

router.get('/', (req, res) => {
    res.render('addProduct', {
    });
});

router.post('/', (req, res) => {
    var product = new Product();
    product.imagePath = `pictures/${req.body.picture}`;
    product.title = req.body.productName;
    product.price = req.body.price;
    product.description = req.body.description;

    console.log("THIS IS FILENAME" + product.imagePath); //Testing purposes

    product.save((err, doc) => {
        if(!err){
            res.redirect('/home');
        }
    });
});

router.get('/addComment/:id', (req, res, next) => {
    res.render('addComment', {
        username: req.session.username
    })
});

router.post('/addComment', (req,res,next)=>{
    var productID = req.params.id;
    var newComment = {
        username: req.session.username,
        commentContent: req.body.commentText
    }

    Product.findOneAndUpdate({"_id": productID}, {"comments": newComment}, function(err,result){
        if(err){
            res.send(err);
        }
        else{
            console.log("Comment has been added!")
        }
    })

    res.redirect('/home')
})

router.get('/add/:id', function(req,res,next){
    var productID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    Product.findById(productID, (err, product)=>{
        if(err)
        {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/home/checkout');
    });
});

router.get('/reduce/:id', function(req,res,next){
    var productID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    cart.reduceByOne(productID);
    req.session.cart = cart;
    res.redirect('/home/checkout');
});

router.get('/removeAll', function(req,res,next){
    var cart = new Cart(req.session.cart);

    var order = new Order({
        userID: req.session.id,
        username: req.session.username,
        cart: req.session.cart,
        address: req.session.address,
        contact: req.session.contactNumber
    });

    order.save((err, doc) => {
        if(!err){
            cart.removeAll();
            req.session.cart = cart;
            res.redirect('/home');
            console.log(order);
        }
    });

});

module.exports = router;