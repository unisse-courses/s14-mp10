const express = require('express');
var router = express.Router();
var Product = require('../models/product');

//GET Home Page
router.get('/', (req, res, next) => {
    Product.find((err, docs)=>{
        var productChunks = [];
        var chunkSize = 3;
        for(var i=0; i<docs.length; i+= chunkSize)
        {
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('home', {products: docs});
    });
});


module.exports = router;