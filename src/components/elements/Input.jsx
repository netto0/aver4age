import styles from "./Input.module.css";

export default function Input({ icon, align = "center", ...rest }) {
  return (
    <div className={styles.inputContainer}>
      <input type="text" {...rest} style={{ textAlign: align }} />
      {icon && (
        <button className={styles.button}>
          <span className={styles.svg}>{icon}</span>
        </button>
      )}
    </div>
  );
}
