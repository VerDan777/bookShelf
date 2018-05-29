const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const simpleBookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    authorName: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const simpleBook = mongoose.model("simpleBooks", simpleBookSchema);

module.exports = { simpleBook };