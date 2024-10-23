import React, { useEffect, useState } from "react";

type SplatterTextProps = {
  text: string;
  bombDrop: boolean;
};

const SplatterText: React.FC<SplatterTextProps> = ({ text, bombDrop }) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    setLetters(text.split(""));
  }, [text]);

  return (
    <div className="text-container">
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`letter ${bombDrop ? "splatter" : ""}`}
          style={{
            animationDelay: `${index * 0.05}s`,
            "--random-rotation": `${Math.random() * 60 - 30}deg`, // Random rotation between -30 and 30 degrees
            "--random-translateX": `${Math.random() * 50 - 25}px`, // Random movement between -25px and 25px horizontally
            "--random-translateY": `${Math.random() * 30 - 15}px`, // Random movement between -15px and 15px vertically
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default SplatterText;
