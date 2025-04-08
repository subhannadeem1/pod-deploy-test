import React from "react";
import styles from "./answer.module.css";

import { useEffect, useState } from "react";

interface AnswerProps {
  text: string;
}

export const Answer: React.FC<AnswerProps> = ({ text }) => {
  
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    setWords(text.split(" "));
  }, [text]);

  return (
    <div>
      
      { words.map((word, index) => (
        
        <span key = { index } className = { styles.fadeIn } style = { { animationDelay: `${index * 0.01}s` } }>
          
          { word }{ " " }
        
        </span>

      ))}

    </div>
  );
};
