// yarn add express apollo-server-express cors body-parser jsonwebtoken express-jwt uuid notarealdb(dev)
const fs = require('fs')
const express = require('express')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express')
const resolvers = require('./schema/resolvers')
const db = require('./db')

const app = express()
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

app.use(cors(), bodyParser.json(), expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
    algorithms: ['sha1', 'RS256', 'HS256']
}))

app.post('/signup', (req, res) => {
    const {email, password} = req.body;
    const user = db.users.list().find(user => user.email === email);
    if (!(user && user.password === password)) {
        return res.sendStatus(401);
    }

    const token = jwt.sign({sub: user.id}, jwtSecret);
    res.status(200).send({ token, loggedInUser: user });
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = db.users.list().find(user => user.email === email);
    if (!(user && user.password === password)) {
        return res.sendStatus(401);
    }

    const token = jwt.sign({sub: user.id}, jwtSecret);
    console.log(token)
    res.status(200).send({ token, loggedInUser: user });
});

// If your server is deployed to an environment where NODE_ENV is set to production, 
// GraphQL Playground and introspection are disabled by default. To enable them, 
// set playground: true and introspection: true
const apolloServer = new ApolloServer({ 
    typeDefs: gql(fs.readFileSync('./schema/typeDefs.graphql', { encoding: 'utf8' })), 
    resolvers,
    context: ({ req }) => ({ user: req.user && db.users.get(req.user.sub) })
})
apolloServer.applyMiddleware({ app, path: '/graphql' })

const PORT = process.env.PORT || 9000

app.listen(PORT, (err) => {
    console.log(`🚀 Server running on PORT ${PORT}`)
})