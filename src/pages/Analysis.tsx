
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";

const Analysis = () => {
  const navigate = useNavigate();
  const { userData, financialData } = useApp();
  const [activeTab, setActiveTab] = useState("overview");

  // Income & Expenses Data
  const incomeExpensesData = [
    { name: "Apr", income: 35000, expenses: 20000 },
    { name: "May", income: 42000, expenses: 25000 },
    { name: "Jun", income: 38000, expenses: 23000 },
    { name: "Jul", income: 48000, expenses: 27000 },
    { name: "Aug", income: 58000, expenses: 32000 }
  ];

  // Income Stability Data
  const stabilityData = [
    { month: "Apr", stability: 68 },
    { month: "May", stability: 72 },
    { month: "Jun", stability: 78 },
    { month: "Jul", stability: 86 },
    { month: "Aug", stability: 92 }
  ];

  // Spending Breakdown Data
  const spendingData = [
    { name: "Housing", value: 30, color: "#f47615" },
    { name: "Savings", value: 25, color: "#48BB78" },
    { name: "Expenses", value: 25, color: "#805AD5" },
    { name: "Other", value: 20, color: "#86dcf4" }
  ];

  // Cash Flow Data
  const cashFlowData = [
    { name: "Week 1", inflow: 8000, outflow: 5000 },
    { name: "Week 2", inflow: 12000, outflow: 7000 },
    { name: "Week 3", inflow: 15000, outflow: 8000 },
    { name: "Week 4", inflow: 18000, outflow: 9000 }
  ];

  // Behavior Data
  const behaviorData = [
    { category: "UPI Transactions", frequency: 95 },
    { category: "Digital Payments", frequency: 88 },
    { category: "Savings Rate", frequency: 75 },
    { category: "Bill Payments", frequency: 92 }
  ];

  const renderOverviewContent = () => (
    <div className="space-y-6">
      {/* Income & Expenses Chart */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 tracking-tight">Income & Expenses</h3>
        <div className="h-72 rounded-2xl overflow-hidden">
          <ChartContainer config={{
            income: { color: "#f47615" },
            expenses: { color: "#805AD5" }
          }}>
            <LineChart data={incomeExpensesData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
              <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} width={60} className="text-sm text-gray-600" />
              <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => [`₹${value}`, name === "income" ? "Income" : "Expenses"]} />} />
              <Line type="monotone" dataKey="income" stroke="#f47615" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" stroke="#805AD5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
      
      <Separator className="my-8 bg-gray-200" />
      
      {/* Enhanced Spending Breakdown - Fixed Layout */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="px-8 pt-8 pb-6">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-2">Spending Breakdown</h3>
          <p className="text-sm text-gray-500 font-medium">Monthly allocation overview</p>
        </div>
        
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pie Chart - Larger container */}
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={spendingData} 
                    cx="50%" 
                    cy="50%" 
                    labelLine={false} 
                    outerRadius={120}
                    innerRadius={40}
                    fill="#8884d8" 
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Enhanced Legend - Better spacing */}
            <div className="space-y-4 flex flex-col justify-center">
              {spendingData.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center px-6 py-5 rounded-2xl bg-gray-50/60 hover:bg-gray-100/80 border border-gray-100/60 hover:border-gray-200/60 transition-all duration-300 hover:shadow-sm">
                    <div className="flex items-center space-x-5">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm ring-2 ring-white/50 flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-gray-800 text-base tracking-tight truncate">{item.name}</span>
                        <span className="text-xs text-gray-500 font-medium">Category</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="font-bold text-gray-900 text-xl tracking-tight">{item.value}%</span>
                      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">of total</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Summary Card */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-orange-50/80 to-blue-50/80 border border-orange-100/50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Financial Health</p>
                    <p className="text-xs text-gray-500">Based on allocation</p>
                  </div>
                  <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-semibold tracking-wide">
                    BALANCED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCashFlowContent = () => (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 tracking-tight">Weekly Cash Flow</h3>
        <div className="h-72 rounded-2xl overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
              <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} className="text-sm text-gray-600" />
              <Bar dataKey="inflow" fill="#f47615" radius={[8, 8, 0, 0]} />
              <Bar dataKey="outflow" fill="#86dcf4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <Separator className="my-8 bg-gray-200" />
      
      {/* Income Stability */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 tracking-tight">Income Stability Trend</h3>
        <div className="h-48 rounded-2xl overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stabilityData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f7" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
              <Bar dataKey="stability" radius={[8, 8, 0, 0]}>
                {stabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#f47615" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderBehaviorContent = () => (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 tracking-tight">Financial Behavior Analysis</h3>
        <div className="space-y-6">
          {behaviorData.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl bg-gray-50/80 border border-gray-100">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-gray-800">{item.category}</span>
                <span className="text-sm font-semibold text-gray-600">{item.frequency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-blue-400 h-3 rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${item.frequency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="my-8 bg-gray-200" />
      
      <div className="bg-orange-50/80 rounded-3xl p-8 shadow-sm border border-orange-100">
        <h4 className="font-semibold text-orange-900 mb-4 text-lg tracking-tight">Behavioral Insights</h4>
        <ul className="text-sm text-orange-800 space-y-3">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            High UPI transaction frequency indicates digital adoption
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            Consistent savings pattern shows financial discipline
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            Regular bill payments demonstrate reliability
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex justify-center mb-10">
        <h1 className="text-2xl font-bold tracking-tight">
          <span style={{ color: '#f47615' }}>Bharat</span>
          <span style={{ color: '#86dcf4' }}>Ankh</span>
        </h1>
      </div>
      
      <h2 className="text-4xl font-bold mb-8 text-gray-900 tracking-tight">Analysis</h2>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
        <TabsList className="w-full bg-gray-100/90 backdrop-blur-xl rounded-3xl p-2 shadow-sm">
          <TabsTrigger 
            value="overview" 
            className="flex-1 font-medium rounded-2xl data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all duration-300"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="cashflow" 
            className="flex-1 font-medium rounded-2xl data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all duration-300"
          >
            Cash Flow
          </TabsTrigger>
          <TabsTrigger 
            value="behavior" 
            className="flex-1 font-medium rounded-2xl data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all duration-300"
          >
            Behavior
          </TabsTrigger>
        </TabsList>
        
        {/* Tab Content */}
        <div className="bg-white/90 backdrop-blur-xl shadow-sm rounded-3xl p-10 mt-8 border border-gray-100/50">
          {/* Score Section */}
          <div className="flex items-center mb-10 p-8 bg-gradient-to-r from-orange-50/80 to-blue-50/80 rounded-3xl border border-gray-100/50">
            <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-orange-400 to-blue-400 overflow-hidden mr-8 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl tracking-tight">
                {userData.name ? userData.name.charAt(0) : "U"}
              </span>
            </div>
            
            <div className="flex-1">
              <p className="text-gray-600 text-sm font-medium mb-3 tracking-wide">BHARATANKH SCORE</p>
              <div className="flex items-center">
                <h3 className="text-6xl font-bold mr-8 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                  {financialData.finScore}
                </h3>
                <span className="px-6 py-3 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-semibold shadow-sm tracking-wide">
                  {financialData.finScore > 75 ? "EXCELLENT" : "GOOD"}
                </span>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-200" />
          
          <TabsContent value="overview" className="mt-0">
            {renderOverviewContent()}
          </TabsContent>
          
          <TabsContent value="cashflow" className="mt-0">
            {renderCashFlowContent()}
          </TabsContent>
          
          <TabsContent value="behavior" className="mt-0">
            {renderBehaviorContent()}
          </TabsContent>
        </div>
      </Tabs>
      
      {/* Navigation Button */}
      <Button 
        variant="link" 
        onClick={() => navigate("/dashboard")} 
        className="mt-10 w-full font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200"
      >
        Back to Dashboard
      </Button>
    </PageContainer>
  );
};

export default Analysis;
