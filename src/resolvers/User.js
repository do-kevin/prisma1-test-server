const getUserId = require("../utils/getUserId");

const User = {
  email: {
    fragment: "fragment userId on User { id }",
    resolve(parent, _args, { request }, _info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }

      return null;
    },
  },
  posts: {
    fragment: "fragment userId on User { id }",
    resolve(parent, _args, { prisma, request }, info) {
      const userId = getUserId(request);
      console.log("parent", parent);
      const posts = prisma.query.posts(
        {
          where: {
            published: true,
            author: {
              id: userId,
            },
          },
        },
        info
      );
      return posts;
    },
  },
};

module.exports = User;
