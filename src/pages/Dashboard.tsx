
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import PageContainer from "@/components/PageContainer";
import ProgressBar from "@/components/ProgressBar";
import { useApp } from "@/context/AppContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, financialData } = useApp();
  
  // Format expenses data for the pie chart
  const expenseData = financialData.expenses.map((expense) => ({
    name: expense.category,
    value: expense.amount,
  }));

  return (
    <PageContainer>
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">
          Hi, {userData.name.split(" ")[0]} — Here's your Financial Overview
        </h2>
        <p className="text-gray-500">Track your earnings and financial health</p>
      </div>
      
      {/* Earnings Summary */}
      <Card className="w-full shadow-md mb-6 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Earnings Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <p className="text-xl font-bold">
              You earn ₹{financialData.monthlyIncome.toLocaleString()}/month through UPI.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-500">Breakdown:</p>
            {financialData.incomeBreakdown.map((income, index) => (
              <div key={index} className="flex justify-between">
                <span>{income.source}</span>
                <span className="font-semibold">₹{income.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Expense Summary */}
      <Card className="w-full shadow-md mb-6 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Expense Summary</CardTitle>
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
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
              <div key={index} className="flex justify-between">
                <span style={{ color: COLORS[index % COLORS.length] }}>
                  {expense.category}
                </span>
                <span className="font-semibold">₹{expense.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* FinScore */}
      <Card className="w-full shadow-md mb-6 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">FinScore</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <div className="font-semibold">Score: {financialData.finScore}/100</div>
              <div className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs">
                Trusted
              </div>
            </div>
            <ProgressBar value={financialData.finScore} max={100} />
          </div>
          <p className="text-gray-500 text-sm">
            High income consistency, good savings buffer, and on-time bill payments.
          </p>
          <div className="mt-3">
            <Button 
              onClick={() => navigate("/simulator")} 
              variant="outline" 
              className="w-full text-accent hover:bg-accent/10"
              size="sm"
            >
              Try Financial Behavior Simulator
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Score Insights */}
      <Card className="w-full shadow-md mb-6 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Score Insights / Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <div className="h-5 w-5 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent">
                ✓
              </div>
              <span>Maintain ₹2,000 minimum balance</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="h-5 w-5 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent">
                ✓
              </div>
              <span>Link second bank account</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="h-5 w-5 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent">
                ✓
              </div>
              <span>Add mobile bill payment</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex space-x-4">
        <Button
          onClick={() => navigate("/passport")}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          View My Financial Passport
        </Button>
        <Button
          onClick={() => navigate("/offers")}
          variant="outline"
          className="flex-1"
        >
          View Offers
        </Button>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
