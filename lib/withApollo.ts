import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { RequestType } from '../types/request.type';

export default withApollo(
    ({ ctx, headers, initialState }) => {
        const isBrowser = typeof window !== 'undefined';
        let csrfToken = '';
        if(isBrowser) {
            const element =  <HTMLMetaElement>document.head.querySelector('meta[name="csrf-token"]');
            if(element) {
                csrfToken= element.content;
            }
        } else {
            if(ctx && ctx.req && (ctx.req as RequestType).csrfToken) {
                csrfToken = (ctx.req as RequestType).csrfToken();
            }
        }
        return new ApolloClient({
            cache: new InMemoryCache().restore(initialState || {}),
            link: new HttpLink({
                uri: (isBrowser) ? '/graphql' : 'http://localhost:' + (process.env.PORT || 3000),
                credentials: 'include',  // use 'same-origin' if it is appropriate for your case
                headers: { 'X-CSRF-TOKEN': csrfToken },
            })
        })
    }
)
