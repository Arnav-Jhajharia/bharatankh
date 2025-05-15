
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, 
  YAxis, CartesianGrid, Cell, ResponsiveContainer, ReferenceLine
} from "recharts";
import { 
  Info, AlertTriangle, CircleX, CheckCircle, 
  ChevronDown, ChevronUp
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Analysis = () => {
  const navigate = useNavigate();
  const { userData, financialData } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
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
      icon: <CheckCircle className="h-3.5 w-3.5 text-green-500" />,
      status: "good"
    },
    {
      title: "Income Variability",
      description: "Your income shows low variability, indicating stable earnings",
      icon: <Info className="h-3.5 w-3.5 text-gray-500" />,
      status: "neutral"
    },
    {
      title: "Spending Alert",
      description: "Dining expenses increased 20% over your monthly average",
      icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />,
      status: "concern"
    },
    {
      title: "High Debt Ratio",
      description: "Debt-to-income ratio exceeds recommended threshold of 36%",
      icon: <CircleX className="h-3.5 w-3.5 text-red-500" />,
      status: "critical"
    }
  ];

  // Filter critical insights
  const criticalInsights = insightsData.filter(insight => insight.status === "critical");
  const concernInsights = insightsData.filter(insight => insight.status === "concern");
  const otherInsights = insightsData.filter(insight => 
    insight.status !== "critical" && insight.status !== "concern");

  return (
    <PageContainer className="bg-gray-100">
      {/* Fixed-height main container to prevent overflow */}
      <div className="flex flex-col h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]">
        
        {/* BANK REVIEW BADGE - Compact */}
        <div className="bg-gray-800 text-white px-2 py-0.5 mb-1 inline-flex items-center text-xs rounded">
          <AlertTriangle className="h-3 w-3 mr-1" />
          <span>INTERNAL REVIEW</span>
        </div>
        
        {/* Ultra Compact Header with Client Info */}
        <div className="bg-white p-1.5 rounded shadow-sm mb-1 grid grid-cols-3 gap-2">
          <div>
            <p className="text-[10px] text-gray-500 uppercase">ID</p>
            <p className="text-xs font-medium truncate">
              {userData?.id || 'FIN-2025-0721'}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase">CLIENT</p>
            <p className="text-xs font-medium truncate">
              {userData?.name || 'John Doe'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase">SCORE</p>
            <div className="flex items-center justify-end">
              <span className="text-xs font-bold">{financialData.finScore}</span>
              <span className={`ml-1 px-1 text-[10px] rounded
                ${financialData.finScore > 75 ? "bg-gray-200" : "bg-red-100 text-red-800"}`}>
                {financialData.finScore > 75 ? "OK" : "RISK"}
              </span>
            </div>
          </div>
        </div>
        
        {/* CRITICAL RISKS SECTION - Always visible and compact */}
        <div className="mb-1">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-gray-800">CRITICAL RISK FACTORS</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-1">
            {/* First critical issue */}
            <div className="bg-red-50 p-1.5 border-l-2 border-red-500 text-[10px]">
              <div className="font-medium flex items-center">
                <CircleX className="h-3 w-3 text-red-500 mr-1" />
                Income Stability
              </div>
              <div>{lowestStability}% in {lowestStabilityMonth} (min 75%)</div>
            </div>
            
            {/* Second critical issue */}
            <div className="bg-red-50 p-1.5 border-l-2 border-red-500 text-[10px]">
              <div className="font-medium flex items-center">
                <CircleX className="h-3 w-3 text-red-500 mr-1" />
                Debt-to-Income
              </div>
              <div>42% (exceeds 36% threshold)</div>
            </div>
          </div>
        </div>
        
        {/* DATA VISUALIZATION - Tabbed for all three views */}
        <div className="mb-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-gray-200 h-6 mb-1">
              <TabsTrigger 
                value="overview" 
                className="text-[10px] h-6 flex-1 data-[state=active]:bg-white"
              >
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger 
                value="stability" 
                className="text-[10px] h-6 flex-1 data-[state=active]:bg-white"
              >
                STABILITY
              </TabsTrigger>
              <TabsTrigger 
                value="spending" 
                className="text-[10px] h-6 flex-1 data-[state=active]:bg-white"
              >
                SPENDING
              </TabsTrigger>
            </TabsList>
          
            <div className="bg-white p-1.5 rounded shadow-sm">
              {activeTab === "overview" && (
                <div className="h-24">
                  <ChartContainer 
                    config={{
                      income: { color: "#555555" },
                      expenses: { color: "#AAAAAA" }
                    }}
                  >
                    <LineChart data={incomeExpensesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 8}} 
                        height={15}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={(value) => `${value}`}
                        width={20}
                        tick={{fontSize: 8}}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent 
                            formatter={(value, name) => [`$${value}`, name]}
                          />
                        }
                      />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#555555" 
                        strokeWidth={1.5} 
                        dot={{ r: 1.5 }}
                        activeDot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#AAAAAA" 
                        strokeWidth={1.5}
                        dot={{ r: 1.5 }}
                        activeDot={{ r: 3 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              )}
              
              {activeTab === "stability" && (
                <div className="h-24">
                  <div className="text-[9px] text-red-600 font-medium">
                    <AlertTriangle className="h-2.5 w-2.5 inline mr-0.5" />
                    Income stability below threshold ({stabilityThreshold}%)
                  </div>
                  <div className="h-20">
                    <ChartContainer 
                      config={{
                        stability: { color: "#555555" },
                        flagged: { color: "#ea384c" }
                      }}
                    >
                      <BarChart data={stabilityData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 8}} height={15} />
                        <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{fontSize: 8}} width={20} />
                        <ReferenceLine y={stabilityThreshold} stroke="#ea384c" strokeDasharray="3 3" />
                        <Bar dataKey="stability" radius={[2, 2, 0, 0]}>
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
                </div>
              )}
              
              {activeTab === "spending" && (
                <div className="grid grid-cols-3 gap-1 h-24">
                  <div className="col-span-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={spendingData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={30}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {spendingData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color} 
                              stroke={entry.status === "concern" ? "#ea384c" : "#FFFFFF"}
                              strokeWidth={entry.status === "concern" ? 1 : 0.5}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="col-span-2 text-[9px] flex flex-col justify-center">
                    {spendingData.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex justify-between items-center py-0.5 ${
                          item.status === "concern" 
                            ? "bg-red-50 border-l-2 border-red-500 pl-1" 
                            : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-sm mr-1" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{item.value}%</span>
                          {item.status === "concern" && (
                            <span className="ml-0.5 text-[8px] text-red-600 font-medium">FLAG</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="text-[8px] text-red-600 pt-0.5">
                      "Other" spending lacks proper categorization
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Tabs>
        </div>
        
        {/* INSIGHTS - Scrollable area to prevent overflow */}
        <div className="flex-1 mb-1 overflow-hidden">
          <div className="flex justify-between items-center mb-0.5">
            <h3 className="text-xs font-bold text-gray-800">ADDITIONAL FACTORS</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-5 text-[9px] text-gray-600 flex items-center"
              onClick={() => setShowMoreInsights(!showMoreInsights)}
            >
              {showMoreInsights ? (
                <>Less <ChevronUp className="h-2.5 w-2.5 ml-0.5" /></>
              ) : (
                <>More <ChevronDown className="h-2.5 w-2.5 ml-0.5" /></>
              )}
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100%-1.5rem)] bg-white p-1 rounded shadow-sm">
            {/* Always show critical insights */}
            {criticalInsights.map((insight, index) => (
              <div 
                key={`critical-${index}`} 
                className="p-1 bg-red-50 border-l-2 border-red-500 mb-1 text-[9px]"
              >
                <div className="flex items-center">
                  {insight.icon}
                  <span className="ml-1 font-medium">{insight.title}</span>
                  <span className="ml-auto text-[8px] text-red-600 font-medium">HIGH RISK</span>
                </div>
                <p className="pl-5">{insight.description}</p>
              </div>
            ))}
            
            {/* Show concern insights */}
            {concernInsights.map((insight, index) => (
              <div 
                key={`concern-${index}`} 
                className="p-1 bg-amber-50 border-l-2 border-amber-500 mb-1 text-[9px]"
              >
                <div className="flex items-center">
                  {insight.icon}
                  <span className="ml-1 font-medium">{insight.title}</span>
                  <span className="ml-auto text-[8px] text-amber-600 font-medium">MEDIUM RISK</span>
                </div>
                <p className="pl-5">{insight.description}</p>
              </div>
            ))}
            
            {/* Show other insights conditionally */}
            {showMoreInsights && otherInsights.map((insight, index) => (
              <div 
                key={`other-${index}`} 
                className="p-1 bg-gray-50 border-l-2 border-gray-300 mb-1 text-[9px]"
              >
                <div className="flex items-center">
                  {insight.icon}
                  <span className="ml-1 font-medium">{insight.title}</span>
                  <span className="ml-auto text-[8px] text-gray-600">NORMAL</span>
                </div>
                <p className="pl-5">{insight.description}</p>
              </div>
            ))}
          </ScrollArea>
        </div>
        
        {/* Footer Info + Button */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[9px] text-gray-500 bg-gray-100 p-1 flex items-center">
              <Info className="h-2.5 w-2.5 mr-1" />
              Internal review only - {new Date().toLocaleDateString()}
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="h-6 text-[9px] py-0"
              size="sm"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Analysis;
