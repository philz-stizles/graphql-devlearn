const db = require('../db')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

module.exports = {
    Query: {
        users: (parent, args, context, info) => db.users.list(), // The context can be used to access things 
        // that are not part of graphql itself but are provided my our application
        user: (parent, { id }, context, info) => db.users.get(id),
        posts: (parent, args, context, info) => db.posts.list(),
        post: (parent, { id }, context, info) => db.posts.get(id),
        jobs: (parent, args, context, info) => db.jobs.list(),
        job: (parent, { id }, context, info) => db.jobs.get(id),
        company: (parent, { id }, context, info) => db.companies.get(id)
    },
    Mutation: {
        createUser: (parent, { username, email }, context, info) => {
            const newUser = { id: uuidv4(), username, email, createdAt: moment().format('dddd, MMMM Do YYYY, h:mm:ss a') } 
            db.users.create(newUser)
            return newUser
        },
        deleteUser: (parent, { id }, context, info) => db.users.delete(id),
        createPost: (_, { id }) => users.find(item => item.id === id),
        createCourse: () => posts,
        createComment: (_, { id }) => users.find(item => item.id === id),
        createJob: (parent, { input }, context, info) => {
            console.log(context)
            if(!context.user) {
                throw new Error('Unauthorized')
            }

            const newJob = { ...input, companyId: context.user.companyId, postedAt: moment().format('YYYY-MM-DD') }
            const id = db.jobs.create(newJob)
            return db.jobs.get(id)
            // return newJob
        }
    },
    User: {
        posts: (parent) => db.posts.filter(item => item.author === parent.id),
        courses: (parent) => db.courses.filter(item => item.author === parent.id)
    },
    Job: {
        company: (parent, args, context, info) => db.companies.get(parent.companyId)
    },
    Company: {
        jobs: (parent, args, context, info) => db.jobs.list().filter(job => job.companyId === parent.id)
    }
}