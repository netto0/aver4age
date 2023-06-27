import styles from "./Button.module.css";

export default function Button({ label, color, larger, icon = false }) {
  return (
    <button className={larger && styles.larger}>
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
}
