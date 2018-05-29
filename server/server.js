const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const autoIncrement = require("mongoose-auto-increment");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);

const connection = mongoose.connect(config.DATABASE);
const db = mongoose.connection;
autoIncrement.initialize(db);

const { User } = require("./models/users");
const { Book } = require("./models/book");

mongoose.promise = global.Promise;

app.use(bodyParser.json());
app.use(cookieParser());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain)

app.get('/api/book', (req,res) => {
    const book = new Book(req.query)

    book.save((err, doc) => {
        if(err) {
            return console.log(err)
        } else if(doc) {
            res.status(200).send(doc)
        }
    })
})


app.get('/api/getBook', (req, res, next) => {
    let id = req.query.id;

    Book.findById(id, (err, book) => {
        if(err) return res.status(400).send(err)
        res.send(book);
    })
})

app.get('/api/books', (req, res) => {
    Book.find({}, (err, books) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(books);
    });
});

app.post('/api/deleteBook', (req, res) => {
    let id = req.body.id;
    Book.findByIdAndRemove(id, (err, book) => {
        if(err) return res.status(400).send(err);
        res.status(200).send("Succesfull delete!")
    })
})

app.get('/api/test', (req, res) => {
    res.send('work')
})

app.post('/api/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) return res.status(400).send(err);
        res.send(user)
    })
})

app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
});


app.post('/api/updateBook', (req, res) => {
    let id = req.body.id;

    Book.findByIdAndUpdate(id, req.body, {new: true}, (err, book) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(book)
    })
})
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server started on ${port} port`)
});