import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
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
    <div className={`bg-gray-800 text-white h-screen fixed transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
      {/* Sidebar Toggle Button */}
      <div className="flex justify-end p-5">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        {[
          { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
          { to: "/profile", icon: <FaUser />, label: "Profile" },
          { to: "/chat", icon: <FaComments />, label: "Chats" },
          { to: "/social", icon: <FaUsers />, label: "Social" },
          { to: "/diet", icon: <FaUtensils />, label: "Diet or Workout Plans" },
          { to: "/", icon: <FaSignOutAlt />, label: "LogOut" },
        ].map(({ to, icon, label }) => (
          <li key={to} className="flex items-center space-x-3 ml-5">
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
            >
              <div className="flex items-center">
                {icon}
                {isOpen && <span className="ml-2">{label}</span>}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationBar;
