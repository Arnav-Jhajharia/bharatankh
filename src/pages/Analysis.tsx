
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";

const Analysis = () => {
  const navigate = useNavigate();
  const { userData, financialData } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Income & Expenses Data
  const incomeExpensesData = [
    { name: "Apr", income: 1200, expenses: 700 },
    { name: "May", income: 1500, expenses: 900 },
    { name: "Jun", income: 1300, expenses: 850 },
    { name: "Jul", income: 1700, expenses: 950 },
    { name: "Aug", income: 2100, expenses: 1200 },
  ];
  
  // Income Stability Data
  const stabilityData = [
    { month: "Apr", stability: 68 },
    { month: "May", stability: 72 },
    { month: "Jun", stability: 78 },
    { month: "Jul", stability: 86 },
    { month: "Aug", stability: 92 },
  ];
  
  // Spending Breakdown Data
  const spendingData = [
    { name: "Housing", value: 30, color: "#399EE6" },
    { name: "Savings", value: 25, color: "#48BB78" },
    { name: "Expenses", value: 25, color: "#805AD5" },
    { name: "Other", value: 20, color: "#F6AD55" },
  ];

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Analysis</h2>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
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
      <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
        {/* Score Section */}
        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4">
            {/* User Avatar */}
            <AspectRatio ratio={1/1}>
              <div className="bg-gray-300 h-full w-full flex items-center justify-center text-gray-500">
                {userData.name ? userData.name.charAt(0) : "U"}
              </div>
            </AspectRatio>
          </div>
          
          <div className="flex-1">
            <p className="text-gray-600 text-sm mb-1">FinBridge Score</p>
            <div className="flex items-center">
              <h3 className="text-4xl font-bold mr-4">{financialData.finScore}</h3>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                {financialData.finScore > 75 ? "GOOD" : "FAIR"}
              </span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Income & Expenses Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Income & Expenses</h3>
          <div className="h-64">
            <ChartContainer 
              config={{
                income: { color: "#399EE6" },
                expenses: { color: "#805AD5" }
              }}
            >
              <LineChart data={incomeExpensesData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `S$${value}`}
                  width={60}
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
                  strokeWidth={2.5} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#805AD5" 
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Income Stability & Volatility */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Income Stability */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Income Stability</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stabilityData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <Bar dataKey="stability" radius={[4, 4, 0, 0]}>
                    {stabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#399EE6" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Volatility */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Low Volatility</h3>
            <p className="text-gray-700">
              Steady income with minimal fluctuations
            </p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Spending Breakdown */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Spending Breakdown</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Pie Chart */}
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
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
            <div className="space-y-2">
              {spendingData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-sm mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Button */}
      <Button
        variant="link"
        onClick={() => navigate("/dashboard")}
        className="mt-6 w-full"
      >
        Back to Dashboard
      </Button>
      
    </PageContainer>
  );
};

export default Analysis;
