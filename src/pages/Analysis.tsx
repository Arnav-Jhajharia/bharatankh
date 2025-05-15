
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
  ResponsiveContainer 
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  TrendingDown, 
  Info, 
  LightbulbIcon, 
  AlertTriangle 
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
    { name: "Housing", value: 30, color: "#399EE6" },
    { name: "Savings", value: 25, color: "#48BB78" },
    { name: "Expenses", value: 25, color: "#805AD5" },
    { name: "Other", value: 20, color: "#F6AD55" },
  ];

  // Insights Data (Placeholder)
  const insightsData = [
    {
      title: "Savings Growth",
      description: "Your savings rate has increased by 15% compared to last quarter",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Income Variability",
      description: "Your income shows low variability, indicating stable earnings",
      icon: <Info className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Spending Alert",
      description: "Dining expenses increased 20% over your monthly average",
      icon: <TrendingDown className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-50 border-amber-200"
    },
    {
      title: "Financial Tip",
      description: "Consider setting up an emergency fund covering 6 months of expenses",
      icon: <LightbulbIcon className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex justify-center mb-4">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      <h2 className="text-2xl font-bold mb-3">Analysis</h2>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
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
      <div className="bg-white rounded-lg shadow-lg p-4 animate-fade-in overflow-auto max-h-[75vh]">
        {/* Score Section */}
        <div className="flex items-center mb-4">
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
              <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                {financialData.finScore > 75 ? "GOOD" : "FAIR"}
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
                <Card key={index} className={`border ${insight.color}`}>
                  <CardContent className="p-2 flex items-start">
                    <div className="mr-2 mt-0.5">
                      {insight.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-xs">{insight.title}</h4>
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
        <Accordion type="single" defaultValue="income" collapsible className="mb-3">
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
          
          {/* Income Stability with Warning */}
          <AccordionItem value="stability" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <span className="text-base font-semibold">Income Stability</span>
                <div className="flex items-center text-xs text-red-500 font-medium mr-3">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Issue Detected
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* Alert box for stability issue */}
              <Alert className="mb-3 bg-red-50 border-red-200 text-red-700 py-2">
                <AlertTriangle className="h-3 w-3" />
                <AlertTitle className="text-xs font-medium">Low Income Stability</AlertTitle>
                <AlertDescription className="text-xs">
                  Your income stability was below the recommended threshold of {stabilityThreshold}% in {lowestStabilityMonth} ({lowestStability}%), which may impact your loan approval chances.
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
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          formatter={(value) => [`${value}%`, 'Stability']} 
                        />
                      }
                    />
                    <Bar dataKey="stability" radius={[4, 4, 0, 0]}>
                      {stabilityData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isFlagged ? "#ea384c" : "#399EE6"} 
                          stroke={entry.isFlagged ? "#c01e36" : "#2288d1"}
                          strokeWidth={1}
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
              <span className="text-base font-semibold">Spending Breakdown</span>
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
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="space-y-1 text-xs">
                  {spendingData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div 
                          className="w-2 h-2 rounded-sm mr-1" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
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
