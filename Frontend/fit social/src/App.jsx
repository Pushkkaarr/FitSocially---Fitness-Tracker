import { useState } from 'react'
import './App.css'
import CalorieCalculator from './components/CalorieCalculator'
import DietPlan from './components/DietPlan'
import WorkoutPlan from './components/WorkOutPlan'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CalorieCalculator/>
    <DietPlan/>
    <WorkoutPlan/>
    </>
  )
}

export default App
