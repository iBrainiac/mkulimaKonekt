import { useState } from 'react'
import PropertyForm from './components/PropertyForm'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <PropertyForm></PropertyForm>
    </>
  )
}

export default App
