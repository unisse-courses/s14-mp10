const express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const flash = require('express-flash');
var Account = mongoose.model('Account');
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Comment = require('../models/comments')

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



//GET Home Page
router.get('/', (req, res, next) => {
    Product.find(function(err, docs){
        var productChunks = [];
        var chunkSize = 3;
        for(var i=0; i<docs.length; i+= chunkSize)
        {
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        gfs.files.find(docs.imagePath).toArray((err,files) => {
            console.log(files);
            res.render('home', {
                products: docs,
                imagePath: files
            });
        })
    });
});

// router.get('/', (req,res) => {
//     Product.find(function(err, docs){
//         var productChunks = [];
//         var chunkSize = 3;
//         for(var i=0; i<docs.length; i+= chunkSize)
//         {
//             productChunks.push(docs.slice(i, i+chunkSize));
//         }
//         gfs.files.find().toArray((err,files) => {
//         })
//         res.render('home', {products: docs});
//     });
//     gfs.files.find().toArray((err,files) => {
//     })
// })

router.get('/searchProduct', (req,res, next) => {
    res.render('searchProduct');
});

router.post('/', (req,res,next) => {
    Product.find({title: req.body.searchField}).exec(function (err, product){
        if(err){
            console.error('Error retrieving all product by id!');
        }
        else if(!product){
            Product.find(function(err, docs){
                var productChunks = [];
                var chunkSize = 3;
                for(var i = 0; i < docs.length; i+= chunkSize)
                {
                    productChunks.push(docs.slice(i, i+chunkSize));
                }
                res.render('home',{
                    products: docs
                })
            })
        }
        else{
            res.render('home', {
                products: product
            })
        }
    })
})

router.get('/checkout' ,(req,res) => {
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    res.render('checkout1', {
        firstName: req.session.firstName,
        lastName: req.session.lastName,
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

router.post('/removeAllCheckout', function (req,res,next){
    var cart = new Cart(req.session.cart);
    var cardLength = req.body.creditCard.length;
    var order = new Order({
        userID: req.session.id,
        username: req.session.username,
        cart: req.session.cart,
        address: req.session.address,
        contact: req.session.contactNumber
    });

    console.log(req.body.creditCard)
    
    if(req.body.creditCard == '' || req.body.cvv == '' ){
        res.render('checkout1', {
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        address: req.session.address,
        contactNumber: req.session.contactNumber,
        products: cart.generateArray(),
        message: "Please correctly input all necessary data", 
        totalPrice: cart.totalPrice
    })
    }
    else if(req.body.creditCard.length != 12|| req.body.cvv.length != 3){
        res.render('checkout1', {
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            address: req.session.address,
            contactNumber: req.session.contactNumber,
            products: cart.generateArray(),
            message: "Please complete all necessary number of digits", 
            totalPrice: cart.totalPrice
        })
    }
    else{
        order.save((err, doc) => {
            if(!err){
                cart.removeAll();
                req.session.cart = cart;
                res.redirect('/home');
                console.log(order);
            }
        });
    }    
})

router.get('/shopping-cart', function(req,res,next){
    if(!req.session.cart)
    {
        return res.render('shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})

});

router.post('/thumbsUp/:id', (req,res,next)=>{
    Product.updateOne({_id: req.params.id}, {$inc: {thumbsUp: 1}}).exec(function(err, docs){
        Product.findById(req.params.id).exec(function (err, item) {
            Comment.find({commentProduct: req.params.id}).exec(function(err, comment){
                Product.findOneAndUpdate({_id: req.params.id}, {$inc : {'product.thumbsUp' : 1}}, {new: true}, (err, doc) => {
                    if (err) {
                        console.error('Error retrieving all product by id!');
                    } else {
                        res.render('product', 
                            {_id: item._id, 
                            imagePath: item.imagePath, 
                            title: item.title, 
                            description: item.description, 
                            price: item.price,
                            thumbsUp: item.thumbsUp,
                            thumbsDown: item.thumbsDown,
                            comments: comment
                        });
                    }
                })
            })
        })
    })
})

router.post('/thumbsDown/:id', (req,res,next)=>{
    Product.updateOne({_id: req.params.id}, {$inc: {thumbsDown: 1}}).exec(function(err, docs){
        Product.findById(req.params.id).exec(function (err, item) {
            Comment.find({commentProduct: req.params.id}).exec(function(err, comment){
                Product.findOneAndUpdate({_id: req.params.id}, {$inc : {'product.thumbsUp' : 1}}, {new: true}, (err, doc) => {
                    if (err) {
                        console.error('Error retrieving all product by id!');
                    } else {
                        res.render('product', 
                            {_id: item._id, 
                            imagePath: item.imagePath, 
                            title: item.title, 
                            description: item.description, 
                            price: item.price,
                            thumbsUp: item.thumbsUp,
                            thumbsDown: item.thumbsDown,
                            comments: comment
                        });
                    }
                })
            })
        })
    })
})

router.get('/:id', (req,res,next) => {

    Product.findById(req.params.id).exec(function (err, item) {
        Comment.find({commentProduct: req.params.id}).exec(function(err, comment){
            if (err) {
                console.error('Error retrieving all product by id!');
            } else {
                var commentObjects = [];
                comment.forEach(function(doc){
                    commentObjects.push(doc.toObject());
                })
                res.render('product', 
                    {_id: item._id, 
                    imagePath: item.imagePath, 
                    title: item.title, 
                    description: item.description, 
                    price: item.price,
                    thumbsUp: item.thumbsUp,
                    thumbsDown: item.thumbsDown,
                    comments: commentObjects
                });
            }
        })
    })
});

module.exports = router;