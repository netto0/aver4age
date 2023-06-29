import styles from "./ListBox.module.css";
// import {getSubjects, getSubject} from "../../../api/Subjects";
import {getSubject} from "../../../api/Subjects";
import React, { useCallback, useEffect, useState } from "react";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import EditSubjectBox from "../EditSubjectBox/EditSubjectBox";

export default function ListBox() {
  const {formData, setFormData, getData, setModalActive, subjects} = React.useContext(GlobalSettingsContext)

  function getAverage(ava, pim, exam) {
    if (ava && pim && exam) {
      return ((parseFloat(ava) + (2 * parseFloat(pim)) + (7 * parseFloat(exam))) / 10).toFixed(2);
    } else {
      return "-"
    }
  }

  function getAvaSum(ava1, ava2, ava3, ava4) {
    if (ava1 && ava2 && ava3 && ava4) {
      return (parseFloat(ava1) + parseFloat(ava2) + parseFloat(ava3) + parseFloat(ava4)).toFixed(2);
  } else {
    return "-"
  }}

  function getSituation(average, exam) {
    if (average < 7) {
      const finalAverage = (parseFloat(average) + parseFloat(exam)) / 2;
      return finalAverage > 5 ? "Aprovado" : "Reprovado";
    } else if(average > 7){
      return "Aprovado";
    } else {
      return "Pendente"
    }
  }

  const getSingleSubject = useCallback(async (id) => {
    const response = await getSubject(id);
    if (response) {
      setFormData({...formData, ...response})
    }
  }, []);

  const openEditPage = (e) => {
    const rowID = e.target.parentElement.id 
    getSingleSubject(rowID)
    setModalActive(<EditSubjectBox/>)
  }


  useEffect(() => {
    getData();
  }, []);

  const {} = React.useContext(GlobalSettingsContext)

  return (
    <div className={styles.listboxContainer}>
      <table>
        <thead>
          <tr>
            <th>Semestre</th>
            <th>Matéria</th>
            <th>AVA</th>
            <th>PIM</th>
            <th>Prova</th>
            <th>Média</th>
            <th>Mín. Exame</th>
            <th>Exame</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => {
            const { ava1, ava2, ava3, ava4, id } = subject;
            const avaSum = getAvaSum(ava1, ava2, ava3, ava4);
            const average = getAverage(avaSum, subject.pim, subject.exam);

            return (
              // <tr key={id} className={styles.tableRow} onClick={() => setModalActive(<EditSubjectBox />)}>
              <tr key={id} className={styles.tableRow} id={id} onClick={(e) => openEditPage(e)}>
                <td>{subject.semester}</td>
                <td className={styles.subjectName}>{subject.name}</td>
                <td>{avaSum}</td>
                <td>{subject.pim ? parseFloat(subject.pim).toFixed(2) : "-"}</td>
                <td>{subject.exam ? parseFloat(subject.exam).toFixed(2): "-"}</td>
                <td className={styles.average}>
                  {average}
                  {average < 7 && <div className={styles.redCircle} />}
                </td>
                <td>{average < 7 ? (10 - average).toFixed(2) : "-"}</td>
                <td>
                  {subject.summerSchoolGrade
                    ? (subject.summerSchoolGrade).toFixed(2)
                    : "-"}
                </td>
                <td>{getSituation(average, subject.summerSchoolGrade)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}