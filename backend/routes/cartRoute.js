const express = require('express');
const CartController = require('../controllers/cartController');

const router = express.Router();

// Route for adding a product to the cart
router.post('/addtocart', CartController.addToCart);

// {
//     "userId": "USER_ID_HERE",
//     "productId": "PRODUCT_ID_HERE",
//     "quantity": 2
//  }
  

// Route for getting the cart for a user
router.get('getcart/:userId', CartController.getCart);

// Route for removing a product from the cart
router.delete('/removefromcart', CartController.removeFromCart);

// {
//     "userId": "USER_ID_HERE",
//     "productId": "PRODUCT_ID_HERE"
//  }
  

module.exports = router;
