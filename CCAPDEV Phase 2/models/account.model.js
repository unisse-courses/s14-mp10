const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var accontSchema = new mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},    
    username: {type:String, required: true},
    password: {type:String, required: true},
    address: {type: String, requireed: true},
    contactNumber: {type: Number, required: true}
});

mongoose.model('Account', accontSchema);
