import React, { useCallback, useEffect, useState } from "react";
import styles from "./ListBox.module.css";
import { getSubject } from "../../../api/Subjects";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import { IoMdCloseCircleOutline } from "react-icons/io";
import DeleteSubjectBox from "../SubjectBoxes/DeleteSubjectBox";
import AddOrEditSubjectBox from "../SubjectBoxes/AddOrEditSubjectBox";

export default function ListBox() {
  const { formData, setFormData, getData, setModalActive, subjects, searchBarValue } =
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
    let sumResult = 0.0;
    const incomplete = array.includes("");
    array.forEach((item) => {
      if (item !== "") {
        sumResult += parseFloat(item);
      }
    });
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
    }
  }

  const getSingleSubject = useCallback(async (id) => {
    const response = await getSubject(id);
    if (response) {
      setFormData({ ...formData, ...response });
    }
  }, []);

  const openEditPage = (e) => {
    const rowID = e.target.parentElement.id;
    getSingleSubject(rowID);
    setModalActive(<AddOrEditSubjectBox windowType="edit" />);
  };
  
  const openDeletePage = (e) => {
    const rowID = e.target.parentElement.parentElement.parentElement.id;
    console.log(rowID)
    getSingleSubject(rowID);
    setModalActive(<DeleteSubjectBox />);
  };

  useEffect(() => {
    getData();
  }, []);

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
            if(searchBarValue == "" || subject.name.includes(searchBarValue)){
              return (
                <tr
                  key={id}
                  className={styles.tableRow}
                  id={id}
                >
                  <td onClick={(e) => openEditPage(e)}>{subject.semester}</td>
                  <td onClick={(e) => openEditPage(e)} className={styles.subjectName}>{subject.name}</td>
                  <td onClick={(e) => openEditPage(e)} className={styles.withCircle}>
                    {avaSum[0]}
                    {avaSum[1] && (
                      <div
                        className={`${styles.indicatorCircle} ${styles.yellow}`}
                        title="Há notas não lançadas"
                      />
                    )}
                  </td>
                  <td onClick={(e) => openEditPage(e)}>
                    {subject.pim ? parseFloat(subject.pim).toFixed(2) : "-"}
                  </td>
                  <td onClick={(e) => openEditPage(e)}>
                    {subject.exam ? parseFloat(subject.exam).toFixed(2) : "-"}
                  </td>
                  <td onClick={(e) => openEditPage(e)} className={styles.withCircle}>
                    {average}
                    {average < 7 && (
                      <div
                        className={`${styles.indicatorCircle} ${styles.red}`}
                        title="Média insuficiente"
                      />
                    )}
                  </td>
                  <td onClick={(e) => openEditPage(e)}>{average < 7 ? (10 - average).toFixed(2) : "-"}</td>
                  <td onClick={(e) => openEditPage(e)}>
                    {subject.summerSchoolGrade
                      ? subject.summerSchoolGrade.toFixed(2)
                      : "-"}
                  </td>
                  <td onClick={(e) => openEditPage(e)}>
                    {getSituation(average, subject.summerSchoolGrade, avaSum[1])}
                  </td>
                  <td className={styles.closeButtonContainer}>
                    <div className={styles.closeButtonBox}>
                      <div className={styles.closeButtonHover} onClick={(e) => openDeletePage(e)}/>
                      <IoMdCloseCircleOutline 
                      />
                    </div>
                  </td>
                </tr>
              );

            }
          })}
        </tbody>
      </table>
    </div>
  );
}
