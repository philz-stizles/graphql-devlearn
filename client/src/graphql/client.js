import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition} from 'apollo-utilities'
import { getToken, isLoggedIn } from '../utils/auth'

const httpUri = 'http://localhost:9000/graphql'
const webSocketUri = 'ws://localhost:9000/graphql'

const httpLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
        // Send authorization credentials if they exist
        if(isLoggedIn()) {
            operation.setContext({
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
        }
        
        return forward(operation)
    }),
    new HttpLink({ uri: httpUri })
]) 

const webSocketLink = new WebSocketLink({ uri: webSocketUri, options: {
    connectionParams: () => ({ // connectionParams configures authentication
        accessToken: getToken()
    }),
    lazy: true,
    reconnect: true
}})

const isSubscription = (operation) => {
    const definition = getMainDefinition (operation.query)
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
}

const client = new ApolloClient({
    link: split(isSubscription, webSocketLink, httpLink),
    cache: new InMemoryCache(),
    defaultOptions: { query: { fetchPolicy: 'no-cache' } }
})

export default client