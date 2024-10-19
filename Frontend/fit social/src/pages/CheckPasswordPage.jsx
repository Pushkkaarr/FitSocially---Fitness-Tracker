import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';
import Avatar from '../components/Avatar';
import { FaArrowLeft } from 'react-icons/fa'; // Import the arrow icon

export default function CheckPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user/checkPassword`;

    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: password
        },
        withCredentials: true
      });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        dispatch(setUser(response?.data?.user));
        console.log('Response Data:', response.data);

        localStorage.setItem('token', response?.data?.token);

        setPassword("");
        navigate('/social');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-red-900 p-4 font-cambria">
      <div className="absolute top-4 left-4">
        <Link to="/email">
          <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-full p-2 flex items-center shadow-lg hover:bg-opacity-40 transition">
            <FaArrowLeft className="text-white text-2xl" /> {/* Use FaArrowLeft icon */}
          </div>
        </Link>
      </div>
      <div className="w-full max-w-4xl bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8">
          <div className="text-center mb-8"> {/* Centering the content */}
            
            <div className='pl-[140px]'>
              <Avatar
              width={120}
              height={120}
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
              className="mx-auto" // Center alignment
            />
            </div>
            <h2 className="text-xl font-semibold text-white pl-3">{location?.state?.name}</h2> {/* Adjusted margin */}
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-transparent rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          {/* <p className="mt-6 text-center text-sm text-white">
            <Link to="/forgot-password" className="font-medium text-blue-200 hover:text-blue-100">
              Forgot password?
            </Link>
          </p> */}
        </div>
        <div className="md:w-1/2 relative overflow-hidden">
          <img
            src="https://www.wellness360.fit/wp-content/uploads/2020/06/26424-scaled.jpg"
            alt="Fitness"
            className="object-cover w-50 h-50 rounded-lg opacity-65 pt-7 pr-5"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-4xl font-bold text-white text-center">
              Welcome to<br />FitSocially
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
