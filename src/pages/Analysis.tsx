
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
  TrendingUp, 
  TrendingDown, 
  Info, 
  LightbulbIcon, 
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
    { name: "Housing", value: 30, color: "#399EE6", status: "neutral" },
    { name: "Savings", value: 25, color: "#48BB78", status: "good" },
    { name: "Expenses", value: 25, color: "#805AD5", status: "neutral" },
    { name: "Other", value: 20, color: "#F6AD55", status: "concern" },
  ];

  // Insights Data with status indicators
  const insightsData = [
    {
      title: "Savings Growth",
      description: "Your savings rate has increased by 15% compared to last quarter",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-green-50 border-green-200",
      status: "good"
    },
    {
      title: "Income Variability",
      description: "Your income shows low variability, indicating stable earnings",
      icon: <Info className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
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
    <PageContainer>
      {/* BANK REVIEW BANNER */}
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-2 mb-4 flex items-center">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">BANK REVIEW DOCUMENT - INTERNAL USE ONLY</span>
      </div>
      
      {/* Header */}
      <div className="flex justify-center mb-2">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      <h2 className="text-xl font-bold mb-2">Financial Analysis</h2>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-3">
        <TabsList className="w-full bg-gray-100">
          <TabsTrigger 
            value="overview" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="cashflow" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Cash Flow
          </TabsTrigger>
          <TabsTrigger 
            value="behavior" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Behavior
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-lg p-3 animate-fade-in overflow-auto max-h-[75vh]">
        {/* Score Section */}
        <div className="flex items-center mb-3">
          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
            {/* User Avatar */}
            <AspectRatio ratio={1/1}>
              <div className="bg-gray-300 h-full w-full flex items-center justify-center text-gray-500">
                {userData.name ? userData.name.charAt(0) : "U"}
              </div>
            </AspectRatio>
          </div>
          
          <div className="flex-1">
            <p className="text-gray-600 text-xs mb-0.5">FinBridge Score</p>
            <div className="flex items-center">
              <h3 className="text-3xl font-bold mr-2">{financialData.finScore}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                financialData.finScore > 75 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {financialData.finScore > 75 ? "GOOD" : "NEEDS ATTENTION"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Insights Section - Collapsible */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-semibold">Financial Insights</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                {isOpen ? "-" : "+"}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {insightsData.map((insight, index) => (
                <Card 
                  key={index} 
                  className={`border ${insight.color} ${
                    needsBankAttention(insight.status) ? "ring-2 ring-red-400" : ""
                  }`}
                >
                  <CardContent className="p-2 flex items-start">
                    <div className="mr-2 mt-0.5">
                      {insight.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-xs">{insight.title}</h4>
                        {needsBankAttention(insight.status) && (
                          <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-[10px] font-medium">
                            ATTENTION
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{insight.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Separator className="my-3" />
        
        {/* Charts Section using Accordion */}
        <Accordion type="single" defaultValue="stability" collapsible className="mb-3">
          <AccordionItem value="income" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-base font-semibold">Income & Expenses</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="h-44">
                <ChartContainer 
                  config={{
                    income: { color: "#399EE6" },
                    expenses: { color: "#805AD5" }
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
                      stroke="#399EE6" 
                      strokeWidth={2} 
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#805AD5" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Income Stability with Warning - Opened by default */}
          <AccordionItem value="stability" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <span className="text-base font-semibold">Income Stability</span>
                <div className="flex items-center text-xs bg-red-100 text-red-800 font-medium px-2 py-0.5 rounded-full mr-3">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Critical Issue
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* Alert box for stability issue */}
              <Alert className="mb-3 bg-red-100 border-red-300 text-red-800 py-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-xs font-medium">CRITICAL: Low Income Stability</AlertTitle>
                <AlertDescription className="text-xs">
                  Income stability was below the recommended threshold of {stabilityThreshold}% in {lowestStabilityMonth} ({lowestStability}%). 
                  <strong className="block mt-1">Risk Assessment: HIGH - May significantly impact loan approval decision.</strong>
                </AlertDescription>
              </Alert>

              <div className="h-32">
                <ChartContainer 
                  config={{
                    stability: { color: "#399EE6" },
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
                          fill={entry.isFlagged ? "#ea384c" : "#399EE6"} 
                          stroke={entry.isFlagged ? "#c01e36" : "#2288d1"}
                          strokeWidth={entry.isFlagged ? 2 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Spending Breakdown */}
          <AccordionItem value="spending" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <span className="text-base font-semibold">Spending Breakdown</span>
                <div className="flex items-center text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full mr-3">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Attention Required
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2">
                {/* Pie Chart */}
                <div className="h-28">
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
                            stroke={entry.status === "concern" ? "#ea384c" : undefined}
                            strokeWidth={entry.status === "concern" ? 2 : 0}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend with Highlighting */}
                <div className="space-y-1 text-xs">
                  {spendingData.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-1 rounded ${
                        item.status === "concern" 
                          ? "bg-red-50 border border-red-200" 
                          : item.status === "good"
                            ? "bg-green-50"
                            : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-2 h-2 rounded-sm mr-1" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                      {item.status === "concern" && (
                        <span className="ml-1 text-[10px] text-red-600">⚠️</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Note for bank reviewers */}
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md text-xs">
                <p className="font-medium text-amber-800">Bank Reviewer Note:</p>
                <p className="text-amber-700">
                  "Other" spending category is unusually high at 20% and lacks detailed allocation. 
                  Requires further investigation for loan risk assessment.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Navigation Button */}
      <Button
        variant="link"
        onClick={() => navigate("/dashboard")}
        className="mt-4 w-full"
        size="sm"
      >
        Back to Dashboard
      </Button>
      
    </PageContainer>
  );
};

export default Analysis;
