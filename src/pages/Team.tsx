
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Linkedin } from "lucide-react";

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { 
      name: "Arjun Sharma", 
      role: "Co-Founder & CEO", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/arjun-sharma",
      type: "founder"
    },
    { 
      name: "Priya Patel", 
      role: "Co-Founder & CTO", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/priya-patel",
      type: "founder"
    },
    { 
      name: "Vikash Kumar", 
      role: "Co-Founder & CPO", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/vikash-kumar",
      type: "founder"
    },
    { 
      name: "Rahul Singh", 
      role: "Founding Member", 
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/rahul-singh",
      type: "founding-member"
    },
    { 
      name: "Sneha Gupta", 
      role: "Founding Member", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/sneha-gupta",
      type: "founding-member"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
              <h1 className="text-2xl font-heading">
                <span className="text-brand-blue">Bharat</span>
                <span className="text-primary font-bold">Ankh</span>
              </h1>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={() => navigate("/institutional")} 
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-50 font-body"
              >
                For Institutions
              </Button>
              <Button 
                onClick={() => navigate("/kyc")} 
                className="bg-primary text-white font-body hover:bg-primary/90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Team Section */}
      <section className="pt-24 pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Users className="h-16 w-16 text-brand-blue mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
              Passionate about financial inclusion and empowering India's workforce
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((person, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow border-0 bg-white group">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden relative">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{person.name}</h3>
                <p className={`text-sm font-semibold mb-4 font-body ${
                  person.type === 'founder' ? 'text-primary' : 'text-brand-blue'
                }`}>
                  {person.role}
                </p>
                <a 
                  href={person.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-sm font-body">Connect</span>
                </a>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")} 
            className="font-medium text-gray-600 hover:text-primary transition-colors duration-200 font-body"
          >
            Back to Home
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Team;
