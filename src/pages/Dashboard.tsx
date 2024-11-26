import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChartBarIcon, CurrencyDollarIcon, NewspaperIcon,
  UserCircleIcon, Cog6ToothIcon, BellIcon,
  MagnifyingGlassIcon, HomeIcon, ChartPieIcon,
  ShieldCheckIcon, LightBulbIcon, DocumentTextIcon,
  ArrowLeftOnRectangleIcon, ArrowTrendingUpIcon,
  XMarkIcon, Bars3Icon, PlusIcon,
  SunIcon, MoonIcon, BuildingLibraryIcon,
  FireIcon, GlobeAltIcon, TableCellsIcon,
  ViewColumnsIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon
} from '@heroicons/react/24/outline';

// Import Components
import AdvancedTrading from '../components/dashboard/AdvancedTrading';
import MLPredictions from '../components/dashboard/MLPredictions';
import MarketWatch from '../components/dashboard/MarketWatch';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import RiskMetrics from '../components/dashboard/RiskMetrics';
import NewsPanel from '../components/dashboard/NewsPanel';
import AIInsights from '../components/dashboard/AIInsights';
import MarketHeatmap from '../components/dashboard/MarketHeatmap';
import CurrencyConverter from '../components/dashboard/CurrencyConverter';
import EconomicCalendar from '../components/dashboard/EconomicCalendar';
import TradingView from '../components/dashboard/TradingView';
import HeatmapView from '../components/dashboard/HeatmapView';
import OptionsAnalysis from '../components/dashboard/OptionsAnalysis';
import FuturesAnalysis from '../components/dashboard/FuturesAnalysis';
import MainDashboard from '../components/dashboard/MainDashboard';
import DashboardSkeleton from '../components/skeletons/DashboardSkeleton';

interface NavItem {
  id: string;
  name: string;
  icon: any;
  description: string;
}

const mockPortfolioData = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    qty: 100,
    avgPrice: 150.25,
    currentPrice: 175.50,
    return: 25.25,
    returnPercentage: 16.81
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    qty: 50,
    avgPrice: 285.75,
    currentPrice: 310.20,
    return: 24.45,
    returnPercentage: 8.56
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    qty: 30,
    avgPrice: 2750.00,
    currentPrice: 2850.00,
    return: 100.00,
    returnPercentage: 3.64
  }
];

const Dashboard: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'main';
  const [activeSection, setActiveSection] = useState(currentPath);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'main';
    setActiveSection(path);
  }, [location]);

  // Simulate loading when changing sections
  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`/dashboard/${sectionId}`);
  };

  // Navigation Items
  const navItems: NavItem[] = [
    {
      id: 'main',
      name: 'Main Dashboard',
      icon: ViewColumnsIcon,
      description: 'Overview of all key features'
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: HomeIcon,
      description: 'Overview of your holdings and performance'
    },
    {
      id: 'heatmap',
      name: 'Market Heatmap',
      icon: TableCellsIcon,
      description: 'Visual representation of market performance'
    },
    {
      id: 'market',
      name: 'Market Watch',
      icon: ChartBarIcon,
      description: 'Real-time market data and watchlists'
    },
    {
      id: 'exchange',
      name: 'Exchange',
      icon: BuildingLibraryIcon,
      description: 'Currency and asset exchange'
    },
    {
      id: 'trading',
      name: 'Trading',
      icon: TableCellsIcon,
      description: 'Advanced trading platform'
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: CurrencyDollarIcon,
      description: 'Order management and history'
    },
    {
      id: 'risk',
      name: 'Risk Analysis',
      icon: ShieldCheckIcon,
      description: 'Portfolio risk metrics and analysis'
    },
    {
      id: 'options',
      name: 'Options & Futures',
      icon: FireIcon,
      description: 'Derivatives analytics and strategies'
    },
    {
      id: 'ai',
      name: 'AI Insights',
      icon: LightBulbIcon,
      description: 'ML-powered predictions and insights'
    },
    {
      id: 'news',
      name: 'News',
      icon: NewspaperIcon,
      description: 'Latest financial news and updates'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'main':
        return <MainDashboard />;
      case 'portfolio':
        return <PortfolioSummary data={mockPortfolioData} />;
      case 'heatmap':
        return <HeatmapView />;
      case 'market':
        return <MarketWatch />;
      case 'exchange':
        return <CurrencyConverter />;
      case 'trading':
        return <AdvancedTrading />;
      case 'orders':
        return <TradingView />;
      case 'risk':
        return <RiskMetrics />;
      case 'options':
        return <OptionsAnalysis />;
      case 'futures':
        return <FuturesAnalysis />;
      case 'ai':
        return <AIInsights />;
      case 'news':
        return <NewsPanel />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 z-30">
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-2">
              <ArrowTrendingUpIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FinRisk
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center px-3 py-2 my-1 mx-2 rounded-lg ${
                  activeSection === item.id
                    ? 'bg-blue-50/80 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/30'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">
                  {item.name}
                </span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/30"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span className="ml-3 text-sm font-medium">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="min-h-screen p-8">
          <div className="w-full h-full overflow-hidden rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
