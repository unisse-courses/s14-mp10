const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const cookikie = require('cookie-parser');
var Account = mongoose.model('Account');
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Comment = require('../models/comments');

//All The Multer stuff
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoURI = 'mongodb+srv://databaseUser:coronavirus@shophub-mquaf.mongodb.net/ShopHub?retryWrites=true&w=majority';
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

router.get('/', (req, res) => {
    res.render('addProduct', {
    });
});

router.post('/', upload.single('file') ,(req, res) => {
    console.log(req.file)
    if(req.body.productName == '' || req.body.price == '' || req.body.description == ''){
        res.render('addProduct',{
            message: "Please complete the necessary information for the product"
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
            product.imagePath = req.file.filename;
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
                        var commentObjects = [];
                        comment.forEach(function(doc){
                            commentObjects.push(doc.toObject());
                        })
                        // console.log(comment); //testing
                        res.render('product', 
                            {_id: product._id, 
                            imagePath: product.imagePath, 
                            title: product.title, 
                            description: product.description, 
                            price: product.price,
                            comments: commentObjects
                        });
                    }
                })
            })
        }
    });
})

router.get('/editComment/:id', (req, res, next) => {
        Comment.findOne({_id: req.params.id, commentAccount: req.session.username}, function(err, commentUser){
            if(err){
                console.log(err);
                res.redirect('/home')
            }
            else if(!commentUser){
                console.log("You cannot change that comment because it is not yours");
            }
            else{
                Comment.findById(req.params.id).exec(function (err, comment){
                    if(err){
                        console.log("Error adding a comment to this specific product");
                    }
                    else{
                        res.render('editComment', {
                            _id: comment._id,
                            username: req.session.username,
                            commentContent: comment.commentContent
                        })
                    }
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
                        res.render('editComment',{
                            commentContent: comment.commentContent
                        });
                    }
                    else{
                        console.log("Error during record update: "+ err);
                    }
                }
            })
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

router.get('/remove/:id', function(req,res,next){
    var productID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    cart.removeItem(productID);
    req.session.cart = cart;
    res.redirect('/home');
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