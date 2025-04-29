
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  animate?: boolean;
}

const ProgressBar = ({ value, max, className, animate = true }: ProgressBarProps) => {
  const [animationClass, setAnimationClass] = useState("");
  const percentage = (value / max) * 100;
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimationClass("animate-progress-fill");
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [animate]);
  
  return (
    <div className={cn("w-full h-2.5 bg-gray-200 rounded-full overflow-hidden", className)}>
      <div
        className={cn(
          "h-full rounded-full bg-primary", 
          animationClass
        )}
        style={{ 
          width: animate ? '0%' : `${percentage}%`,
          "--progress-value": `${percentage}%`
        } as React.CSSProperties}
      />
    </div>
  );
};

export default ProgressBar;
