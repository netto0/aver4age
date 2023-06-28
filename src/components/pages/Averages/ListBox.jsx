import styles from "./ListBox.module.css";
import getSubjects from "../../../api/Subjects";
import { useCallback, useEffect, useState } from "react";

export default function ListBox() {
  const [subjects, setSubjects] = useState([]);

  function getAverage(ava, pim, exam) {
    return ((ava + (2*pim) + (7*exam))/10).toFixed(2)
  }

  function getAvaSum(ava1, ava2, ava3, ava4) {
    return (ava1+ava2+ava3+ava4)
  }

  function getSituation(average, exam) {
    if(average < 7) {
        const finalAverage = (parseFloat(average) + parseFloat(exam))/2
        return finalAverage > 5 ? "Aprovado" : "Reprovado"
    } else {
        return "Aprovado"
    }
    
    
    // 
  }

  const getData = useCallback(async () => {
    const response = await getSubjects();
    if (response) setSubjects(response);
  }, []);

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
            
            const {ava1, ava2, ava3, ava4, id} = subject
            const avaSum = getAvaSum(ava1, ava2, ava3, ava4)
            const average = getAverage(avaSum, subject.pim, subject.exam)

            return (
              <tr key={id} className={styles.tableRow}>
                <td>{subject.semester}</td>
                <td>{subject.name}</td>
                <td>{avaSum.toFixed(2)}</td>
                <td>{subject.pim.toFixed(2)}</td>
                <td>{subject.exam.toFixed(2)}</td>
                <td className={styles.average}>
                  {average}
                  {average < 7 && <div className={styles.redCircle}/>}
                </td>
                <td>{average < 7 ? (10 - average).toFixed(2) : "-"}</td>
                <td>{subject.summerSchoolGrade ? subject.summerSchoolGrade.toFixed(2) : "-"}</td>
                <td>{getSituation(average, subject.summerSchoolGrade)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
