
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
        description: "Your Financial Passport PDF has been downloaded successfully.",
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
        title: "Sent successfully!",
        description: `Your Financial Passport has been sent to ${indianLenders.find(l => l.id === selectedLender)?.name}.`,
      });
      
      setSelectedLender("");
    }, 1500);
  };

  const totalExpenses = financialData.expenses.reduce((sum, exp) => 
    exp.category !== "Savings" ? sum + exp.amount : sum, 0
  );

  return (
    <PageContainer>
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold">
          <span style={{ color: '#f47615' }}>Bharat</span>
          <span style={{ color: '#86dcf4' }}>Ankh</span>
        </h1>
      </div>
      
      <Card className="w-full shadow-lg animate-fade-in mb-6">
        <CardHeader className="bg-orange-50 pb-2">
          <CardTitle className="text-xl text-orange-700">BharatAnkh Financial Passport</CardTitle>
          <CardDescription>
            Your portable financial identity for lenders across India
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* User Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">User Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium">{userData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Verification</span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                  Aadhaar Verified
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bank Status</span>
                <span className="font-medium">
                  {userData.bankLinked ? userData.bankName : "Not Linked"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Financial Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Financial Summary</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Monthly Income</div>
                <div className="text-lg font-bold">
                  ₹{financialData.monthlyIncome.toLocaleString('en-IN')}
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Monthly Expenses</div>
                <div className="text-lg font-bold">
                  ₹{totalExpenses.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">BharatAnkh Score</div>
                <div className="text-lg font-bold text-orange-600">
                  {financialData.finScore} / 100
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Risk Profile</div>
                <div className="text-lg font-bold text-green-600">
                  {financialData.riskProfile}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Profile Tags</h3>
            <div className="flex flex-wrap gap-2">
              {financialData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          {/* Income Sources */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">UPI Income Sources</h3>
            <div className="space-y-2">
              {financialData.incomeBreakdown.map((income, index) => (
                <div key={index} className="flex justify-between">
                  <span>{income.source}</span>
                  <span className="font-semibold">₹{income.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
        >
          Download PDF Report
        </Button>
        
        <Button
          onClick={() => setShareDialogOpen(true)}
          className="flex-1 text-white"
          style={{ backgroundColor: '#f47615' }}
        >
          Share With Lender
        </Button>
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button
          variant="link"
          onClick={() => navigate("/dashboard")}
          className="flex-1"
        >
          Back to Dashboard
        </Button>
        
        <Button
          variant="link"
          onClick={() => navigate("/analysis")}
          className="flex-1"
          style={{ color: '#86dcf4' }}
        >
          View Analysis
        </Button>
      </div>
      
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Financial Passport</DialogTitle>
            <DialogDescription>
              Select an Indian lender to share your Financial Passport with
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select value={selectedLender} onValueChange={setSelectedLender}>
              <SelectTrigger>
                <SelectValue placeholder="Select a lender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Indian Banks & NBFCs</SelectLabel>
                  {indianLenders.map((lender) => (
                    <SelectItem key={lender.id} value={lender.id}>
                      {lender.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSend} 
              disabled={!selectedLender || isSending}
              className="text-white"
              style={{ backgroundColor: '#f47615' }}
            >
              {isSending ? "Sending..." : "Send My Passport"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default FinancialPassport;
