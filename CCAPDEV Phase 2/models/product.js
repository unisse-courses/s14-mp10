const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
    imagePath: {type:String, required: true},
    title: {type:String, required: true},    
    description: {type:String, required: true},
    price: {type:Number, required: true},
    // comments: [{username: String, commentContent: String}]
    comments: [{type: Object}]
});

module.exports = mongoose.model('Product', productSchema);
