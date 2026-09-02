const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { variantId } = req.query;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product slug',
      });
    }

    const product = await productService.getProductBySlug(slug, variantId);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const getEmiPlans = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { variantId } = req.query;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product slug',
      });
    }

    if (!variantId) {
      return res.status(400).json({
        success: false,
        message: 'variantId query parameter is required',
      });
    }

    const result = await productService.getEmiPlansForVariant(slug, variantId);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  getEmiPlans,
};
