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
  const {
    userData,
    financialData
  } = useApp();
  const [activeTab, setActiveTab] = useState("overview");

  // Income & Expenses Data
  const incomeExpensesData = [{
    name: "Apr",
    income: 35000,
    expenses: 20000
  }, {
    name: "May",
    income: 42000,
    expenses: 25000
  }, {
    name: "Jun",
    income: 38000,
    expenses: 23000
  }, {
    name: "Jul",
    income: 48000,
    expenses: 27000
  }, {
    name: "Aug",
    income: 58000,
    expenses: 32000
  }];

  // Income Stability Data
  const stabilityData = [{
    month: "Apr",
    stability: 68
  }, {
    month: "May",
    stability: 72
  }, {
    month: "Jun",
    stability: 78
  }, {
    month: "Jul",
    stability: 86
  }, {
    month: "Aug",
    stability: 92
  }];

  // Spending Breakdown Data
  const spendingData = [{
    name: "Housing",
    value: 30,
    color: "#f47615"
  }, {
    name: "Savings",
    value: 25,
    color: "#48BB78"
  }, {
    name: "Expenses",
    value: 25,
    color: "#805AD5"
  }, {
    name: "Other",
    value: 20,
    color: "#86dcf4"
  }];

  // Cash Flow Data
  const cashFlowData = [{
    name: "Week 1",
    inflow: 8000,
    outflow: 5000
  }, {
    name: "Week 2",
    inflow: 12000,
    outflow: 7000
  }, {
    name: "Week 3",
    inflow: 15000,
    outflow: 8000
  }, {
    name: "Week 4",
    inflow: 18000,
    outflow: 9000
  }];

  // Behavior Data
  const behaviorData = [{
    category: "UPI Transactions",
    frequency: 95
  }, {
    category: "Digital Payments",
    frequency: 88
  }, {
    category: "Savings Rate",
    frequency: 75
  }, {
    category: "Bill Payments",
    frequency: 92
  }];
  const renderOverviewContent = () => <div className="space-y-8">
      {/* Income & Expenses Chart */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-heading font-semibold mb-4 text-gray-800">Income & Expenses</h3>
        <div className="h-64 rounded-xl overflow-hidden">
          <ChartContainer config={{
          income: {
            color: "#f47615"
          },
          expenses: {
            color: "#805AD5"
          }
        }}>
            <LineChart data={incomeExpensesData} margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10
          }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-sm font-body" />
              <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} width={60} className="text-sm font-body" />
              <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => [`₹${value}`, name === "income" ? "Income" : "Expenses"]} />} />
              <Line type="monotone" dataKey="income" stroke="#f47615" strokeWidth={3} dot={{
              r: 5
            }} activeDot={{
              r: 7
            }} />
              <Line type="monotone" dataKey="expenses" stroke="#805AD5" strokeWidth={3} dot={{
              r: 5
            }} activeDot={{
              r: 7
            }} />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      {/* Spending Breakdown */}
      <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-heading font-semibold mb-4 text-gray-800">Spending Breakdown</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={spendingData} cx="50%" cy="50%" labelLine={false} outerRadius={70} fill="#8884d8" dataKey="value">
                  {spendingData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="space-y-3 flex flex-col justify-center">
            {spendingData.map((item, index) => <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-3 shadow-sm" style={{
                backgroundColor: item.color
              }}></div>
                  <span className="font-body font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="font-heading font-semibold text-lg text-gray-800">{item.value}%</span>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
  const renderCashFlowContent = () => <div className="space-y-8">
      <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-heading font-semibold mb-4 text-gray-800">Weekly Cash Flow</h3>
        <div className="h-64 rounded-xl overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData} margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10
          }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-sm font-body" />
              <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} className="text-sm font-body" />
              <Bar dataKey="inflow" fill="#f47615" radius={[6, 6, 0, 0]} />
              <Bar dataKey="outflow" fill="#86dcf4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      {/* Income Stability */}
      <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-heading font-semibold mb-4 text-gray-800">Income Stability Trend</h3>
        <div className="h-40 rounded-xl overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stabilityData} margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-sm font-body" />
              <Bar dataKey="stability" radius={[6, 6, 0, 0]}>
                {stabilityData.map((entry, index) => <Cell key={`cell-${index}`} fill="#f47615" />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>;
  const renderBehaviorContent = () => <div className="space-y-8">
      <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-heading font-semibold mb-4 text-gray-800">Financial Behavior Analysis</h3>
        <div className="space-y-5">
          {behaviorData.map((item, index) => <div key={index} className="p-4 rounded-xl bg-white/70 border border-gray-100">
              <div className="flex justify-between mb-3">
                <span className="font-body font-medium text-gray-700">{item.category}</span>
                <span className="text-sm font-heading font-semibold text-gray-600">{item.frequency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-blue-400 h-3 rounded-full transition-all duration-700 ease-out" style={{
              width: `${item.frequency}%`
            }}></div>
              </div>
            </div>)}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 shadow-lg border border-orange-200">
        <h4 className="font-heading font-semibold text-orange-800 mb-3 text-lg">Behavioral Insights</h4>
        <ul className="text-sm font-body text-orange-700 space-y-2">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            High UPI transaction frequency indicates digital adoption
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Consistent savings pattern shows financial discipline
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Regular bill payments demonstrate reliability
          </li>
        </ul>
      </div>
    </div>;
  return <PageContainer>
      {/* Header */}
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl font-heading font-bold">
          <span style={{
          color: '#f47615'
        }}>Bharat</span>
          <span style={{
          color: '#86dcf4'
        }}>Ankh</span>
        </h1>
      </div>
      
      <h2 className="text-3xl font-heading font-bold mb-6 text-gray-800">Analysis</h2>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
          <TabsTrigger value="overview" className="flex-1 font-body font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
            Overview
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex-1 font-body font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
            Cash Flow
          </TabsTrigger>
          <TabsTrigger value="behavior" className="flex-1 font-body font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
            Behavior
          </TabsTrigger>
        </TabsList>
        
        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 mt-6 border border-gray-200">
          {/* Score Section */}
          <div className="flex items-center mb-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl border border-gray-100">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-400 to-blue-400 overflow-hidden mr-6 flex items-center justify-center shadow-lg">
              <span className="text-white font-heading font-bold text-2xl">
                {userData.name ? userData.name.charAt(0) : "U"}
              </span>
            </div>
            
            <div className="flex-1">
              <p className="text-gray-600 text-sm font-body mb-2">BharatAnkh Score</p>
              <div className="flex items-center">
                <h3 className="text-5xl font-heading font-bold mr-6 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">{financialData.finScore}</h3>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-heading font-semibold shadow-sm">
                  {financialData.finScore > 75 ? "EXCELLENT" : "GOOD"}
                </span>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
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
      <Button variant="link" onClick={() => navigate("/dashboard")} className="mt-8 w-full font-body font-medium text-gray-600 hover:text-orange-600 transition-colors">
        Back to Dashboard
      </Button>
    </PageContainer>;
};

export default Analysis;
