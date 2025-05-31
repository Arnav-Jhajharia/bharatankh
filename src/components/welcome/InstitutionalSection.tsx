
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const InstitutionalSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Building2 className="h-16 w-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            What Lenders See
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
            Institutional partners get comprehensive risk assessment and customer insights
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <Card className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-2xl border-0 bg-white">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Customer Profile</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium text-gray-700 font-body">Credit Score</span>
                      <span className="font-bold text-green-600 font-body">750</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="font-medium text-gray-700 font-body">Income Stability</span>
                      <span className="font-bold text-blue-600 font-body">High</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <span className="font-medium text-gray-700 font-body">Risk Level</span>
                      <span className="font-bold text-orange-600 font-body">Low</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Transaction Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 font-body">Monthly Volume</div>
                      <div className="text-xl font-bold text-gray-900 font-heading">₹2.4L</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 font-body">Payment Reliability</div>
                      <div className="text-xl font-bold text-gray-900 font-heading">98.5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionalSection;
