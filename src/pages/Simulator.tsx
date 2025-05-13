
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";
import SimulationControl from "@/components/SimulationControl";
import ConfettiEffect from "@/components/ConfettiEffect";

const Simulator = () => {
  const navigate = useNavigate();
  const { financialData, updateFinancialData } = useApp();
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleScoreChange = (change: number) => {
    const newScore = Math.min(100, Math.max(0, financialData.finScore + change));
    
    // Update the score with animation effect
    updateFinancialData({ finScore: newScore });
    
    // Show confetti for positive changes
    if (change > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    
    // Show toast notification
    toast(
      change > 0 ? "FinScore increased!" : "FinScore decreased", 
      { 
        description: `Your FinScore is now ${newScore}`,
        icon: change > 0 ? "🎉" : "📉"
      }
    );
  };
  
  return (
    <PageContainer>
      {showConfetti && <ConfettiEffect />}
      
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Financial Behavior Simulator</h2>
        <p className="text-gray-500">See how different financial behaviors affect your FinScore</p>
      </div>
      
      {/* Current Score */}
      <Card className="w-full mb-6 shadow-md animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Current FinScore</span>
            <Badge variant={financialData.finScore >= 80 ? "outline" : "secondary"} className="text-accent">
              {financialData.finScore >= 80 ? "Trusted" : 
               financialData.finScore >= 60 ? "Good" : "Building"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl font-bold">{financialData.finScore}</span>
            <span className="text-gray-500">/100</span>
          </div>
          
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${financialData.finScore}%` }}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Income Simulations */}
      <Card className="w-full mb-4 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Income Simulations</CardTitle>
          <CardDescription>Simulate changes to your income patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SimulationControl 
            title="Add one more month of income history"
            description="Shows more stability in your income pattern"
            impact="+5 points"
            icon={<ArrowUp className="text-accent" />}
            onClick={() => handleScoreChange(5)}
          />
          
          <SimulationControl 
            title="Link additional income source"
            description="Add another PayNow or bank account"
            impact="+3 points"
            icon={<ArrowUp className="text-accent" />}
            onClick={() => handleScoreChange(3)}
          />
          
          <SimulationControl 
            title="Increase monthly income by 10%"
            description="Show higher earning potential"
            impact="+2 points"
            icon={<ArrowUp className="text-accent" />}
            onClick={() => handleScoreChange(2)}
          />
        </CardContent>
      </Card>
      
      {/* Expense Simulations */}
      <Card className="w-full mb-4 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Expense Simulations</CardTitle>
          <CardDescription>Simulate changes to your spending patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SimulationControl 
            title="Missed bill payment"
            description="Late payment on utility or credit bill"
            impact="-3 points"
            icon={<ArrowDown className="text-red-500" />}
            onClick={() => handleScoreChange(-3)}
          />
          
          <SimulationControl 
            title="Reduced savings rate"
            description="Saving less than 10% of income"
            impact="-2 points"
            icon={<ArrowDown className="text-red-500" />}
            onClick={() => handleScoreChange(-2)}
          />
          
          <SimulationControl 
            title="Increased savings rate"
            description="Saving more than 20% of income"
            impact="+4 points"
            icon={<ArrowUp className="text-accent" />}
            onClick={() => handleScoreChange(4)}
          />
        </CardContent>
      </Card>
      
      {/* Advanced Simulations */}
      <Card className="w-full mb-6 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Advanced Simulations</CardTitle>
          <CardDescription>More complex financial behaviors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Income Consistency</h3>
                <p className="text-sm text-gray-500">Adjust how regularly you receive income</p>
              </div>
              <span className="text-xs font-medium">+1 to +3 points</span>
            </div>
            
            <div className="pt-2">
              <Slider
                defaultValue={[50]}
                max={100}
                step={10}
                onValueChange={(value) => {
                  const change = Math.floor(value[0] / 33);
                  if (change > 0) handleScoreChange(change);
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Irregular</span>
                <span>Consistent</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 pt-2">
            <Switch id="credit-history" />
            <div className="grid gap-0.5">
              <Label htmlFor="credit-history">Add credit history</Label>
              <span className="text-sm text-gray-500">+5 points on activation</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Switch id="utility-bills" />
            <div className="grid gap-0.5">
              <Label htmlFor="utility-bills">Link SP Group bills</Label>
              <span className="text-sm text-gray-500">+2 points on activation</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex space-x-4 mb-4">
        <Button onClick={() => navigate("/passport")} className="flex-1 bg-primary hover:bg-primary/90">
          View Updated Passport
        </Button>
        <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex-1">
          Back to Dashboard
        </Button>
      </div>
    </PageContainer>
  );
};

export default Simulator;
