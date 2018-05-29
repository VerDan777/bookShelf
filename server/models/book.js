const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

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
    versionKey: false,
    timestamps: true
})

const Book = mongoose.model('books', bookSchema);
bookSchema.plugin(autoIncrement.plugin, {
    model: 'books',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = { Book };