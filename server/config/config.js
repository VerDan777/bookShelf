const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb://localhost/bookShelf'
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}