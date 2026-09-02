const Product = require('../models/Product');
const { calculateEmi, calculateTotalPayable } = require('../utils/calculateEmi');

const enrichEmiPlans = (emiPlans, price) => {
  return emiPlans.map((plan) => {
    const monthlyAmount = calculateEmi(price, plan.interestRate, plan.tenure);
    return {
      tenure: plan.tenure,
      interestRate: plan.interestRate,
      cashback: plan.cashback || 0,
      monthlyAmount,
      totalPayable: calculateTotalPayable(monthlyAmount, plan.tenure),
    };
  });
};

const enrichProduct = (product, variantId = null) => {
  const productObj = product.toObject ? product.toObject() : { ...product };

  let selectedVariant = productObj.variants[0];
  if (variantId) {
    const found = productObj.variants.find(
      (v) => v._id.toString() === variantId.toString()
    );
    if (found) selectedVariant = found;
  }

  const startingPrice = Math.min(...productObj.variants.map((v) => v.price));

  return {
    ...productObj,
    startingPrice,
    selectedVariantId: selectedVariant?._id,
    emiPlansWithAmounts: enrichEmiPlans(productObj.emiPlans, selectedVariant.price),
  };
};

const getAllProducts = async () => {
  const products = await Product.find().sort({ createdAt: -1 });

  return products.map((product) => {
    const productObj = product.toObject();
    const startingPrice = Math.min(...productObj.variants.map((v) => v.price));
    const primaryImage = productObj.variants[0]?.image || '';

    return {
      _id: productObj._id,
      name: productObj.name,
      slug: productObj.slug,
      brand: productObj.brand,
      description: productObj.description,
      startingPrice,
      variantCount: productObj.variants.length,
      image: primaryImage,
    };
  });
};

const getProductBySlug = async (slug, variantId = null) => {
  const product = await Product.findOne({ slug: slug.toLowerCase() });

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  return enrichProduct(product, variantId);
};

const getEmiPlansForVariant = async (slug, variantId) => {
  const product = await Product.findOne({ slug: slug.toLowerCase() });

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  const variant = product.variants.id(variantId);
  if (!variant) {
    const error = new Error('Variant not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    variant: {
      _id: variant._id,
      name: variant.name,
      storage: variant.storage,
      color: variant.color,
      colorHex: variant.colorHex,
      mrp: variant.mrp,
      price: variant.price,
      image: variant.image,
    },
    emiPlans: enrichEmiPlans(product.emiPlans, variant.price),
  };
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  getEmiPlansForVariant,
  enrichEmiPlans,
};
