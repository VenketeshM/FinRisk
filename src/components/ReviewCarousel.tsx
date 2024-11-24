import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Badge, ThumbsUp, ChevronUp, ChevronDown } from "lucide-react";

export interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  isVerified: boolean;
  helpfulCount?: number;
  date?: string;
}

interface ReviewCarouselProps {
  initialReviews?: Review[];
}

// Default review data
const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Arjun Kapoor",
    role: "Senior Investment Analyst",
    company: "Global Investments Ltd",
    image: "/avatars/person1.jpg",
    content: "The risk assessment tools provided by FinRisk have transformed how we analyze market volatility. Exceptional platform!",
    rating: 5,
    isVerified: true,
    helpfulCount: 128,
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Meera Patel",
    role: "Portfolio Manager",
    company: "Wealth Managers International",
    image: "/avatars/person2.jpg",
    content: "Intuitive interface with powerful analytics. Makes complex financial data easily digestible.",
    rating: 4,
    isVerified: true,
    helpfulCount: 95,
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Rohan Verma",
    role: "Risk Management Director",
    company: "Future Finance Corp",
    image: "/avatars/person3.jpg",
    content: "The real-time monitoring features have helped us identify potential risks before they materialize. Outstanding service!",
    rating: 5,
    isVerified: true,
    helpfulCount: 76,
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Ananya Shah",
    role: "Financial Advisor",
    company: "Elite Advisors Group",
    image: "/avatars/person4.jpg",
    content: "FinRisk's predictive analytics have become an integral part of our investment strategy. Highly recommended!",
    rating: 5,
    isVerified: true,
    helpfulCount: 112,
    date: "1 week ago"
  },
  {
    id: 5,
    name: "Dev Malhotra",
    role: "Chief Risk Officer",
    company: "Secure Banking Solutions",
    image: "/avatars/person5.jpg",
    content: "Comprehensive risk management suite that has streamlined our entire analysis process.",
    rating: 4,
    isVerified: true,
    helpfulCount: 89,
    date: "2 months ago"
  },
  {
    id: 6,
    name: "Zara Iyer",
    role: "Investment Strategist",
    company: "Progressive Financial Services",
    image: "/avatars/person6.jpg",
    content: "The customer support is exceptional, and the platform's capabilities exceed our expectations.",
    rating: 5,
    isVerified: true,
    helpfulCount: 67,
    date: "3 weeks ago"
  }
];

const ReviewCarousel = ({ initialReviews = defaultReviews }: ReviewCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === initialReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [initialReviews.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
      rotateX: direction > 0 ? 15 : -15
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
      rotateX: direction < 0 ? 15 : -15
    })
  };

  const ratingDistribution = {
    5: 70,
    4: 20,
    3: 7,
    2: 2,
    1: 1,
  };

  // Highlight specific keywords in the review text
  const highlightKeywords = (text: string) => {
    const keywords = ['innovative', 'trustworthy', 'reliable', 'excellent', 'amazing', 'secure', 'professional'];
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="font-semibold text-blue-600 dark:text-blue-400">$1</span>');
    });
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return initialReviews.length - 1;
      if (nextIndex >= initialReviews.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative max-w-7xl mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 -z-10" />
      
      <div className="grid lg:grid-cols-3 gap-8 p-8">
        {/* Rating Summary */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg h-fit lg:sticky lg:top-8 border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Customer Reviews
          </h3>
          
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 to-transparent dark:from-blue-800/20 rounded-lg -z-10" />
            <div className="text-5xl font-bold text-center mb-2">4.7</div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: star * 0.1 }}
                >
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Based on 1,234 reviews
            </p>
          </div>

          {Object.entries(ratingDistribution)
            .reverse()
            .map(([rating, percentage], index) => (
              <motion.div
                key={rating}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-4 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 w-24">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Review Carousel */}
        <div className="lg:col-span-2">
          <div className="relative min-h-[500px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full perspective-1000"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg transform-gpu backface-hidden border border-gray-100 dark:border-gray-800"
                >
                  <motion.div 
                    className="flex items-start gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div className="relative">
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 90, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <motion.img
                        src={initialReviews[currentIndex].image}
                        alt={initialReviews[currentIndex].name}
                        className="relative w-24 h-24 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      />
                    </motion.div>

                    <div className="flex-1">
                      <motion.div 
                        className="flex items-center gap-2 mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {initialReviews[currentIndex].name}
                        </h3>
                        {initialReviews[currentIndex].isVerified && (
                          <Badge className="w-5 h-5 text-blue-500" />
                        )}
                      </motion.div>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-400 text-base mb-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {initialReviews[currentIndex].role} at{" "}
                        <span className="font-semibold">{initialReviews[currentIndex].company}</span>
                      </motion.p>
                      <motion.div 
                        className="flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {[...Array(initialReviews[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative mt-8 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="absolute -left-2 -top-2 text-6xl text-blue-200 dark:text-blue-900/30">"</div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg relative z-10 pl-6 leading-relaxed">
                      {highlightKeywords(initialReviews[currentIndex].content)}
                    </p>
                    <div className="absolute -right-2 bottom-0 text-6xl rotate-180 text-blue-200 dark:text-blue-900/30">"</div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      <span>
                        {initialReviews[currentIndex].helpfulCount || 0} found this helpful
                      </span>
                    </div>
                    <span>{initialReviews[currentIndex].date || "2 days ago"}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              className="absolute left-1/2 -translate-x-1/2 -top-4 z-10 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
            <motion.button
              className="absolute left-1/2 -translate-x-1/2 -bottom-4 z-10 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {initialReviews.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8"
                    : "bg-gray-300 dark:bg-gray-700 w-2"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
