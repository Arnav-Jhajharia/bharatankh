
import { useState } from "react";
import { AlertTriangle, TrendingDown, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskAssessmentChartsContainer } from "@/components/charts/RiskAssessmentCharts";

interface RiskFactor {
  factor: string;
  severity: string;
  description: string;
  confidence?: number;
  details?: {
    metrics: Record<string, number>;
    trends: Array<{ date: string; value: number }>;
  };
}

interface RiskAssessmentCardProps {
  riskFactors: RiskFactor[];
}

export const RiskAssessmentCard = ({ riskFactors }: RiskAssessmentCardProps) => {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  const toggleRiskDetails = (riskFactor: string) => {
    setExpandedRisk(expandedRisk === riskFactor ? null : riskFactor);
  };

  const enhanceRiskWithMockData = (risk: RiskFactor) => ({
    ...risk,
    confidence: risk.confidence || Math.random() * 0.3 + 0.7,
    details: risk.details || {
      metrics: {
        'Current Month': Math.floor(Math.random() * 50000) + 10000,
        'Previous Month': Math.floor(Math.random() * 50000) + 10000,
        'Average': Math.floor(Math.random() * 50000) + 10000,
      },
      trends: Array.from({ length: 6 }, (_, i) => ({
        date: new Date(2024, i, 1).toISOString().substring(0, 7),
        value: Math.floor(Math.random() * 100) + 20,
      })),
    },
  });

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
          <div className="p-3 bg-red-100 rounded-2xl">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {riskFactors.map((risk, index) => {
            const enhancedRisk = enhanceRiskWithMockData(risk);
            const isExpanded = expandedRisk === risk.factor;
            
            return (
              <div key={index} className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200/50">
                <div 
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100/50 transition-colors duration-200"
                  onClick={() => toggleRiskDetails(risk.factor)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {risk.severity === "High" ? (
                      <div className="p-2 bg-red-100 rounded-xl">
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-amber-100 rounded-xl">
                        <TrendingUp className="h-5 w-5 text-amber-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{risk.factor}</h3>
                      <p className="text-gray-600 mt-1">{risk.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      risk.severity === "High" 
                        ? "bg-red-100 text-red-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {risk.severity}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-200/50 bg-white/50">
                    <div className="pt-6">
                      <RiskAssessmentChartsContainer riskFactor={enhancedRisk} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
