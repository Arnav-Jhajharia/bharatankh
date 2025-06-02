
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section - Title and Header */}
      <section className="pt-24 pb-8 text-center">
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4 font-heading">
            Your Work
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-orange-500 font-heading">
            Deserves Credit
          </h2>
        </motion.div>
      </section>

      {/* Main Card with Labor Background */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <Card className="relative h-[70vh] overflow-hidden rounded-3xl border-0 shadow-2xl">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://ibb.co/sdL3v9FS')`
              }}
            />
            
            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center p-8">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-4xl"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-heading">
                  Build Your Financial Future with Every Transaction
                </h3>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-body">
                  From delivery partners to street vendors, every honest worker deserves financial recognition. 
                  Transform your UPI transactions into a powerful credit score.
                </p>
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-6 rounded-full text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-body" 
                  style={{ backgroundColor: '#f47615' }}
                  onClick={() => navigate("/kyc")}
                >
                  Start Building Now
                </Button>
              </motion.div>
            </div>
          </Card>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="flex justify-center mt-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
