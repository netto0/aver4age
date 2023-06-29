import React, { useEffect } from "react";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import styles from "../AddSubjectBox/AddSubjectBox.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import { editSubject, deleteSubject } from "../../../api/Subjects";


export default function EditSubjectBox() {
  
  const {setModalActive, formData, setFormData, getData} = React.useContext(GlobalSettingsContext)

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

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value.toUpperCase() });
  };

  const sendChanges = async (e) => {
    const {name, semester, ava1,ava2,ava3,ava4,pim, exam, summerSchoolGrade} = formData
    e.preventDefault()
    const res = await editSubject(formData.id,name, semester, ava1,ava2,ava3,ava4,pim, exam, summerSchoolGrade)
    if(res) {
      console.log("aaaaaaa")
      getData()
      closeScreen()
    }
  }
  
  const confirmDelete = async (e) => {
    e.preventDefault()
    const res = await deleteSubject(formData.id)
    if(res) {
      getData()
    }
    closeScreen()
  }

    return (
    <div className={styles.addSubjectContainer}>
      {/* {JSON.stringify(formData)} */}
      <form onSubmit={(e) => e.preventDefault()}>
        <IoMdCloseCircleOutline onClick={() => setModalActive(null)}/>
        <legend>Editar Matéria</legend>
        <Input type="text" name="subjectName" placeholder="Nome da Matéria" value={formData.name} onChange={(e) => handleChange(e, "name")}/>
        <Input type="number" name="semester" placeholder="Semestre" value={formData.semester} onChange={(e) => handleChange(e, "semester")}/>
        <div className={styles.double}>
          <Input type="number" name="ava1" placeholder="Questionário I AVA" value={formData.ava1} onChange={(e) => handleChange(e, "ava1")}/>
          <Input type="number" name="ava2" placeholder="Questionário II AVA" value={formData.ava2} onChange={(e) => handleChange(e, "ava2")}/>
        </div>
        <div className={styles.double}>
          <Input type="number" name="ava3" placeholder="Questionário III AVA" value={formData.ava3} onChange={(e) => handleChange(e, "ava3")}/>
          <Input type="number" name="ava4" placeholder="Questionário IV AVA" value={formData.ava4} onChange={(e) => handleChange(e, "ava4")}/>
        </div>
        <Input type="number" name="pim" placeholder="PIM" value={formData.pim} onChange={(e) => handleChange(e, "pim")}/>
        <Input type="number" name="exam" placeholder="Prova" value={formData.exam} onChange={(e) => handleChange(e, "exam")}/>
        <div className={styles.double}>
          <Button label="Cancelar" red={true} width="1000px" onClick={closeScreen}/>
          <Button label="Excluir" red={true} width="1000px" onClick={confirmDelete}/>
          <Button label="Confirmar" green={true} onClick={(e) => sendChanges(e, )}/>
        </div>
      </form>
    </div>
  );
}
