## Welcome to the nmgn stack

The nmgn stack is intended to provide a simple and fun starting point for cloud native fullstack javascript applications offering everything from authentication to deployment.   
NMGN is a set of Open Source components that together, provide an end-to-end framework for building dynamic web applications; starting from the top (code running in the browser) to the bottom (database). The stack is made up of:

- **N**estJS : TypeScript based Back-end framework running on top of Node.js
- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **G**raphQL : GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data
- **N**ext.js : React framework implementing server-side rendering and many optimizations to get running very quickly

### Pre-requisites
* git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .  
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn (recommended) - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation 
``` 
git clone https://github.com/Sebi55/nmgn
cd nmgn
yarn
yarn dev (for development)
```

### Deployment
I will provide details how to deploy nmgn very soon!
It is pretty much just running yarn build and then yarn start while setting the correct environment variables.
Furthermore I will provide a Dockerfile and a sample configuration for Azure App Service.

### Authentication
The authentication of requests works using the standardized JWT flow.
You can test it by setting up a "users" collection with a user containing an _id, username and password.
Important is that the whole authentication flow ensures the it is not open to CSRF attacks by still offering SSR with Next.js.
1. The client reads the "csrf-token" from a head meta tag. On the server the "csrf-token" is generated and also used to send requests to the server's local GraphQL server. The client has to rely on the rendered meta tag to receive the csrf-token.
2. The user sends the login details
 username and password to the **/auth/login** route. The login request does not require a "csrf-token" though because no destructive action can be initiated without being logged in. The Back-end verifies that by checking if a "jwt" cookie is being sent. If the JWT is sent inside the HTTP header the client is not open to CSRF. The "csrf-token" has to be sent when sending the JWT inside a cookie.
3. The login response sets a "jwt" cookie but also returns the JWT inside a JSON response. The cookie has to be set because this allows the server-side rendering of authenticated routes. Other clients which do not need SSR can instead send the JWT inside the HTTP header and by that do not require the CSRF token which is currently only available when loading a Next.js route which is not needed for mobile apps or other clients.

### Credits 
- The nmgn stack uses the following third-party packages:
	- Apollo Client - The standard GraphQL client library: [Website](https://www.apollographql.com/)
	- Mongoose - MongoDB object modeling for Node.js: [Website](https://mongoosejs.com/)
	- Express - The most common Node.js framework: [Website](https://expressjs.com/)
	- Formik - React form library without the hassle: [Website](https://jaredpalmer.com/formik)
	- nest-next - NestJS and Next.js integration module: [Website](https://github.com/kyle-mccarthy/nest-next#readme)
	- next-with-apollo - Apollo HOC for Next.js: [Website](https://github.com/lfades/next-with-apollo)
	- Passport - Passport is authentication middleware for Node.js: [Website](http://www.passportjs.org/)
	- type-graphql - TypeScript GraphQL framework: [Website](https://typegraphql.ml/) 
	- typegoose - Define Mongoose models using TypeScript classes: [Website](https://github.com/typegoose/typegoose) 
- If any package or notice is missing please contact me.
