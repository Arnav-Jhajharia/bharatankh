
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-heading">
              <span className="text-brand-blue">Bharat</span>
              <span className="text-primary font-bold">Ankh</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate("/kyc")} 
              className="bg-primary text-white font-body hover:bg-primary/90"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate("/institutional")} 
              variant="outline"
              className="text-gray-700 border-gray-300 hover:bg-gray-50 font-body"
            >
              For Institutions
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
