import React, { useState } from 'react';
import { ChatBubbleLeftIcon, HeartIcon, ArrowPathIcon } from '@heroicons/react/20/solid';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked: boolean;
}

const SocialFeed: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'stocks' | 'crypto' | 'forex'>('all');
  
  const mockPosts: Post[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      content: 'Just analyzed the latest tech earnings. Seeing strong potential in AI-focused companies. What are your thoughts on the sector? #TechStocks #AI',
      timestamp: '10 minutes ago',
      likes: 45,
      comments: 12,
      tags: ['stocks', 'tech'],
      isLiked: false
    },
    {
      id: '2',
      author: 'Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      content: 'Bitcoin showing interesting patterns at key resistance levels. Keep an eye on the 4H chart. #Crypto #TechnicalAnalysis',
      timestamp: '25 minutes ago',
      likes: 32,
      comments: 8,
      tags: ['crypto', 'bitcoin'],
      isLiked: true
    },
    {
      id: '3',
      author: 'Emma Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      content: 'EUR/USD approaching critical support. Watch for potential reversal signals. #Forex #Trading',
      timestamp: '1 hour ago',
      likes: 28,
      comments: 15,
      tags: ['forex', 'trading'],
      isLiked: false
    },
    {
      id: '4',
      author: 'Alex Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      content: 'Green energy stocks surging after new policy announcements. Renewable sector looking promising for Q2. #Stocks #GreenEnergy',
      timestamp: '2 hours ago',
      likes: 56,
      comments: 23,
      tags: ['stocks', 'energy'],
      isLiked: true
    }
  ];

  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.tags.includes(filter);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Trading Community
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Connect with traders and share insights
          </p>
        </div>
        <button
          onClick={() => setPosts(mockPosts)}
          className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex space-x-2">
        {(['all', 'stocks', 'crypto', 'forex'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
              filter === f
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
          >
            <div className="flex space-x-3">
              <img
                src={post.avatar}
                alt={post.author}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {post.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.timestamp}
                </p>
              </div>
            </div>
            
            <p className="mt-4 text-gray-800 dark:text-gray-200">
              {post.content}
            </p>
            
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 ${
                  post.isLiked
                    ? 'text-red-500'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <HeartIcon className="h-5 w-5" />
                <span>{post.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <ChatBubbleLeftIcon className="h-5 w-5" />
                <span>{post.comments}</span>
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs dark:bg-gray-700 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
