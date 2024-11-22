import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Investment Analyst',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop',
    content: 'The predictive analytics and risk assessment tools have transformed how I analyze investments. This platform is a game-changer for professional investors.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Day Trader',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop',
    content: "The backtesting engine is phenomenal. I've optimized my trading strategies and seen remarkable improvements in my portfolio performance.",
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Portfolio Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop',
    content: 'Intuitive interface combined with powerful analytics. Perfect for both beginners and seasoned investors. The real-time updates are invaluable.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Are Saying
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of investors who are already leveraging our platform to
            enhance their investment strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <button className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            Join Thousands of Happy Users
          </button>
        </motion.div>
      </div>
    </section>
  );
}