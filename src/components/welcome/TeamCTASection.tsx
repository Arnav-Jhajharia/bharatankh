
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TeamCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Meet the Team Behind BharatAnkh
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-body">
            Learn about the passionate individuals working to democratize financial access across India
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate("/team")}
            className="text-lg px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-brand-blue text-white hover:shadow-lg transition-all transform hover:scale-105 font-body"
          >
            Meet Our Team
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamCTASection;
