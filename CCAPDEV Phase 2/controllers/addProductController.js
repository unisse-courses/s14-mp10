const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const cookikie = require('cookie-parser');
const Product = mongoose.model('Product');

router.get('/', (req, res) => {
    res.render('addProduct', {
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res){
    var product = new Product();
    product.productName = req.body.productName;
    product.price = req.body.price;
    product.description = req.body.price;
    product.imagePath = req.body.photo
    product.save((err, doc) => {
        if(!err){
            res.redirect('/home');
        }
    });
}

module.exports = router;