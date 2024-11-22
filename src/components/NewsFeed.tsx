import React, { useState } from 'react';
import { ExternalLink, Clock, Tag } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  timestamp: string;
  tags: string[];
  url: string;
  summary: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'Federal Reserve Signals Potential Rate Cuts in 2024',
    source: 'Financial Times',
    timestamp: '2 hours ago',
    tags: ['Monetary Policy', 'Interest Rates'],
    url: '#',
    summary: 'The Federal Reserve has indicated it may cut interest rates three times in 2024 as inflation shows signs of cooling...',
  },
  {
    id: 2,
    title: 'Tech Stocks Rally on AI Developments',
    source: 'Bloomberg',
    timestamp: '4 hours ago',
    tags: ['Technology', 'AI', 'Stock Market'],
    url: '#',
    summary: 'Major technology stocks saw significant gains as new developments in artificial intelligence sparked investor optimism...',
  },
  {
    id: 3,
    title: 'Global Markets React to Economic Data',
    source: 'Reuters',
    timestamp: '6 hours ago',
    tags: ['Global Markets', 'Economic Data'],
    url: '#',
    summary: 'Markets worldwide showed mixed reactions to the latest economic indicators, with Asian markets leading gains...',
  },
];

export default function NewsFeed() {
  const [news] = useState<NewsItem[]>(mockNews);

  return (
    <div className="bg-background rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-text mb-6">Latest Financial News</h2>
      <div className="space-y-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="group bg-surface rounded-lg p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <p className="text-text-secondary mb-3">{item.summary}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center text-text-secondary">
                <Clock className="w-4 h-4 mr-1" />
                {item.timestamp}
              </span>
              <span className="text-text-secondary">•</span>
              <span className="text-primary">{item.source}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button className="text-primary hover:text-primary-dark transition-colors">
          Load More News
        </button>
      </div>
    </div>
  );
}
