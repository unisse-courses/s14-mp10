const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/AccountDB', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err){
        console.log('MongoDB Connection Successful');
    }else{
        console.log('Error in DB Connection: ' + err);
    }
});


require('./account.model');
require('./product');