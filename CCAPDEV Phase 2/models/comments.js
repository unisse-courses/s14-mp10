const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    username: String, 
    commentContent: String
});

module.exports = mongoose.model('Comment', commentSchema);
