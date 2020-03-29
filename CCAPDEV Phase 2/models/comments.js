// module.exports = function Comment(newComments){
//     this.comments = newComments.items || {};
//     this.username = newComments.username;
//     this.commentContent = newComments.commentContent;

//     this.add = function(username, commentContent, product, id){
//         var commentArray = this.items[id];
//         commentArray = 
//     }

// }




const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    username: String, 
    commentContent: String
});

module.exports = mongoose.model('Comment', commentSchema);
