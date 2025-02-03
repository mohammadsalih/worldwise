import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import AppNav from './AppNav';

import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />

      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        © Copyright 2025 by WorldWise Inc.
      </footer>
    </div>
  );
}

export default Sidebar;
