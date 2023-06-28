import styles from "./Button.module.css";

export default function Button({label, green=false, red=false, icon = false, ...rest}) {
  return (
    <button className={`${styles.button} ${red && styles.red} ${green && styles.green}`} {...rest} styles={{width: "1000px"}}>
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
}
