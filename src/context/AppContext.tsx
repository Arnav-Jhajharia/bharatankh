
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
  monthlyIncome: 45000,
  incomeBreakdown: [
    { source: "Primary Job", amount: 30000 },
    { source: "Freelance Work", amount: 12000 },
    { source: "Investment Returns", amount: 3000 },
  ],
  expenses: [
    { category: "Rent", amount: 18000 },
    { category: "Groceries", amount: 8500 },
    { category: "Transportation", amount: 4200 },
    { category: "Utilities", amount: 3800 },
    { category: "Entertainment", amount: 6200 },
    { category: "Healthcare", amount: 2500 },
    { category: "Savings", amount: 1800 },
  ],
  finScore: 45,
  riskProfile: "High Risk",
  tags: ["High Spending", "Low Savings Rate", "Irregular Income"],
  scoreInsights: [
    {
      category: "Spending Control",
      level: "Poor",
      description: "Your monthly expenses exceed 96% of your income, leaving very little room for savings and emergency funds",
      suggestions: [
        "Reduce entertainment expenses by 30-40%",
        "Consider finding a cheaper rental or getting roommates",
        "Use public transportation instead of private vehicles",
        "Cook at home more often to reduce food costs"
      ]
    },
    {
      category: "Savings Rate", 
      level: "Critical",
      description: "With only 4% savings rate, you're at high risk of financial instability and have no emergency buffer",
      suggestions: [
        "Aim to save at least 20% of your income",
        "Set up automatic transfers to savings account",
        "Start an emergency fund covering 6 months of expenses",
        "Consider high-yield savings accounts or SIPs"
      ]
    },
    {
      category: "Income Diversification",
      level: "Fair",
      description: "Good income diversification with multiple sources, but total income needs optimization relative to expenses",
      suggestions: [
        "Negotiate salary increase at primary job",
        "Expand freelance client base for more stable income",
        "Explore passive income opportunities",
        "Consider skill development for higher-paying opportunities"
      ]
    }
  ],
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
      monthlyIncome: 32000,
      incomeBreakdown: [
        { source: "Software Development", amount: 25000 },
        { source: "Consulting", amount: 5000 },
        { source: "Online Courses", amount: 2000 },
      ],
      expenses: [
        { category: "Rent", amount: 15000 },
        { category: "Food & Groceries", amount: 6000 },
        { category: "Transportation", amount: 3000 },
        { category: "Utilities", amount: 2500 },
        { category: "Entertainment", amount: 2000 },
        { category: "Savings", amount: 3500 },
      ],
      finScore: 72,
      riskProfile: "Medium",
      tags: ["Good Income", "Balanced Spending", "Regular Saver"],
      scoreInsights: [
        {
          category: "Financial Stability",
          level: "Good",
          description: "Your income is stable with decent savings rate, showing good financial discipline",
          suggestions: [
            "Consider increasing investment in mutual funds",
            "Build larger emergency fund",
            "Explore tax-saving investment options"
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
