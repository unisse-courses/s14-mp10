var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ShopHub', {useNewUrlParser: true, useUnifiedTopology: true});

var products = [
    new Product({
        imagePath: 'https://assets.adidas.com/images/w_600,f_auto,q_auto:sensitive,fl_lossy/985126faac9345fbafa8a8dd008d1a68_9366/Duramo_9_Shoes_Black_BB7066_01_standard.jpg',
        title: 'Adidas Shoes',
        description: 'Good Running Shoes',
        price: 5000
    }),
    new Product({
        imagePath: 'https://sc02.alicdn.com/kf/UTB8pA_FfrPJXKJkSafSq6yqUXXat.jpg_350x350.jpg',
        title: 'Bomber Jacket',
        description: 'Good Bomber Jacket',
        price: 500
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/61V8ThvpoaL._AC_UL1500_.jpg',
        title: 'White Long Sleeves Crop Top',
        description: 'Good Crop Top',
        price: 500
    }),
    new Product({
        imagePath: 'https://ean-images.booztcdn.com/fiveunits/1300x1700/fiv20337_cgunblack.jpg',
        title: 'Skinny Black Jeans',
        description: 'Good Skinny Black Jeans',
        price: 1000
    }),
    new Product({
        imagePath: 'https://i.ebayimg.com/images/g/ycAAAOSw3qRbrbcG/s-l300.jpg',
        title: 'Black Hoodie',
        description: 'Good Black Hoodie',
        price: 800
    }),
    new Product({
        imagePath: 'https://cdni.llbean.net/is/image/wim/215649_1165_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        title: 'Khaki Shorts',
        description: 'Good Khaki Shorts',
        price: 500
    }),
    new Product({
        imagePath: 'https://pmcfootwearnews.files.wordpress.com/2017/04/am97sil-copy.jpg?w=700&h=437&crop=1',
        title: 'Nike Shoes',
        description: 'Good Pacool Shoes',
        price: 5000
    }),
    new Product({
        imagePath: 'https://images.vans.com/is/image/Vans/D3HY28-HERO?$583x583$',
        title: 'Vans Shoes',
        description: 'Good Pacool Shoes pt2',
        price: 3000
    })
];

var done = 0;
for (var i=0; i<products.length; i++)
{
    products[i].save(function(err, result){
        done++;
        if(done === products.length)
        {
            exit();
        }
    });
}

function exit()
{
    mongoose.disconnect();
}

