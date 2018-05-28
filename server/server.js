const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);

const { User } = require("./models/users");
const { Book } = require("./models/book");

mongoose.promise = global.Promise;

mongoose.connect(config.DATABASE);
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/book', (req,res) => {
    const book = new Book(req.body)

    book.save((err, doc) => {
        if(err) {
            return console.log(err)
        } else if(doc) {
            res.status(200).json({
                post: true,
                bookID: doc._id
            })
        }

    })
})


app.get('/api/getBooks', (req, res) => {
    let id = req.query.id;

    Book.findOne({'_id': id}, (err, book) => {
        if(err) {
            return console.log(err)
        } else if(book) {
            res.send(book)
        } else {
            res.send("Book not found")
        }
    })
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server started on ${port} port`)
});