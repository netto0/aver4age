import React, { useState, useCallback } from "react";
import { getSubjects } from "../api/Subjects";

export const GlobalSettingsContext = React.createContext({});

export const GlobalSettingsProvider = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [modalActive, setModalActive] = useState(null);
  const [activeFilter, setActiveFilter] = useState(["id", true])
  // descending
  const [formData, setFormData] = useState({
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
    situation:""
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
        setSearchBarValue,
        activeFilter,
        setActiveFilter
      }}
    >
      {props.children}
    </GlobalSettingsContext.Provider>
  );
};
