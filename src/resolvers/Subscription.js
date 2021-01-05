const getUserId = require("../utils/getUserId");

const Subscription = {
  comment: {
    async subscribe(_parent, { postId }, { prisma }, info) {
      return await prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId,
              },
            },
          },
        },
        info
      );
    },
  },
  post: {
    async subscribe(_parent, _args, { prisma }, info) {
      return await prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
  myPost: {
    async subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);

      return await prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId,
              },
            },
          },
        },
        info
      );
    },
  },
};

module.exports = Subscription;
