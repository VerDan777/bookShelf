const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const autoIncrement = require("mongoose-auto-increment");
const jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        maxlenght: 32
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
},{
    versionKey: false,
    timestamps: true
});

userSchema.pre('save',function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I, (err,salt) => {
            if(err) return next(err);
            
            bcrypt.hash(user.token, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    console.log('works before')
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch);
    })
    console.log('works after')
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id, config.SECRET);
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    const user = this;
    user.token = token;
}

const User = mongoose.model('users', userSchema);
userSchema.plugin(autoIncrement.plugin,{
    model: 'users',
    field: "_id",
    startAt: 1,
    incrementBy: 1
});

module.exports = { User };