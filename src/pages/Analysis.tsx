import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  // Enhanced Technical Spending Analysis Data
  const spendingData = [
    { name: "Working Capital", value: 32, color: "#f47615", amount: "₹18,560" },
    { name: "Asset Investment", value: 28, color: "#48BB78", amount: "₹16,240" },
    { name: "Operational Expenses", value: 22, color: "#805AD5", amount: "₹12,760" },
    { name: "Risk Buffer", value: 18, color: "#399EE6", amount: "₹10,440" }
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
    <div className="space-y-8">
      {/* Income & Expenses Chart */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 font-body">Income & Expenses</h3>
        <div className="h-72 rounded-2xl overflow-hidden">
          <ChartContainer config={{
            income: { color: "#f47615" },
            expenses: { color: "#805AD5" }
          }}>
            <LineChart data={incomeExpensesData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
              <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} width={60} className="text-sm text-gray-600" />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  formatter={(value, name) => [
                    <div key={name} className="flex items-center gap-2">
                      <Badge 
                        variant={name === "income" ? "default" : "secondary"}
                        className={name === "income" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-purple-500 hover:bg-purple-600 text-white"}
                      >
                        {name === "income" ? "Income" : "Expenses"}
                      </Badge>
                      <span className="font-medium">₹{value}</span>
                    </div>
                  ]} 
                />} 
              />
              <Line type="monotone" dataKey="income" stroke="#f47615" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" stroke="#805AD5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
      
      <Separator className="my-8 bg-gray-200" />
      
      {/* Enhanced Financial Portfolio Analysis */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <h3 className="text-xl font-semibold text-gray-900 font-body mb-2">Financial Portfolio Analysis</h3>
          <p className="text-sm text-gray-500 font-body">Capital allocation & risk distribution model</p>
        </div>
        
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Pie Chart with fixed container */}
            <div className="flex justify-center items-center">
              <div className="w-80 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={spendingData} 
                      cx="50%" 
                      cy="50%" 
                      labelLine={false} 
                      outerRadius={100}
                      innerRadius={35}
                      fill="#8884d8" 
                      dataKey="value"
                      strokeWidth={2}
                      stroke="#fff"
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Enhanced Legend with technical metrics */}
            <div className="space-y-3">
              {spendingData.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-gray-50/60 hover:bg-gray-100/80 border border-gray-100/60 hover:border-gray-200/60 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div>
                        <span className="font-semibold text-gray-800 text-sm font-body">{item.name}</span>
                        <div className="text-xs text-gray-500 font-body">{item.amount}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-900 text-lg font-body">{item.value}%</span>
                      <span className="text-xs text-gray-500 font-body">of portfolio</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Enhanced Summary Card */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-50/80 to-brand-blue/10 border border-orange-100/50">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 font-body mb-1">Portfolio Health Score</p>
                      <p className="text-xs text-gray-500 font-body">Risk-adjusted performance metric</p>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold font-body">
                      OPTIMAL
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 font-body">Risk Score: <span className="font-semibold text-green-600">Low (2.3)</span></span>
                    <span className="text-gray-600 font-body">Liquidity: <span className="font-semibold text-brand-blue">High (87%)</span></span>
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
    <div className="space-y-8">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 font-body">Weekly Cash Flow</h3>
        <div className="h-72 rounded-2xl overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-sm text-gray-600" />
              <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} className="text-sm text-gray-600" />
              <Bar dataKey="inflow" fill="#f47615" radius={[8, 8, 0, 0]} />
              <Bar dataKey="outflow" fill="#399EE6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <Separator className="my-8 bg-gray-200" />
      
      {/* Income Stability */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 font-body">Income Stability Trend</h3>
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
    <div className="space-y-8">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100/50">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 font-body">Financial Behavior Analysis</h3>
        <div className="space-y-4">
          {behaviorData.map((item, index) => (
            <div key={index} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100">
              <div className="flex justify-between mb-3">
                <span className="font-medium text-gray-800 font-body">{item.category}</span>
                <span className="text-sm font-semibold text-gray-600 font-body">{item.frequency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-brand-blue h-3 rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${item.frequency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="my-8 bg-gray-200" />
      
      <div className="bg-orange-50/80 rounded-3xl p-6 shadow-sm border border-orange-100">
        <h4 className="font-semibold text-orange-900 mb-4 text-lg font-body">Behavioral Insights</h4>
        <ul className="text-sm text-orange-800 space-y-3 font-body">
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
    <div className="min-h-screen bg-gray-50/50 px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-center mb-10">
        <h1 className="text-2xl font-heading">
          <span style={{ color: '#399EE6' }}>Bharat</span>
          <span style={{ color: '#f47615' }} className="font-bold">Ankh</span>
        </h1>
      </div>
      
      <h2 className="text-4xl font-bold mb-8 text-gray-900 font-heading">Analysis</h2>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
        <TabsList className="w-full bg-gray-100/90 backdrop-blur-xl rounded-3xl p-2 shadow-sm">
          <TabsTrigger 
            value="overview" 
            className="flex-1 font-medium rounded-2xl data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all duration-300 font-body"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="cashflow" 
            className="flex-1 font-medium rounded-2xl data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all duration-300 font-body"
          >
            Cash Flow
          </TabsTrigger>
          <TabsTrigger 
            value="behavior" 
            className="flex-1 font-medium rounded-2xl data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all duration-300 font-body"
          >
            Behavior
          </TabsTrigger>
        </TabsList>
        
        {/* Tab Content */}
        <div className="bg-white/90 backdrop-blur-xl shadow-sm rounded-3xl p-8 mt-8 border border-gray-100/50">
          {/* Score Section */}
          <div className="flex items-center mb-10 p-6 bg-gradient-to-r from-orange-50/80 to-brand-blue/10 rounded-3xl border border-gray-100/50">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-orange-400 to-brand-blue overflow-hidden mr-6 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl font-heading">
                {userData.name ? userData.name.charAt(0) : "U"}
              </span>
            </div>
            
            <div className="flex-1">
              <p className="text-gray-600 text-sm font-medium mb-3 font-body">BHARATANKH SCORE</p>
              <div className="flex items-center">
                <h3 className="text-5xl font-bold mr-6 bg-gradient-to-r from-orange-600 to-brand-blue bg-clip-text text-transparent font-heading">
                  {financialData.finScore}
                </h3>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-semibold shadow-sm font-body">
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
        className="mt-10 w-full font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200 font-body"
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default Analysis;
