const Product = require ('../models/productModel');
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create (req.body);

  res.status (201).json ({success: true, product});
});

// Get All Products
exports.getAllProducts =catchAsyncErrors( async (req, res) => {
  const products = await Product.find ();

  const apiFeature = new ApiFeatures(Product.find(), req.query)

  res.status (200).json ({success: true, products});
});


// Update Product --Admin
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById (req.params.id);
  
    if (!product) {
      return  next(new ErrorHandler("Product is not found",404));    
    }  
    res.status (200).json ({success: true, product});
  });

// Update Product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById (req.params.id);

  if (!product) {
    return  next(new ErrorHandler("Product is not found",404));    
  }  

  product = await Product.findByIdAndUpdate (req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status (200).json ({success: true, product});
});



// Delete Product --Admin
exports.deleteProduct =catchAsyncErrors( async (req, res, next) => {
    let product = await Product.findById (req.params.id);
  
    if (!product) {
      return  next(new ErrorHandler("Product is not found",404));    
    }  
  
    await product.remove()
    res.status (200).json ({success: true, message:"Product deleted successfully"});
  });
  