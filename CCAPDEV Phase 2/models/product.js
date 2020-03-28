const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    accountName: {type: String},
    commentText: {type: String}
});

var productSchema = new mongoose.Schema({
    imagePath: {type:String, required: true},
    title: {type:String, required: true},    
    description: {type:String, required: true},
    price: {type:Number, required: true},
    comments: [commentSchema]
});

module.exports = mongoose.model('Product', productSchema);
