import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Ensure you have this imported
import DietPlan from './components/DietPlan';
import CalorieCalculator from './components/CalorieCalculator';
import WorkoutPlan from './components/WorkoutPlan';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/CheckEmailPage';

const HomePage = () => (
  <>
    <DietPlan />
    <CalorieCalculator />
    <WorkoutPlan />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Your home page */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/email" element={<Login />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

const App = () => {
  return (
    <>
      <Toaster /> {/* Place Toaster at the top level */}
      <AppRoutes />
    </>
  );
};

export default App;