
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";

const DashboardSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Your Financial Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
            See how BharatAnkh transforms your transaction history into actionable financial insights
          </p>
        </motion.div>

        {/* Professional Financial Portfolio Dashboard */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <Card className="mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-2xl border-0">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-900 to-gray-800 p-8 text-white">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <IndianRupee className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold font-heading">Financial Portfolio</h3>
                    <p className="text-sm opacity-75 font-body">Comprehensive Credit Assessment</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold font-heading text-green-400">812</div>
                  <div className="text-sm opacity-90 font-body">CIBIL Equivalent</div>
                </div>
              </div>
              
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                  <div className="text-xs opacity-75 mb-1 font-body">Monthly Inflow</div>
                  <div className="text-2xl font-bold font-heading">₹2.8L</div>
                  <div className="text-xs text-green-400 font-body">+12% MoM</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                  <div className="text-xs opacity-75 mb-1 font-body">Transaction Volume</div>
                  <div className="text-2xl font-bold font-heading">1,247</div>
                  <div className="text-xs text-blue-400 font-body">This month</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                  <div className="text-xs opacity-75 mb-1 font-body">Risk Score</div>
                  <div className="text-2xl font-bold font-heading">A+</div>
                  <div className="text-xs text-orange-400 font-body">Low Risk</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                  <div className="text-xs opacity-75 mb-1 font-body">Stability Index</div>
                  <div className="text-2xl font-bold font-heading">94%</div>
                  <div className="text-xs text-purple-400 font-body">Excellent</div>
                </div>
              </div>
            </div>
            
            {/* Professional Analytics Section */}
            <div className="bg-white p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Income Analytics */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 font-heading">Income Analysis</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div>
                        <div className="font-medium text-gray-800 font-body">Primary Income</div>
                        <div className="text-sm text-gray-600 font-body">Delivery Services</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-700 font-heading">₹1.8L</div>
                        <div className="text-xs text-green-600 font-body">64% of total</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <div>
                        <div className="font-medium text-gray-800 font-body">Secondary Income</div>
                        <div className="text-sm text-gray-600 font-body">Freelance Work</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-700 font-heading">₹1.0L</div>
                        <div className="text-xs text-blue-600 font-body">36% of total</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Credit Indicators */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 font-heading">Credit Indicators</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 font-body">Payment Consistency</span>
                        <span className="text-orange-700 font-bold font-body">98.2%</span>
                      </div>
                      <div className="w-full bg-orange-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '98.2%' }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 font-body">Income Stability</span>
                        <span className="text-purple-700 font-bold font-body">94.5%</span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94.5%' }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1 font-body">Credit Recommendation</div>
                        <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold font-body">
                          APPROVED for ₹5L+ Credit
                        </div>
                      </div>
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

export default DashboardSection;
