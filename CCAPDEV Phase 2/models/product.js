const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
    imagePath: {type:String, required: true},
    title: {type:String, required: true},    
    description: {type:String, required: true},
    price: {type:Number, required: true},
    thumbsUp: {type:Number},
    thumbsDown: {type:Number},
    comments: [{type: Object}]
    // comments: [{username: String, commentContent: String}]
});

module.exports = mongoose.model('Product', productSchema);
