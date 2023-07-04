import styles from "./ListBox.module.css";
import { getSubject } from "../../../api/Subjects";
import React, { useCallback, useEffect, useState } from "react";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import EditSubjectBox from "../EditSubjectBox/EditSubjectBox";

export default function ListBox() {
  const { formData, setFormData, getData, setModalActive, subjects } =
    React.useContext(GlobalSettingsContext);

  function getAverage(ava, pim, exam) {
    if (ava && pim && exam) {
      return (
        (parseFloat(ava) + 2 * parseFloat(pim) + 7 * parseFloat(exam)) /
        10
      ).toFixed(2);
    } else {
      return "-";
    }
  }

  function getSum(array) {
    let sumResult = 0.00
    const incomplete = array.includes("")
    array.forEach((item) => {
      if(item !== "") {
        sumResult += parseFloat(item)
      }
    })
    return [sumResult.toFixed(2), incomplete];
  }

  function getSituation(average, exam, incomplete) {
    if (incomplete) {
      return "Pendente";
    } else if (average < 7) {
      const finalAverage = (parseFloat(average) + parseFloat(exam)) / 2;
      return finalAverage > 5 ? "Aprovado" : "Reprovado";
    } else if (average > 7) {
      return "Aprovado";
  }}

  const getSingleSubject = useCallback(async (id) => {
    const response = await getSubject(id);
    if (response) {
      setFormData({ ...formData, ...response });
    }
  }, []);

  const openEditPage = (e) => {
    const rowID = e.target.parentElement.id;
    getSingleSubject(rowID);
    setModalActive(<EditSubjectBox />);
  };

  useEffect(() => {
    getData();
  }, []);

  const {} = React.useContext(GlobalSettingsContext);
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
            const avaSum = getSum([ava1, ava2, ava3, ava4]);
            const average = getAverage(avaSum, subject.pim, subject.exam);
            return (
              <tr
                key={id}
                className={styles.tableRow}
                id={id}
                onClick={(e) => openEditPage(e)}
              >
                <td>{subject.semester}</td>
                <td className={styles.subjectName}>{subject.name}</td>
                <td className={styles.withCircle}>
                  {avaSum[0]}
                  {
                    avaSum[1] &&
                    <div
                      className={`${styles.indicatorCircle} ${styles.yellow}`}
                      title="Há notas não lançadas"
                    />
                  }
                </td>
                <td>
                  {subject.pim ? parseFloat(subject.pim).toFixed(2) : "-"}
                </td>
                <td>
                  {subject.exam ? parseFloat(subject.exam).toFixed(2) : "-"}
                </td>
                <td className={styles.withCircle}>
                  {average}
                  {average < 7 && (
                    <div
                      className={`${styles.indicatorCircle} ${styles.red}`}
                      title="Média insuficiente"
                    />
                  )}
                </td>
                <td>{average < 7 ? (10 - average).toFixed(2) : "-"}</td>
                <td>
                  {subject.summerSchoolGrade
                    ? subject.summerSchoolGrade.toFixed(2)
                    : "-"}
                </td>
                <td>{getSituation(average, subject.summerSchoolGrade, avaSum[1])}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
