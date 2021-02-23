const { DataStore } = require('notarealdb')
const store = new DataStore('./data')

module.exports = {
    users: store.collection('users'),
    profiles: store.collection('profiles'),
    posts: store.collection('posts'),
    comments: store.collection('comments'),
    jobs: store.collection('jobs'),
    companies: store.collection('companies'),
    messages: store.collection('messages')
}

// Ensure this file is in project root on the same level with data folder