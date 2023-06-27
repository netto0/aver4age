import Button from '../../elements/Button'
import styles from './ListMenu.module.css'
import { BiFilter, BiPlus } from 'react-icons/bi'

export default function ListMenu() {
    return (
        <div className={styles.listMenuContainer}>
            <Button label={<BiPlus />} />
            <input type="text" />
            <Button label="Nome" icon={<BiFilter />} larger={true} />
            <Button label="OK" />
        </div>
    )
}