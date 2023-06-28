import styles from "./Button.module.css";

export default function Button({ label, onClick, larger, icon = false }) {
  return (
    <button title ="teste" className={`${styles.button} ${larger && styles.larger}`} onClick={onClick}>
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
}
