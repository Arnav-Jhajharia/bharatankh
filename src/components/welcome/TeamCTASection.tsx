
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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
          <Users className="h-16 w-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-body">
            Passionate about financial inclusion and empowering India's workforce
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate("/team")}
            className="text-lg px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-body"
          >
            Meet the Team
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamCTASection;
