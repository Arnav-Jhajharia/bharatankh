
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
    <Card className="institutional-card risk-assessment-card">
      <CardHeader>
        <CardTitle className="risk-title">
          <AlertTriangle className="risk-icon" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="institutional-card-content">
        <div className="risk-factors-container">
          {riskFactors.map((risk, index) => {
            const enhancedRisk = enhanceRiskWithMockData(risk);
            const isExpanded = expandedRisk === risk.factor;
            
            return (
              <div key={index} className="risk-factor-item">
                <div 
                  className="risk-factor-header"
                  onClick={() => toggleRiskDetails(risk.factor)}
                >
                  <div className="risk-factor-content">
                    {risk.severity === "High" ? (
                      <TrendingDown className="risk-severity-icon high" />
                    ) : (
                      <TrendingUp className="risk-severity-icon medium" />
                    )}
                    <div className="risk-factor-details">
                      <p className="risk-factor-name">{risk.factor}</p>
                      <p className="risk-factor-description">{risk.description}</p>
                    </div>
                  </div>
                  <div className="risk-factor-actions">
                    <span className={`risk-severity-badge ${risk.severity.toLowerCase()}`}>
                      {risk.severity}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="expand-icon" />
                    ) : (
                      <ChevronDown className="expand-icon" />
                    )}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="risk-details-expanded">
                    <RiskAssessmentChartsContainer riskFactor={enhancedRisk} />
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
