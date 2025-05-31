
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

const DashboardSection = () => {
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

        {/* Mock UI Screen */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <Card className="mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-2xl border-0">
            <div className="bg-gradient-to-br from-orange-500 to-brand-blue p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <IndianRupee className="h-8 w-8 mr-2" />
                  <span className="text-2xl font-bold font-heading">BharatAnkh Score</span>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold font-heading">750</div>
                  <div className="text-sm opacity-90 font-body">Good</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/20 rounded-2xl p-4">
                  <div className="text-sm opacity-90 font-body">Monthly Income</div>
                  <div className="text-2xl font-bold font-heading">₹45,000</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4">
                  <div className="text-sm opacity-90 font-body">Transactions</div>
                  <div className="text-2xl font-bold font-heading">234</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4">
                  <div className="text-sm opacity-90 font-body">Reliability</div>
                  <div className="text-2xl font-bold font-heading">98%</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-900 font-heading">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { desc: "Food delivery payment", amount: "+₹1,250", time: "2 hours ago" },
                  { desc: "Grocery store transaction", amount: "+₹850", time: "1 day ago" },
                  { desc: "Ride sharing payment", amount: "+₹2,100", time: "2 days ago" }
                ].map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 font-body">{transaction.desc}</div>
                      <div className="text-sm text-gray-500 font-body">{transaction.time}</div>
                    </div>
                    <div className="font-bold text-green-600 font-body">{transaction.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
