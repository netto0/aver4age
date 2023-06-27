import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.container}>
      <Header />
      <Footer />
    </div>
  )
}

export default App
