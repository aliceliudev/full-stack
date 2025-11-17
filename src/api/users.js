export const signup = async ({ username, password }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/signup`;
  console.log("Signup URL:", url);
  console.log("Signup payload:", { username, password });
  console.log("VITE_BACKEND_URL env var:", import.meta.env.VITE_BACKEND_URL);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  console.log("Signup response status:", res.status);
  console.log("Signup response ok:", res.ok);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Signup error response:", errorText);
    throw new Error("failed to sign up");
  }
  return await res.json();
};
export const login = async ({ username, password }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/login`;
  console.log("Login URL:", url);
  console.log("Login payload:", { username, password });
  console.log("VITE_BACKEND_URL env var:", import.meta.env.VITE_BACKEND_URL);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  console.log("Login response status:", res.status);
  console.log("Login response ok:", res.ok);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Login error response:", errorText);
    throw new Error("failed to login");
  }
  return await res.json();
};

export const getUserInfo = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("failed to get user info");
  return await res.json();
};
