import React, { useState } from "react";

export const GlobalSettingsContext = React.createContext({})

export const GlobalSettingsProvider = (props) => {
    const [modalActive, setModalActive] = useState(null)


    return (
        <GlobalSettingsContext.Provider value={{modalActive, setModalActive}}>
            {props.children}
        </GlobalSettingsContext.Provider>
    )
}