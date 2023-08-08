import { Link } from "react-router-dom";

import PageNav from "../../components/PageNav/PageNav";

import styles from "./HomePage.module.css";
import { useFakeAuth } from "../../contexts/FakeAuthContext";

function Homepage() {
  const { isAuthenticated } = useFakeAuth();

  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you
          can think of. Never forget your wonderful experiences, and
          show your friends how you have wandered the world.
        </h2>

        <Link
          to={`${isAuthenticated ? "/app" : "/login"}`}
          className="cta"
        >
          Start traking now
        </Link>
      </section>
    </main>
  );
}

export default Homepage;
