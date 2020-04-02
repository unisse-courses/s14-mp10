const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ratingSchema = new mongoose.Schema({
    thumbsUp: {type: Number},
    thumbsDown: {type: Number},
    ratingProductID: {type:String}
});

module.exports = mongoose.model('Rating', ratingSchema);
