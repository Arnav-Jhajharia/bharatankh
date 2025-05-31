
import { motion } from "framer-motion";

const ThreeWordsSection = () => {
  return (
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
  );
};

export default ThreeWordsSection;
