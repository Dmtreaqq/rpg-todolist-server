const { gql } = require("apollo-server-express");

module.exports = gql`
  type Todo {
    id: ID!
    title: String
    done: Boolean
    category: String
  }
  type Query {
    todos: [Todo]
  }
  type Mutation {
    createTodo(title: String!, category: String): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;
