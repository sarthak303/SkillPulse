const Product = require('../models/productModel.js');

// Add a product
const addProduct = async (req, res) => {
    try {
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Validate request body
        const { name, quantity, price } = req.body;
        if (!name || !quantity || !price) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be a positive number.' });
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number.' });
        }

        // Create a new Product instance
        const product = new Product({
            name,
            quantity,
            price,
            image: req.file.path  // Adjust for single file upload
        });

        // Save the product to the database
        await product.save();

        // Send a success response
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get a product by ID
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const searchProduct = async (req, res) => {
    try {
        const { name } = req.query;

        // Validate the query parameter
        if (!name) {
            return res.status(400).json({ error: 'Name is required.' });
        }

        // Find products matching the search term
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });

        // Check if products were found
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found matching the given name.' });
        }

        // Send the found products
        res.status(200).json(products);
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { addProduct, getAllProducts, getProduct, searchProduct };
