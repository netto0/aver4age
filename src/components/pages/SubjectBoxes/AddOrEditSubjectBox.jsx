import React, { useEffect, useState } from "react";
import styles from "./AddOrEditSubjectBox.module.css";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import { addSubject, editSubject } from "../../../api/Subjects";

export default function AddOrEditSubjectBox({ windowType }) {
  const { formData, setFormData, getData, setModalActive } = React.useContext(
    GlobalSettingsContext
  );

  const [validForm, setValidForm] = useState(false);
  const avaArray = [formData.ava1, formData.ava2, formData.ava3, formData.ava4];

  const handleChange = (e, key) => {
    const targetMin = parseFloat(e.target.min);
    const targetMax = parseFloat(e.target.max);
    if (e.target.type === "text") {
      setFormData({ ...formData, [key]: e.target.value.toUpperCase() });
    } else {
      if (e.target.value === "") {
        e.target.value = null;
      } else {
        if (parseFloat(e.target.value) >= targetMax) {
          e.target.value = targetMax;
        }
        if (parseFloat(e.target.value) <= targetMin) {
          e.target.value = targetMin;
        }
      }
      setFormData({ ...formData, [key]: e.target.value });
    }
  };

  const getSum = (array) => {
    let sumResult = 0;
    array.forEach((item) => {
      if (item !== "") {
        sumResult += Number(item);
      } else {
        sumResult += 0;
      }
    });
    return sumResult.toString();
  };

  const getAverage = (formData) => {
    if (
      [
        formData.ava1,
        formData.ava2,
        formData.ava3,
        formData.ava4,
        formData.pim,
        formData.exam,
      ].includes("")
    ) {
      return "";
    } else {
      const result =
        (parseFloat(formData.sum) +
          2 * parseFloat(formData.pim) +
          7 * parseFloat(formData.exam)) /
        10;
      return (parseFloat(Number(result)).toFixed(2)).toString();
    }
  };

  const getNeeded = (average) => {
    try {
      if(average === ""){
        return "";
      }
      else if (average < 7) {
        return (10 - parseFloat(average)).toFixed(2).toString();
      } else {
        return "";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getFinalAverage = (average, summerSchoolGrade) => {
    if ([average, summerSchoolGrade].includes("")) {
      return "";
    } else {
      return ((parseFloat(average) + parseFloat(summerSchoolGrade)) / 2).toFixed(2).toString();
    }
  };

  const getSituation = (formData) => {
    const {
      ava1,
      ava2,
      ava3,
      ava4,
      pim,
      exam,
      summerSchoolGrade,
      average,
      finalAverage,
    } = formData;

    if ([ava1, ava2, ava3, ava4, pim, exam].includes("")) {
      return "Pendente";
    } else if (average !== "" && parseFloat(average) < 7) {
      if ([ava1, ava2, ava3, ava4, pim, exam, summerSchoolGrade].includes("")) {
        return "Pendente";
      } else {
        if (finalAverage && parseFloat(finalAverage) >= 5) {
          return "Aprovado";
        } else {
          return "Reprovado";
        }
      }
    } else if (average !== "" && parseFloat(average) >= 7) {
      return "Aprovado";
    } else {
      return "Nao tratado";
    }
  };

  // Define se o formulário é válido
  useEffect(() => {
    if (formData.name !== "" && formData.semester !== "") {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [formData]);

  // Altera a soma no form em tempo real
  useEffect(() => {
    setFormData({ ...formData, sum: getSum(avaArray) });
  }, avaArray);

  // Altera a média no form em tempo real
  useEffect(() => {
    // console.log("mudei");
    setFormData({
      ...formData,
      average: getAverage(formData),
      situation: getSituation(formData),
    });
  }, [
    formData.sum,
    formData.pim,
    formData.exam,
    formData.summerSchoolGrade,
    formData.finalAverage,
  ]);

  // Altera a nota necessária no form em tempo real
  useEffect(() => {
    setFormData({
      ...formData,
      need: getNeeded(formData.average),
      finalAverage: getFinalAverage(
        formData.average,
        formData.summerSchoolGrade
      ),
    });
  }, [formData.average, formData.summerSchoolGrade]);

  const closeScreen = () => {
    setFormData({
      name: "",
      semester: "",
      ava1: "",
      ava2: "",
      ava3: "",
      ava4: "",
      sum: "",
      pim: "",
      exam: "",
      average: "",
      need: "",
      summerSchoolGrade: "",
      finalAverage: "",
      situation: "Pendente",
    });
    setModalActive(null);
  };

  const handleSubmit = async (
    e,
    {
      name,
      semester,
      ava1,
      ava2,
      ava3,
      ava4,
      sum,
      pim,
      exam,
      average,
      need,
      summerSchoolGrade,
      finalAverage,
      situation,
      id,
    }
  ) => {
    e.preventDefault();
    const currentSituation = getSituation(formData)
    if (windowType === "add") {
      const res = await addSubject(
        name,
        semester,
        ava1,
        ava2,
        ava3,
        ava4,
        sum,
        pim,
        exam,
        average,
        need,
        summerSchoolGrade,
        finalAverage,
        currentSituation
      );
      if (res) {
        getData();
      }
    } else if (windowType === "edit") {
      const res = await editSubject(
        id,
        name,
        semester,
        ava1,
        ava2,
        ava3,
        ava4,
        sum,
        pim,
        exam,
        average,
        need,
        summerSchoolGrade,
        finalAverage,
        currentSituation
      );
      if (res) {
        getData();
      }
    }
    closeScreen();
  };

  return (
    <div className={styles.addSubjectContainer}>
      {/* {JSON.stringify(formData)} */}
      {/* {formData.average} */}
      {/* {`Soma:${formData.sum} | Pim:${formData.pim} | Prova:${formData.exam} | Média:${formData.average} | Neces.:${formData.need} | MF: ${formData.finalAverage} | ${formData.situation}`}
      <br />
      <br />
      {`AVA1: ${formData.ava1} | AVA2: ${formData.ava2} | AVA3: ${formData.ava3} | AVA4: ${formData.ava4}`} */}
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <IoMdCloseCircleOutline onClick={closeScreen} />
        <legend>
          {windowType === "add" ? "Adicionar Matéria" : "Editar Matéria"}
        </legend>
        <Input
          name="subjectName"
          label="Nome"
          type="text"
          placeholder="Nome da Matéria"
          value={formData.name}
          autoFocus={true}
          onChange={(e) => handleChange(e, "name")}
        />
        <Input
          name="semester"
          label="Semestre"
          min={1}
          max={12}
          type="number"
          placeholder="Semestre"
          value={formData.semester}
          onChange={(e) => handleChange(e, "semester")}
        />
        <div className={styles.double}>
          <Input
            name="ava1"
            label="AVA I"
            min={0}
            max={5}
            step="0.01"
            type="number"
            placeholder="Questionário I AVA"
            value={formData.ava1}
            onChange={(e) => handleChange(e, "ava1")}
          />
          <Input
            name="ava2"
            label="AVA II"
            min={0}
            max={5}
            step="0.01"
            type="number"
            placeholder="Questionário II AVA"
            value={formData.ava2}
            onChange={(e) => handleChange(e, "ava2")}
          />
        </div>
        <div className={styles.double}>
          <Input
            name="ava3"
            label="AVA III"
            min={0}
            max={5}
            step="0.01"
            type="number"
            placeholder="Questionário III AVA"
            value={formData.ava3}
            onChange={(e) => handleChange(e, "ava3")}
          />
          <Input
            name="ava4"
            label="AVA IV"
            min={0}
            max={5}
            step="0.01"
            type="number"
            placeholder="Questionário IV AVA"
            value={formData.ava4}
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
          value={formData.pim}
          onChange={(e) => handleChange(e, "pim")}
        />
        <div className={styles.double}>
          <Input
            name="exam"
            label="Prova"
            min={0}
            max={10}
            type="number"
            placeholder="Prova"
            value={formData.exam}
            onChange={(e) => handleChange(e, "exam")}
          />
          <Input
            name="summerSchool"
            label="Exame"
            onlyRead = {formData.average && formData.average >= 7 }
            title= {formData.average < 7 ? null : "Média acima de 7"}
            min={0}
            max={10}
            type="number"
            placeholder="Exame"
            value={formData.summerSchoolGrade}
            onChange={(e) => handleChange(e, "summerSchoolGrade")}
          />
        </div>
        <div className={styles.double}>
          <Button
            label="Cancelar"
            type="button"
            color="red"
            width="1000px"
            onClick={closeScreen}
          />
          <Button
            label="Confirmar"
            type="submit"
            color={validForm ? "green" : "disabled"}
            disabled={validForm ? false : true}
          />
        </div>
      </form>
    </div>
  );
}
