import "core-js/stable";
import "regenerator-runtime/runtime";
import { GraphQLServer, PubSub } from "graphql-yoga";
import prisma from "../src/prisma";
import { resolvers, fragmentReplacements } from "../src/resolvers";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      pubsub,
      prisma,
      request,
    };
  },
  fragmentReplacements,
});

server.start(process.env.PORT || 4000, (options) => {
  console.log(`The server is up on ${options.port}`);
});
