import React, { useState } from 'react';
import { AcademicCapIcon, BookOpenIcon, ChartBarIcon, PlayIcon } from '@heroicons/react/20/solid';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  progress: number;
  thumbnail: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'guide';
  duration: string;
  author: string;
}

const EducationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'resources'>('courses');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Technical Analysis',
      description: 'Learn the fundamentals of chart patterns and technical indicators.',
      duration: '2 hours',
      level: 'Beginner',
      category: 'Technical Analysis',
      progress: 75,
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=tech'
    },
    {
      id: '2',
      title: 'Advanced Options Trading Strategies',
      description: 'Master complex options strategies and risk management techniques.',
      duration: '4 hours',
      level: 'Advanced',
      category: 'Options',
      progress: 30,
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=options'
    },
    {
      id: '3',
      title: 'Fundamental Analysis Masterclass',
      description: 'Deep dive into financial statements and company valuation.',
      duration: '3 hours',
      level: 'Intermediate',
      category: 'Fundamental Analysis',
      progress: 0,
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=fundamental'
    }
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Market Cycles',
      type: 'article',
      duration: '10 min read',
      author: 'John Smith'
    },
    {
      id: '2',
      title: 'Risk Management Essentials',
      type: 'video',
      duration: '15 min watch',
      author: 'Emma Wilson'
    },
    {
      id: '3',
      title: 'Cryptocurrency Trading Guide',
      type: 'guide',
      duration: '20 min read',
      author: 'Michael Brown'
    }
  ];

  const filteredCourses = courses.filter(course => 
    selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel
  );

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return <BookOpenIcon className="h-5 w-5" />;
      case 'video':
        return <PlayIcon className="h-5 w-5" />;
      case 'guide':
        return <ChartBarIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Education Center
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enhance your trading knowledge and skills
        </p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-4 text-sm font-medium ${
            activeTab === 'courses'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-4 text-sm font-medium ${
            activeTab === 'resources'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Resources
        </button>
      </div>

      {activeTab === 'courses' && (
        <>
          <div className="flex space-x-2">
            {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  selectedLevel === level
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-32 object-cover bg-gray-100 dark:bg-gray-700"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      {course.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {course.description}
                  </p>
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
                            {course.progress}% Complete
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                            {course.level}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
                        <div
                          style={{ width: `${course.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'resources' && (
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  {getResourceIcon(resource.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {resource.title}
                </h3>
                <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{resource.author}</span>
                  <span>•</span>
                  <span>{resource.duration}</span>
                  <span>•</span>
                  <span className="capitalize">{resource.type}</span>
                </div>
              </div>
              <button className="flex-shrink-0 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationCenter;
