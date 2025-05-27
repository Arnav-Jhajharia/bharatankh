
export interface ScoreResponse {
  finScore: number;
  riskProfile: string;
  lastUpdated: string;
}

export interface RiskAssessment {
  factor: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  confidence: number;
  details: {
    metrics: Record<string, number>;
    trends: Array<{ date: string; value: number }>;
  };
}

export interface Transaction {
  id: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  category: string;
  merchantId?: string;
  location?: string;
}

export interface ExpenseData {
  month: string;
  categories: Array<{
    category: string;
    amount: number;
    transactions: Transaction[];
  }>;
  totalSpent: number;
  budgetVariance: number;
}

export interface BankData {
  accountNumber: string;
  bankName: string;
  accountType: string;
  balance: number;
  lastUpdated: string;
  transactionHistory: Transaction[];
}

// User Score API
export const getUserScore = async (userId: string): Promise<ScoreResponse> => {
  try {
    const response = await fetch(`/api/user/${userId}/score`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user score:', error);
    throw error;
  }
};

// Risk Assessment API
export const getRiskAssessment = async (userId: string): Promise<RiskAssessment[]> => {
  try {
    const response = await fetch(`/api/user/${userId}/risk-assessment`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching risk assessment:', error);
    throw error;
  }
};

// Transaction History API
export const getTransactionHistory = async (
  userId: string, 
  limit: number = 50,
  offset: number = 0
): Promise<Transaction[]> => {
  try {
    const response = await fetch(
      `/api/user/${userId}/transactions?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
};

// Monthly Expense Analysis API
export const getMonthlyExpenseData = async (
  userId: string,
  month: string
): Promise<ExpenseData> => {
  try {
    const response = await fetch(`/api/user/${userId}/expenses/${month}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching monthly expense data:', error);
    throw error;
  }
};

// Bank Data API
export const getBankData = async (userId: string): Promise<BankData[]> => {
  try {
    const response = await fetch(`/api/user/${userId}/bank-accounts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching bank data:', error);
    throw error;
  }
};

// AWS SageMaker API
export const sendToSageMaker = async (data: any): Promise<any> => {
  try {
    const response = await fetch('/api/ml/sagemaker/predict', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
        modelEndpoint: process.env.SAGEMAKER_ENDPOINT,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending data to SageMaker:', error);
    throw error;
  }
};
