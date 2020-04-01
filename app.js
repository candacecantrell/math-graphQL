const express = require('express')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')


const { typeDefs } = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')

const auth = require('./middleware/auth')
const { ApolloServer } = require('apollo-server-express');
require('./config')

const app = express()
// const typeDefs = gql

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.use(auth)

//         schema: graphqlSchema,
//         rootValue: graphqlResolver,
//         graphiql: true,
//         formatError(err) {
//             if(!err.originalError){
//                 return err
//             }
//             const data = err.originalError.data
//             const message = err.message || 'An error has occurred'
//             const code = err.originalError.code || 500
//             return { message: message, status: code, data: data }
//         }
//     })
// )

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message: message, data: data })
})

const server = new ApolloServer({ typeDefs, graphqlResolver });
server.applyMiddleware({ app });

// let port = process.env.PORT
// if (port == null || port == '') {
//     port = 8000
// }

//     app.listen(port)

app.listen({ port: 8000 }, () =>
  console.log(` Server ready at http://localhost:8000${server.graphqlPath}`)
);