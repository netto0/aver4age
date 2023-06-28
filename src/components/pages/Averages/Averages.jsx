import styles from './Averages.module.css'
import ListBox from './ListBox'
import ListMenu from './ListMenu'

export default function Averages() {
    return (
        <div className={styles.averagesContainer}>
            <ListMenu />
            <ListBox />
        </div>
    )
}