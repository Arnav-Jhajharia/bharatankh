
import Header from "@/components/welcome/Header";
import HeroSection from "@/components/welcome/HeroSection";
import QuoteSection from "@/components/welcome/QuoteSection";
import ThreeWordsSection from "@/components/welcome/ThreeWordsSection";
import DashboardSection from "@/components/welcome/DashboardSection";
import InstitutionalSection from "@/components/welcome/InstitutionalSection";
import AnalysisSection from "@/components/welcome/AnalysisSection";
import TeamCTASection from "@/components/welcome/TeamCTASection";
import FinalCTASection from "@/components/welcome/FinalCTASection";
import Footer from "@/components/welcome/Footer";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <QuoteSection />
      <ThreeWordsSection />
      <DashboardSection />
      <InstitutionalSection />
      <AnalysisSection />
      <TeamCTASection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default WelcomePage;
