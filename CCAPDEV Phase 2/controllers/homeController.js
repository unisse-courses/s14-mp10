const express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart')

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

module.exports = router;