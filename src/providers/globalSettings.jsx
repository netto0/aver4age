import React, { useState, useCallback } from "react";
import { getSubjects } from "../api/Subjects";

export const GlobalSettingsContext = React.createContext({});

export const GlobalSettingsProvider = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [modalActive, setModalActive] = useState(null);
  const [formData, setFormData] = useState({
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
  const [searchBarValue, setSearchBarValue] = useState("");

  const getData = useCallback(async () => {
    const response = await getSubjects();
    if (response) setSubjects(response);
  }, []);

  return (
    <GlobalSettingsContext.Provider
      value={{
        modalActive,
        setModalActive,
        formData,
        setFormData,
        subjects,
        getData,
        searchBarValue,
        setSearchBarValue
      }}
    >
      {props.children}
    </GlobalSettingsContext.Provider>
  );
};
