
import { useEffect, useState } from "react";

const ConfettiEffect = () => {
  const [confetti, setConfetti] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d"];
    const count = 100;
    const newConfetti: JSX.Element[] = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 8 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;
      
      newConfetti.push(
        <div
          key={i}
          className="fixed pointer-events-none"
          style={{
            left: `${left}%`,
            top: "-5%",
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: "50%",
            animation: `fall ${animationDuration}s ease-in forwards`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    
    setConfetti(newConfetti);
    
    // Add animation to stylesheet
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return <>{confetti}</>;
};

export default ConfettiEffect;
