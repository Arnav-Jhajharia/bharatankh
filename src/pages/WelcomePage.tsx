
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { IndianRupee, ArrowDown, Building2, BarChart3 } from "lucide-react";

const WelcomePage = () => {
  const navigate = useNavigate();

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
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2070')`
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

      {/* Quote Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.blockquote
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight font-heading"
          >
            "Every rupee earned honestly should count towards your financial future"
          </motion.blockquote>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 mt-8 font-body"
          >
            — The BharatAnkh Promise
          </motion.p>
        </div>
      </section>

      {/* Three Words Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12"
          >
            <h3 className="text-5xl md:text-7xl font-bold text-gray-900 font-heading">Trust</h3>
            <h3 className="text-5xl md:text-7xl font-bold text-orange-500 font-heading">Growth</h3>
            <h3 className="text-5xl md:text-7xl font-bold text-gray-900 font-heading">Future</h3>
          </motion.div>
        </div>
      </section>

      {/* UI Screen Section - User Dashboard */}
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

      {/* Institutional View Section */}
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

      {/* Analysis Section */}
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

      {/* Team CTA Section */}
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

      {/* Final CTA */}
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

export default WelcomePage;
