
import { createContext, useContext, useState, ReactNode } from "react";

type UserData = {
  name: string;
  pan: string;
  dob: Date | null;
  isVerified: boolean;
  bankLinked: boolean;
  bankName: string;
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
  pan: "",
  dob: null,
  isVerified: false,
  bankLinked: false,
  bankName: "",
};

const defaultFinancialData: FinancialData = {
  monthlyIncome: 0,
  incomeBreakdown: [],
  expenses: [],
  finScore: 0,
  riskProfile: "",
  tags: [],
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
      monthlyIncome: 3250,
      incomeBreakdown: [
        { source: "Grab", amount: 1800 },
        { source: "Deliveroo", amount: 950 },
        { source: "Foodpanda", amount: 500 },
      ],
      expenses: [
        { category: "Rent", amount: 1200 },
        { category: "Food", amount: 600 },
        { category: "Transport", amount: 250 },
        { category: "Utilities", amount: 150 },
        { category: "Savings", amount: 1050 },
      ],
      finScore: 81,
      riskProfile: "Low",
      tags: ["Reliable Earner", "Consistent PayNow Income", "Good Savings Rate"],
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
