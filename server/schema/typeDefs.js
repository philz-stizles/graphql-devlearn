// Scalar(Stores a single value, unlike an array or object) -> String, Int, Float, Boolean, ID

module.exports = `
    type Query {
        users: [User]
        user(id: ID!): User
        posts: [Post]
        post(id: ID!): Post
    }

    type Mutation {
        createUser(username: String!, email: String!): User
        createPost(title: String!, body: String!): Post
        createCourse(title: String!, price: Float): Course
        createComment(username: String!, email: String!): Comment
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        isActive: Boolean!
        createdAt: String
        profile: Profile
        courses: [Course]
        posts: [Post]
    }

    type Course {
        id: ID!
        title: String!
        author: User!
        price: Float
        isPublished: Boolean!
        createdAt: String!
        publishedAt: String
    }

    type Profile {
        user: User!
        age: Int
        skills: [String]!
        email: String!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        author: User!
        likes: Int
        isPublished: Boolean!
        createdAt: String!
        publishedAt: String
        comments: [Comment]
    }

    type Comment {
        id: ID!
        post: Post!
        body: String!
        createdAt: String!
        user: User!
    }
`