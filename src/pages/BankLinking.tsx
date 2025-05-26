
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import PageContainer from "@/components/PageContainer";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useApp } from "@/context/AppContext";

const banks = [
  { id: "sbi", name: "State Bank of India", logo: "SBI" },
  { id: "hdfc", name: "HDFC Bank", logo: "HDFC" },
  { id: "icici", name: "ICICI Bank", logo: "ICICI" },
  { id: "axis", name: "Axis Bank", logo: "AXIS" },
  { id: "kotak", name: "Kotak Mahindra Bank", logo: "KMB" },
  { id: "pnb", name: "Punjab National Bank", logo: "PNB" },
];

const BankLinking = () => {
  const navigate = useNavigate();
  const { updateUserData, generateMockData } = useApp();
  const [selectedBank, setSelectedBank] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    if (!selectedBank) return;
    
    setIsLoading(true);
    
    // Simulate connection and data fetching
    setTimeout(() => {
      updateUserData({
        bankLinked: true,
        bankName: banks.find(bank => bank.id === selectedBank)?.name || "",
      });
      
      // Generate mock financial data
      generateMockData();
      
      setIsLoading(false);
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <PageContainer>
      <LoadingOverlay 
        message="Fetching UPI transaction history..." 
        isVisible={isLoading} 
      />
      
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold">
          <span style={{ color: '#f47615' }}>Bharat</span>
          <span style={{ color: '#86dcf4' }}>Ankh</span>
        </h1>
      </div>
      
      <Card className="w-full shadow-lg animate-fade-in mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Link your bank account</CardTitle>
          <CardDescription>
            We'll fetch your last 6 months of UPI transactions to build your profile. You control everything.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className={`border p-4 rounded-lg flex items-center space-x-3 cursor-pointer transition-all ${
                    selectedBank === bank.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedBank(bank.id)}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-blue-400 flex items-center justify-center text-xs font-bold text-white">
                    {bank.logo}
                  </div>
                  <div className="font-medium text-sm">{bank.name}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full shadow-lg animate-fade-in mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Data Consent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox id="consent1" defaultChecked />
              <label htmlFor="consent1" className="text-sm">
                View UPI transactions and account balance
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox id="consent2" defaultChecked />
              <label htmlFor="consent2" className="text-sm">
                Generate BharatAnkh Score
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox id="consent3" defaultChecked />
              <label htmlFor="consent3" className="text-sm">
                Share data only with my approval
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button
        onClick={handleConnect}
        disabled={!selectedBank}
        className="w-full text-white"
        style={{ backgroundColor: '#f47615' }}
      >
        Connect via Account Aggregator
      </Button>
    </PageContainer>
  );
};

export default BankLinking;
