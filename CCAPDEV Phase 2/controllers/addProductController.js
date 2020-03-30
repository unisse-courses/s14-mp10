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
    if(req.body.productName === ' '){
        res.render('addProduct',{
            message: "No information was given about the product"
        })
    }

    Product.findOne({title: req.body.productName}, function(err, item){
        if(item){
            res.render('addProduct',{
                message: "Product already exists"
            })
        }
        else if(req.body === ' '){
            res.render('addProduct', {
                message: "No information was given about the product"
            })
        }
        else{
            var product = new Product();
            product.imagePath = `pictures/${req.body.picture}`;
            product.title = req.body.productName;
            product.price = req.body.price;
            product.description = req.body.description;
            product.save((err, doc) => {
                if(!err){
                    res.redirect('/home');
                }
            })
        }
    })
});

router.get('/addComment/:id', (req, res, next) => {
    Product.findById(req.params.id)
    .exec(function (err, product){
        if(err){
            console.log("Error adding a comment to this specific product");
        }
        else{
            res.render('addComment', {
                _id: product._id,
                username: req.session.username
            })
        }
    })
});

router.get('/editComment/:id', (req, res, next) => {
        Comment.findById(req.params.id).exec(function (err, comment){
            if(err){
                console.log("Error adding a comment to this specific product");
            }
            else{
                res.render('editComment', {
                    _id: comment._id,
                    username: req.session.username
                })
            }
        })
});

router.post('/editComment/:id', (req,res,next)=>{
    Comment.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('/home')
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.redner('editComment');
            }
            else{
                console.log("Error during record update: "+ err);
            }
        }
    })
})

router.post('/addComment/:id', (req,res,next)=>{
    var productID = req.params.id;
    var comment = new Comment();
    comment.commentAccount = req.session.username;
    comment.commentContent = req.body.commentText;
    comment.commentProduct = productID;

    comment.save((err,doc) => {
        if(!err){
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
        }
    });
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