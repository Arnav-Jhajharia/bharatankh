
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PiggyBank } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-soft-blue flex flex-col justify-center items-center px-4 text-center">
      <div className="mb-4">
        <div className="flex items-center justify-center mb-6">
          <PiggyBank className="h-12 w-12 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-primary">FinBridge</h1>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Welcome to FinBridge</h2>
        <p className="text-lg text-gray-600 max-w-md">
          Your work deserves credit. Build your FinScore and unlock better loans, faster.
        </p>
      </div>
      
      <Button 
        className="text-lg font-semibold py-6 px-8 rounded-full bg-primary hover:bg-primary/90 text-white"
        onClick={() => navigate("/kyc")}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Index;
