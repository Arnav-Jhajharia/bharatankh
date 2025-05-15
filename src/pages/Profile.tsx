
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock,
  Briefcase,
  DollarSign, 
  Mail, 
  Phone,
  Globe,
  BadgeCheck
} from "lucide-react";

const Profile = () => {
  const { userData, financialData, generateMockData } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Generate mock data if not available
  if (financialData.monthlyIncome === 0) {
    generateMockData();
  }

  // Calculate rating from financial score
  const rating = (financialData.finScore / 20).toFixed(1);
  
  // GigWork history
  const gigHistory = [
    { platform: "Grab", role: "Food Delivery", duration: "1y 8m", ongoing: true },
    { platform: "Deliveroo", role: "Delivery Partner", duration: "2y 3m", ongoing: true },
    { platform: "Foodpanda", role: "Rider", duration: "8m", ongoing: false },
  ];
  
  // Skill ratings
  const skills = [
    { name: "Time Management", level: 95 },
    { name: "Customer Service", level: 87 },
    { name: "Navigation", level: 92 },
    { name: "Communication", level: 84 },
  ];
  
  // Performance metrics
  const metrics = [
    { name: "On-time Delivery", value: "98.2%", trend: "up" },
    { name: "Customer Rating", value: "4.8/5", trend: "stable" },
    { name: "Acceptance Rate", value: "96.7%", trend: "up" },
    { name: "Weekly Hours", value: "38h", trend: "stable" },
  ];
  
  // Badge achievements
  const achievements = [
    "Top Performer",
    "Reliable Partner",
    "1000+ Deliveries",
    "Weekend Warrior",
    "Early Bird",
  ];

  return (
    <PageContainer className="bg-white">
      {/* Profile header with avatar */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-primary shadow">
          <AvatarImage src="https://images.unsplash.com/photo-1486718448742-163732cd1544" alt="Profile" />
          <AvatarFallback className="bg-primary/10 text-primary text-2xl">
            {userData.name ? userData.name.charAt(0) : "J"}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-1">{userData.name || "John Doe"}</h1>
        <div className="flex items-center justify-center mb-2">
          <Badge className="mr-2 bg-primary hover:bg-primary/90">Verified Gig Worker</Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-gray-600 max-w-md mx-auto">
          Professional delivery partner specializing in food delivery and quick service across multiple platforms.
        </p>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Monthly Earnings</p>
            <p className="text-xl font-bold flex justify-center items-center mt-1">
              <DollarSign className="h-4 w-4 mr-1" />
              {financialData.monthlyIncome}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Work Score</p>
            <p className="text-xl font-bold mt-1">{financialData.finScore}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Risk Profile</p>
            <p className="text-xl font-bold mt-1">{financialData.riskProfile}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3 mb-6 bg-gray-50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="skills">Skills & Badges</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>Singapore, SG</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>Joined Jan 2022</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span>+65 9123 4567</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>Availability: Weekdays & Weekends</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  <span>English, Mandarin</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Gig Work Experience</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gigHistory.map((gig, index) => (
                  <div key={index} className="flex items-start border-b pb-3 last:border-0 last:pb-0">
                    <Briefcase className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{gig.platform}</h4>
                        {gig.ongoing && (
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{gig.role} • {gig.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Income Breakdown</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {financialData.incomeBreakdown.map((source, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{source.source}</span>
                      <span className="text-sm font-medium">${source.amount}</span>
                    </div>
                    <Progress 
                      value={(source.amount / financialData.monthlyIncome) * 100} 
                      className="h-2" 
                      indicatorClassName={index === 0 ? "bg-primary" : index === 1 ? "bg-blue-400" : "bg-amber-400"}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-3 shadow-sm hover:shadow transition-shadow">
                    <p className="text-sm text-gray-500">{metric.name}</p>
                    <p className="text-xl font-bold mt-1">{metric.value}</p>
                    <p className={`text-xs mt-1 ${
                      metric.trend === "up" 
                        ? "text-green-600" 
                        : metric.trend === "down" 
                          ? "text-red-600" 
                          : "text-gray-600"
                    }`}>
                      {metric.trend === "up" && "↑ "}
                      {metric.trend === "down" && "↓ "}
                      {metric.trend === "up" ? "Improving" : metric.trend === "down" ? "Declining" : "Stable"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Work Hours</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs text-gray-500">{day}</p>
                    <div className={`mt-1 rounded-t-sm ${
                      index < 5 ? "bg-primary" : "bg-accent"
                    }`} style={{ 
                      height: `${(index === 3 ? 70 : index === 6 ? 40 : 60)}px` 
                    }}></div>
                    <p className="text-xs font-medium mt-1">
                      {index === 3 ? "7h" : index === 6 ? "4h" : "6h"}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekly Average</span>
                <span className="font-medium">38 hours</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Income Stability</h3>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 via-primary to-accent" 
                  style={{ width: `${financialData.finScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Highly Variable</span>
                <span>Stable Income</span>
              </div>
              <p className="mt-4 text-sm">
                Your income stability score is <span className="font-medium">{financialData.finScore}%</span>, 
                which is considered <span className="font-medium">{
                  financialData.finScore > 80 ? "excellent" : 
                  financialData.finScore > 70 ? "good" : 
                  financialData.finScore > 60 ? "fair" : "needs improvement"
                }</span>.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Professional Skills</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm font-medium">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2" 
                      indicatorClassName={
                        index % 2 === 0 ? "bg-primary" : "bg-accent"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Achievements</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement, index) => (
                  <Badge 
                    key={index} 
                    variant={index % 2 === 0 ? "default" : "secondary"}
                    className="px-3 py-1 font-normal"
                  >
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Platform Tags</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {financialData.tags.map((tag, index) => (
                  <div 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-sm ${
                      index % 3 === 0 
                        ? "bg-gray-100 text-gray-800" 
                        : index % 3 === 1 
                          ? "bg-primary/10 text-primary" 
                          : "bg-accent/10 text-accent"
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Action buttons */}
      <div className="flex gap-3 justify-center mt-8 mb-10">
        <Button className="px-8">Contact</Button>
        <Button variant="outline" className="px-8">Download Profile</Button>
      </div>
    </PageContainer>
  );
};

export default Profile;
