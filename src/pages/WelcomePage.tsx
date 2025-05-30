import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IndianRupee, Users, TrendingUp, Shield, Zap, Globe, Award, CheckCircle, Star, Clock, Building, UserCheck, CreditCard, BarChart3, Target, Smartphone, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
const WelcomePage = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const languages = [{
    code: "en",
    name: "English"
  }, {
    code: "hi",
    name: "हिंदी"
  }, {
    code: "te",
    name: "తెలుగు"
  }, {
    code: "ta",
    name: "தமிழ்"
  }];
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
          list: [{
            icon: TrendingUp,
            title: "Build Credit Score",
            description: "Transform your UPI transactions into a powerful financial score"
          }, {
            icon: Zap,
            title: "Instant Analysis",
            description: "Get real-time insights from your transaction history"
          }, {
            icon: Globe,
            title: "Multi-Language",
            description: "Available in Hindi, Tamil, Telugu and English"
          }, {
            icon: Shield,
            title: "Bank-Grade Security",
            description: "Your data is protected with enterprise-level encryption"
          }]
        },
        benefits: {
          title: "Financial freedom for every worker",
          subtitle: "From delivery partners to freelancers, everyone deserves financial recognition",
          list: ["No traditional employment? No problem", "Your gig work builds real credit", "Access better loan rates", "Transparent scoring system"]
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
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <IndianRupee className="h-8 w-8 text-orange-500 mr-2" />
              <h1 className="text-2xl font-bold">
                <span style={{
                color: '#f47615'
              }}>Bharat</span>
                <span style={{
                color: '#86dcf4'
              }}>Ankh</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32 text-slate-950">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>)}
                </SelectContent>
              </Select>
              
              <Button onClick={() => navigate("/kyc")} style={{
              backgroundColor: '#f47615'
            }} className="text-white">
                {getText("hero").cta}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-orange-50/30 to-blue-50/30 relative overflow-hidden">
        {/* Enhanced Worker Illustrations */}
        <div className="absolute left-8 top-1/4 opacity-30">
          <svg width="200" height="250" viewBox="0 0 200 250" fill="none">
            {/* Construction Worker with Flag */}
            <circle cx="100" cy="40" r="25" stroke="#f47615" strokeWidth="6" fill="none" />
            <rect x="75" y="25" width="50" height="25" rx="5" stroke="#86dcf4" strokeWidth="4" fill="none" />
            <path d="M75 65h50v40H75z" stroke="#f47615" strokeWidth="6" fill="none" />
            <path d="M75 105v90h15V165h20v30h15V105" stroke="#f47615" strokeWidth="6" fill="none" />
            <path d="M40 85h120l-15-25H55z" stroke="#86dcf4" strokeWidth="6" fill="none" />
            <rect x="170" y="50" width="4" height="80" stroke="#f47615" strokeWidth="4" />
            <rect x="174" y="50" width="20" height="15" fill="#ff8c00" />
            <path d="M174 50h20v5h-20z" fill="#138808" />
            <path d="M174 60h20v5h-20z" fill="#000080" />
          </svg>
        </div>

        <div className="absolute right-8 top-1/3 opacity-30">
          <svg width="180" height="220" viewBox="0 0 180 220" fill="none">
            {/* Farmer with Traditional Tools */}
            <circle cx="90" cy="35" r="22" stroke="#86dcf4" strokeWidth="6" fill="none" />
            <path d="M68 57h44v35H68z" stroke="#86dcf4" strokeWidth="6" fill="none" />
            <path d="M68 92v85h15V147h14v30h15V92" stroke="#86dcf4" strokeWidth="6" fill="none" />
            <path d="M30 75h120" stroke="#f47615" strokeWidth="8" />
            <circle cx="30" cy="75" r="8" stroke="#f47615" strokeWidth="4" fill="none" />
            <circle cx="150" cy="75" r="8" stroke="#f47615" strokeWidth="4" fill="none" />
            <path d="M85 50v-15M95 50v-15" stroke="#f47615" strokeWidth="3" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{
          y: 30,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          duration: 0.6
        }}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {getText("hero").title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {getText("hero").subtitle}
            </p>
            <p className="text-sm text-orange-600 font-medium mb-8">
              {getText("hero").tagline}
            </p>
            
            <Button size="lg" className="text-lg px-8 py-6 rounded-full text-white shadow-lg hover:shadow-xl transition-all" style={{
            backgroundColor: '#f47615'
          }} onClick={() => navigate("/kyc")}>
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
            {getText("features").list?.map((feature: any, index: number) => <motion.div key={index} initial={{
            y: 30,
            opacity: 0
          }} whileInView={{
            y: 0,
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>) || []}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How BharatAnkh Works</h2>
            <p className="text-xl text-gray-600">Simple steps to unlock your financial potential</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            icon: UserCheck,
            title: "Verify Identity",
            description: "Complete KYC with Aadhaar in minutes"
          }, {
            icon: CreditCard,
            title: "Link Bank Account",
            description: "Securely connect via Account Aggregator"
          }, {
            icon: BarChart3,
            title: "Get Your Score",
            description: "Instant BharatAnkh Score based on transactions"
          }].map((step, index) => <motion.div key={index} initial={{
            y: 50,
            opacity: 0
          }} whileInView={{
            y: 0,
            opacity: 1
          }} transition={{
            duration: 0.6,
            delay: index * 0.2
          }} className="text-center relative">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 2 && <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="border-t-2 border-dashed border-gray-300"></div>
                  </div>}
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{
            number: "50L+",
            label: "Gig Workers Served"
          }, {
            number: "₹500Cr+",
            label: "Credit Facilitated"
          }, {
            number: "99.9%",
            label: "Uptime Guarantee"
          }, {
            number: "15+",
            label: "Partner Banks"
          }].map((stat, index) => <motion.div key={index} initial={{
            scale: 0.8,
            opacity: 0
          }} whileInView={{
            scale: 1,
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-orange-100">{stat.label}</div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
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
                {(getText("benefits")?.list || ["No traditional employment? No problem", "Your gig work builds real credit", "Access better loan rates", "Transparent scoring system"]).map((benefit: string, index: number) => <motion.div key={index} className="flex items-center" initial={{
                x: -20,
                opacity: 0
              }} whileInView={{
                x: 0,
                opacity: 1
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }}>
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-lg">{benefit}</span>
                  </motion.div>)}
              </div>
            </div>
            
            <div className="relative">
              <svg width="400" height="350" viewBox="0 0 400 350" className="w-full h-auto">
                {/* Enhanced Indian Street Vendor */}
                <circle cx="200" cy="60" r="30" stroke="#f47615" strokeWidth="6" fill="none" />
                <path d="M170 90h60v40H170z" stroke="#f47615" strokeWidth="6" fill="none" />
                <path d="M170 130v90h18V190h24v30h18V130" stroke="#f47615" strokeWidth="6" fill="none" />
                <rect x="140" y="120" width="120" height="25" rx="8" stroke="#86dcf4" strokeWidth="6" fill="none" />
                <path d="M120 145h160" stroke="#86dcf4" strokeWidth="6" />
                <path d="M130 145v35M160 145v35M190 145v35M210 145v35M230 145v35M260 145v35" stroke="#86dcf4" strokeWidth="4" />
                <circle cx="80" cy="300" r="20" stroke="#f47615" strokeWidth="4" fill="none" />
                <circle cx="320" cy="300" r="20" stroke="#f47615" strokeWidth="4" fill="none" />
                <path d="M100 300h220" stroke="#86dcf4" strokeWidth="6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by India's Leading Institutions</h2>
            <p className="text-xl text-gray-600">Bank-grade security meets innovative technology</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{
            icon: Shield,
            title: "256-bit Encryption",
            desc: "Military-grade security"
          }, {
            icon: Award,
            title: "RBI Compliant",
            desc: "Fully regulated platform"
          }, {
            icon: Clock,
            title: "Real-time Updates",
            desc: "Instant score updates"
          }, {
            icon: Globe,
            title: "Pan-India Coverage",
            desc: "Available nationwide"
          }].map((trust, index) => <motion.div key={index} initial={{
            y: 30,
            opacity: 0
          }} whileInView={{
            y: 0,
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="text-center p-6">
                <trust.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">{trust.title}</h3>
                <p className="text-sm text-gray-600">{trust.desc}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{
          y: 30,
          opacity: 0
        }} whileInView={{
          y: 0,
          opacity: 1
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-4xl font-bold mb-4">
              {getText("cta")?.title || "Ready to build your BharatAnkh Score?"}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {getText("cta")?.subtitle || "Join thousands of gig workers already building their financial future"}
            </p>
            
            <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold" onClick={() => navigate("/kyc")}>
              {getText("cta")?.button || "Start Building Now"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <IndianRupee className="h-10 w-10 text-orange-500 mr-3" />
                <h1 className="text-3xl font-bold">
                  <span style={{
                  color: '#f47615'
                }}>Bharat</span>
                  <span style={{
                  color: '#86dcf4'
                }}>Ankh</span>
                </h1>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering India's workforce with financial recognition. Building credit scores for gig workers, freelancers, and the unbanked.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
                  Privacy Policy
                </Button>
                <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
                  Terms of Service
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-orange-400 transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Mumbai, India
                </li>
                <li className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 BharatAnkh. Built for India's workforce. 
              <span className="ml-2 text-orange-400">🇮🇳 Made in India</span>
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default WelcomePage;