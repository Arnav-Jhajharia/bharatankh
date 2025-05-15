
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import PageContainer from "@/components/PageContainer";
import FinancialInsightBar from "@/components/FinancialInsightBar";
import { useApp } from "@/context/AppContext";
import { PiggyBank, HandCoins, CircleDollarSign, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";

const ExplainableFinance = () => {
  const navigate = useNavigate();
  const { userData, financialData } = useApp();
  const [openItems, setOpenItems] = useState<string[]>(["item-3"]);

  // Sample monthly spending data for visualization
  const spendingData = [
    { name: 'Jan', amount: 1800 },
    { name: 'Feb', amount: 2200 },
    { name: 'Mar', amount: 1900 },
    { name: 'Apr', amount: 2700 },
    { name: 'May', amount: 1500 },
    { name: 'Jun', amount: 2300 },
  ];

  // Sample income data showing the drop in April
  const incomeData = [
    { name: 'Jan', amount: 3500 },
    { name: 'Feb', amount: 3500 },
    { name: 'Mar', amount: 3500 },
    { name: 'Apr', amount: 2870 }, // 18% drop
    { name: 'May', amount: 3200 },
    { name: 'Jun', amount: 3500 },
  ];

  // Financial insights data for the explainable section
  const financialInsights = [
    {
      title: "Boost Your Buffer",
      description: "Save at least 10% of weekly earnings to reduce score volatility.",
      icon: <PiggyBank className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Tame Big Spends",
      description: "Split high-value purchases or avoid spikes near rent week.",
      icon: <HandCoins className="h-6 w-6 text-teal-500" />,
      color: "bg-teal-50 border-teal-200"
    },
    {
      title: "Smooth Your Inflows",
      description: "More frequent income sources lead to a stabler score.",
      icon: <CircleDollarSign className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50 border-blue-200"
    }
  ];
  
  // Strengths and weaknesses for financial profile
  const strengths = [
    {
      id: "strength-1",
      title: "Consistent income from multiple sources",
      description: "You have 3 income streams that provide stable monthly cash flow, reducing the risk of income disruption."
    }
  ];
  
  const weaknesses = [
    {
      id: "weakness-1",
      title: "Income stability below threshold in April",
      description: "Your income dropped by 18% in April, which increased your financial volatility score. Try to maintain more consistent income patterns."
    },
    {
      id: "weakness-2",
      title: "High variance in monthly spending patterns",
      description: "Your spending varies significantly month to month, which affects your financial stability. Aim for more consistent spending habits."
    }
  ];
  
  const isItemOpen = (id: string) => openItems.includes(id);
  
  const toggleItem = (id: string) => {
    if (isItemOpen(id)) {
      setOpenItems(openItems.filter(item => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  // Chart config for styling
  const chartConfig = {
    expense: {
      label: "Expenses",
      theme: {
        light: "#ef4444", // Red color for expenses
      }
    },
    income: {
      label: "Income",
      theme: {
        light: "#22c55e", // Green color for income
      }
    }
  };

  return (
    <PageContainer>
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      {/* Financial Insights Card with White Background */}
      <Card className="w-full shadow-lg animate-fade-in mb-6 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Financial Insights Explained</CardTitle>
          <CardDescription>
            Understanding your financial profile
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Financial Health Score */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Financial Health</h3>
              <span className="text-lg font-bold">{financialData.finScore * 9}/900</span>
            </div>
            
            <FinancialInsightBar score={financialData.finScore} className="mb-6" />
            
            <div className="space-y-4">
              {/* Strengths and Weaknesses as Collapsible Sections */}
              <div className="space-y-3">
                {/* Strength - Collapsed */}
                <div className={`border rounded-md ${isItemOpen('item-1') ? 'border-green-500' : 'border-green-200'}`}>
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer bg-green-50 rounded-t-md"
                    onClick={() => toggleItem('item-1')}
                  >
                    <div className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium text-green-700">
                        {strengths[0].title}
                      </h4>
                    </div>
                    {isItemOpen('item-1') ? (
                      <ChevronUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  
                  {isItemOpen('item-1') && (
                    <div className="p-4 bg-white rounded-b-md">
                      <p className="text-sm text-gray-700 mb-4">
                        {strengths[0].description}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* First Weakness - Collapsed */}
                <div className={`border rounded-md ${isItemOpen('item-2') ? 'border-red-500' : 'border-red-200'}`}>
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer bg-red-50 rounded-t-md"
                    onClick={() => toggleItem('item-2')}
                  >
                    <div className="flex items-center gap-2">
                      <ArrowDown className="h-4 w-4 text-red-600" />
                      <h4 className="font-medium text-red-700">
                        {weaknesses[0].title}
                      </h4>
                    </div>
                    {isItemOpen('item-2') ? (
                      <ChevronUp className="h-5 w-5 text-red-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  
                  {isItemOpen('item-2') && (
                    <div className="p-4 bg-white rounded-b-md">
                      <p className="text-sm text-gray-700 mb-4">
                        {weaknesses[0].description}
                      </p>
                      
                      {/* Income Chart for April Drop */}
                      <div className="mt-4 border border-gray-100 rounded-lg p-4 bg-gray-50">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Income Stability (Last 6 Months)</h5>
                        <div className="h-64 w-full">
                          <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={incomeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="amount" name="income" stroke="#22c55e" strokeWidth={2} dot={{ strokeWidth: 2 }} />
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<ChartTooltipContent />} />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">The 18% drop in April increased your financial volatility</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Second Weakness - Expanded by default */}
                <div className={`border rounded-md ${isItemOpen('item-3') ? 'border-red-500' : 'border-red-200'}`}>
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer bg-red-50 rounded-t-md"
                    onClick={() => toggleItem('item-3')}
                  >
                    <div className="flex items-center gap-2">
                      <ArrowDown className="h-4 w-4 text-red-600" />
                      <h4 className="font-medium text-red-700">
                        {weaknesses[1].title}
                      </h4>
                    </div>
                    {isItemOpen('item-3') ? (
                      <ChevronUp className="h-5 w-5 text-red-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  
                  {isItemOpen('item-3') && (
                    <div className="p-4 bg-white rounded-b-md">
                      <p className="text-sm text-gray-700 mb-4">
                        {weaknesses[1].description}
                      </p>
                      
                      {/* Monthly Spending Chart */}
                      <div className="mt-4 border border-gray-100 rounded-lg p-4 bg-gray-50">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Monthly Spending Variance</h5>
                        <div className="h-64 w-full">
                          <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={spendingData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="amount" name="expense" stroke="#ef4444" strokeWidth={2} dot={{ strokeWidth: 2 }} />
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<ChartTooltipContent />} />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">Your monthly spending has high variance which impacts stability</p>
                      </div>
                      
                      {/* Spending Comparison Card */}
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Monthly Spending Comparison</h5>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-xs">Optimal Variance</span>
                          </div>
                          <span className="text-xs font-medium">±10%</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-xs">Moderate Variance</span>
                          </div>
                          <span className="text-xs font-medium">±20%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-xs">Your Variance</span>
                          </div>
                          <span className="text-xs font-medium">±44%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Insights/Suggestions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Personalized Suggestions</h3>
            <div className="space-y-3">
              {financialInsights.map((insight, index) => (
                <Card key={index} className={`border ${insight.color} shadow-none`}>
                  <CardContent className="p-3 flex items-start">
                    <div className="mr-3 mt-1 bg-slate-100 rounded-full p-2">
                      {insight.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-base text-gray-800">{insight.title}</h4>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => navigate("/analysis")}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            View Full Analysis
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button
          variant="outline"
          onClick={() => navigate("/passport")}
          className="flex-1"
        >
          Back to Passport
        </Button>
        
        <Button
          onClick={() => navigate("/dashboard")}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Dashboard
        </Button>
      </div>
    </PageContainer>
  );
};

export default ExplainableFinance;
