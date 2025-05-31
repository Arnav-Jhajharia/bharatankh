import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import PageContainer from "@/components/PageContainer";
import ProgressBar from "@/components/ProgressBar";
import { useApp } from "@/context/AppContext";

const COLORS = ["#f47615", "#86dcf4", "#48BB78", "#805AD5", "#F6AD55"];

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    userData,
    financialData
  } = useApp();

  // Format expenses data for the pie chart
  const expenseData = financialData.expenses.map(expense => ({
    name: expense.category,
    value: expense.amount
  }));

  // Get score level based on score
  const getScoreLevel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };
  const scoreLevel = getScoreLevel(financialData.finScore);

  return (
    <PageContainer>
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold font-heading">
          <span className="text-brand-blue">Bharat</span>
          <span className="text-primary">Ankh</span>
        </h1>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1 font-heading">
          Welcome, {userData.name.split(" ")[0]} — Here's your Financial Overview
        </h2>
        <p className="text-gray-500 font-body">Track your UPI earnings and financial health</p>
      </div>
      
      {/* Earnings Summary */}
      <Card className="w-full shadow-lg mb-6 animate-fade-in rounded-3xl border-0 bg-gradient-to-br from-white to-orange-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-heading">UPI Earnings Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <p className="text-xl font-bold font-body">
              You earn ₹{financialData.monthlyIncome.toLocaleString('en-IN')}/month through UPI.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-500 font-body">Income Sources:</p>
            {financialData.incomeBreakdown.map((income, index) => (
              <div key={index} className="flex justify-between p-3 rounded-2xl bg-white/50 backdrop-blur-sm">
                <span className="font-body">{income.source}</span>
                <span className="font-semibold font-body">₹{income.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Expense Summary */}
      <Card className="w-full shadow-lg mb-6 animate-fade-in rounded-3xl border-0 bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-heading">Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={expenseData} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  fill="#8884d8" 
                  dataKey="value" 
                  nameKey="name" 
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {financialData.expenses.map((expense, index) => (
              <div key={index} className="flex justify-between p-3 rounded-2xl bg-white/50 backdrop-blur-sm">
                <span style={{ color: COLORS[index % COLORS.length] }} className="font-body">
                  {expense.category}
                </span>
                <span className="font-semibold font-body">₹{expense.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* BharatAnkh Score */}
      <Card className="w-full shadow-lg mb-6 animate-fade-in rounded-3xl border-0 bg-gradient-to-br from-white to-green-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-heading">BharatAnkh Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <div className="font-semibold font-body">Score: {financialData.finScore}/100</div>
              <div className={`px-4 py-2 rounded-full text-xs font-body ${
                scoreLevel === 'Excellent' ? 'bg-green-100 text-green-700' : 
                scoreLevel === 'Good' ? 'bg-orange-100 text-orange-600' : 
                scoreLevel === 'Fair' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-red-100 text-red-600'
              }`}>
                {scoreLevel}
              </div>
            </div>
            <ProgressBar value={financialData.finScore} max={100} />
          </div>
          <p className="text-gray-500 text-sm font-body">
            {scoreLevel === 'Excellent' ? 'Outstanding financial profile with excellent earning consistency.' : 
             scoreLevel === 'Good' ? 'Strong financial profile with good earning patterns.' : 
             scoreLevel === 'Fair' ? 'Decent financial profile with room for improvement.' : 
             'Financial profile needs attention and improvement.'}
          </p>
        </CardContent>
      </Card>
      
      {/* Qualitative Score Insights */}
      <Card className="w-full shadow-lg mb-6 animate-fade-in rounded-3xl border-0 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-heading">Score Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialData.scoreInsights.map((insight, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold font-heading">{insight.category}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-body ${
                    insight.level === 'Excellent' ? 'bg-green-100 text-green-700' : 
                    insight.level === 'Good' ? 'bg-blue-100 text-blue-700' : 
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {insight.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2 font-body">{insight.description}</p>
                <ul className="text-xs text-gray-500 space-y-1 font-body">
                  {insight.suggestions.map((suggestion, idx) => (
                    <li key={idx}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex space-x-4">
        <Button 
          onClick={() => navigate("/passport")} 
          className="flex-1 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90 font-body"
        >
          View Financial Passport
        </Button>
        <Button 
          onClick={() => navigate("/analysis")} 
          variant="outline" 
          className="flex-1 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 ease-in-out rounded-2xl shadow-lg hover:shadow-xl text-brand-blue border-brand-blue bg-blue-50 font-body"
        >
          View Analysis
        </Button>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
