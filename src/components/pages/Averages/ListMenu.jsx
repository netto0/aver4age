import Button from '../../elements/Button'
import Input from '../../elements/Input'
import styles from './ListMenu.module.css'
import { BiFilter, BiPlus } from 'react-icons/bi'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

export default function ListMenu() {
    return (
        <div className={styles.listMenuContainer}>
            <Button label={<BiPlus />} />
            <Input placeholder={"Digite o que deseja buscar..."} icon={<PiMagnifyingGlassBold />}/>
            <Button label="Nome" icon={<BiFilter />} larger={true} />
            <Button label="OK" />
        </div>
    )
}