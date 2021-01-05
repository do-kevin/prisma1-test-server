const users = [
  {
    id: "1",
    name: "Kevin",
    email: "do.kevin.vo@gmail.com",
    age: 26,
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
  },
];

const posts = [
  {
    id: "1",
    title: "What is GraphQl?",
    body:
      "What is GraphQl and can it manage local state? Please provide me some helpful links. Thanks.",
    published: true,
    author: "3",
  },
  {
    id: "2",
    title: "Can it be used for local state?",
    body:
      "How does GraphQL compare to Redux when it comes to local state management? Not too bad?",
    published: false,
    author: "2",
  },
  {
    id: "3",
    title: "Godot Game Development Resources",
    body:
      "There are plenty of tutorials on YouTube. Most notable YouTubers on Godot game development are Garbaj, Miziziz, KidsCanCode, Heartbeast, and Pigdev.",
    published: true,
    author: "1",
  },
];

const comments = [
  {
    id: "1",
    text: "Lorem ipsum 1",
    author: "2",
    post: "2",
  },
  {
    id: "2",
    text: "Lorem ipsum 2",
    author: "3",
    post: "1",
  },
  {
    id: "3",
    text: "Lorem ipsum 3",
    author: "1",
    post: "3",
  },
  {
    id: "4",
    text: "Lorem ipsum 4",
    author: "1",
    post: "3",
  },
];

const db = {
  users,
  posts,
  comments,
};

module.exports = db;
