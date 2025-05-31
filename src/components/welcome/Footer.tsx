
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-heading">
                <span className="text-brand-blue">Bharat</span>
                <span className="text-primary font-bold">Ankh</span>
              </h3>
            </div>
            <p className="text-gray-600 text-sm font-body">
              Empowering India's workforce with financial recognition through UPI transactions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 font-heading">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-600 font-body">
              <li><a href="#" className="hover:text-primary">How it Works</a></li>
              <li><a href="#" className="hover:text-primary">Features</a></li>
              <li><a href="#" className="hover:text-primary">Security</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 font-heading">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600 font-body">
              <li>
                <button 
                  onClick={() => navigate("/team")} 
                  className="hover:text-primary text-left"
                >
                  About Us
                </button>
              </li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 font-heading">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600 font-body">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Status</a></li>
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
