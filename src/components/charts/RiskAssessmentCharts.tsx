
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RiskChartProps {
  riskFactor: {
    factor: string;
    severity: string;
    description: string;
    confidence: number;
    details: {
      metrics: Record<string, number>;
      trends: Array<{ date: string; value: number }>;
    };
  };
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

export const IncomeVolatilityChart = ({ riskFactor }: RiskChartProps) => {
  const chartConfig = {
    value: {
      label: "Income Variation (%)",
      color: "#ff6b6b",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Income Volatility Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskFactor.details.trends}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#ff6b6b" 
                strokeWidth={2}
                dot={{ fill: '#ff6b6b' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Risk Level:</strong> {riskFactor.severity}
          </p>
          <p className="text-sm text-red-700 mt-2">{riskFactor.description}</p>
          <p className="text-xs text-red-600 mt-1">
            Confidence: {(riskFactor.confidence * 100).toFixed(1)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const SavingsRateChart = ({ riskFactor }: RiskChartProps) => {
  const savingsData = Object.entries(riskFactor.details.metrics).map(([key, value]) => ({
    category: key,
    value: value,
  }));

  const chartConfig = {
    value: {
      label: "Amount (₹)",
      color: "#4ade80",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Savings Rate Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsData}>
              <XAxis dataKey="category" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Risk Level:</strong> {riskFactor.severity}
          </p>
          <p className="text-sm text-red-700 mt-2">{riskFactor.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const IncomeDiversificationChart = ({ riskFactor }: RiskChartProps) => {
  const diversificationData = Object.entries(riskFactor.details.metrics).map(([key, value], index) => ({
    name: key,
    value: value,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Income Source Diversification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={diversificationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {diversificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Risk Level:</strong> {riskFactor.severity}
          </p>
          <p className="text-sm text-red-700 mt-2">{riskFactor.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const RiskAssessmentChartsContainer = ({ riskFactor }: RiskChartProps) => {
  const renderChart = () => {
    switch (riskFactor.factor) {
      case 'Income Volatility':
        return <IncomeVolatilityChart riskFactor={riskFactor} />;
      case 'Low Savings Rate':
        return <SavingsRateChart riskFactor={riskFactor} />;
      case 'Single Sector Dependency':
        return <IncomeDiversificationChart riskFactor={riskFactor} />;
      default:
        return <IncomeVolatilityChart riskFactor={riskFactor} />;
    }
  };

  return renderChart();
};
