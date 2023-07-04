import styles from "./Button.module.css";

export default function Button({label, color,hold=false, icon = false, ...rest}) {

  return (
    <button className={`${styles.button} ${styles[color]}`} {...rest}>
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
}
