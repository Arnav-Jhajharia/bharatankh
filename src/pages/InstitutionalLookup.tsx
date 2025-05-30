
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { LookupForm } from "@/components/institutional/LookupForm";
import { CustomerProfileCard } from "@/components/institutional/CustomerProfileCard";
import { RiskAssessmentCard } from "@/components/institutional/RiskAssessmentCard";
import { TransactionHistoryTable } from "@/components/institutional/TransactionHistoryTable";

const lookupSchema = z.object({
  aadhaarNumber: z.string().regex(/^\d{12}$/, { message: "Aadhaar number must be 12 digits" }),
  dob: z.date({ required_error: "Date of birth is required" }),
});

type LookupData = z.infer<typeof lookupSchema>;

const InstitutionalLookup = () => {
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: LookupData) => {
    setIsLoading(true);
    
    // Simulate API call with enhanced mock data
    setTimeout(() => {
      const mockResult = {
        userData: {
          name: "Rajesh Kumar Singh",
          aadhaar: values.aadhaarNumber,
          dob: values.dob,
          isVerified: true,
          bankLinked: true,
          bankName: "State Bank of India",
          language: "hi"
        },
        financialData: {
          monthlyIncome: 28000,
          incomeBreakdown: [
            { source: "Ola", amount: 15000 },
            { source: "Uber", amount: 8000 },
            { source: "Swiggy", amount: 5000 },
          ],
          expenses: [
            { category: "Rent", amount: 12000 },
            { category: "Food", amount: 7000 },
            { category: "Transport", amount: 3500 },
            { category: "Utilities", amount: 2500 },
            { category: "Savings", amount: 3000 },
          ],
          finScore: 62,
          riskProfile: "Medium",
          scoreInsights: [
            {
              category: "Payment History",
              level: "Good",
              description: "Consistent payment patterns with minimal delays",
              suggestions: ["Maintain current payment schedule", "Consider setting up auto-payments"]
            }
          ]
        },
        transactionHistory: [
          { date: "2024-01-15", type: "UPI Credit", amount: 1500, description: "Ola earnings", category: "Income" },
          { date: "2024-01-15", type: "UPI Debit", amount: 500, description: "Rent payment", category: "Housing" },
          { date: "2024-01-14", type: "UPI Credit", amount: 800, description: "Uber earnings", category: "Income" },
          { date: "2024-01-14", type: "UPI Debit", amount: 200, description: "Grocery", category: "Food" },
          { date: "2024-01-13", type: "UPI Credit", amount: 600, description: "Swiggy earnings", category: "Income" },
          { date: "2024-01-13", type: "UPI Debit", amount: 150, description: "Fuel", category: "Transport" },
          { date: "2024-01-12", type: "UPI Credit", amount: 1200, description: "Ola earnings", category: "Income" },
          { date: "2024-01-12", type: "UPI Debit", amount: 300, description: "Phone recharge", category: "Utilities" },
        ],
        riskFactors: [
          { 
            factor: "Income Volatility", 
            severity: "Medium", 
            description: "30% variation in monthly earnings from gig work",
            confidence: 0.85
          },
          { 
            factor: "Low Savings Rate", 
            severity: "High", 
            description: "Only 10.7% of income saved monthly, below recommended 20%",
            confidence: 0.92
          },
          { 
            factor: "Single Sector Dependency", 
            severity: "Medium", 
            description: "All income from gig economy, no diversification",
            confidence: 0.78
          },
        ]
      };
      
      setLookupResult(mockResult);
      setIsLoading(false);
    }, 2000);
  };

  const generateInstitutionalReport = () => {
    if (!lookupResult) return;
    alert("Institutional report generation functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-50/30 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
            <span className="text-orange-500">Bharat</span>
            <span className="text-sky-400">Ankh</span> Institutional Portal
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Secure customer financial profile lookup for institutional use
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          {!lookupResult ? (
            <LookupForm onSubmit={onSubmit} isLoading={isLoading} />
          ) : (
            <div className="space-y-8">
              <CustomerProfileCard 
                userData={lookupResult.userData}
                financialData={lookupResult.financialData}
              />

              <RiskAssessmentCard riskFactors={lookupResult.riskFactors} />

              <TransactionHistoryTable transactions={lookupResult.transactionHistory} />

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  onClick={generateInstitutionalReport} 
                  className="flex-1 h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                >
                  Generate Detailed Report
                </Button>
                <Button 
                  onClick={() => setLookupResult(null)} 
                  variant="outline" 
                  className="flex-1 h-12 text-base font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-xl"
                >
                  New Lookup
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutionalLookup;
