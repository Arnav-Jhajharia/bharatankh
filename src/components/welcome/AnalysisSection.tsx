
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const AnalysisSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <BarChart3 className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Deep Financial Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
            Comprehensive breakdown of spending patterns, income stability, and financial behavior
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <Card className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-2xl border-0">
            <div className="bg-gradient-to-r from-orange-100 to-blue-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Financial Portfolio Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium text-gray-700 font-body">Working Capital</div>
                  <div className="text-xl font-bold text-gray-900 font-heading">32%</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium text-gray-700 font-body">Asset Investment</div>
                  <div className="text-xl font-bold text-gray-900 font-heading">28%</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium text-gray-700 font-body">Operational</div>
                  <div className="text-xl font-bold text-gray-900 font-heading">22%</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium text-gray-700 font-body">Risk Buffer</div>
                  <div className="text-xl font-bold text-gray-900 font-heading">18%</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalysisSection;
