const bcrypt = require("bcryptjs");
const getUserId = require("../utils/getUserId");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");

const Mutation = {
  async createUser(_parent, args, { prisma }, _info) {
    const password = await hashPassword(args.data.password);

    const emailTaken = await prisma.exists.User({ email: args.data.email });

    if (emailTaken) {
      throw new Error("Email is taken.");
    }

    const user = await prisma.mutation.createUser({
      data: { ...args.data, password },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async loginUser(_parent, args, { prisma }, _info) {
    const { email, password } = args.data;

    const user = await prisma.query.user({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new Error("Unable to login");
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async deleteUser(_parent, _args, { prisma, request }, info) {
    const userId = getUserId(request);

    const user = await prisma.mutation.deleteUser(
      { where: { id: userId } },
      info
    );
    return user;
  },
  async updateUser(_parent, args, { prisma, request }, info) {
    const { data } = args;

    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }

    const userId = getUserId(request);

    const user = await prisma.mutation.updateUser(
      {
        where: { id: userId },
        data,
      },
      info
    );

    return user;
  },
  async createPost(_parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const post = await prisma.mutation.createPost(
      {
        data: {
          ...args.data,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
    return post;
  },
  async deletePost(_parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: { id: userId },
    });

    if (!postExists) {
      throw new Error("Post not found");
    }

    return await prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updatePost(_parent, args, { prisma, request }, info) {
    const { id, data } = args;

    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id,
      author: { id: userId },
    });

    if (!postExists) {
      throw new Error("Post not found");
    }

    const isPublished = await prisma.exists.Post({
      id: args.id,
      published: true,
    });

    if (isPublished && args.data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: { id: args.id },
        },
      });
    }

    const post = await prisma.mutation.updatePost(
      {
        where: {
          id,
        },
        data,
      },
      info
    );

    return post;
  },
  async createComment(_parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const publishedPostExists = await prisma.exists.Post({
      published: true,
      id: args.data.post,
    });

    if (!publishedPostExists) {
      throw new Error("Post not found");
    }

    return await prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: { id: userId },
          },
          post: {
            connect: { id: args.data.post },
          },
        },
      },
      info
    );
  },
  async deleteComment(_parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!commentExists) {
      throw new Error("Comment not found");
    }

    return await prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updateComment(_parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!commentExists) {
      throw new Error("Comment not found");
    }

    return await prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
};

module.exports = Mutation;
