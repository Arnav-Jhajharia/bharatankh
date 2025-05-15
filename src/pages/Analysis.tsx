
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
  CheckCircle,
  ChevronDown,
  ChevronUp
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
  const [isOpen, setIsOpen] = useState(false);
  const [showFullRisk, setShowFullRisk] = useState(false);
  const [showMoreInsights, setShowMoreInsights] = useState(false);
  
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

  // Filter critical insights for immediate display
  const criticalInsights = insightsData.filter(insight => insight.status === "critical");
  const concernInsights = insightsData.filter(insight => insight.status === "concern");
  const otherInsights = insightsData.filter(insight => !needsBankAttention(insight.status));

  return (
    <PageContainer className="bg-gray-50">
      {/* BANK REVIEW BANNER */}
      <div className="bg-gray-100 border-l-4 border-red-500 text-gray-800 p-2 mb-3 flex items-center text-xs">
        <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
        <span className="font-medium">INTERNAL BANK REVIEW</span>
      </div>
      
      {/* Compact Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-800">Financial Analysis</h2>
        <p className="text-xs text-gray-500">
          ID: {userData?.accountId || 'FIN-2025-0721'} | {new Date().toLocaleDateString()}
        </p>
      </div>
      
      {/* Card With Score and Client */}
      <Card className="mb-3 border-gray-200 bg-gray-50">
        <CardContent className="p-3 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium">FinBridge Score</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold mr-2 text-gray-800">{financialData.finScore}</h3>
              <div className={`px-1.5 py-0.5 text-xs font-medium ${
                financialData.finScore > 75 
                  ? "bg-gray-200 text-gray-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {financialData.finScore > 75 ? "ACCEPTABLE" : "RISK"}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-medium">Client</p>
            <p className="text-sm font-medium">{userData?.name || 'John Doe'}</p>
            <p className="text-xs text-gray-500">{userData?.contact || 'john.doe@example.com'}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Critical Risks - Always Visible */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-medium text-gray-800">Risk Assessment</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-6 text-xs text-gray-600 flex items-center"
            onClick={() => setShowFullRisk(!showFullRisk)}
          >
            {showFullRisk ? (
              <>Less <ChevronUp className="h-3 w-3 ml-1" /></>
            ) : (
              <>More <ChevronDown className="h-3 w-3 ml-1" /></>
            )}
          </Button>
        </div>
        
        {/* Always show critical risks */}
        <div className="bg-red-50 p-2 border-l-4 border-red-500 mb-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CircleX className="h-4 w-4 text-red-500 mr-1.5" />
              <span className="font-medium text-sm">Income Stability</span>
            </div>
            <span className="text-xs text-red-600 font-medium">HIGH RISK</span>
          </div>
          <p className="text-xs text-gray-700 mt-0.5 pl-6">
            Below threshold in {lowestStabilityMonth}: {lowestStability}%
          </p>
        </div>
        
        <div className="bg-red-50 p-2 border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CircleX className="h-4 w-4 text-red-500 mr-1.5" />
              <span className="font-medium text-sm">Debt-to-Income</span>
            </div>
            <span className="text-xs text-red-600 font-medium">HIGH RISK</span>
          </div>
          <p className="text-xs text-gray-700 mt-0.5 pl-6">
            42% (exceeds 36% threshold)
          </p>
        </div>
        
        {/* Collapsible medium risks */}
        {showFullRisk && (
          <div className="bg-amber-50 p-2 border-l-4 border-amber-500 mt-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-amber-500 mr-1.5" />
                <span className="font-medium text-sm">Expense Allocation</span>
              </div>
              <span className="text-xs text-amber-600 font-medium">MEDIUM RISK</span>
            </div>
            <p className="text-xs text-gray-700 mt-0.5 pl-6">
              "Other" spending (20%) requires verification
            </p>
          </div>
        )}
        
        {/* Collapsible low risks */}
        {showFullRisk && (
          <div className="p-2 border-l-4 border-gray-300 mt-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Info className="h-4 w-4 text-gray-500 mr-1.5" />
                <span className="font-medium text-sm">Savings Rate</span>
              </div>
              <span className="text-xs text-gray-600">LOW RISK</span>
            </div>
            <p className="text-xs text-gray-700 mt-0.5 pl-6">
              Consistent growth pattern over past quarter
            </p>
          </div>
        )}
      </div>

      {/* Data Visualizations - Compact Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-3">
        <TabsList className="w-full bg-gray-200 h-8">
          <TabsTrigger 
            value="overview" 
            className="text-xs h-8 flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="stability" 
            className="text-xs h-8 flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            Stability
          </TabsTrigger>
          <TabsTrigger 
            value="spending" 
            className="text-xs h-8 flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            Spending
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 p-3 mb-3">
        {activeTab === "overview" && (
          <div className="h-32">
            <ChartContainer 
              config={{
                income: { color: "#555555" },
                expenses: { color: "#AAAAAA" }
              }}
            >
              <LineChart data={incomeExpensesData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `S$${value}`}
                  width={40}
                  tick={{fontSize: 10}}
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
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#AAAAAA" 
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        )}
        
        {activeTab === "stability" && (
          <div className="h-32">
            <div className="text-xs text-red-600 font-medium mb-1">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              Income stability below threshold ({stabilityThreshold}%)
            </div>
            <ChartContainer 
              config={{
                stability: { color: "#555555" },
                flagged: { color: "#ea384c" }
              }}
            >
              <BarChart data={stabilityData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{fontSize: 10}} />
                <ReferenceLine y={stabilityThreshold} stroke="#ea384c" strokeDasharray="3 3" />
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
        )}
        
        {activeTab === "spending" && (
          <div className="grid grid-cols-3 gap-2 h-32">
            <div className="col-span-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={35}
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
            
            <div className="col-span-2 space-y-0.5 text-xs overflow-auto">
              {spendingData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-1 ${
                    item.status === "concern" 
                      ? "bg-red-50 border-l-2 border-red-500" 
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-sm mr-1.5" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{item.value}%</span>
                    {item.status === "concern" && (
                      <span className="ml-1 text-[10px] text-red-600 font-medium">FLAG</span>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-[10px] text-red-600 pt-1">
                "Other" spending lacks proper categorization
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Critical Insights Summary */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-medium text-gray-800">Risk Factors</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-6 text-xs text-gray-600 flex items-center"
            onClick={() => setShowMoreInsights(!showMoreInsights)}
          >
            {showMoreInsights ? (
              <>Less <ChevronUp className="h-3 w-3 ml-1" /></>
            ) : (
              <>More <ChevronDown className="h-3 w-3 ml-1" /></>
            )}
          </Button>
        </div>
        
        {/* Always show critical insights */}
        {criticalInsights.map((insight, index) => (
          <div 
            key={index} 
            className="p-2 bg-red-50 border-l-4 border-red-500 mb-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {insight.icon}
                <span className="ml-1.5 font-medium text-sm">{insight.title}</span>
              </div>
              <span className="text-xs text-red-600 font-medium">HIGH RISK</span>
            </div>
            <p className="text-xs text-gray-700 mt-0.5 pl-6">{insight.description}</p>
          </div>
        ))}
        
        {/* Show concern insights */}
        {concernInsights.map((insight, index) => (
          <div 
            key={index} 
            className="p-2 bg-amber-50 border-l-4 border-amber-500 mb-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {insight.icon}
                <span className="ml-1.5 font-medium text-sm">{insight.title}</span>
              </div>
              <span className="text-xs text-amber-600 font-medium">MEDIUM RISK</span>
            </div>
            <p className="text-xs text-gray-700 mt-0.5 pl-6">{insight.description}</p>
          </div>
        ))}
        
        {/* Show other insights conditionally */}
        {showMoreInsights && otherInsights.map((insight, index) => (
          <div 
            key={index} 
            className="p-2 bg-gray-50 border-l-4 border-gray-300 mb-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {insight.icon}
                <span className="ml-1.5 font-medium text-sm">{insight.title}</span>
              </div>
              <span className="text-xs text-gray-600">NORMAL</span>
            </div>
            <p className="text-xs text-gray-700 mt-0.5 pl-6">{insight.description}</p>
          </div>
        ))}
      </div>
      
      {/* Footer Note */}
      <div className="text-xs text-gray-500 bg-gray-100 p-2 mb-3">
        <Info className="h-3 w-3 inline mr-1" />
        For internal bank review only. Assessment data as of {new Date().toLocaleDateString()}.
      </div>
      
      {/* Navigation Button */}
      <Button
        variant="outline"
        onClick={() => navigate("/dashboard")}
        className="w-full h-8 text-xs"
        size="sm"
      >
        Return to Dashboard
      </Button>
    </PageContainer>
  );
};

export default Analysis;
