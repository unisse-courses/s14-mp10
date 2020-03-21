const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var accontSchema = new mongoose.Schema({
    firstName: {type:String},
    lastName: {type:String},    
    username: {type:String},
    password: {type:String}
});

mongoose.model('Account', accontSchema);
