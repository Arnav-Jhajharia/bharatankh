
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

// Import local logos
import sbiLogo from "@/assets/logos/sbi-logo.svg";
import iciciLogo from "@/assets/logos/icici-logo.svg";
import axisLogo from "@/assets/logos/axis-logo.svg";
import kotakLogo from "@/assets/logos/kotak-logo.svg";
import pnbLogo from "@/assets/logos/pnb-logo.svg";

const banks = [
  { 
    id: "sbi", 
    name: "State Bank of India", 
    logoUrl: sbiLogo
  },
  { 
    id: "hdfc", 
    name: "HDFC Bank", 
    logoUrl: "https://www.hdfcbank.com/content/dam/hdfcbank/common/images/logo/hdfc-bank-logo.png"
  },
  { 
    id: "icici", 
    name: "ICICI Bank", 
    logoUrl: iciciLogo
  },
  { 
    id: "axis", 
    name: "Axis Bank", 
    logoUrl: axisLogo
  },
  { 
    id: "kotak", 
    name: "Kotak Mahindra Bank", 
    logoUrl: kotakLogo
  },
  { 
    id: "pnb", 
    name: "Punjab National Bank", 
    logoUrl: pnbLogo
  },
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
                  <div className="flex-shrink-0 w-12 h-8 flex items-center justify-center">
                    <img 
                      src={bank.logoUrl} 
                      alt={`${bank.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-blue-400 flex items-center justify-center text-xs font-bold text-white';
                        fallback.textContent = bank.name.split(' ').map(word => word[0]).join('').substring(0, 3);
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
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
