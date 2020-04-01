const { gql } = require('apollo-server-express');
require('../config')

const { User } = require('../models/user-model');
const { Students } = require('../models/students-model');

const typeDefs = gql`
type User {
        email: String!
        password: String!
        status: String!
        students: String!
        id: String!

},
type Students {
    name: String!
    unit: String!
    lessons: String!
},
type Query {
    login(email: String!, password: String!, id: ID): User!
    allUsers: [User]

},
type Mutation {
    createUser(email: String!, password: String!, id: String ): User
    createStudent(name: String!): Students
    addUser(email: String!, password: String!, id: String): User
}`

module.exports = {
    typeDefs
}