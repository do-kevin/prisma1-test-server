const getUserId = require("../utils/getUserId");

const Query = {
  users(_parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
    };

    if (query) {
      opArgs.where = {
        OR: [{ name_contains: query }, { email_contains: query }],
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(_parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {
        published: true,
      },
    };

    if (query) {
      opArgs.where.OR = [{ title_contains: query }, { body_contains: query }];
    }

    return prisma.query.posts(opArgs, info);
  },
  async myPosts(
    _parent,
    { query, first, skip, after, orderBy },
    { prisma, request },
    info
  ) {
    const userId = getUserId(request);

    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {
        author: { id: userId },
      },
    };

    if (query) {
      opArgs.where.OR = [{ title_contains: query }, { body_contains: query }];
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(_parent, { query, first, skip, after }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
    };

    if (query) {
      opArgs.where = {
        text_contains: query,
      };
    }

    return prisma.query.comments(opArgs, info);
  },
  async me(_parent, _args, { prisma, request }, info) {
    const userId = getUserId(request);

    const user = await prisma.query.user(
      {
        where: { id: userId },
      },
      info
    );

    return user;
  },
  async post(_parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const posts = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            {
              published: true,
            },
            { author: { id: userId } },
          ],
        },
      },
      info
    );

    if (posts.length === 0) {
      throw new Error("Post not found");
    }

    const [post] = posts;

    return post;
  },
};

module.exports = Query;
