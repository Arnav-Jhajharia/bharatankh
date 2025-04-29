
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SimulationControlProps {
  title: string;
  description: string;
  impact: string;
  icon?: ReactNode;
  onClick: () => void;
}

const SimulationControl = ({ 
  title, 
  description, 
  impact, 
  icon, 
  onClick 
}: SimulationControlProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium flex items-center gap-1">
          {icon}
          {impact}
        </span>
        <Button variant="outline" size="sm" onClick={onClick}>
          Simulate
        </Button>
      </div>
    </div>
  );
};

export default SimulationControl;
