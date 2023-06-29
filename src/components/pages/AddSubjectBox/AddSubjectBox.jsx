import React, { useState } from "react";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import styles from "./AddSubjectBox.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import { addSubject } from "../../../api/Subjects"

export default function AddSubjectBox() {
  
  const {formData, setFormData, getData} = React.useContext(GlobalSettingsContext)

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const closeScreen = () => {
    setFormData({
        name: "",
        semester: "",
        ava1: "",
        ava2: "",
        ava3: "",
        ava4: "",
        pim: "",
        exam: "",
        summerSchoolGrade: "",
    })
    setModalActive(null)
  }

  const sendForm = async (e, {name, semester, ava1, ava2, ava3, ava4, pim, exam, summerSchoolGrade}) => {
    e.preventDefault()
    const res = await addSubject(name, semester, ava1, ava2, ava3, ava4, pim, exam, summerSchoolGrade)
    if(res) {
      getData()
    }
    closeScreen()
  }

  const { setModalActive } = React.useContext(GlobalSettingsContext);

  return (
    <div className={styles.addSubjectContainer}>
      {/* {JSON.stringify(formData)} */}
      <form>
        <IoMdCloseCircleOutline onClick={closeScreen} />
        <legend>Adicionar Matéria</legend>
        <Input
          name="subjectName"
          type="text"
          placeholder="Nome da Matéria"
          value={formData.name}
          onChange={(e) => handleChange(e, "name")}
        />
        <Input name="semester" type="number" placeholder="Semestre" onChange={(e) => handleChange(e, "semester")}/>
        <div className={styles.double}>
          <Input name="ava1" type="number" placeholder="Questionário I AVA" onChange={(e) => handleChange(e, "ava1")}/>
          <Input name="ava2" type="number" placeholder="Questionário II AVA" onChange={(e) => handleChange(e, "ava2")}/>
        </div>
        <div className={styles.double}>
          <Input name="ava3" type="number" placeholder="Questionário III AVA" onChange={(e) => handleChange(e, "ava3")}/>
          <Input name="ava4" type="number" placeholder="Questionário IV AVA" onChange={(e) => handleChange(e, "ava4")}/>
        </div>
        <Input name="pim" type="number" placeholder="PIM" onChange={(e) => handleChange(e, "pim")}/>
        <Input name="exam" type="number" placeholder="Prova" onChange={(e) => handleChange(e, "exam")}/>
        <div className={styles.double}>
          <Button
            label="Cancelar"
            red={true}
            width="1000px"
            onClick={closeScreen}
          />
          <Button label="Confirmar" green={true} onClick={(e) => sendForm(e, formData)}/>
        </div>
      </form>
    </div>
  );
}
