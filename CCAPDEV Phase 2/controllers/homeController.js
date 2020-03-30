const express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
var Account = mongoose.model('Account');
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Comment = require('../models/comments')

//GET Home Page
router.get('/', (req, res, next) => {
    Product.find(function(err, docs){
        var productChunks = [];
        var chunkSize = 3;
        for(var i=0; i<docs.length; i+= chunkSize)
        {
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('home', {products: docs});
    });

    // Product.find(function(err, docs){
    //     for(var i=0; i<docs.length; i++)
    //     console.log("hello");
    //     res.render('home', {products: docs});
    // });
});

router.get('/checkout' ,(req,res) => {
    var nFirst = req.session.firstName;
    var nLast = req.session.lastName;
    var space = ' ';
    var fullNameProfile = nFirst.concat(space, nLast);
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    res.render('checkout1', {
        fullName: fullNameProfile,
        address: req.session.address,
        contactNumber: req.session.contactNumber,
        products: cart.generateArray(), 
        totalPrice: cart.totalPrice
    });
});

router.get('/add-to-cart/:id', (req, res, next) =>{
    console.log('hello');
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
        res.redirect('/home');
    });
});

router.get('/reduce/:id', function(req,res,next){
    var productID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    cart.reduceByOne(productID);
    req.session.cart = cart;
    res.redirect('/home/shopping-cart');
});

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
        res.redirect('/home/shopping-cart');
    });
});

router.get('/remove/:id', function(req,res,next){
    var productID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    cart.removeItem(productID);
    req.session.cart = cart;
    res.redirect('/home/shopping-cart');
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

router.get('/shopping-cart', function(req,res,next){
    if(!req.session.cart)
    {
        return res.render('shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})

});

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

module.exports = router;