import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; // Import NavLink
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaTachometerAlt,
  FaComments,
  FaUtensils,
  FaUsers,
  FaSignOutAlt
} from "react-icons/fa";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen fixed transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Toggle Button */}
        <div className="flex justify-end p-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="text-white text-2xl" />
            ) : (
              <FaBars className="text-white text-2xl" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 ml-5">
            <FaTachometerAlt className="text-xl" />
            {isOpen && (
              <NavLink
                to="/dashboard" // Specify route path
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-white"
                } // Apply active class
              >
                Dashboard
              </NavLink>
            )}
          </li>

          <li className="flex items-center space-x-3 ml-5">
            <FaUser className="text-xl" />
            {isOpen && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-white"
                }
              >
                Profile
              </NavLink>
            )}
          </li>

          <li className="flex items-center space-x-3 ml-5">
            <FaComments className="text-xl" />
            {isOpen && (
              <NavLink
                to="/social"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-white"
                }
              >
                Social
              </NavLink>
            )}
          </li>

          <li className="flex items-center space-x-3 ml-5">
            <FaUsers className="text-xl" />
            {isOpen && (
              <NavLink
                to="/chat/"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-white"
                }
              >
                Chats
              </NavLink>
            )}
          </li>
          <li className="flex items-center space-x-3 ml-5">
            <FaUtensils className="text-xl" />
            {isOpen && (
              <NavLink
                to="/diet"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-white"
                }
              >
                Diet or Workout Plans
              </NavLink>
            )}
          </li>
          <li className="flex items-center space-x-3 ml-5">
            <FaSignOutAlt className="text-xl" />
            {isOpen && (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "text-white"
                }
              >
                LogOut
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-10 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-"
        }`}
      >
        <Outlet /> {/* This renders the child route component */}
      </div>
    </div>
  );
};

export default NavigationBar;
