import { listPostsByAuthor } from "../services/posts.js";
export const userSchema = `#graphql
type User {
id: ID!
username: String!
posts: [Post!]
}
`;
export const userResolver = {
  User: {
    id: (user) => {
      return user._id?.toString() || user.id;
    },
    posts: async (user) => {
      return await listPostsByAuthor(user.username);
    },
  },
};
