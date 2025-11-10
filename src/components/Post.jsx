import PropTypes from "prop-types";
import { User } from "./User.jsx";
export function Post({ title, content, author: userId }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{content}</div>
      {userId && (
        <em>
          <br />
          Written by <User id={userId} />
        </em>
      )}
    </article>
  );
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  author: PropTypes.string,
};
