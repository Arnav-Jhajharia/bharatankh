
import { createContext, useContext, useState, ReactNode } from "react";

export type UserData = {
  name: string;
  aadhaar: string;
  dob: Date | null;
  isVerified: boolean;
  bankLinked: boolean;
  bankName: string;
  language: string;
};

export type FinancialData = {
  monthlyIncome: number;
  incomeBreakdown: {
    source: string;
    amount: number;
  }[];
  expenses: {
    category: string;
    amount: number;
  }[];
  finScore: number;
  riskProfile: string;
  tags: string[];
  scoreInsights: {
    category: string;
    level: string;
    description: string;
    suggestions: string[];
  }[];
};

interface AppContextType {
  userData: UserData;
  financialData: FinancialData;
  updateUserData: (data: Partial<UserData>) => void;
  updateFinancialData: (data: Partial<FinancialData>) => void;
  generateMockData: () => void;
}

const defaultUserData: UserData = {
  name: "",
  aadhaar: "",
  dob: null,
  isVerified: false,
  bankLinked: false,
  bankName: "",
  language: "en",
};

const defaultFinancialData: FinancialData = {
  monthlyIncome: 0,
  incomeBreakdown: [],
  expenses: [],
  finScore: 0,
  riskProfile: "",
  tags: [],
  scoreInsights: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [financialData, setFinancialData] = useState<FinancialData>(defaultFinancialData);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const updateFinancialData = (data: Partial<FinancialData>) => {
    setFinancialData((prev) => ({ ...prev, ...data }));
  };

  const generateMockData = () => {
    const mockFinancialData: FinancialData = {
      monthlyIncome: 28000,
      incomeBreakdown: [
        { source: "Ola", amount: 15000 },
        { source: "Uber", amount: 8000 },
        { source: "Swiggy", amount: 5000 },
      ],
      expenses: [
        { category: "Rent", amount: 12000 },
        { category: "Food", amount: 7000 },
        { category: "Transport", amount: 3500 },
        { category: "Utilities", amount: 2500 },
        { category: "Savings", amount: 3000 },
      ],
      finScore: 62,
      riskProfile: "Medium",
      tags: ["Irregular Income", "Multiple Income Sources", "Low Savings Rate"],
      scoreInsights: [
        {
          category: "Income Stability",
          level: "Fair",
          description: "Your income from gig work shows moderate consistency but with notable monthly variations that affect reliability assessments",
          suggestions: [
            "Try to maintain consistent work hours across platforms",
            "Consider developing a secondary stable income source",
            "Track peak earning periods to optimize work schedules"
          ]
        },
        {
          category: "Financial Discipline", 
          level: "Below Average",
          description: "Current savings rate is concerning at 10.7% of income, indicating potential financial stress and limited emergency preparedness",
          suggestions: [
            "Increase emergency fund to at least 3 months of expenses",
            "Reduce discretionary spending by 15-20%",
            "Set up automatic savings transfers on high-earning days"
          ]
        },
        {
          category: "Digital Financial Behavior",
          level: "Good",
          description: "Strong UPI transaction history demonstrates good digital financial adoption, though expense categorization could improve",
          suggestions: [
            "Use expense tracking apps for better financial visibility",
            "Consolidate banking relationships for easier management",
            "Consider digital investment options to grow savings"
          ]
        }
      ],
    };

    setFinancialData(mockFinancialData);
  };

  return (
    <AppContext.Provider
      value={{ 
        userData, 
        financialData, 
        updateUserData, 
        updateFinancialData,
        generateMockData 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
