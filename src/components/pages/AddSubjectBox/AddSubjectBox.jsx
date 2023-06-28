import React from "react";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import styles from "./AddSubjectBox.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GlobalSettingsContext } from "../../../providers/globalSettings";

export default function AddSubjectBox() {
  
  const {setModalActive} = React.useContext(GlobalSettingsContext)

    return (
    <div className={styles.addSubjectContainer}>
      <form>
        <IoMdCloseCircleOutline onClick={() => setModalActive(null)}/>
        <legend>Adicionar Matéria</legend>
        <Input name="subjectName" placeholder="Nome da Matéria" />
        <Input name="semester" placeholder="Semestre" />
        <div className={styles.double}>
          <Input name="ava1" placeholder="Questionário I AVA" />
          <Input name="ava2" placeholder="Questionário II AVA" />
        </div>
        <div className={styles.double}>
          <Input name="ava3" placeholder="Questionário III AVA" />
          <Input name="ava4" placeholder="Questionário IV AVA" />
        </div>
        <Input name="pim" placeholder="PIM" />
        <Input name="exam" placeholder="Prova" />
        <div className={styles.double}>
          <Button label="Cancelar" red={true} width="1000px" onClick={() => setModalActive(null)}/>
          <Button label="Confirmar" green={true} />
        </div>
      </form>
    </div>
  );
}
