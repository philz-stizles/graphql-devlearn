// yarn add express apollo-server-express cors body-parser jsonwebtoken express-jwt uuid graphql-subscriptions
// notarealdb(dev)
const http = require('http')
const fs = require('fs')
const express = require('express')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express')
const db = require('./db')

const app = express()
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64')

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
    res.status(200).send({ token, loggedInUser: user });
});

const context = ({req, connection}) => {
    if (req && req.user) {
        return {user: db.users.get(req.user.sub)};
    }

    if (connection && connection.context && connection.context.accessToken) {
        const decodedToken = jwt.verify(connection.context.accessToken, jwtSecret);
        return {userId: decodedToken.sub};
    }

    return {};
}
// If your server is deployed to an environment where NODE_ENV is set to production, 
// GraphQL Playground and introspection are disabled by default. To enable them, 
// set playground: true and introspection: true
const apolloServer = new ApolloServer({ 
    typeDefs: gql(fs.readFileSync('./schema/typeDefs.graphql', { encoding: 'utf8' })), 
    resolvers: require('./schema/resolvers'),
    context
})
apolloServer.applyMiddleware({ app, path: '/graphql' })

const PORT = process.env.PORT || 9000

// Now we have our own http instance unlike with express where the server was implicitly create for us
const httpServer = http.createServer(app)
apolloServer.installSubscriptionHandlers(httpServer) // This enables a websocket to be used for graphql
// You then need to yarn add graphql-subscriptions
httpServer.listen(PORT, (err) => {
    console.log(`🚀 Server running on PORT ${PORT}`)
})