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
  const renderOverviewContent = () => <div>
      {/* Income & Expenses Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Income & Expenses</h3>
        <div className="h-64">
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
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} width={60} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => [`₹${value}`, name === "income" ? "Income" : "Expenses"]} />} />
              <Line type="monotone" dataKey="income" stroke="#f47615" strokeWidth={2.5} dot={{
              r: 4
            }} activeDot={{
              r: 6
            }} />
              <Line type="monotone" dataKey="expenses" stroke="#805AD5" strokeWidth={2.5} dot={{
              r: 4
            }} activeDot={{
              r: 6
            }} />
            </LineChart>
          </ChartContainer>
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
                <Pie data={spendingData} cx="50%" cy="50%" labelLine={false} outerRadius={60} fill="#8884d8" dataKey="value">
                  {spendingData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="space-y-2">
            {spendingData.map((item, index) => <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-sm mr-2" style={{
                backgroundColor: item.color
              }}></div>
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
  const renderCashFlowContent = () => <div>
      <h3 className="text-lg font-semibold mb-3">Weekly Cash Flow</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashFlowData} margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 10
        }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${(value / 1000).toFixed(0)}k`} />
            <Bar dataKey="inflow" fill="#f47615" radius={[4, 4, 0, 0]} />
            <Bar dataKey="outflow" fill="#86dcf4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <Separator className="my-4" />
      
      {/* Income Stability */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Income Stability Trend</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stabilityData} margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <Bar dataKey="stability" radius={[4, 4, 0, 0]}>
                {stabilityData.map((entry, index) => <Cell key={`cell-${index}`} fill="#f47615" />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>;
  const renderBehaviorContent = () => <div>
      <h3 className="text-lg font-semibold mb-3">Financial Behavior Analysis</h3>
      <div className="space-y-4">
        {behaviorData.map((item, index) => <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{item.category}</span>
              <span className="text-sm text-gray-600">{item.frequency}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-blue-400 h-2 rounded-full transition-all duration-500" style={{
            width: `${item.frequency}%`
          }}></div>
            </div>
          </div>)}
      </div>
      
      <Separator className="my-4" />
      
      <div className="bg-orange-50 p-4 rounded-lg">
        <h4 className="font-semibold text-orange-800 mb-2">Behavioral Insights</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• High UPI transaction frequency indicates digital adoption</li>
          <li>• Consistent savings pattern shows financial discipline</li>
          <li>• Regular bill payments demonstrate reliability</li>
        </ul>
      </div>
    </div>;
  return <PageContainer>
      {/* Header */}
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold">
          <span style={{
          color: '#f47615'
        }}>Bharat</span>
          <span style={{
          color: '#86dcf4'
        }}>Ankh</span>
        </h1>
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Analysis</h2>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full bg-gray-100">
          <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Cash Flow
          </TabsTrigger>
          <TabsTrigger value="behavior" className="flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Behavior
          </TabsTrigger>
        </TabsList>
        
        {/* Tab Content */}
        <div className="bg-white shadow-lg p-6 animate-fade-in mt-4 rounded-xl">
          {/* Score Section */}
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-blue-400 overflow-hidden mr-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {userData.name ? userData.name.charAt(0) : "U"}
              </span>
            </div>
            
            <div className="flex-1">
              <p className="text-gray-600 text-sm mb-1">BharatAnkh Score</p>
              <div className="flex items-center">
                <h3 className="text-4xl font-bold mr-4">{financialData.finScore}</h3>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                  {financialData.finScore > 75 ? "EXCELLENT" : "GOOD"}
                </span>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
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
      <Button variant="link" onClick={() => navigate("/dashboard")} className="mt-6 w-full">
        Back to Dashboard
      </Button>
    </PageContainer>;
};
export default Analysis;