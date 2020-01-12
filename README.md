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
	- asd	
- If any package or notice is missing please contact me.
