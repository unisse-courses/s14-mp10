const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    commentAccount: {type: String},
    commentContent: {type: String},
    commentProduct: {type: String}
});


module.exports = mongoose.model('Comments', commentSchema);
