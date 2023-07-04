import React from "react";
import Header from "./components/structure/Header";
import Footer from "./components/structure/Footer";
import styles from "./App.module.css";
import Averages from "./components/pages/Averages/Averages";
import Modal from "./components/elements/Modal";
import { GlobalSettingsContext } from "./providers/globalSettings";

function App() {
  const { modalActive } = React.useContext(GlobalSettingsContext);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appHeader}>
        <Header />
      </div>
      <div className={styles.appContent}>
        <Modal>{modalActive}</Modal>
        <Averages />
      </div>
      <div className={styles.appFooter}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
