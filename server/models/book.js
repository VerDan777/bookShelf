const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    review: {
        type: String,
        default: 'n/a'
    },
    pages: {
        type: String,
        default: 'n/a',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    price: {
        type: String,
        required: true,
        default: 'n/a'
    },
    ownerID: {
        type: String,
        required: true
    }
}, 
{
    timestamps: 
    {   
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Book = mongoose.model('books', bookSchema);

module.exports = { Book };