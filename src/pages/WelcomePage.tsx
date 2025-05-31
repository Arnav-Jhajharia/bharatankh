
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { IndianRupee, ArrowDown } from "lucide-react";

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
              <h1 className="text-2xl font-bold">
                <span style={{ color: '#f47615' }}>Bharat</span>
                <span style={{ color: '#86dcf4' }}>Ankh</span>
              </h1>
            </div>
            
            <Button 
              onClick={() => navigate("/kyc")} 
              style={{ backgroundColor: '#f47615' }} 
              className="text-white"
            >
              Get Started
            </Button>
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
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            Your Work
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-orange-500">
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
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Build Your Financial Future with Every Transaction
                </h3>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  From delivery partners to street vendors, every honest worker deserves financial recognition. 
                  Transform your UPI transactions into a powerful credit score.
                </p>
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-6 rounded-full text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105" 
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
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            "Every rupee earned honestly should count towards your financial future"
          </motion.blockquote>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 mt-8"
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
            <h3 className="text-5xl md:text-7xl font-bold text-gray-900">Trust</h3>
            <h3 className="text-5xl md:text-7xl font-bold text-orange-500">Growth</h3>
            <h3 className="text-5xl md:text-7xl font-bold text-gray-900">Future</h3>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              variant="link" 
              className="text-2xl text-blue-600 hover:text-blue-800 underline font-semibold"
              onClick={() => {
                // Scroll to next section or navigate to about page
                document.getElementById('ui-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn About Us →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* UI Screen Section */}
      <section id="ui-section" className="py-24 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Financial Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <div className="bg-gradient-to-br from-orange-500 to-blue-400 p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <IndianRupee className="h-8 w-8 mr-2" />
                    <span className="text-2xl font-bold">BharatAnkh Score</span>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">750</div>
                    <div className="text-sm opacity-90">Good</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-sm opacity-90">Monthly Income</div>
                    <div className="text-2xl font-bold">₹45,000</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-sm opacity-90">Transactions</div>
                    <div className="text-2xl font-bold">234</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-sm opacity-90">Reliability</div>
                    <div className="text-2xl font-bold">98%</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Recent Activity</h4>
                <div className="space-y-3">
                  {[
                    { desc: "Food delivery payment", amount: "+₹1,250", time: "2 hours ago" },
                    { desc: "Grocery store transaction", amount: "+₹850", time: "1 day ago" },
                    { desc: "Ride sharing payment", amount: "+₹2,100", time: "2 days ago" }
                  ].map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{transaction.desc}</div>
                        <div className="text-sm text-gray-500">{transaction.time}</div>
                      </div>
                      <div className="font-bold text-green-600">{transaction.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Your Credit?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of workers already building their financial future
            </p>
            
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 rounded-full text-gray-900 bg-white hover:bg-gray-100 font-semibold transform hover:scale-105 transition-all" 
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
                <h3 className="text-lg font-bold">
                  <span style={{ color: '#f47615' }}>Bharat</span>
                  <span style={{ color: '#86dcf4' }}>Ankh</span>
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering India's workforce with financial recognition through UPI transactions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">How it Works</a></li>
                <li><a href="#" className="hover:text-orange-500">Features</a></li>
                <li><a href="#" className="hover:text-orange-500">Security</a></li>
                <li><a href="#" className="hover:text-orange-500">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500">Careers</a></li>
                <li><a href="#" className="hover:text-orange-500">Contact</a></li>
                <li><a href="#" className="hover:text-orange-500">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-500">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 BharatAnkh. All rights reserved. Built for India's hardworking people.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
