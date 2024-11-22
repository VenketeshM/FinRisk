import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  index: number;
}

export default function TestimonialCard({
  name,
  role,
  image,
  content,
  rating,
  index,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="h-full p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center mb-6">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4"
            src={image}
            alt={name}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="text-yellow-400 fill-current"
            />
          ))}
        </div>

        <p className="text-gray-600 leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
}