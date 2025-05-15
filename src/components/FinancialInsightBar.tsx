
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FinancialInsightBarProps {
  score: number;
  className?: string;
}

const FinancialInsightBar = ({ score, className }: FinancialInsightBarProps) => {
  // Determine color based on score
  const getBarColor = () => {
    if (score < 40) return "bg-red-500";
    if (score < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className={cn("w-full", className)}>
      <Progress 
        value={score} 
        className="h-2"
        indicatorClassName={cn(getBarColor())}
      />
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>High Risk</span>
        <span>Moderate</span>
        <span>Excellent</span>
      </div>
    </div>
  );
};

export default FinancialInsightBar;
