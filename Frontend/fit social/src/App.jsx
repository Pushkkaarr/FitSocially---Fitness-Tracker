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
import Social from './pages/Social';
import Profile from './components/Profile'
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import NavigationBar from './components/NavigationBar';
import ChatBot from './pages/ChatBot';

const DietPage = () => (
  <div className="flex flex-col items-center w-full h-screen overflow-auto p-4">
    <div className="w-full max-w-3xl mb-4">
      <div className="bg-white p-4 rounded-lg shadow-md h-full">
        <DietPlan />
      </div>
    </div>
    <div className="w-full max-w-3xl mb-4">
      <div className="bg-white p-4 rounded-lg shadow-md h-full">
        <CalorieCalculator />
      </div>
    </div>
    <div className="w-full max-w-3xl">
      <div className="bg-white p-4 rounded-lg shadow-md h-full">
        <WorkoutPlan />
      </div>
    </div>
  </div>
);
const MainLayout = ({ children }) => (
  <div className="flex h-screen">
  <NavigationBar /> {/* Left Sidebar */}
  <div className="flex-1 mx-5 transition-all duration-300">
    {children} {/* Right Main Content */}
  </div>
</div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/chat/" element={<MainLayout><Home /></MainLayout>}> {/* This the homepage of chat app */}
          <Route path=":userId" element={<MessagePage />} /> 
        </Route>
      <Route path="/diet" element={<MainLayout><DietPage /></MainLayout>} /> 
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/email" element={<Login />} />
      <Route path="/password" element={<Password />} />
      <Route path="/forgot-password" element={<Forgotpassword/>} />
      <Route path="/social" element={<MainLayout><Social/></MainLayout>}/>
      <Route path='/dashboard' element={<MainLayout><Dashboard/></MainLayout>}/>
      <Route path='/profile/:id' element={<MainLayout><Profile/></MainLayout>}/>
      <Route path='/Navigation' element={<NavigationBar/>}/>
      <Route path='/chatBot' element={<MainLayout><ChatBot/></MainLayout>}/>
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