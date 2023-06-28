import { GlobalSettingsContext } from "../../providers/globalSettings";
import styles from "./Modal.module.css";
import React from "react";


export default function Modal({ children }) {
  
    const {setModalActive} = React.useContext(GlobalSettingsContext)
  
    return (
    <div className={`${styles.modalContainer} ${children && styles.active}`}>
      {children}
    </div>
  );
}
