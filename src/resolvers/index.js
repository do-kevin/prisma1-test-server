const { extractFragmentReplacements } = require("prisma-binding");
const Query = require("./Query");
const Mutation = require("./Mutation");
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Subscription = require("./Subscription");

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Comment,
  Subscription,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

module.exports = { resolvers, fragmentReplacements };
