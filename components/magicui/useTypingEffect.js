// hooks/useTypingEffect.js

import { useState, useEffect } from "react";

export const useTypingEffect = (texts, typingSpeed = 300, deletingSpeed = 100, pauseTime = 0) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex % texts.length];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        if (displayedText.length - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => prev + 1);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, texts, textIndex, typingSpeed, deletingSpeed, pauseTime]);

  return displayedText;
};
