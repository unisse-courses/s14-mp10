const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var orderSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    username: {type: String, required: true},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    contact: {type: Number, required: true},
});

module.exports = mongoose.model('Order', orderSchema);