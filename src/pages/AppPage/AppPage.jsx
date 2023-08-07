import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";

import styles from "./AppPage.module.css";
import User from "../../components/User/User";

function AppPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppPage;
