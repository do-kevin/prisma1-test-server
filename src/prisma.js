const { Prisma } = require("prisma-binding");
const { fragmentReplacements } = require("./resolvers");

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
});

module.exports = prisma;

// const getData = async () => {
//   try {
//     const info = `
//       {
//         id
//         name
//         email
//         posts {
//           id
//           title
//           comments {
//             id
//             text
//             author {
//               id
//               name
//             }
//           }
//         }
//       }
//     `;
//     const data = await prisma.query.users(null, info);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const getComments = async () => {
//   try {
//     const info = `
//       {
//         id
//         text
//         author {
//           id
//           name
//         }
//       }
//     `;
//     const data = await prisma.query.comments(null, info);
//   } catch (err) {
//     console.error(err);
//   }
// };

// getData();
// getComments();

// const createPost = async (data, postInfo) => {
//   try {
//     const createdPost = await prisma.mutation.createPost(data, postInfo);
//     const info = `
//       {
//         id
//         name
//         email
//         posts {
//           id
//           title
//           body
//           comments {
//             id
//             text
//             author {
//               id
//               name
//             }
//           }
//         }
//       }
//     `;
//     const usersWithPosts = await prisma.query.users(null, info);
//     // console.log(JSON.stringify(usersWithPosts, undefined, 4));
//     return usersWithPosts;
//   } catch (err) {
//     console.error(err);
//   }
// };

// createPost(
//   {
//     data: {
//       title: "Prisma Mutation Test",
//       body: "Trying this out. Lorem Ipsum.",
//       published: true,
//       author: {
//         connect: {
//           id: "ckil4mi07000y0944bk465u1h",
//         },
//       },
//     },
//   },
//   `
//     {
//       id
//       title
//       body
//       published
//       author {
//         id
//         name
//       }
//     }
//   `
// );

// const createPostForUser = async (authorId, data) => {
//   try {
//     const userExists = await prisma.exists.User({ id: authorId });

//     if (!userExists) {
//       throw new Error("User not found.");
//     }

//     const info = `{ author { id name email posts { id title body published } } }`;

//     const post = await prisma.mutation.createPost(
//       {
//         data: {
//           ...data,
//           author: {
//             connect: { id: authorId },
//           },
//         },
//       },
//       info
//     );

//     return post;
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// createPostForUser("ckil4mi07000y0944bk465u1h", {
//   title: "Cleaning up this createPostForUser request",
//   body: "Confirmed",
//   published: true,
// }).then((data) => {
//   log("data", data);
// });

// const updatePost = async (where, data) => {
//   try {
//     await prisma.mutation.updatePost({
//       where,
//       data,
//     });
//     const info = `
//       {
//         id
//         title
//         body
//         published
//       }
//     `;
//     const results = await prisma.query.posts(null, info);
//     console.log("data", JSON.stringify(results, undefined, 4));
//     return results;
//   } catch (err) {
//     console.error(err);
//   }
// };

// updatePost(
//   {
//     id: "ckipcn8fz000y0876kixj75v1",
//   },
//   {
//     title: "Testing Update Post Mutation",
//     body: "Is this working?",
//     published: false,
//   }
// );

// const updatePostForUser = async (postId, data) => {
//   try {
//     const postExists = await prisma.exists.Post({ id: postId });

//     if (!postExists) {
//       throw new Error("Post not found.");
//     }

//     const returningInfo = `{ author { id name email posts { id title body published } } }`;

//     const post = await prisma.mutation.updatePost(
//       {
//         where: { id: postId },
//         data,
//       },
//       returningInfo
//     );

//     return post.author;
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// updatePostForUser("ckis8rrbo00040976pwdit71p", {
//   title: "Is Learning Prisma 1 and GraphQL hard?",
//   body: "aaaaaaaaaaaaaaaaaaaah",
//   published: true,
// }).then((data) => {
//   log("data", data);
// });
