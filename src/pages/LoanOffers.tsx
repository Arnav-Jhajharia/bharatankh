
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PageContainer from "@/components/PageContainer";
import { useToast } from "@/hooks/use-toast";

const loanOffers = [
  { 
    id: "loan1", 
    amount: 30000, 
    interest: 14.5, 
    lender: "FlexiBank",
    term: "12 months",
    specialOffer: false,
    description: "Fast approval personal loan for gig workers"
  },
  { 
    id: "loan2", 
    amount: 20000, 
    interest: 16, 
    lender: "KreditBee",
    term: "6 months",
    specialOffer: false,
    description: "Flexible repayment options with no hidden fees"
  },
  { 
    id: "loan3", 
    amount: 15000, 
    interest: 0, 
    lender: "LoanBox Express",
    term: "90 days",
    specialOffer: true,
    description: "0% interest for 90 days, perfect for short-term needs"
  },
];

const LoanOffers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<(typeof loanOffers)[0] | null>(null);
  
  const handleApply = (loan: (typeof loanOffers)[0]) => {
    setSelectedLoan(loan);
    setApplyDialogOpen(true);
  };
  
  const confirmApply = () => {
    setApplyDialogOpen(false);
    
    toast({
      title: "Application Submitted",
      description: `Your application for ₹${selectedLoan?.amount.toLocaleString()} from ${selectedLoan?.lender} has been submitted.`,
    });
    
    setSelectedLoan(null);
  };

  return (
    <PageContainer>
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">
          Loan Offers Tailored for You
        </h2>
        <p className="text-gray-500">Based on your FinScore and financial history</p>
      </div>
      
      <div className="space-y-4 mb-6">
        {loanOffers.map((loan) => (
          <Card key={loan.id} className="w-full shadow-md animate-fade-in">
            <CardContent className="p-6">
              <div className="flex justify-between mb-2">
                <div>
                  <div className="text-2xl font-bold mb-1">
                    ₹{loan.amount.toLocaleString()}
                  </div>
                  <div className="text-gray-500">{loan.lender}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold mb-1">
                    {loan.interest}%
                  </div>
                  <div className="text-gray-500">{loan.term}</div>
                </div>
              </div>
              
              {loan.specialOffer && (
                <div className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs inline-block mb-2">
                  Special Offer
                </div>
              )}
              
              <p className="text-gray-500 mb-4 text-sm">
                {loan.description}
              </p>
              
              <Button 
                onClick={() => handleApply(loan)} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button
        variant="outline"
        onClick={() => navigate("/dashboard")}
        className="w-full"
      >
        Back to Dashboard
      </Button>
      
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for Loan</DialogTitle>
            <DialogDescription>
              You're about to apply for a loan from {selectedLoan?.lender}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Loan Amount</span>
                <span className="font-semibold">₹{selectedLoan?.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Interest Rate</span>
                <span className="font-semibold">{selectedLoan?.interest}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Term</span>
                <span className="font-semibold">{selectedLoan?.term}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
              <p>This is a simulated application. In a real app, you would go through the lender's KYC and approval process next.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmApply}
              className="bg-primary hover:bg-primary/90"
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default LoanOffers;
