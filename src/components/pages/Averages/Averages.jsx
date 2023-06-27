import styles from './Averages.module.css'
import ListMenu from './ListMenu'

export default function Averages() {
    return (
        <div className={styles.averagesContainer}>
            <ListMenu />
            <h1>List Component</h1>
        </div>
    )
}