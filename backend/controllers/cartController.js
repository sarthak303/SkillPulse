const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Add product to the cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate request
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: 'User ID, product ID, and quantity are required.' });
        }

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be a positive number.' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Find or create the cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.productId.equals(productId));
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        // Save the cart
        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully!' });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get the cart for a user
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Remove item from the cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ error: 'User ID and product ID are required.' });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart successfully!' });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addToCart, getCart, removeFromCart };
