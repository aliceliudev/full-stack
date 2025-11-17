import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/users.js";
export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate("/login"),
    onError: () => alert("failed to sign up!"),
  });

  // Debug logging
  console.log("Username:", username, "Length:", username.length);
  console.log("Password:", password, "Length:", password.length);
  console.log("Is Pending:", signupMutation.isPending);
  console.log(
    "Button disabled:",
    !username || !password || signupMutation.isPending,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Link to="/">Back to main page</Link>
      <hr />
      <div>
        <label htmlFor="create-username">Username: </label>
        <input
          type="text"
          name="create-username"
          id="create-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-password">Password: </label>
        <input
          type="password"
          name="create-password"
          id="create-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type="submit"
        value={signupMutation.isPending ? "Signing up..." : "Sign Up"}
        disabled={!username || !password || signupMutation.isPending}
      />
    </form>
  );
}
