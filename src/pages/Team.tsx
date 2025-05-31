
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IndianRupee, Linkedin } from "lucide-react";

const Team = () => {
  const navigate = useNavigate();

  // Easy to modify team data
  const teamMembers = [
    {
      name: "Arjun Sharma",
      role: "Co-Founder & CEO",
      type: "founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/arjun-sharma"
    },
    {
      name: "Priya Patel",
      role: "Co-Founder & CTO",
      type: "founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/priya-patel"
    },
    {
      name: "Vikash Kumar",
      role: "Co-Founder & CPO",
      type: "founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/vikash-kumar"
    },
    {
      name: "Rahul Singh",
      role: "Founding Member",
      type: "founding-member",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/rahul-singh"
    },
    {
      name: "Sneha Gupta",
      role: "Founding Member",
      type: "founding-member",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      linkedin: "https://linkedin.com/in/sneha-gupta"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <IndianRupee className="h-8 w-8 text-orange-500 mr-2" />
              <h1 className="text-2xl font-heading">
                <span style={{ color: '#399EE6' }}>Bharat</span>
                <span style={{ color: '#f47615' }} className="font-bold">Ankh</span>
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
                style={{ backgroundColor: '#f47615' }} 
                className="text-white font-body"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 text-center bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
              Passionate about financial inclusion and empowering India's workforce through innovative technology and deep understanding of financial systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 border-0 bg-white group">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-orange-200 transition-all duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  
                  {/* LinkedIn Icon */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -bottom-2 right-1/2 transform translate-x-1/2 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{member.name}</h3>
                <p className={`text-sm font-semibold font-body ${
                  member.type === 'founder' ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  {member.role}
                </p>
                
                {/* Role Badge */}
                <div className="mt-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium font-body ${
                    member.type === 'founder' 
                      ? 'bg-orange-100 text-orange-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {member.type === 'founder' ? 'Founder' : 'Founding Member'}
                  </span>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-heading">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-body">
              We believe that every honest worker in India deserves financial recognition. Our team combines 
              deep expertise in fintech, AI, and financial inclusion to build a platform that transforms 
              UPI transaction data into meaningful credit scores and financial opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Button 
            onClick={() => navigate("/")} 
            variant="outline"
            className="text-gray-700 border-gray-300 hover:bg-gray-50 font-body"
          >
            Back to Home
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <IndianRupee className="h-6 w-6 text-orange-500 mr-2" />
                <h3 className="text-lg font-heading">
                  <span style={{ color: '#399EE6' }}>Bharat</span>
                  <span style={{ color: '#f47615' }} className="font-bold">Ankh</span>
                </h3>
              </div>
              <p className="text-gray-600 text-sm font-body">
                Empowering India's workforce with financial recognition through UPI transactions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 font-heading">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-body">
                <li><a href="#" className="hover:text-orange-500">How it Works</a></li>
                <li><a href="#" className="hover:text-orange-500">Features</a></li>
                <li><a href="#" className="hover:text-orange-500">Security</a></li>
                <li><a href="#" className="hover:text-orange-500">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 font-heading">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-body">
                <li><a href="/team" className="hover:text-orange-500">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500">Careers</a></li>
                <li><a href="#" className="hover:text-orange-500">Contact</a></li>
                <li><a href="#" className="hover:text-orange-500">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 font-heading">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-body">
                <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-500">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-600 font-body">
              © 2024 BharatAnkh. All rights reserved. Built for India's hardworking people.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Team;
