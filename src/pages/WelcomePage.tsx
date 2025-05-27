
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IndianRupee, Users, TrendingUp, Shield, Zap, Globe, Award, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "te", name: "తెలుగు" },
    { code: "ta", name: "தமிழ்" },
  ];

  const getText = (key: string) => {
    const translations: Record<string, Record<string, any>> = {
      en: {
        hero: {
          title: "Your work deserves credit",
          subtitle: "Build your financial score and unlock better opportunities across India",
          cta: "Get Started Free",
          tagline: "Built for India's workforce"
        },
        features: {
          title: "Why BharatAnkh?",
          subtitle: "Empowering India's gig workers with financial recognition",
          list: [
            {
              icon: TrendingUp,
              title: "Build Credit Score",
              description: "Transform your UPI transactions into a powerful financial score"
            },
            {
              icon: Zap,
              title: "Instant Analysis",
              description: "Get real-time insights from your transaction history"
            },
            {
              icon: Globe,
              title: "Multi-Language",
              description: "Available in Hindi, Tamil, Telugu and English"
            },
            {
              icon: Shield,
              title: "Bank-Grade Security",
              description: "Your data is protected with enterprise-level encryption"
            }
          ]
        },
        benefits: {
          title: "Financial freedom for every worker",
          subtitle: "From delivery partners to freelancers, everyone deserves financial recognition",
          list: [
            "No traditional employment? No problem",
            "Your gig work builds real credit",
            "Access better loan rates",
            "Transparent scoring system"
          ]
        },
        cta: {
          title: "Ready to build your BharatAnkh Score?",
          subtitle: "Join thousands of gig workers already building their financial future",
          button: "Start Building Now"
        }
      },
      hi: {
        hero: {
          title: "आपका काम क्रेडिट के योग्य है",
          subtitle: "अपना वित्तीय स्कोर बनाएं और भारत भर में बेहतर अवसरों को अनलॉक करें",
          cta: "मुफ्त में शुरू करें",
          tagline: "भारत के कार्यबल के लिए बनाया गया"
        },
        features: {
          title: "BharatAnkh क्यों?",
          subtitle: "भारत के गिग श्रमिकों को वित्तीय पहचान के साथ सशक्त बनाना"
        }
      }
    };
    
    return translations[selectedLanguage]?.[key] || translations.en[key];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <IndianRupee className="h-8 w-8 text-orange-500 mr-2" />
              <h1 className="text-2xl font-bold">
                <span style={{ color: '#f47615' }}>Bharat</span>
                <span style={{ color: '#86dcf4' }}>Ankh</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => navigate("/kyc")}
                style={{ backgroundColor: '#f47615' }}
                className="text-white"
              >
                {getText("hero").cta}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-orange-50/30 to-blue-50/30 relative overflow-hidden">
        {/* Worker Illustrations */}
        <div className="absolute left-8 top-1/4 opacity-20">
          <svg width="150" height="200" viewBox="0 0 150 200" fill="none">
            {/* Delivery Worker */}
            <circle cx="75" cy="30" r="20" stroke="#f47615" strokeWidth="4" fill="none"/>
            <path d="M55 50h40v30H55z" stroke="#f47615" strokeWidth="4" fill="none"/>
            <path d="M55 80v80h12V140h26v20h12V80" stroke="#f47615" strokeWidth="4" fill="none"/>
            <circle cx="40" cy="170" r="15" stroke="#86dcf4" strokeWidth="4" fill="none"/>
            <circle cx="110" cy="170" r="15" stroke="#86dcf4" strokeWidth="4" fill="none"/>
            <path d="M40 170h70" stroke="#86dcf4" strokeWidth="4"/>
            <rect x="85" y="45" width="20" height="15" stroke="#f47615" strokeWidth="3" fill="none"/>
          </svg>
        </div>

        <div className="absolute right-8 top-1/3 opacity-20">
          <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
            {/* Construction Worker */}
            <circle cx="60" cy="25" r="18" stroke="#86dcf4" strokeWidth="4" fill="none"/>
            <rect x="45" y="15" width="30" height="15" rx="3" stroke="#f47615" strokeWidth="3" fill="none"/>
            <path d="M40 45h40v35H40z" stroke="#86dcf4" strokeWidth="4" fill="none"/>
            <path d="M40 80v70h12V130h16v20h12V80" stroke="#86dcf4" strokeWidth="4" fill="none"/>
            <path d="M20 65h80l-12-20H32z" stroke="#f47615" strokeWidth="4" fill="none"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {getText("hero").title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {getText("hero").subtitle}
            </p>
            <p className="text-sm text-orange-600 font-medium mb-8">
              {getText("hero").tagline}
            </p>
            
            <Button 
              size="lg"
              className="text-lg px-8 py-6 rounded-full text-white shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#f47615' }}
              onClick={() => navigate("/kyc")}
            >
              {getText("hero").cta}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {getText("features").title}
            </h2>
            <p className="text-xl text-gray-600">
              {getText("features").subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getText("features").list?.map((feature: any, index: number) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {getText("benefits")?.title || "Financial freedom for every worker"}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {getText("benefits")?.subtitle || "From delivery partners to freelancers, everyone deserves financial recognition"}
              </p>
              
              <div className="space-y-4">
                {(getText("benefits")?.list || [
                  "No traditional employment? No problem",
                  "Your gig work builds real credit", 
                  "Access better loan rates",
                  "Transparent scoring system"
                ]).map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <svg width="400" height="300" viewBox="0 0 400 300" className="w-full h-auto">
                {/* Street Vendor */}
                <circle cx="200" cy="50" r="25" stroke="#f47615" strokeWidth="5" fill="none"/>
                <path d="M175 75h50v35H175z" stroke="#f47615" strokeWidth="5" fill="none"/>
                <path d="M175 110v80h15V160h20v30h15V110" stroke="#f47615" strokeWidth="5" fill="none"/>
                <rect x="150" y="100" width="100" height="20" rx="5" stroke="#86dcf4" strokeWidth="5" fill="none"/>
                <path d="M130 120h140" stroke="#86dcf4" strokeWidth="5"/>
                <path d="M140 120v30M180 120v30M220 120v30M260 120v30" stroke="#86dcf4" strokeWidth="3"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {getText("cta")?.title || "Ready to build your BharatAnkh Score?"}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {getText("cta")?.subtitle || "Join thousands of gig workers already building their financial future"}
          </p>
          
          <Button 
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold"
            onClick={() => navigate("/kyc")}
          >
            {getText("cta")?.button || "Start Building Now"}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <IndianRupee className="h-8 w-8 text-orange-500 mr-2" />
            <h1 className="text-2xl font-bold">
              <span style={{ color: '#f47615' }}>Bharat</span>
              <span style={{ color: '#86dcf4' }}>Ankh</span>
            </h1>
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 BharatAnkh. Built for India's workforce.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
