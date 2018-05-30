const { buildSchema } = require("graphql");

var schema = buildSchema(`
  type User {
    id: ID!
    name: String
  }

  type Book {
    id: String
    name: String
  }

  type Query {
    user(id: ID!, name: String): User
    book(id: [String]!, name: String): Book
  }

  type Mutation {
      user(id: Int, name: String): User
  }
`);


module.exports = { schema }