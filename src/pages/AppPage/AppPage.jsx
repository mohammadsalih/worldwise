import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";

import styles from "./AppPage.module.css";

function AppPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppPage;
