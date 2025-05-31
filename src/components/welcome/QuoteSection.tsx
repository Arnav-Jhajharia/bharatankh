
import { motion } from "framer-motion";

const QuoteSection = () => {
  return (
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
  );
};

export default QuoteSection;
