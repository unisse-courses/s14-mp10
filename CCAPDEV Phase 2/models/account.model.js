const mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    firstName: {type:String},
    lastName: {type:String},
    username: {type:String},
    password: {type:String},
});

mongoose.model('Account', accountSchema);