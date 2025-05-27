
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="institutional-card">
      <CardHeader>
        <CardTitle className="institutional-card-title">Customer Profile</CardTitle>
      </CardHeader>
      <CardContent className="institutional-card-content">
        <div className="profile-info-grid">
          <div className="profile-section">
            <p className="profile-field">
              <span className="field-label">Name:</span> {userData.name}
            </p>
            <p className="profile-field">
              <span className="field-label">Aadhaar:</span> {userData.aadhaar}
            </p>
            <p className="profile-field">
              <span className="field-label">DOB:</span> {format(userData.dob, "PPP")}
            </p>
          </div>
          <div className="profile-section">
            <p className="profile-field">
              <span className="field-label">Bank:</span> {userData.bankName}
            </p>
            <p className="profile-field">
              <span className="field-label">Verification:</span> 
              <span className={userData.isVerified ? "status-verified" : "status-pending"}>
                {userData.isVerified ? "Verified" : "Pending"}
              </span>
            </p>
            <p className="profile-field">
              <span className="field-label">BharatAnkh Score:</span> 
              <span className="score-value">{financialData.finScore}/100</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
