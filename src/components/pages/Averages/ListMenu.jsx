import Button from '../../elements/Button'
import Input from '../../elements/Input'
import styles from './ListMenu.module.css'
import { BiFilter, BiPlus } from 'react-icons/bi'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import React from 'react'
import { GlobalSettingsContext } from '../../../providers/globalSettings'
import AddOrEditSubjectBox from '../SubjectBoxes/AddOrEditSubjectBox'

export default function ListMenu() {
    
    const {setModalActive} = React.useContext(GlobalSettingsContext)

    return (
        <div className={styles.listMenuContainer}>
            <Button label={<BiPlus />} onClick={() => setModalActive(<AddOrEditSubjectBox windowType="add" />)}/>
            <Input placeholder={"Digite o que deseja buscar..."} icon={<PiMagnifyingGlassBold />} align='left'/>
            <Button label="Nome" icon={<BiFilter />} />
            <Button label="OK" />
        </div>
    )
}