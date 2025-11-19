import PropTypes from "prop-types";
import { User } from "./User.jsx";
import { Link } from "react-router-dom";
import slug from "slug";
export function Post({ title, content, author, id, fullPost = false }) {
  const authorId = typeof author === "string" ? author : author?.id;
  const authorName = typeof author === "string" ? null : author?.username;

  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullPost && <div>{content}</div>}
      {authorId && (
        <em>
          {fullPost && <br />}
          Written by{" "}
          {authorName ? <strong>{authorName}</strong> : <User id={authorId} />}
        </em>
      )}
    </article>
  );
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  ]),
  id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
};
