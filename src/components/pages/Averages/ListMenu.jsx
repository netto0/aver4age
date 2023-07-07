import Button from "../../elements/Button";
import Input from "../../elements/Input";
import styles from "./ListMenu.module.css";
import { BiSolidDownArrow, BiSolidUpArrow, BiPlus } from "react-icons/bi";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import React, { useState } from "react";
import { GlobalSettingsContext } from "../../../providers/globalSettings";
import AddOrEditSubjectBox from "../SubjectBoxes/AddOrEditSubjectBox";

export default function ListMenu() {
  const { setModalActive, searchBarValue,
setSearchBarValue } = React.useContext(GlobalSettingsContext);
  const filterItem = ["Nome", "Média", "Situação"];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [decrescentFilter, setDecrescentFilter] = useState(true);

  const changeIdx = () => {
    if (currentIdx == filterItem.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const searchBarHandleChange = (e) => {
    setSearchBarValue(e.target.value.toUpperCase())
  }

  return (
    <div className={styles.listMenuContainer}>
      {/* {searchBarValue} */}
      <Button
        label={<BiPlus />}
        onClick={() => setModalActive(<AddOrEditSubjectBox windowType="add" />)}
      />
      <Input
        placeholder={"Digite o nome da matéria que deseja buscar..."}
        value= {searchBarValue}
        icon={<PiMagnifyingGlassBold />}
        align="left"
        onChange={(e) => searchBarHandleChange(e)}
      />
      <Button label="OK" />
    </div>
  );
}
