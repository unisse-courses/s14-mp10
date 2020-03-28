const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cookikie = require('cookie-parser');
const Product = mongoose.model('Product');

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
    var productID = req.params.id;
    res.render('addComment', {
        username: req.session.username
    })
});

router.post('/addComment', (req,res,next)=>{
    var productID = req.params.id;

    Product.update({"_id": productID},
    {
    $set: {comments: {"_id": productID,
    "accountName": req.session.username,
    "commentText": req.body.commentText }}
    })

    res.redirect('/home')
})

module.exports = router;