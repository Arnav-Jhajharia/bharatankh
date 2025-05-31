
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Ready to Build Your Credit?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-body">
            Join thousands of workers already building their financial future
          </p>
          
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 rounded-full text-gray-900 bg-white hover:bg-gray-100 font-semibold transform hover:scale-105 transition-all font-body" 
            onClick={() => navigate("/kyc")}
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
