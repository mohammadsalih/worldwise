import { useEffect, useState } from "react";

import PageNav from "../../components/PageNav/PageNav";

import styles from "./LoginPage.module.css";
import { useFakeAuth } from "../../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function LoginPage() {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useFakeAuth();

  const [email, setEmail] = useState("mohammadsalih.main@gmail.com");
  const [password, setPassword] = useState("mh0789hjdss");

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated]);

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
          <Button onClick={handleLogin} type="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
export default LoginPage;
