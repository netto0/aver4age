import React, { useEffect, useState } from "react";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import styles from "./AddSubjectBox.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import { addSubject } from "../../../api/Subjects";

export default function AddSubjectBox() {
  const { formData, setFormData, getData } = React.useContext(GlobalSettingsContext);
  const [validForm, setValidForm] = useState(false);
  
  // const handleChange = (e, key) => {setFormData({ ...formData, [key]: e.target.value.toUpperCase() });};

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

  useEffect(() => {
    if (formData.name !== "" && formData.semester !== "") {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [formData]);

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

  const sendForm = async (
    e,
    {name, semester, ava1, ava2, ava3, ava4, pim, exam, summerSchoolGrade}
  ) => {
    e.preventDefault();
    const res = await addSubject(
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
    }
    closeScreen();
  };

  const { setModalActive } = React.useContext(GlobalSettingsContext);

  return (
    <div className={styles.addSubjectContainer}>
      {/* {JSON.stringify(formData)} */}
      <form>
        <IoMdCloseCircleOutline onClick={closeScreen} />
        <legend>Adicionar Matéria</legend>
        <Input
          name="subjectName"
          label="Nome"
          type="text"
          placeholder="Nome da Matéria"
          value={formData.name}
          onChange={(e) => handleChange(e, "name")}
        />
        <Input
          name="semester"
          label="Semestre"
          min={1}
          max={12}
          type="number"
          placeholder="Semestre"
          onChange={(e) => handleChange(e, "semester")}
          />
        <div className={styles.double}>
          <Input
            name="ava1"
            label="AVA I"
            min={0}
            max={5}
            type="number"
            placeholder="Questionário I AVA"
            onChange={(e) => handleChange(e, "ava1")}
          />
          <Input
            name="ava2"
            label="AVA II"
            min={0}
            max={5}
            type="number"
            placeholder="Questionário II AVA"
            onChange={(e) => handleChange(e, "ava2")}
          />
        </div>
        <div className={styles.double}>
          <Input
            name="ava3"
            label="AVA III"
            min={0}
            max={5}
            type="number"
            placeholder="Questionário III AVA"
            onChange={(e) => handleChange(e, "ava3")}
          />
          <Input
            name="ava4"
            label="AVA IV"
            min={0}
            max={5}
            type="number"
            placeholder="Questionário IV AVA"
            onChange={(e) => handleChange(e, "ava4")}
          />
        </div>
        <Input
          name="pim"
          label="PIM"
          min={0}
          max={10}
          type="number"
          placeholder="PIM"
          onChange={(e) => handleChange(e, "pim")}
          />
        <Input
          name="exam"
          label="Prova"
          min={0}
          max={10}
          type="number"
          placeholder="Prova"
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
            label="Confirmar"
            color={validForm ? "green" : "disabled"}
            disabled = {validForm ? false : true}
            onClick={(e) => sendForm(e, formData)}
          />
        </div>
      </form>
    </div>
  );
}
