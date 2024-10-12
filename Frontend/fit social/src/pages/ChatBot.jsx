import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

// Simple Button component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Simple Input component
const Input = ({ className, ...props }) => (
  <input
    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your fitness and social wellness AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages(prev => [...prev, { role: "user", content: input }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: `You said: ${input}` }]);
      }, 500);
      setInput("");
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen relative">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('https://media.tenor.com/brz3_pBWenIAAAAM/logo-circle.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" aria-hidden="true" />
      
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden">
        <header className="bg-black bg-opacity-70 shadow-md p-4">
          <h1 className="text-3xl font-bold text-center text-blue-400 animate-pulse">Get Fit, Stay Social</h1>
        </header>
        <main className="flex-1 flex flex-col justify-between max-w-3xl mx-auto w-full">
          <div className="flex-1 mb-2 bg-black bg-opacity-50 rounded-lg shadow-inner p-4 overflow-auto" ref={scrollRef} style={{ maxHeight: '70vh' }}>
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-3 rounded-lg ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200"}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Ask about fitness or social wellness..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black bg-opacity-70 text-white placeholder-gray-400 border-gray-600"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <FaArrowRight />
            </Button>
          </form>
        </main>
        <footer className="bg-black bg-opacity-70 p-2 text-center text-sm text-gray-400">
          © 2024 FitSocialAI. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ChatBot;
