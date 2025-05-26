
import { createContext, useContext, useState, ReactNode } from "react";

type UserData = {
  name: string;
  aadhaar: string;
  dob: Date | null;
  isVerified: boolean;
  bankLinked: boolean;
  bankName: string;
  language: string;
};

type FinancialData = {
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
      monthlyIncome: 45000,
      incomeBreakdown: [
        { source: "Ola", amount: 25000 },
        { source: "Uber", amount: 12000 },
        { source: "Swiggy", amount: 8000 },
      ],
      expenses: [
        { category: "Rent", amount: 15000 },
        { category: "Food", amount: 8000 },
        { category: "Transport", amount: 3000 },
        { category: "Utilities", amount: 2000 },
        { category: "Savings", amount: 17000 },
      ],
      finScore: 81,
      riskProfile: "Low",
      tags: ["Reliable Earner", "Consistent UPI Income", "Good Savings Rate"],
      scoreInsights: [
        {
          category: "Income Consistency",
          level: "Excellent",
          description: "Your income shows strong patterns with minimal volatility",
          suggestions: [
            "Continue maintaining multiple income sources",
            "Consider seasonal planning for peak earning periods"
          ]
        },
        {
          category: "Financial Discipline",
          level: "Good", 
          description: "You demonstrate solid savings habits and expense management",
          suggestions: [
            "Increase emergency fund to 6 months of expenses",
            "Explore investment opportunities for surplus funds"
          ]
        },
        {
          category: "Digital Footprint",
          level: "Strong",
          description: "High UPI transaction frequency shows digital financial adoption",
          suggestions: [
            "Link additional bank accounts for better visibility",
            "Consider using digital investment platforms"
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
