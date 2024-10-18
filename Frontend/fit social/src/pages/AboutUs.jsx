import React, { useState } from 'react'; // Import useState to manage button animation
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AboutUs = () => {
  // Using React Router's useNavigate for redirection
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false); // State for animation

  const handleRedirect = () => {
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      navigate('/'); // Redirect to home page after animation
    }, 300); // Adjust timeout to match animation duration
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200 relative font-cambria">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 bg-opacity-70 backdrop-blur-md border-4 border-gray-600 rounded-lg p-10 text-center shadow-lg z-10">
        <h1 className="text-4xl font-bold mb-4 text-lightblue-400">About Us</h1>
        <p className="text-lg mb-4 text-gray-300">
          We are engineering students from Saraswati College of Engineering, and this is our project!
          Our goal is to create an engaging platform filled with amazing features and wonders.
        </p>
        <p className="text-lg mb-8 text-gray-300">
          Join us on this journey as we explore the world of technology and innovation.
          We aim to deliver a seamless experience that showcases our skills and creativity.
        </p>
      </div>

      {/* Button to redirect to home page */}
      <button
        onClick={handleRedirect} // Handle redirect on click
        className={`absolute top-4 right-4 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ${isAnimating ? 'transform scale-105' : ''} hover:bg-blue-700`}
      >
        Home
      </button>
    </div>
  );
};

export default AboutUs;
