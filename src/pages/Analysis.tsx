
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Cell, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { 
  Info, 
  AlertTriangle,
  CircleX,
  CheckCircle
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const Analysis = () => {
  const navigate = useNavigate();
  const { userData, financialData } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [isOpen, setIsOpen] = useState(true);
  
  // Income & Expenses Data
  const incomeExpensesData = [
    { name: "Apr", income: 1200, expenses: 700 },
    { name: "May", income: 1500, expenses: 900 },
    { name: "Jun", income: 1300, expenses: 850 },
    { name: "Jul", income: 1700, expenses: 950 },
    { name: "Aug", stability: 92, income: 2100, expenses: 1200 },
  ];
  
  // Income Stability Data with flagging threshold
  const stabilityThreshold = 75;
  const stabilityData = [
    { month: "Apr", stability: 68, isFlagged: true },
    { month: "May", stability: 72, isFlagged: true },
    { month: "Jun", stability: 78, isFlagged: false },
    { month: "Jul", stability: 86, isFlagged: false },
    { month: "Aug", stability: 92, isFlagged: false },
  ];
  
  // Get lowest stability value to highlight
  const lowestStability = Math.min(...stabilityData.map(item => item.stability));
  const lowestStabilityMonth = stabilityData.find(item => item.stability === lowestStability)?.month || '';
  
  // Spending Breakdown Data
  const spendingData = [
    { name: "Housing", value: 30, color: "#555555", status: "neutral" },
    { name: "Savings", value: 25, color: "#888888", status: "good" },
    { name: "Expenses", value: 25, color: "#333333", status: "neutral" },
    { name: "Other", value: 20, color: "#AAAAAA", status: "concern" },
  ];

  // Insights Data with status indicators
  const insightsData = [
    {
      title: "Savings Growth",
      description: "Your savings rate has increased by 15% compared to last quarter",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-gray-50 border-gray-200",
      status: "good"
    },
    {
      title: "Income Variability",
      description: "Your income shows low variability, indicating stable earnings",
      icon: <Info className="h-5 w-5 text-gray-500" />,
      color: "bg-gray-50 border-gray-200",
      status: "neutral"
    },
    {
      title: "Spending Alert",
      description: "Dining expenses increased 20% over your monthly average",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-50 border-amber-200",
      status: "concern"
    },
    {
      title: "High Debt Ratio",
      description: "Debt-to-income ratio exceeds recommended threshold of 36%",
      icon: <CircleX className="h-5 w-5 text-red-500" />,
      color: "bg-red-50 border-red-200",
      status: "critical"
    }
  ];

  // Function to determine if an insight requires bank attention
  const needsBankAttention = (status: string) => {
    return status === "concern" || status === "critical";
  };

  return (
    <PageContainer className="bg-gray-50">
      {/* BANK REVIEW BANNER */}
      <div className="bg-gray-100 border-l-4 border-red-500 text-gray-800 p-3 mb-4 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
        <span className="text-sm font-medium">INTERNAL BANK REVIEW DOCUMENT</span>
      </div>
      
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-gray-800">Financial Analysis Report</h2>
          <p className="text-sm text-gray-500">ID: {userData.id || 'FIN-2025-0721'}</p>
        </div>
        <p className="text-sm text-gray-500">Generated on: {new Date().toLocaleDateString()}</p>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="w-full bg-gray-200">
          <TabsTrigger 
            value="overview" 
            className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="cashflow" 
            className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            Cash Flow
          </TabsTrigger>
          <TabsTrigger 
            value="behavior" 
            className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            Behavior
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-auto max-h-[70vh]">
        {/* Score Section - More analytical and less colorful */}
        <Card className="mb-4 border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">FinBridge Credit Score</p>
                <div className="flex items-baseline">
                  <h3 className="text-3xl font-bold mr-2 text-gray-800">{financialData.finScore}</h3>
                  <div className={`px-2 py-0.5 text-xs font-medium ${
                    financialData.finScore > 75 
                      ? "bg-gray-200 text-gray-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {financialData.finScore > 75 ? "ACCEPTABLE" : "RISK ALERT"}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">Client</p>
                <p className="text-sm font-medium">{userData.name || 'John Doe'}</p>
                <p className="text-xs text-gray-500">{userData.email || 'john.doe@example.com'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Risk Highlights - Concise table with clear risk indicators */}
        <div className="mb-4">
          <h3 className="text-base font-medium text-gray-800 mb-2">Risk Assessment Summary</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Risk Category</TableHead>
                <TableHead>Analysis</TableHead>
                <TableHead className="w-[100px] text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-red-50">
                <TableCell className="font-medium">Income Stability</TableCell>
                <TableCell>Below threshold of {stabilityThreshold}% in {lowestStabilityMonth} ({lowestStability}%)</TableCell>
                <TableCell className="text-right text-red-600 font-medium">HIGH RISK</TableCell>
              </TableRow>
              <TableRow className="bg-amber-50">
                <TableCell className="font-medium">Expense Allocation</TableCell>
                <TableCell>"Other" spending category (20%) requires verification</TableCell>
                <TableCell className="text-right text-amber-600 font-medium">MEDIUM RISK</TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell className="font-medium">Debt-to-Income</TableCell>
                <TableCell>Exceeds recommended 36% threshold (currently 42%)</TableCell>
                <TableCell className="text-right text-red-600 font-medium">HIGH RISK</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Savings Rate</TableCell>
                <TableCell>Consistent growth pattern over past quarter</TableCell>
                <TableCell className="text-right text-gray-600">LOW RISK</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* Charts Section using Accordion - More monotone */}
        <Accordion type="single" defaultValue="stability" collapsible className="mb-4">
          {/* Income Stability Chart - Focus on the problematic data */}
          <AccordionItem value="stability" className="border-b border-gray-200">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <span className="text-base font-medium text-gray-800">Income Stability Analysis</span>
                <div className="flex items-center text-xs bg-red-100 text-red-800 font-medium px-2 py-0.5 rounded mr-3">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Critical Issue
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* Alert box for stability issue */}
              <Alert className="mb-3 bg-gray-100 border-l-4 border-red-500 text-gray-800 py-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-sm font-medium">Low Income Stability Risk Assessment</AlertTitle>
                <AlertDescription className="text-xs">
                  Income stability metrics below threshold of {stabilityThreshold}% detected in {lowestStabilityMonth} ({lowestStability}%). 
                  <strong className="block mt-1">Impact: Significantly increases default risk profile.</strong>
                </AlertDescription>
              </Alert>

              <div className="h-32 bg-white p-2 border border-gray-200">
                <ChartContainer 
                  config={{
                    stability: { color: "#555555" },
                    flagged: { color: "#ea384c" }
                  }}
                >
                  <BarChart data={stabilityData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                    <ReferenceLine y={stabilityThreshold} stroke="#ea384c" strokeDasharray="3 3" />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value, name, entry) => {
                            const dataEntry = entry.payload;
                            const isBelow = dataEntry.stability < stabilityThreshold;
                            return [
                              `${value}% ${isBelow ? '⚠️ Below threshold' : ''}`, 
                              'Stability'
                            ]
                          }} 
                        />
                      }
                    />
                    <Bar dataKey="stability" radius={[4, 4, 0, 0]}>
                      {stabilityData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isFlagged ? "#ea384c" : "#555555"} 
                          stroke={entry.isFlagged ? "#c01e36" : "#333333"}
                          strokeWidth={entry.isFlagged ? 1 : 0}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Income & Expenses Chart - More monotone colors */}
          <AccordionItem value="income" className="border-b border-gray-200">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-base font-medium text-gray-800">Income vs Expenses Trend</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="h-44 bg-white p-2 border border-gray-200">
                <ChartContainer 
                  config={{
                    income: { color: "#555555" },
                    expenses: { color: "#AAAAAA" }
                  }}
                >
                  <LineChart data={incomeExpensesData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tickFormatter={(value) => `S$${value}`}
                      width={50}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value, name) => [`S$${value}`, name === "income" ? "Income" : "Expenses"]} 
                        />
                      }
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      stroke="#555555" 
                      strokeWidth={2} 
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#AAAAAA" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Spending Breakdown - Grayscale with problem highlight */}
          <AccordionItem value="spending" className="border-b border-gray-200">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <span className="text-base font-medium text-gray-800">Spending Allocation Analysis</span>
                <div className="flex items-center text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded mr-3">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Verification Required
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                {/* Pie Chart */}
                <div className="h-32 flex items-center justify-center bg-white p-2 border border-gray-200">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spendingData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {spendingData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke={entry.status === "concern" ? "#ea384c" : "#FFFFFF"}
                            strokeWidth={entry.status === "concern" ? 2 : 1}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend with Highlighting */}
                <div className="space-y-1 text-sm">
                  {spendingData.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-2 ${
                        item.status === "concern" 
                          ? "bg-red-50 border-l-4 border-red-500" 
                          : item.status === "good"
                            ? "bg-gray-50"
                            : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-sm mr-2" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                      {item.status === "concern" && (
                        <span className="ml-1 text-xs text-red-600 font-medium">FLAG</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Analysis note - More professional */}
              <div className="mt-3 p-3 bg-gray-100 border-l-4 border-amber-500 text-sm">
                <p className="font-medium text-gray-800">Analyst Notes:</p>
                <p className="text-gray-600">
                  "Other" spending category (20%) lacks proper categorization. 
                  Recommendation: Request itemized breakdown before proceeding with risk assessment.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Reviewer Notes */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-medium text-gray-800">Risk Factors Summary</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                {isOpen ? "−" : "+"}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <Card className="border-gray-200 mb-2">
              <CardContent className="p-3 text-sm">
                <div className="space-y-2">
                  {insightsData.filter(insight => needsBankAttention(insight.status)).map((insight, index) => (
                    <div 
                      key={index} 
                      className={`p-2 ${
                        insight.status === "critical" 
                          ? "bg-red-50 border-l-4 border-red-500" 
                          : "bg-amber-50 border-l-4 border-amber-500"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {insight.icon}
                          <span className="ml-2 font-medium">{insight.title}</span>
                        </div>
                        <span className={`text-xs font-medium ${
                          insight.status === "critical" ? "text-red-600" : "text-amber-600"
                        }`}>
                          {insight.status === "critical" ? "HIGH RISK" : "MEDIUM RISK"}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600 pl-7">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Alert className="bg-gray-100 border-gray-300 text-gray-800">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                This document is for internal bank review only. Assessment data is based on 
                financial information provided as of {new Date().toLocaleDateString()}.
              </AlertDescription>
            </Alert>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* Navigation Button */}
      <Button
        variant="outline"
        onClick={() => navigate("/dashboard")}
        className="mt-4 w-full"
        size="sm"
      >
        Return to Dashboard
      </Button>
    </PageContainer>
  );
};

export default Analysis;
