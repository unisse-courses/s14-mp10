const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
    imagePath: {type:String, required: true},
    title: {type:String, required: true},    
    description: {type:String, required: true},
    price: {type:Number, required: true},
    thumbsUp: {type:Number, default: 0},
    thumbsDown: {type:Number, default: 0},
    comments: [{type: Object}],
    userPosted: {type:String,required:true}
    // comments: [{username: String, commentContent: String}]
});

module.exports = mongoose.model('Product', productSchema);
