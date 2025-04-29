
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  message: string;
  isVisible: boolean;
}

const LoadingOverlay = ({ message, isVisible }: LoadingOverlayProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 max-w-[90%]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-semibold text-lg text-center">{message}</p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-[progress_3s_linear_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
