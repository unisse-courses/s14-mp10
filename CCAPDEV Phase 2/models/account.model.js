const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fName: {type:String},
    lName: {type:String},
    username: {type:String},
    password: {type:String},
});

mongoose.model('Employee', employeeSchema);