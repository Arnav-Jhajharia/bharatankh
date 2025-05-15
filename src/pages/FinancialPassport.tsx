
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

const lenders = [
  { id: "dbs", name: "DBS Bank" },
  { id: "ocbc", name: "OCBC Bank" },
  { id: "singlife", name: "Singlife" },
];

const FinancialPassport = () => {
  const navigate = useNavigate();
  const { userData, financialData } = useApp();
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedLender, setSelectedLender] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your Financial Passport PDF is downloading.",
    });
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
        description: `Your Financial Passport has been sent to ${lenders.find(l => l.id === selectedLender)?.name}.`,
      });
      
      setSelectedLender("");
    }, 1500);
  };

  return (
    <PageContainer>
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      <Card className="w-full shadow-lg animate-fade-in mb-6">
        <CardHeader className="bg-primary/10 pb-2">
          <CardTitle className="text-xl">FinBridge Financial Passport</CardTitle>
          <CardDescription>
            Your portable financial identity
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
                <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full text-xs">
                  SingPass Verified
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="font-medium">Singapore</span>
              </div>
            </div>
          </div>
          
          {/* Financial Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Financial Summary</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-soft-blue p-3 rounded-lg">
                <div className="text-sm text-gray-500">Avg Monthly Income</div>
                <div className="text-lg font-bold">
                  S${financialData.monthlyIncome.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-soft-blue p-3 rounded-lg">
                <div className="text-sm text-gray-500">Avg Monthly Spend</div>
                <div className="text-lg font-bold">
                  S${financialData.expenses.reduce((sum, exp) => 
                    exp.category !== "Savings" ? sum + exp.amount : sum, 0
                  ).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-soft-green p-3 rounded-lg">
                <div className="text-sm text-gray-500">FinScore</div>
                <div className="text-lg font-bold">
                  {financialData.finScore} / 100
                </div>
              </div>
              
              <div className="bg-soft-green p-3 rounded-lg">
                <div className="text-sm text-gray-500">Risk Profile</div>
                <div className="text-lg font-bold">
                  {financialData.riskProfile}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {financialData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          {/* Income Sources */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Income Sources</h3>
            <div className="space-y-2">
              {financialData.incomeBreakdown.map((income, index) => (
                <div key={index} className="flex justify-between">
                  <span>{income.source}</span>
                  <span className="font-semibold">S${income.amount.toLocaleString()}</span>
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
          className="flex-1"
        >
          Download PDF
        </Button>
        
        <Button
          onClick={() => setShareDialogOpen(true)}
          className="flex-1 bg-primary hover:bg-primary/90"
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
          className="flex-1 text-primary"
        >
          View Analysis
        </Button>
      </div>
      
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Financial Passport</DialogTitle>
            <DialogDescription>
              Select a lender to share your Financial Passport with
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select value={selectedLender} onValueChange={setSelectedLender}>
              <SelectTrigger>
                <SelectValue placeholder="Select a lender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lenders</SelectLabel>
                  {lenders.map((lender) => (
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
              className="bg-primary hover:bg-primary/90"
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
