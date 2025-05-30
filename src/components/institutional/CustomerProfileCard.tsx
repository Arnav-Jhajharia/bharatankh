
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

interface CustomerProfileCardProps {
  userData: {
    name: string;
    aadhaar: string;
    dob: Date;
    isVerified: boolean;
    bankLinked: boolean;
    bankName: string;
  };
  financialData: {
    finScore: number;
  };
}

export const CustomerProfileCard = ({ userData, financialData }: CustomerProfileCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">Customer Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Full Name</p>
              <p className="text-lg font-semibold text-gray-900">{userData.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Aadhaar Number</p>
              <p className="text-lg font-mono text-gray-900 tracking-wider">{userData.aadhaar}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Date of Birth</p>
              <p className="text-lg font-semibold text-gray-900">{format(userData.dob, "PPP")}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bank</p>
              <p className="text-lg font-semibold text-gray-900">{userData.bankName}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Verification Status</p>
              <div className="flex items-center gap-2">
                {userData.isVerified ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-lg font-semibold text-green-600">Verified</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <span className="text-lg font-semibold text-amber-600">Pending</span>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">BharatAnkh Score</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">{financialData.finScore}</span>
                <span className="text-lg text-gray-500">/100</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${financialData.finScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
