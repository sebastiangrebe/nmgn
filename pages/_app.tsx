import React, { ReactNode } from 'react';
import Head from 'next/head'
import {Request} from 'express';
import DefaultApp, { Container } from 'next/app';

class App extends DefaultApp<{
  req: Request
}> {
    render() {
        const { Component, pageProps, req } = this.props;
        return (
            <Container>
                <Head>
                    <meta name="csrf-token" content={req.csrfToken()}/>
                </Head>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default App;