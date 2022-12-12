import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
})

export const apolloClient = new ApolloClient({
    link: httpLink,
    // cache: new InMemoryCache(),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache'
        }
    }
})