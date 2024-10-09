import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let typingInterval;

    if (isTyping) {
      typingInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(typingInterval);
          setIsTyping(false); // Switch to waiting phase after typing
        }
      }, speed);
    } else {
      // Waiting phase
      const waitingTimeout = setTimeout(() => {
        setDisplayedText(''); // Clear the text
        setIndex(0); // Reset the index
        setIsTyping(true); // Start typing again
      }, 3000); // Wait for 3 seconds

      return () => clearTimeout(waitingTimeout);
    }

    return () => clearInterval(typingInterval);
  }, [text, speed, index, isTyping]);

  return (
    <span style={{ minWidth: '200px', display: 'inline-block' }}>
      {displayedText || ' '}
    </span>
  );
};

export default TypingEffect;
