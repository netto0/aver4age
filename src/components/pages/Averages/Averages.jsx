import styles from "./Averages.module.css";
import ListBox from "./ListBox";
import ListMenu from "./ListMenu";

export default function Averages() {
  return (
    <div className={styles.averagesContainer}>
      <div className={styles.listMenuSubcontainer}>
      <ListMenu />
      </div>
      <div className={styles.listBoxSubcontainer}>
        <ListBox />
      </div>
    </div>
  );
}
