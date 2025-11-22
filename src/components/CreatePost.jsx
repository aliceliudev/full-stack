// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from "react";
import { useMutation as useGraphQLMutation } from "@apollo/client/react/index.js";
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from "../api/graphql/post.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";
import slug from "slug";
// import { createPost } from '../api/posts.js'
export function CreatePost() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [token] = useAuth();
  const [createPost, { loading, data, error }] = useGraphQLMutation(
    CREATE_POST,
    {
      context: { headers: { Authorization: `Bearer ${token}` } },
      refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
    },
  ); /* const queryClient = useQueryClient()
const createPostMutation = useMutation({
 onSuccess: () => queryClient.invalidateQueries(['posts']),
 }) */
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({
      variables: { title, contents },
    });
  };
  if (!token) return <div>Please log in to create new posts.</div>;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
      </div>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />{" "}
      <input
        type="submit"
        value={loading ? "Creating...." : "Create"}
        disabled={!title || loading}
      />
      {error && (
        <div style={{ color: "red", marginTop: 8 }}>Error: {error.message}</div>
      )}
      {data?.createPost ? (
        <>
          <br /> Post
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>{" "}
          created successfully!
        </>
      ) : null}
    </form>
  );
}
