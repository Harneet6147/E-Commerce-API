const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel')


const getAllProducts = asyncHandler(async (req, res) => {
    const productList = await Product.find().select('name price image ');

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});

const getOneProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({ success: false })
    }
    res.send(product);
})

const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });

    if (!product)
        return res.status(500).send("Product can't be created");
    return res.send(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Product not Found");
    }

    const product = await Product.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
        },
        { new: true });

    if (!product)
        return res.status(500).send("Product cannot be updated");

    res.send(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = Product.findByIdAndDelete(req.params.id)

    if (!product)
        return res.status(500).send("Product not found");

    return res.send(`${product.name} Deleted Successfully`);
});

const totalProducts = asyncHandler(async (req, res) => {
    const productCount = await Product.countDocuments();

    res.json({
        "Number of Products": productCount
    });
})

module.exports = { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct, totalProducts };
