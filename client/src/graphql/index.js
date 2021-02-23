import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'
import { getToken, isLoggedIn } from '../utils/auth'

const graphQLURI = 'http://localhost:9000/graphql'

const authLink = new ApolloLink((operation, forward) => {
    // Send authorization credentials if they exist
    if(isLoggedIn()) {
        operation.setContext({
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
    }
    
    return forward(operation)
})

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({ uri: graphQLURI })
    ]),
    cache: new InMemoryCache()
})

export default client