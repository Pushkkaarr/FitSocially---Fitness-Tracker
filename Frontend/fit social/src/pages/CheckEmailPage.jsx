import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import { FaArrowLeft } from 'react-icons/fa'; // Import the arrow icon

export default function CheckEmailPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user/checkEmail`;

    try {
      const response = await axios.post(URL, { email });
      toast.success(response.data.message);
      if (response.data.success) {
        setEmail("");
        navigate('/password', {
          state: response?.data?.data
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="font-cambria min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-600 p-4">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-full p-2 flex items-center shadow-lg hover:bg-opacity-40 transition">
            <FaArrowLeft className="text-white text-2xl" /> {/* Use FaArrowLeft icon */}
          </div>
        </Link>
      </div>
      <div className="w-full max-w-4xl bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden flex">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <PiUserCircle className="w-20 h-20 mx-auto text-white" />
            <h3 className="text-2xl font-bold text-white mt-4">Welcome to FitSocially App!</h3>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-transparent rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Let's Go
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-white">
            New User?{' '}
            <Link to="/register" className="font-medium text-blue-200 hover:text-blue-100">
              Register
            </Link>
          </p>
        </div>
        <div className="hidden md:block w-1/2 flex items-center justify-center pt-9 pl-3 pr-6"> {/* Padding top and left */}
  <img
    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.MsRO199sctywGF3uu4_SOgHaE7%26pid%3DApi&f=1"
    alt="Fitness"
    className="object-cover w-90 h-90 rounded-lg"
  />
</div>
      </div>
    </div>
  );
}
