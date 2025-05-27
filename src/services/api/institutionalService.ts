
export interface InstitutionalLookupRequest {
  aadhaarNumber: string;
  dob: Date;
  institutionId: string;
}

export interface InstitutionalLookupResponse {
  userData: {
    name: string;
    aadhaar: string;
    dob: Date;
    isVerified: boolean;
    bankLinked: boolean;
    bankName: string;
    language: string;
  };
  financialData: {
    monthlyIncome: number;
    incomeBreakdown: Array<{ source: string; amount: number }>;
    expenses: Array<{ category: string; amount: number }>;
    finScore: number;
    riskProfile: string;
    scoreInsights: Array<{
      category: string;
      level: string;
      description: string;
      suggestions: string[];
    }>;
  };
  transactionHistory: Array<{
    date: string;
    type: string;
    amount: number;
    description: string;
    category: string;
  }>;
  riskFactors: Array<{
    factor: string;
    severity: string;
    description: string;
    confidence: number;
    details: any;
  }>;
}

export interface DetailedReport {
  reportId: string;
  generatedAt: string;
  reportType: 'institutional_assessment';
  userData: any;
  financialAnalysis: any;
  riskAssessment: any;
  recommendations: any;
  pdfBuffer?: ArrayBuffer;
}

// Institutional Lookup API
export const performInstitutionalLookup = async (
  request: InstitutionalLookupRequest
): Promise<InstitutionalLookupResponse> => {
  try {
    const response = await fetch('/api/institutional/lookup', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('institutionalToken')}`,
        'Content-Type': 'application/json',
        'X-Institution-ID': request.institutionId,
      },
      body: JSON.stringify({
        aadhaarNumber: request.aadhaarNumber,
        dob: request.dob.toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error performing institutional lookup:', error);
    throw error;
  }
};

// Generate Detailed Report API
export const generateDetailedReport = async (
  lookupData: InstitutionalLookupResponse,
  institutionId: string
): Promise<DetailedReport> => {
  try {
    const response = await fetch('/api/institutional/generate-report', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('institutionalToken')}`,
        'Content-Type': 'application/json',
        'X-Institution-ID': institutionId,
      },
      body: JSON.stringify(lookupData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating detailed report:', error);
    throw error;
  }
};

// Download Report API
export const downloadReport = async (
  reportId: string,
  format: 'pdf' | 'json' = 'pdf'
): Promise<Blob> => {
  try {
    const response = await fetch(`/api/institutional/reports/${reportId}/download?format=${format}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('institutionalToken')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.blob();
  } catch (error) {
    console.error('Error downloading report:', error);
    throw error;
  }
};

// View Report API
export const viewReport = async (reportId: string): Promise<DetailedReport> => {
  try {
    const response = await fetch(`/api/institutional/reports/${reportId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('institutionalToken')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error viewing report:', error);
    throw error;
  }
};
