require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const cors = require("cors");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
const resolvers = require("./src/resolvers/index");
const typeDefs = require("./src/schema");
const db = require("./src/db");
const DB_HOST = process.env.DB_HOST;
const models = require("./src/models");

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors());
  const httpServer = http.createServer(app);

  db.connect(DB_HOST);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: () => {
      return { models };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
