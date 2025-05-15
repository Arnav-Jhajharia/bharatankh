
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`min-h-screen bg-white px-4 py-6 sm:px-6 ${className}`}>
      <div className="w-full max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
