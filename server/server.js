const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// start a new apollo server and pass in our schema
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  // start server
  await server.start();
  // integrate apollo with express server as middleware
  server.applyMiddleware({ app });

   // log where we can go to test our GQL API
   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};
startServer();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
