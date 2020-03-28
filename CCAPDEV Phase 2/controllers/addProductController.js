const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cookikie = require('cookie-parser');
// const upload_path = path.join("./", "/public/pictures");

// const upload = multer({
//     dest: upload_path,
//     limits: {
//         fileSize: 1000000,
//         files: 1
//     }
// });
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

    console.log("THIS IS FILENAME" + product.imagePath);

    product.save((err, doc) => {
        if(!err){
            res.redirect('/home');
        }
    });
});

module.exports = router;