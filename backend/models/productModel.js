const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, 
        required: true
    },
});

// Create the model and export it
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
