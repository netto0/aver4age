import React from "react";
import styles from "./AddOrEditSubjectBox.module.css";
import Button from "../../elements/Button";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Input from "../../elements/Input";
import { deleteSubject } from "../../../api/Subjects";

export default function DeleteSubjectBox() {
    const { formData, setFormData, setModalActive, getData } = React.useContext(GlobalSettingsContext);
  
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
        <legend>Deletar Matéria</legend>
        <Input value={formData.name} label="Nome" readOnly/>
        <div className={styles.double}>
          <Button
            label="Cancelar"
            color="red"
            width="1000px"
            onClick={closeScreen}
          />
          <Button
            label="Confirmar"
            color="green"
            onClick={(e) => confirmDelete(e)}
          />
        </div>
      </form>
    </div>
  );
}
