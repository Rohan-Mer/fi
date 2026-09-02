const express = require('express');
const { getProducts, getProduct, getEmiPlans } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:slug/emi-plans', getEmiPlans);
router.get('/:slug', getProduct);

module.exports = router;
