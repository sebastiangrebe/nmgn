import React from 'react';
import Head from 'next/head'
import { RequestType } from '../src/types/request.type';
import DefaultApp from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
import * as css from '../styles/app.scss';

//@todo check if both csrf token element (__NEXT_DATA__ property and HTML meta tag) are required
//@todo check if getInitialProps slows down page speed and disables static optimization completely
class App extends DefaultApp<{
  csrfToken: string,
  apollo: any
}> {
  static async getInitialProps({ Component, router, ctx }: { Component: NextComponentType<NextPageContext, {}, {}>, ctx: NextPageContext, router: any }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let props:{ csrfToken? : string } = {};

    if(typeof ctx.req !== typeof undefined) {
      props.csrfToken = (ctx.req as RequestType).csrfToken();
    }

    return { pageProps, ...props }
  }
  render() {
    const { Component, pageProps, csrfToken, apollo } = this.props;
    return (
      <div id={css.app}>
        <Head>
          <meta name="csrf-token" content={csrfToken}/>
        </Head>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </div>
    );
  }
}

export default withApollo(App);