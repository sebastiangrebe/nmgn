import { ReactNode } from 'react';
import Head from 'next/head'
import {Request} from 'express';

const Page = ({ children, req }: { children: ReactNode, req: Request }) => (
  <div>
    <Head>
        <meta name="csrf-token" content={req.csrfToken()}/>
    </Head>
    { children }
  </div>
)

Page.getInitialProps = async ({req}: {xhr: XMLHttpRequest, req: Request}) => {
    return {req};
}

export default Page