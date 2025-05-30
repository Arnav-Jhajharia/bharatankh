
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20 px-4 py-8 sm:px-6 ${className}`}>
      <div className="w-full max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
