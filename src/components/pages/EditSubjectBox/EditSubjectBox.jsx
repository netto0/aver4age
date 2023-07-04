import React, { useEffect } from "react";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import styles from "../AddSubjectBox/AddSubjectBox.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import { editSubject, deleteSubject } from "../../../api/Subjects";

export default function EditSubjectBox() {
  const { setModalActive, formData, setFormData, getData } = React.useContext(
    GlobalSettingsContext
  );

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
    });
    setModalActive(null);
  };

  const handleChange = (e, key) => {
    let targetMin = e.target.min
    let targetMax = e.target.max
    
    if(targetMin !== "" ) {
      if(parseFloat(e.target.value) < parseFloat(targetMin)) {
        e.target.value = targetMin
      }
      if(parseFloat(e.target.value) > parseFloat(targetMax)) {
        e.target.value = targetMax
      }
    }
    
    setFormData({ ...formData, [key]: e.target.value.toUpperCase() });
  };

  const sendChanges = async (e) => {
    const {
      name,
      semester,
      ava1,
      ava2,
      ava3,
      ava4,
      pim,
      exam,
      summerSchoolGrade,
    } = formData;
    e.preventDefault();
    const res = await editSubject(
      formData.id,
      name,
      semester,
      ava1,
      ava2,
      ava3,
      ava4,
      pim,
      exam,
      summerSchoolGrade
    );
    if (res) {
      getData();
      closeScreen();
    }
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    const res = await deleteSubject(formData.id);
    if (res) {
      getData();
    }
    closeScreen();
  };

  return (
    <div className={styles.addSubjectContainer}>
      {/* {JSON.stringify(formData)} */}
      <form onSubmit={(e) => e.preventDefault()}>
        <IoMdCloseCircleOutline onClick={closeScreen} />
        <legend>Editar Matéria</legend>
        <Input
          type="text"
          label="Nome"
          name="subjectName"
          placeholder="Nome da Matéria"
          value={formData.name}
          onChange={(e) => handleChange(e, "name")}
        />
        <Input
          type="number"
          label="Semestre"
          min={1}
          max={12}
          name="semester"
          placeholder="Semestre"
          value={formData.semester}
          onChange={(e) => handleChange(e, "semester")}
        />
        <div className={styles.double}>
          <Input
            type="number"
            label="AVA I"
            min={0}
            max={5}
            name="ava1"
            placeholder="Questionário I AVA"
            value={formData.ava1}
            onChange={(e) => handleChange(e, "ava1")}
          />
          <Input
            type="number"
            label="AVA II"
            min={0}
            max={5}
            name="ava2"
            placeholder="Questionário II AVA"
            value={formData.ava2}
            onChange={(e) => handleChange(e, "ava2")}
          />
        </div>
        <div className={styles.double}>
          <Input
            type="number"
            label="AVA III"
            min={0}
            max={5}
            name="ava3"
            placeholder="Questionário III AVA"
            value={formData.ava3}
            onChange={(e) => handleChange(e, "ava3")}
          />
          <Input
            type="number"
            label="AVA IV"
            min={0}
            max={5}
            name="ava4"
            placeholder="Questionário IV AVA"
            value={formData.ava4}
            onChange={(e) => handleChange(e, "ava4")}
          />
        </div>
        <Input
          type="number"
          label="PIM"
          min={0}
          max={10}
          name="pim"
          placeholder="PIM"
          value={formData.pim}
          onChange={(e) => handleChange(e, "pim")}
          />
        <Input
          type="number"
          label="Prova"
          min={0}
          max={10}
          name="exam"
          placeholder="Prova"
          value={formData.exam}
          onChange={(e) => handleChange(e, "exam")}
        />
        <div className={styles.double}>
          <Button
            label="Cancelar"
            color="red"
            width="1000px"
            onClick={closeScreen}
          />
          <Button
            label="Excluir"
            color="red"
            width="1000px"
            onClick={confirmDelete}
          />
          <Button
            label="Confirmar"
            color="green"
            onClick={(e) => sendChanges(e)}
          />
        </div>
      </form>
    </div>
  );
}
