import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  CalendarIcon,
  ClockIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface EconomicEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  country: string;
  impact: 'high' | 'medium' | 'low';
  forecast: string;
  previous: string;
  actual?: string;
}

const EconomicCalendar: React.FC = () => {
  // Mock economic events data
  const [events] = useState<EconomicEvent[]>([
    {
      id: '1',
      title: 'Fed Interest Rate Decision',
      date: '2024-03-20',
      time: '18:00 GMT',
      country: 'USD',
      impact: 'high',
      forecast: '5.50%',
      previous: '5.50%'
    },
    {
      id: '2',
      title: 'ECB Monetary Policy Statement',
      date: '2024-03-21',
      time: '12:45 GMT',
      country: 'EUR',
      impact: 'high',
      forecast: '4.50%',
      previous: '4.50%'
    },
    {
      id: '3',
      title: 'US Non-Farm Payrolls',
      date: '2024-04-05',
      time: '12:30 GMT',
      country: 'USD',
      impact: 'high',
      forecast: '205K',
      previous: '199K'
    },
    {
      id: '4',
      title: 'UK GDP Growth Rate QoQ',
      date: '2024-03-28',
      time: '09:00 GMT',
      country: 'GBP',
      impact: 'medium',
      forecast: '0.3%',
      previous: '0.2%'
    },
    {
      id: '5',
      title: 'Japan Industrial Production MoM',
      date: '2024-03-29',
      time: '04:30 GMT',
      country: 'JPY',
      impact: 'medium',
      forecast: '0.8%',
      previous: '0.7%'
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const views = ['Upcoming', 'This Week', 'Next Week'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Economic Calendar
          </h2>
          <div className="flex space-x-2">
            <select className="px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-700 
                           border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>All Countries</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>JPY</option>
            </select>
          </div>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 p-1 mb-4">
            {views.map((view) => (
              <Tab
                key={view}
                className={({ selected }) =>
                  `w-full py-2 text-sm font-medium leading-5 rounded-lg
                  ${selected
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-blue-600'
                  }
                  `
                }
              >
                {view}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {event.country}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full
                                     ${getImpactColor(event.impact)}`}>
                          {event.impact.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm">{event.date}</span>
                        <ClockIcon className="h-4 w-4 ml-2" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                    </div>

                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {event.title}
                    </div>

                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Forecast
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {event.forecast}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Previous
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {event.previous}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Actual
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {event.actual || '-'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="flex items-center justify-center h-32 
                           bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  This week's events will be displayed here
                </span>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="flex items-center justify-center h-32 
                           bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Next week's events will be displayed here
                </span>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Impact Level
          </div>
          <div className="flex space-x-4">
            {['high', 'medium', 'low'].map((impact) => (
              <div key={impact} className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  getImpactColor(impact).split(' ')[0]
                }`} />
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicCalendar;
