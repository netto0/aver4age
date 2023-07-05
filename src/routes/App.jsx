import React from "react";
import Header from "../components/structure/Header";
import Footer from "../components/structure/Footer";
import styles from "./App.module.css";
import Modal from "../components/elements/Modal";
import { GlobalSettingsContext } from "../providers/globalSettings";
import { Outlet } from "react-router-dom";


function App() {
  const { modalActive } = React.useContext(GlobalSettingsContext);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appHeader}>
        <Header />
      </div>
      <div className={styles.appContent}>
        <Outlet />
        <Modal>{modalActive}</Modal>
      </div>
      <div className={styles.appFooter}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
