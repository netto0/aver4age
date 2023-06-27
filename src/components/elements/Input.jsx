import styles from "./Input.module.css";

export default function Input({ placeholder, name, icon }) {
  return (
    <div className={styles.inputContainer}>
      <input type="text" placeholder={placeholder} name={name} />
      <button className={styles.button}>
        <span className={styles.svg}>{icon}</span>
      </button>
    </div>
  );
}
