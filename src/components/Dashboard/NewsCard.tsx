import { motion } from 'framer-motion';
import { ExternalLink, Newspaper } from 'lucide-react';
import { NewsArticle } from '../../lib/api/newsApi';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {article.description}
          </p>
        </div>
        {!article.image_url && (
          <Newspaper className="w-6 h-6 text-gray-400 ml-4 flex-shrink-0" />
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">{article.source_id}</span>
          <span className="text-sm text-gray-500">
            {new Date(article.pubDate).toLocaleDateString()}
          </span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
        >
          <span className="text-sm mr-1">Read more</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
