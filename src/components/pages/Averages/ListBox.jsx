import React, { useCallback, useEffect, useState } from "react";
import styles from "./ListBox.module.css";
import { getSubject } from "../../../api/Subjects";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { LiaSortUpSolid, LiaSortDownSolid } from "react-icons/lia";
import DeleteSubjectBox from "../SubjectBoxes/DeleteSubjectBox";
import AddOrEditSubjectBox from "../SubjectBoxes/AddOrEditSubjectBox";

export default function ListBox() {
  const {
    formData,
    setFormData,
    getData,
    setModalActive,
    subjects,
    searchBarValue,
    activeFilter,
    setActiveFilter,
  } = React.useContext(GlobalSettingsContext);

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

  const changeFilter = (e) => {
    const id = e.target.id;
    if (activeFilter[0] !== id) {
      setActiveFilter([id, true]);
    } else {
      if (!activeFilter[1]) {
        setActiveFilter(["id", true]);
      } else {
        setActiveFilter([id, false]);
      }
    }

    // console.log("CHANGE FILTER", e.target.id)
  };

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
    console.log(rowID);
    getSingleSubject(rowID);
    setModalActive(<DeleteSubjectBox />);
  };

  const orderBy = (array, key, isNumber = true, descending = false) => {
    if (isNumber) {
      if (descending) {
        return [...array].sort((a, b) => a[key] - b[key]);
      } else {
        return [...array].sort((a, b) => b[key] - a[key]);
      }
    } else {
      if (descending) {
        return [...array].sort((a, b) =>
        a[key].toLowerCase() < b[key].toLowerCase() ? -1 : 1
        );
      } else {
        return [...array].sort((a, b) =>
        a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1
        );
      }
    }
  };

  // const ordenadoPorNome = orderBy(subjects, "semester");
  const ordenadoPorNome = orderBy(subjects, activeFilter[0], true, activeFilter[1]);
  // console.log(ordenadoPorNome);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.listboxContainer}>
      {/* {JSON.stringify(ordenadoPorNome)} */}
      {`${activeFilter[0]} | ${activeFilter[1]}`}
      <table>
        <thead>
          <tr>
            <th id="semester" onClick={(e) => changeFilter(e)}>
              Semestre{" "}
              {activeFilter[0] === "semester" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "semester" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="name" onClick={(e) => changeFilter(e)}>
              Matéria{" "}
              {activeFilter[0] === "name" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "name" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="ava" onClick={(e) => changeFilter(e)}>
              AVA{" "}
              {activeFilter[0] === "ava" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "ava" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="pim" onClick={(e) => changeFilter(e)}>
              PIM{" "}
              {activeFilter[0] === "pim" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "pim" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="exam" onClick={(e) => changeFilter(e)}>
              Prova{" "}
              {activeFilter[0] === "exam" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "exam" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="average" onClick={(e) => changeFilter(e)}>
              Média{" "}
              {activeFilter[0] === "average" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "average" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="need" onClick={(e) => changeFilter(e)}>
              Necessário{" "}
              {activeFilter[0] === "need" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "need" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="summerSchoolGrade" onClick={(e) => changeFilter(e)}>
              Exame{" "}
              {activeFilter[0] === "summerSchoolGrade" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "summerSchoolGrade" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="finalAverage" onClick={(e) => changeFilter(e)}>
              MF{" "}
              {activeFilter[0] === "summerSchoolGrade" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "summerSchoolGrade" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th id="situation" onClick={(e) => changeFilter(e)}>
              Situação{" "}
              {activeFilter[0] === "situation" && activeFilter[1] && (
                <LiaSortUpSolid />
              )}
              {activeFilter[0] === "situation" && !activeFilter[1] && (
                <LiaSortDownSolid />
              )}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ordenadoPorNome.map((subject) => {
            const { ava1, ava2, ava3, ava4, id } = subject;
            const avaSum = getSum([ava1, ava2, ava3, ava4]);
            const average = getAverage(avaSum, subject.pim, subject.exam);
            if (searchBarValue == "" || subject.name.includes(searchBarValue)) {
              return (
                <tr key={id} className={styles.tableRow} id={id}>
                  <td onClick={(e) => openEditPage(e)}>{subject.semester}</td>
                  <td
                    onClick={(e) => openEditPage(e)}
                    className={styles.subjectName}
                  >
                    {subject.name}
                  </td>
                  <td
                    onClick={(e) => openEditPage(e)}
                    className={`${styles.defaultWidth} ${styles.withCircle}`}
                  >
                    {subject.sum}
                    {(subject.ava1 === "" ||
                      subject.ava2 === "" ||
                      subject.ava3 === "" ||
                      subject.ava4 === "") && (
                      <div
                        className={`${styles.indicatorCircle} ${styles.yellow}`}
                        title="Há notas não lançadas"
                      />
                    )}
                  </td>
                  <td
                    className={`${styles.defaultWidth}`}
                    onClick={(e) => openEditPage(e)}
                  >
                    {subject.pim ? parseFloat(subject.pim).toFixed(2) : "-"}
                  </td>
                  <td
                    className={`${styles.defaultWidth}`}
                    onClick={(e) => openEditPage(e)}
                  >
                    {subject.exam ? parseFloat(subject.exam).toFixed(2) : "-"}
                  </td>
                  <td
                    className={`${styles.defaultWidth} ${styles.withCircle}`}
                    onClick={(e) => openEditPage(e)}
                  >
                    {subject.average}
                    {subject.average < 7 && (
                      <div
                        className={`${styles.indicatorCircle} ${styles.red}`}
                        title="Média insuficiente"
                      />
                    )}
                  </td>
                  <td
                    className={`${styles.defaultWidth}`}
                    onClick={(e) => openEditPage(e)}
                  >
                    {subject.average < 7 ? subject.need : "-"}
                  </td>
                  <td
                    className={`${styles.defaultWidth}`}
                    onClick={(e) => openEditPage(e)}
                  >
                    {subject.summerSchoolGrade
                      ? parseFloat(subject.summerSchoolGrade).toFixed(2)
                      : "-"}
                  </td>
                  <td
                    className={`${styles.defaultWidth}`}
                    onClick={(e) => openEditPage(e)}
                  >
                    {subject.finalAverage}
                  </td>
                  <td
                    className={`${styles.defaultWidth}`}
                    onClick={(e) => openEditPage(e)}
                  >
                    {getSituation(
                      average,
                      subject.summerSchoolGrade,
                      avaSum[1]
                    )}
                  </td>
                  <td className={styles.closeButtonContainer}>
                    <div className={styles.closeButtonBox}>
                      <div
                        className={styles.closeButtonHover}
                        onClick={(e) => openDeletePage(e)}
                      />
                      <IoMdCloseCircleOutline />
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
