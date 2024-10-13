import React, { useRef, useEffect, useState } from 'react';

const AboutUs = () => {
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const colors = [
    'bg-pink-400',
    'bg-purple-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-red-400',
    'bg-orange-400',
    'bg-indigo-400',
    'bg-teal-400',
    'bg-gray-400',
  ];

  const handleMouseMove = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX - 16 + 'px'; // Center the circle on the cursor
      cursorRef.current.style.top = e.clientY - 16 + 'px';   // Center the circle on the cursor
    }
  };

  const handleMouseEnter = () => {
    setHovering(true);
    cycleColors(); // Start cycling colors on hover
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setColorIndex(0); // Reset color index when mouse leaves
  };

  const cycleColors = () => {
    setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 500); // Change color every 500ms
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 relative font-cambria">
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-300 bg-opacity-20 backdrop-blur-md border border-blue-500 rounded-lg p-10 text-center shadow-lg z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className="text-4xl font-bold mb-4 animate-fadeIn text-gray-200 hover:text-blue-400 hover:shadow-lg transition duration-300 glow-on-hover">About Us</h1>
        <p className="text-lg mb-4 opacity-0 animate-fadeIn delay-500 hover:text-blue-400 hover:shadow-lg transition duration-300 glow-on-hover">
          We are engineering students from Saraswati College of Engineering, and this is our project!
          Our goal is to create an engaging platform filled with amazing features and wonders.
        </p>
        <p className="text-lg mb-8 opacity-0 animate-fadeIn delay-700 hover:text-blue-400 hover:shadow-lg transition duration-300 glow-on-hover">
          Join us on this journey as we explore the world of technology and innovation.
          We aim to deliver a seamless experience that showcases our skills and creativity.
        </p>
      </div>

      {/* Hover effect circle */}
      <div
        ref={cursorRef}
        className={`fixed w-32 h-32 rounded-full pointer-events-none transition-all duration-500 ${
          hovering ? `${colors[colorIndex]} opacity-75` : 'bg-pink-400 opacity-30'
        }`}
        style={{ zIndex: 20 }} // Bring to the front
      />

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in forwards;
        }

        .glow-on-hover:hover {
          text-shadow: 0 0 5px purple, 0 0 10px purple, 0 0 20px purple, 0 0 30px purple, 0 0 40px purple, 0 0 50px purple, 0 0 60px purple;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
