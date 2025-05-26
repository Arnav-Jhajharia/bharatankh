
import jsPDF from 'jspdf';
import { FinancialData, UserData } from '@/context/AppContext';

export const generateFinancialPassportPDF = (userData: UserData, financialData: FinancialData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPosition = margin;

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("BHARATANKH FINANCIAL PASSPORT", pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Confidential Financial Assessment Report", pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 20;
  
  // User Information Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("APPLICANT DETAILS", margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${userData.name}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Aadhaar Status: ${userData.isVerified ? 'Verified' : 'Pending'}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Bank Linked: ${userData.bankLinked ? userData.bankName : 'Not Linked'}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Report Date: ${new Date().toLocaleDateString('en-IN')}`, margin, yPosition);
  
  yPosition += 20;
  
  // Financial Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("FINANCIAL SUMMARY", margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Monthly Income: ₹${financialData.monthlyIncome.toLocaleString('en-IN')}`, margin, yPosition);
  yPosition += 6;
  
  const totalExpenses = financialData.expenses.reduce((sum, exp) => 
    exp.category !== "Savings" ? sum + exp.amount : sum, 0
  );
  doc.text(`Monthly Expenses: ₹${totalExpenses.toLocaleString('en-IN')}`, margin, yPosition);
  yPosition += 6;
  
  const savings = financialData.expenses.find(exp => exp.category === "Savings")?.amount || 0;
  doc.text(`Monthly Savings: ₹${savings.toLocaleString('en-IN')}`, margin, yPosition);
  yPosition += 6;
  
  const savingsRate = ((savings / financialData.monthlyIncome) * 100).toFixed(1);
  doc.text(`Savings Rate: ${savingsRate}%`, margin, yPosition);
  
  yPosition += 20;
  
  // Income Sources
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("INCOME BREAKDOWN", margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  financialData.incomeBreakdown.forEach((income) => {
    doc.text(`${income.source}: ₹${income.amount.toLocaleString('en-IN')}`, margin, yPosition);
    yPosition += 6;
  });
  
  yPosition += 15;
  
  // BharatAnkh Score
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("BHARATANKH SCORE ASSESSMENT", margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Score: ${financialData.finScore}/100`, margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Risk Profile: ${financialData.riskProfile}`, margin, yPosition);
  yPosition += 10;
  
  // Risk Factors - Highlighted
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(200, 0, 0); // Red color for risk factors
  doc.text("RISK FACTORS:", margin, yPosition);
  doc.setTextColor(0, 0, 0); // Reset to black
  yPosition += 8;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  // Risk assessment based on score
  const riskFactors = [];
  if (financialData.finScore < 70) {
    riskFactors.push("• Moderate credit score indicates elevated risk");
  }
  if (Number(savingsRate) < 15) {
    riskFactors.push("• Low savings rate may indicate financial stress");
  }
  if (financialData.incomeBreakdown.length < 2) {
    riskFactors.push("• Single income source increases volatility risk");
  }
  if (totalExpenses / financialData.monthlyIncome > 0.8) {
    riskFactors.push("• High expense ratio limits financial flexibility");
  }
  
  if (riskFactors.length === 0) {
    riskFactors.push("• No significant risk factors identified");
  }
  
  riskFactors.forEach((risk) => {
    doc.text(risk, margin, yPosition);
    yPosition += 6;
  });
  
  yPosition += 15;
  
  // Score Insights
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("QUALITATIVE ASSESSMENT", margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  financialData.scoreInsights.forEach((insight) => {
    if (yPosition > 250) { // Start new page if needed
      doc.addPage();
      yPosition = margin;
    }
    
    doc.setFont("helvetica", "bold");
    doc.text(`${insight.category}: ${insight.level}`, margin, yPosition);
    yPosition += 6;
    
    doc.setFont("helvetica", "normal");
    doc.text(insight.description, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 12;
    
    insight.suggestions.forEach((suggestion) => {
      doc.text(`  • ${suggestion}`, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
      yPosition += 6;
    });
    
    yPosition += 8;
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("This report is generated by BharatAnkh Financial Services and is confidential.", pageWidth / 2, 280, { align: "center" });
  doc.text("For verification, contact support@bharatankh.in", pageWidth / 2, 285, { align: "center" });
  
  // Save the PDF
  doc.save(`BharatAnkh_Financial_Passport_${userData.name.replace(/\s+/g, '_')}.pdf`);
};
