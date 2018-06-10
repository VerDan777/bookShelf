const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();
const autoIncrement = require("mongoose-auto-increment");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const graphqlHTTP = require("express-graphql");

const connection = mongoose.connect(config.DATABASE);
const db = mongoose.connection;
autoIncrement.initialize(db);
const {auth} = require("./middleware/auth");
const { User } = require("./models/users");
const { Book } = require("./models/book");
const { simpleBook } = require("./models/simpleBook");
const {schema} = require("./models/graphqlSchema");

mongoose.promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
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

app.get('/api/getReview')
app.post('/api/book', (req,res) => {
    const SimpleBook = new simpleBook(req.body)
    SimpleBook.save((err,book) => {
        if(err) return res.send(err)
        res.status(200)
        res.json({
            post: true,
            id: book._id
        })
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
    const skip = req.query.skip;
    const limit = req.query.limit
    console.log(skip)
    simpleBook.find({}, (err, books) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(books)
    });
    // simpleBook.find().skip(skip).limit(limit).exec((err, books) => {
    //     if(err) return res.status(400).send(err)
    //     res.status(200).send(books)
    // })
});

app.post('/api/deleteBook', (req, res) => {
    let id = req.body.id;
    simpleBook.findByIdAndRemove(id, (err, book) => {
        if(err) return res.status(400).send(err);
        res.status(200).send("Succesfull delete!")
    })
})

app.post('/api/register', (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) return res.status(400).send(err);
        res.json({
            create: true,
            user: user
        })
    })
})

app.post('/api/login', (req,res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) return res.json({isAuth: false, message: "Auth failed, wron email"})
        user.generateToken((err, user) => {
            if(err) return res.status(400).send(err);
            res.cookie('auth', user.token).json({
                isAuth: true,
                id: user.id,
                email: user.email
            })
        });
        // user.comparePassword(req.body.password, (err,isMatch) => {
        //     if(!isMatch) return res.status(400).json({isAuth: "failed"})

            
        // });
    })
})

app.post('/api.logout',auth,(req, res) => {

})
app.get('/api/users', (req, res) => {
    // let limit = parseInt(req.query.limit);
    User.find({}, (err, doc) => {
        if(err) return res.send(err)
        res.send(doc)
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