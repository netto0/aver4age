import styles from "./Input.module.css";

export default function Input({ icon, label, value, onlyRead, align = "center", ...rest }) {
  return (
    <div className={styles.inputContainer}>
      {label && <label>{label}</label>}
      <input type="text" value = {value || ""} {...rest} readOnly={onlyRead} style={{ textAlign: align }} />
      {icon && (
        <button className={styles.button}>
          <span className={styles.svg}>{icon}</span>
        </button>
      )}
    </div>
  );
}
