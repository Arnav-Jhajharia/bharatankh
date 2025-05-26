
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
    const translations: Record<string, Record<string, string>> = {
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

      {/* Worker Illustrations */}
      <div className="absolute left-8 top-1/4 opacity-20">
        <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
          {/* Delivery worker with bike */}
          <path d="M40 20c-8 0-15 7-15 15v10c0 3 2 5 5 5h20c3 0 5-2 5-5V35c0-8-7-15-15-15z" fill="#f47615" stroke="#f47615" strokeWidth="1"/>
          <path d="M25 50v40l10 5v20h10V95l10-5V50" stroke="#f47615" strokeWidth="2" fill="none"/>
          <circle cx="20" cy="100" r="8" fill="none" stroke="#f47615" strokeWidth="2"/>
          <circle cx="60" cy="100" r="8" fill="none" stroke="#f47615" strokeWidth="2"/>
          <path d="M20 100h40" stroke="#f47615" strokeWidth="2"/>
        </svg>
      </div>

      <div className="absolute right-8 top-1/3 opacity-20">
        <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
          {/* Construction worker */}
          <circle cx="30" cy="15" r="12" fill="#86dcf4" stroke="#86dcf4" strokeWidth="1"/>
          <rect x="20" y="8" width="20" height="10" rx="2" fill="#f47615"/>
          <path d="M15 30h30v20H15z" fill="#86dcf4" stroke="#86dcf4" strokeWidth="1"/>
          <path d="M20 50v35h5V70h10v15h5V50" stroke="#86dcf4" strokeWidth="2" fill="none"/>
          <path d="M10 40h15l5-10 5 10h15" stroke="#f47615" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="absolute left-12 bottom-1/4 opacity-20">
        <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
          {/* Street vendor */}
          <circle cx="35" cy="15" r="10" fill="#f47615"/>
          <path d="M25 25h20v15H25z" fill="#86dcf4" stroke="#86dcf4" strokeWidth="1"/>
          <path d="M25 40v30h5V55h10v15h5V40" stroke="#f47615" strokeWidth="2" fill="none"/>
          <rect x="15" y="35" width="40" height="8" rx="2" fill="none" stroke="#86dcf4" strokeWidth="2"/>
          <path d="M10 43h50" stroke="#86dcf4" strokeWidth="2"/>
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
