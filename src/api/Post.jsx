export const getPostById = async (postId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
  );
  return await res.json();
};
