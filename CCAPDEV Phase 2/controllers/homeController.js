const express = require('express');
var router = express.Router();
var Product = require('../models/product');

//GET Home Page
router.get('/', (req, res, next) => {
    var products = Product.find();
    res.render('home', {title: 'ShopHub', products: products});
});


module.exports = router;