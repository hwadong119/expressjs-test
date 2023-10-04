const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/products.controller');

productsRouter.post('/', productsController.createProduct);
productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:productId', productsController.getProductById);

module.exports = productsRouter; 