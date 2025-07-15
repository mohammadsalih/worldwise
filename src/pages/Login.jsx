import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useFakeAuthContext } from "../context/FakeAuthContext";

import styles from "./Login.module.css";

import PageNav from "../components/PageNav";
import Button from "../components/Button";

export default function Login() {
  const { login, isAuthenticated } = useFakeAuthContext();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    try {
      // Validate email and password
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      login(email, password);
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  useEffect(() => {
    // Redirect to /app if already authenticated
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button onClick={handleLogin}>login</Button>
        </div>
      </form>
    </main>
  );
}
