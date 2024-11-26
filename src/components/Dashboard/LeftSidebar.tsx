import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  WalletIcon,
  ChartPieIcon,
  NewspaperIcon,
  BellIcon,
  CogIcon,
  UserCircleIcon,
  PlusCircleIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
  badge?: string | number;
}

const LeftSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const mainNavItems: NavItem[] = [
    { name: 'Dashboard', icon: ChartBarIcon, href: '/dashboard' },
    { name: 'Portfolio', icon: WalletIcon, href: '/portfolio' },
    { name: 'Analytics', icon: ChartPieIcon, href: '/analytics' },
    { name: 'News', icon: NewspaperIcon, href: '/news', badge: '5' },
    { name: 'Alerts', icon: BellIcon, href: '/alerts', badge: '3' },
  ];

  const quickActions = [
    { name: 'Buy Assets', icon: PlusCircleIcon, href: '/trade/buy' },
    { name: 'Sell Assets', icon: ArrowTrendingUpIcon, href: '/trade/sell' },
    { name: 'Transfer Funds', icon: BanknotesIcon, href: '/transfer' },
    { name: 'Auto Invest', icon: ArrowPathIcon, href: '/auto-invest' },
  ];

  const bottomNavItems: NavItem[] = [
    { name: 'Settings', icon: CogIcon, href: '/settings' },
    { name: 'Profile', icon: UserCircleIcon, href: '/profile' },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-8 py-6">
        <div className="space-y-2">
          {mainNavItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ x: 4 }}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem(item.name.toLowerCase());
              }}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeItem === item.name.toLowerCase()
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </motion.a>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="mt-2 space-y-1">
            {quickActions.map((action) => (
              <motion.a
                key={action.name}
                href={action.href}
                whileHover={{ x: 4 }}
                className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <action.icon className="h-5 w-5" />
                <span>{action.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {bottomNavItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            whileHover={{ x: 4 }}
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
