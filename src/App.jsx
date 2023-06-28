import React from 'react'
import Header from './components/structure/Header'
import Footer from './components/structure/Footer'
import styles from './App.module.css'
import Averages from './components/pages/Averages/Averages'
import Modal from './components/elements/Modal'
import { GlobalSettingsContext } from './providers/globalSettings'


function App() {

  const {modalActive} = React.useContext(GlobalSettingsContext)

  return (
    <div className={styles.appContainer}>
      <Header />
      <Modal>
        {modalActive}
      </Modal>
      <Averages />
      <Footer />
    </div>
  )
}

export default App
