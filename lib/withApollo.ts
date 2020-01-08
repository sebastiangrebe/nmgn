import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export default withApollo(
    ({ ctx, headers, initialState }) =>
        new ApolloClient({
            cache: new InMemoryCache().restore(initialState || {}),
            link: new HttpLink({
                uri: '/graphql',
            })
        })
)
