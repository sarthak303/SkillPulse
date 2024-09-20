const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Product_controller = require('../controllers/productController');

const prod_route = express();

// Middleware
prod_route.use(bodyParser.json());
prod_route.use(bodyParser.urlencoded({ extended: true }));
prod_route.use(express.static('public'));

// Configure multer for single file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productimages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

// Route for adding a product with a single image
prod_route.post('/addproduct', upload.single('product_image'), Product_controller.addProduct);

prod_route.get('/getproduct/:id', Product_controller.getProduct);
prod_route.get('/getallproduct', Product_controller.getAllProducts);

prod_route.get('/searchproduct', Product_controller.searchProduct);

module.exports = prod_route;
