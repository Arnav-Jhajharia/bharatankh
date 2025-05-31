
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { generateFinancialPassportPDF } from "@/utils/pdfGenerator";

const indianLenders = [
  { id: "hdfc", name: "HDFC Bank" },
  { id: "icici", name: "ICICI Bank" },
  { id: "sbi", name: "State Bank of India" },
  { id: "axis", name: "Axis Bank" },
  { id: "kotak", name: "Kotak Mahindra Bank" },
  { id: "bajaj", name: "Bajaj Finserv" },
  { id: "payme", name: "PayMe India" },
  { id: "zestmoney", name: "ZestMoney" },
];

const FinancialPassport = () => {
  const navigate = useNavigate();
  const { userData, financialData } = useApp();
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedLender, setSelectedLender] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const handleDownload = () => {
    try {
      generateFinancialPassportPDF(userData, financialData);
      toast({
        title: "PDF Downloaded",
        description: "Your Financial Passport has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSend = () => {
    if (!selectedLender) return;
    
    setIsSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setShareDialogOpen(false);
      
      toast({
        title: "Sent Successfully",
        description: `Your Financial Passport has been shared with ${indianLenders.find(l => l.id === selectedLender)?.name}.`,
      });
      
      setSelectedLender("");
    }, 1500);
  };

  const totalExpenses = financialData.expenses.reduce((sum, exp) => 
    exp.category !== "Savings" ? sum + exp.amount : sum, 0
  );

  // Risk assessment color logic
  const getRiskColor = (riskProfile: string) => {
    switch (riskProfile.toLowerCase()) {
      case 'low':
      case 'good':
        return {
          bg: 'from-green-50/80 to-green-100/80',
          border: 'border-green-100/50',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-700'
        };
      case 'medium':
      case 'moderate':
        return {
          bg: 'from-yellow-50/80 to-yellow-100/80',
          border: 'border-yellow-100/50',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-700'
        };
      case 'high':
        return {
          bg: 'from-red-50/80 to-red-100/80',
          border: 'border-red-100/50',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-700'
        };
      default:
        return {
          bg: 'from-gray-50/80 to-gray-100/80',
          border: 'border-gray-100/50',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-700'
        };
    }
  };

  const riskColors = getRiskColor(financialData.riskProfile);

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex justify-center mb-10">
        <h1 className="text-2xl font-bold font-heading">
          <span style={{ color: '#f47615' }}>Bharat</span>
          <span style={{ color: '#399EE6' }}>Ankh</span>
        </h1>
      </div>
      
      <h2 className="text-4xl font-bold mb-8 text-gray-900 font-heading">Financial Passport</h2>
      
      <Card className="w-full shadow-lg rounded-3xl border border-gray-100/50 bg-white/95 backdrop-blur-xl mb-8 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-50/80 to-blue-50/80 pb-6 border-b border-gray-100/50">
          <CardTitle className="text-2xl text-gray-900 font-semibold font-heading">Your Financial Identity</CardTitle>
          <CardDescription className="text-gray-600 text-base font-medium font-body">
            Portable credentials for secure lending across India
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-8 px-8 pb-8">
          {/* User Profile Section */}
          <div className="mb-8 p-6 bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-3xl border border-gray-100/50">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 font-heading">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium font-body">Full Name</span>
                <span className="font-semibold text-gray-900 text-lg font-body">{userData.name}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium font-body">Identity Verification</span>
                <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full text-sm font-semibold shadow-sm font-body">
                  Aadhaar Verified
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium font-body">Bank Connection</span>
                <span className="font-semibold text-gray-900 font-body">
                  {userData.bankLinked ? userData.bankName : "Not Connected"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Financial Overview */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 font-heading">Financial Overview</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 p-6 rounded-3xl border border-blue-100/50 shadow-sm">
                <div className="text-sm text-blue-600 font-semibold mb-2 font-body">MONTHLY INCOME</div>
                <div className="text-2xl font-bold text-blue-800 font-heading">
                  ₹{financialData.monthlyIncome.toLocaleString('en-IN')}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-6 rounded-3xl border border-purple-100/50 shadow-sm">
                <div className="text-sm text-purple-600 font-semibold mb-2 font-body">MONTHLY EXPENSES</div>
                <div className="text-2xl font-bold text-purple-800 font-heading">
                  ₹{totalExpenses.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/80 p-6 rounded-3xl border border-orange-100/50 shadow-sm">
                <div className="text-sm text-orange-600 font-semibold mb-2 font-body">BHARATANKH SCORE</div>
                <div className="text-2xl font-bold text-orange-700 font-heading">
                  {financialData.finScore} / 100
                </div>
              </div>
              
              {/* Risk Assessment with color coding */}
              <div className={`bg-gradient-to-br ${riskColors.bg} p-6 rounded-3xl ${riskColors.border} shadow-sm`}>
                <div className={`text-sm font-semibold mb-2 font-body ${riskColors.text}`}>RISK ASSESSMENT</div>
                <div className={`text-2xl font-bold font-heading ${riskColors.text}`}>
                  {financialData.riskProfile}
                </div>
              </div>
            </div>
          </div>
          
          {/* Financial Characteristics */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 font-heading">Financial Characteristics</h3>
            <div className="flex flex-wrap gap-3">
              {financialData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 text-gray-700 rounded-full text-sm font-semibold shadow-sm font-body border border-gray-100/50"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          {/* Income Breakdown */}
          <div className="p-6 bg-gradient-to-r from-gray-50/80 to-orange-50/80 rounded-3xl border border-gray-100/50">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 font-heading">Income Sources</h3>
            <div className="space-y-4">
              {financialData.incomeBreakdown.map((income, index) => (
                <div key={index} className="flex justify-between items-center py-3 px-4 bg-white/80 rounded-2xl shadow-sm border border-gray-100/50">
                  <span className="font-medium text-gray-700 font-body">{income.source}</span>
                  <span className="font-bold text-gray-900 text-lg font-body">₹{income.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex gap-4 flex-col sm:flex-row mb-6">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50 font-semibold py-4 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md font-body"
        >
          Download PDF Report
        </Button>
        
        <Button
          onClick={() => setShareDialogOpen(true)}
          className="flex-1 text-white font-semibold py-4 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md font-body"
          style={{ backgroundColor: '#f47615' }}
        >
          Share with Lender
        </Button>
      </div>
      
      {/* Navigation Links */}
      <div className="flex gap-4">
        <Button
          variant="link"
          onClick={() => navigate("/dashboard")}
          className="flex-1 font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200 font-body"
        >
          Back to Dashboard
        </Button>
        
        <Button
          variant="link"
          onClick={() => navigate("/analysis")}
          className="flex-1 font-medium hover:text-brand-blue transition-colors duration-200 font-body"
          style={{ color: '#399EE6' }}
        >
          View Analysis
        </Button>
      </div>
      
      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="rounded-3xl border border-gray-100/50 bg-white/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 font-heading">Share Financial Passport</DialogTitle>
            <DialogDescription className="text-gray-600 font-medium font-body">
              Choose a verified lender to securely share your financial credentials
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <Select value={selectedLender} onValueChange={setSelectedLender}>
              <SelectTrigger className="rounded-2xl border-gray-200 shadow-sm font-body">
                <SelectValue placeholder="Select a verified lender" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border border-gray-100/50 bg-white/95 backdrop-blur-xl">
                <SelectGroup>
                  <SelectLabel className="text-gray-600 font-semibold font-body">Verified Indian Lenders</SelectLabel>
                  {indianLenders.map((lender) => (
                    <SelectItem key={lender.id} value={lender.id} className="rounded-xl font-body">
                      {lender.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShareDialogOpen(false)}
              className="rounded-2xl border-gray-200 font-semibold font-body"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSend} 
              disabled={!selectedLender || isSending}
              className="text-white font-semibold rounded-2xl shadow-sm font-body"
              style={{ backgroundColor: '#f47615' }}
            >
              {isSending ? "Sharing..." : "Share Passport"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default FinancialPassport;
