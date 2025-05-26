
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IndianRupee, Users, TrendingUp, Shield } from "lucide-react";
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
        welcome: "Welcome to BharatAnkh",
        subtitle: "Your work deserves credit. Build your financial score and unlock better opportunities across India.",
        getStarted: "Get Started",
        forWorkers: "Built for India's workforce",
        features: {
          score: "Build Credit Score",
          opportunities: "Unlock Opportunities", 
          secure: "Secure & Verified"
        }
      },
      hi: {
        welcome: "BharatAnkh में आपका स्वागत है",
        subtitle: "आपका काम क्रेडिट के योग्य है। अपना वित्तीय स्कोर बनाएं और भारत भर में बेहतर अवसरों को अनलॉक करें।",
        getStarted: "शुरू करें",
        forWorkers: "भारत के कार्यबल के लिए बनाया गया",
        features: {
          score: "क्रेडिट स्कोर बनाएं",
          opportunities: "अवसर अनलॉक करें",
          secure: "सुरक्षित और सत्यापित"
        }
      },
      te: {
        welcome: "BharatAnkh కి స్వాగతం",
        subtitle: "మీ పని క్రెడిట్‌కు అర్హం. మీ ఆర్థిక స్కోర్‌ను పెంచుకోండి మరియు భారతదేశంలో మెరుగైన అవకాశాలను అన్‌లాక్ చేయండి.",
        getStarted: "ప్రారంభించండి",
        forWorkers: "భారత కార్యశక్తి కోసం నిర్మించబడింది",
        features: {
          score: "క్రెడిట్ స్కోర్ నిర్మించండి",
          opportunities: "అవకాశాలను అన్‌లాక్ చేయండి",
          secure: "సురక్షితం మరియు ధృవీకరించబడింది"
        }
      },
      ta: {
        welcome: "BharatAnkh க்கு வரவேற்கிறோம்",
        subtitle: "உங்கள் வேலை கடனுக்கு தகுதியானது. உங்கள் நிதி மதிப்பெண்ணை உருவாக்கி இந்தியா முழுவதும் சிறந்த வாய்ப்புகளை திறக்கவும்.",
        getStarted: "தொடங்குங்கள்",
        forWorkers: "இந்தியாவின் தொழிலாளர்களுக்காக கட்டமைக்கப்பட்டது",
        features: {
          score: "கடன் மதிப்பெண் உருவாக்கவும்",
          opportunities: "வாய்ப்புகளை திறக்கவும்",
          secure: "பாதுகாப்பான மற்றும் சரிபார்க்கப்பட்ட"
        }
      }
    };
    
    return translations[selectedLanguage]?.[key] || translations.en[key];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-blue-50/30 flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="worker-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#f47615"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#worker-pattern)" />
        </svg>
      </div>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-32 bg-white/80 backdrop-blur">
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
      </div>

      {/* Grand Illustrations of Indian Workers */}
      <div className="absolute left-8 top-1/4 opacity-30">
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
          {/* Construction Worker - Grand Scale */}
          <circle cx="60" cy="25" r="18" fill="none" stroke="#f47615" strokeWidth="3"/>
          <rect x="45" y="15" width="30" height="15" rx="3" fill="#f47615"/>
          <path d="M30 45h60v35H30z" fill="none" stroke="#f47615" strokeWidth="3"/>
          <path d="M40 80v70h10V120h20v30h10V80" stroke="#f47615" strokeWidth="3" fill="none"/>
          <path d="M15 65h90l-15-20H30z" stroke="#86dcf4" strokeWidth="3" fill="none"/>
          <text x="60" y="165" textAnchor="middle" fontSize="8" fill="#f47615" fontWeight="bold">BUILDER</text>
        </svg>
      </div>

      <div className="absolute right-8 top-1/3 opacity-30">
        <svg width="100" height="160" viewBox="0 0 100 160" fill="none">
          {/* Delivery Worker with Bike - Heroic */}
          <circle cx="50" cy="20" r="15" fill="none" stroke="#86dcf4" strokeWidth="3"/>
          <path d="M35 35h30v25H35z" fill="none" stroke="#86dcf4" strokeWidth="3"/>
          <path d="M35 60v60h8V100h14v20h8V60" stroke="#86dcf4" strokeWidth="3" fill="none"/>
          <circle cx="25" cy="130" r="12" fill="none" stroke="#f47615" strokeWidth="3"/>
          <circle cx="75" cy="130" r="12" fill="none" stroke="#f47615" strokeWidth="3"/>
          <path d="M25 130h50" stroke="#f47615" strokeWidth="3"/>
          <text x="50" y="155" textAnchor="middle" fontSize="8" fill="#86dcf4" fontWeight="bold">DRIVER</text>
        </svg>
      </div>

      <div className="absolute left-12 bottom-1/4 opacity-30">
        <svg width="110" height="140" viewBox="0 0 110 140" fill="none">
          {/* Street Vendor - Pride */}
          <circle cx="55" cy="18" r="14" fill="none" stroke="#f47615" strokeWidth="3"/>
          <path d="M40 32h30v20H40z" fill="none" stroke="#f47615" strokeWidth="3"/>
          <path d="M40 52v55h8V85h14v22h8V52" stroke="#f47615" strokeWidth="3" fill="none"/>
          <rect x="20" y="45" width="70" height="12" rx="3" fill="none" stroke="#86dcf4" strokeWidth="3"/>
          <path d="M10 57h90" stroke="#86dcf4" strokeWidth="3"/>
          <text x="55" y="130" textAnchor="middle" fontSize="8" fill="#f47615" fontWeight="bold">VENDOR</text>
        </svg>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 z-10"
      >
        <div className="flex items-center justify-center mb-6">
          <IndianRupee className="h-12 w-12 text-orange-500 mr-2" />
          <h1 className="text-4xl font-bold">
            <span style={{ color: '#f47615' }}>Bharat</span>
            <span style={{ color: '#86dcf4' }}>Ankh</span>
          </h1>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 z-10"
      >
        <h2 className="text-4xl font-bold mb-4 text-gray-800">{getText("welcome")}</h2>
        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
          {getText("subtitle")}
        </p>
        <p className="text-sm text-orange-600 mt-2 font-medium">
          {getText("forWorkers")}
        </p>
      </motion.div>

      {/* Feature highlights */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
          <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur rounded-lg">
            <TrendingUp className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">{getText("features").score}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur rounded-lg">
            <Users className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">{getText("features").opportunities}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur rounded-lg">
            <Shield className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">{getText("features").secure}</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="z-10"
      >
        <Button 
          className="text-lg font-semibold py-6 px-8 rounded-full text-white shadow-lg hover:shadow-xl transition-all"
          style={{ backgroundColor: '#f47615' }}
          onClick={() => navigate("/kyc")}
        >
          {getText("getStarted")}
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
