import Logo from '../components/Logo';
import AppNav from './AppNav';

import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />

      <AppNav />

      <p>cites list</p>

      <footer className={styles.footer}>
        © Copyright 2025 by WorldWise Inc.
      </footer>
    </div>
  );
}

export default Sidebar;
