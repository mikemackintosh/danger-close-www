import React, { useEffect, useState } from "react";
import "./BouncingText.css"; // Import the CSS for animations

type BouncingTextProps = {
  text: string;
  bombDrop: boolean; // Controls when the bomb drops
};

const BouncingText: React.FC<BouncingTextProps> = ({ text, bombDrop }) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    // Split the text into an array of letters
    setLetters(text.split(""));
  }, [text]);

  return (
    <div className="text-container">
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`letter ${bombDrop ? "shake-bounce" : ""}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default BouncingText;
