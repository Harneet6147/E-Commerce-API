const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    images: [
        {
            type: String,
        }
    ],
    brand:
    {
        type: String,
        default: ''
    },
    price:
    {
        type: Number,
        default: ''
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 250
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);