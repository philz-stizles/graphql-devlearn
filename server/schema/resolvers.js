const users = require('../data/users')
const posts = require('../data/posts')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

module.exports = {
    Query: {
        users: (parent, args, context, info) => users,
        user: (_, { id }) => users.find(item => item.id === id),
        posts: () => posts,
        post: (_, { id }) => users.find(item => item.id === id)
    },
    Mutation: {
        createUser: (parent, { username, email }, context, info) => {
            const newUser = { id: uuidv4(), username, email, createdAt: moment().format('dddd, MMMM Do YYYY, h:mm:ss a') } 
            users.unshift(newUser)
            return newUser
        },
        createPost: (_, { id }) => users.find(item => item.id === id),
        createCourse: () => posts,
        createComment: (_, { id }) => users.find(item => item.id === id)
    },
    User: {
        posts: (parent) => posts.filter(item => item.author === parent.id)
    }
}