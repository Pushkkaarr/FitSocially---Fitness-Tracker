import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Ensure you have this imported
import DietPlan from './components/DietPlan';
import CalorieCalculator from './components/CalorieCalculator';
import WorkoutPlan from './components/WorkoutPlan';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/CheckEmailPage';
import Password from './pages/CheckPasswordPage'
import Forgotpassword from './pages/Forgotpassword';
import Home from './pages/Home'
import MessagePage from './components/MessagePage';
import { Provider } from 'react-redux'
import { store } from './redux/store';

const DietPage = () => (
  <>
    <DietPlan />
    <CalorieCalculator />
    <WorkoutPlan />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}> {/* This the homepage of chat app */}
          <Route path=":userId" element={<MessagePage />} /> 
        </Route>
      <Route path="/diet" element={<DietPage />} /> 
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/email" element={<Login />} />
      <Route path="/password" element={<Password />} />
      <Route path="/forgot-password" element={<Forgotpassword/>} />
    </Routes>
  );
};


const App = () => {
  return (
    <Provider store={store}> {/* Wrap your app in Provider */}
      <Toaster /> {/* Place Toaster at the top level */}
      <AppRoutes />
    </Provider>
  );
};

export default App;