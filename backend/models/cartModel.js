const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a cart item
const cartItemSchema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    }
});

// Define the schema for the cart
const cartSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [cartItemSchema]
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
