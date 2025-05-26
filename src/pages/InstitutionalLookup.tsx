
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Search, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const lookupSchema = z.object({
  aadhaarNumber: z.string().regex(/^\d{12}$/, { message: "Aadhaar number must be 12 digits" }),
  dob: z.date({ required_error: "Date of birth is required" }),
});

type LookupData = z.infer<typeof lookupSchema>;

const InstitutionalLookup = () => {
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LookupData>({
    resolver: zodResolver(lookupSchema),
    defaultValues: {
      aadhaarNumber: "",
    },
  });

  const onSubmit = (values: LookupData) => {
    setIsLoading(true);
    
    // Simulate API call
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
          { factor: "Income Volatility", severity: "Medium", description: "30% variation in monthly earnings" },
          { factor: "Low Savings Rate", severity: "High", description: "Only 10.7% of income saved monthly" },
          { factor: "Single Sector Dependency", severity: "Medium", description: "All income from gig economy" },
        ]
      };
      
      setLookupResult(mockResult);
      setIsLoading(false);
    }, 2000);
  };

  const generateInstitutionalReport = () => {
    if (!lookupResult) return;
    
    // This would generate a detailed institutional report
    alert("Institutional report generation functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span style={{ color: '#f47615' }}>Bharat</span>
            <span style={{ color: '#86dcf4' }}>Ankh</span> Institutional Portal
          </h1>
          <p className="text-gray-600">Secure customer financial profile lookup for institutional use</p>
        </div>

        {!lookupResult ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Customer Lookup
              </CardTitle>
              <CardDescription>
                Enter Aadhaar number and date of birth to access customer financial profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="aadhaarNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aadhaar Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123456789012" 
                            {...field} 
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                              field.onChange(value);
                            }}
                            maxLength={12}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Select date of birth</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value || undefined}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1940-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    style={{ backgroundColor: '#f47615' }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Looking up..." : "Lookup Customer"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Customer Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Name:</strong> {lookupResult.userData.name}</p>
                  <p><strong>Aadhaar:</strong> {lookupResult.userData.aadhaar}</p>
                  <p><strong>DOB:</strong> {format(lookupResult.userData.dob, "PPP")}</p>
                </div>
                <div>
                  <p><strong>Bank:</strong> {lookupResult.userData.bankName}</p>
                  <p><strong>Verification:</strong> {lookupResult.userData.isVerified ? "Verified" : "Pending"}</p>
                  <p><strong>BharatAnkh Score:</strong> {lookupResult.financialData.finScore}/100</p>
                </div>
              </CardContent>
            </Card>

            {/* Risk Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lookupResult.riskFactors.map((risk: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {risk.severity === "High" ? (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        ) : (
                          <TrendingUp className="h-5 w-5 text-yellow-500" />
                        )}
                        <div>
                          <p className="font-medium">{risk.factor}</p>
                          <p className="text-sm text-gray-600">{risk.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.severity === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lookupResult.transactionHistory.map((txn: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{txn.date}</TableCell>
                        <TableCell>{txn.type}</TableCell>
                        <TableCell>{txn.description}</TableCell>
                        <TableCell>{txn.category}</TableCell>
                        <TableCell className={`text-right ${txn.type.includes('Credit') ? 'text-green-600' : 'text-red-600'}`}>
                          {txn.type.includes('Credit') ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={generateInstitutionalReport} className="flex-1" style={{ backgroundColor: '#f47615' }}>
                Generate Detailed Report
              </Button>
              <Button onClick={() => setLookupResult(null)} variant="outline" className="flex-1">
                New Lookup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstitutionalLookup;
