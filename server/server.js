const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const autoIncrement = require("mongoose-auto-increment");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const graphqlHTTP = require("express-graphql");

const connection = mongoose.connect(config.DATABASE);
const db = mongoose.connection;
autoIncrement.initialize(db);

const { User } = require("./models/users");
const { Book } = require("./models/book");
const { simpleBook } = require("./models/simpleBook");
const {schema} = require("./models/graphqlSchema");

mongoose.promise = global.Promise;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

var root = {
    hello: () => {
      return 'Hello world!';
    },
  };
  var fakeDatabase = {};

  var root = {
    getMessage: function ({id}) {
      if (!fakeDatabase[id]) {
        throw new Error('no message exists with id ' + id);
      }
      return new Message(id, fakeDatabase[id]);
    },
    createMessage: function ({input}) {
      // Create a random id for our "database".
      var id = require('crypto').randomBytes(10).toString('hex');
  
      fakeDatabase[id] = input;
      return new Message(id, input);
    },
    updateMessage: function ({id, input}) {
      if (!fakeDatabase[id]) {
        throw new Error('no message exists with id ' + id);
      }
      // This replaces all old data, but some apps might want partial update.
      fakeDatabase[id] = input;
      return new Message(id, input);
    },
  };
  
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
app.get('/api/book', (req,res) => { 
    const simplebook = new simpleBook(req.query)

    simplebook.save((err, doc) => {
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
    simpleBook.find({}, (err, books) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(books)
    });
});

app.post('/api/deleteBook', (req, res) => {
    let id = req.body.id;
    simpleBook.findByIdAndRemove(id, (err, book) => {
        if(err) return res.status(400).send(err);
        res.status(200).send("Succesfull delete!")
    })
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