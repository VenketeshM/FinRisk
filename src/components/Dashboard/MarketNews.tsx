import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { newsApi } from '../../lib/api/newsApi';
import NewsCard from './NewsCard';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function MarketNews() {
  const { data: news, isLoading } = useQuery({
    queryKey: ['marketNews'],
    queryFn: () => newsApi.getFinancialNews(),
  });
  
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm"
    >
      <h3 className="text-gray-900 font-semibold mb-4">Market News</h3>
      
      <div className="space-y-4">
        {news?.articles.slice(0, 5).map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </motion.div>
  );
}