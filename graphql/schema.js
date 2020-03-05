const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Student {
        _id: ID!
        name: String!
        unit: String
        lesson: String
        createdAt: String!
        updateaAt: String!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        students: [Student!]
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        password: String!
    }

    input StudentInputData {
        name: String!     
    }
    
    type RootQuery{
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation{
        createUser(userInput: UserInputData): User!
        createStudent(studentInput: StudentInputData): Student!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)