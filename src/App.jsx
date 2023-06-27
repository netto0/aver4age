import { useState } from 'react'
import Header from './components/structure/Header'
import Footer from './components/structure/Footer'
import styles from './App.module.css'
import Averages from './components/pages/Averages/Averages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.container}>
      <Header />
      <Averages />
      <Footer />
    </div>
  )
}

export default App
