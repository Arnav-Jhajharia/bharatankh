
import { IndianRupee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
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
              <li><a href="#" className="hover:text-orange-500">About Us</a></li>
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
  );
};

export default Footer;
