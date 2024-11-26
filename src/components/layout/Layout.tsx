import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import DashboardNavbar from '../DashboardNavbar';
import {
  Home as HomeIcon,
  BarChart2 as ChartBarIcon,
  DollarSign as CurrencyDollarIcon,
  Shield as ShieldCheckIcon,
  Lightbulb as LightBulbIcon,
  FileText as DocumentTextIcon,
  Newspaper as NewspaperIcon,
  Settings as Cog6ToothIcon,
  Building2 as BuildingLibraryIcon,
  TrendingUp as ArrowTrendingUpIcon,
  Flame as FireIcon,
  Table as TableCellsIcon,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  path: string;
  name: string;
  icon: any;
  description: string;
}

const navItems: NavItem[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: HomeIcon,
    description: 'Overview and summary'
  },
  {
    path: '/dashboard/portfolio',
    name: 'Portfolio',
    icon: ChartBarIcon,
    description: 'Manage your investments'
  },
  {
    path: '/dashboard/market-watch',
    name: 'Market Watch',
    icon: ArrowTrendingUpIcon,
    description: 'Track market movements'
  },
  {
    path: '/dashboard/exchange',
    name: 'Exchange',
    icon: BuildingLibraryIcon,
    description: 'Trade assets'
  },
  {
    path: '/dashboard/trading',
    name: 'Trading',
    icon: CurrencyDollarIcon,
    description: 'Advanced trading platform'
  },
  {
    path: '/dashboard/orders',
    name: 'Orders',
    icon: DocumentTextIcon,
    description: 'Order history'
  },
  {
    path: '/dashboard/risk-analysis',
    name: 'Risk Analysis',
    icon: ShieldCheckIcon,
    description: 'Portfolio risk metrics'
  },
  {
    path: '/dashboard/options-and-futures',
    name: 'Options & Futures',
    icon: FireIcon,
    description: 'Derivatives trading'
  },
  {
    path: '/dashboard/ai-insights',
    name: 'AI Insights',
    icon: LightBulbIcon,
    description: 'ML-powered predictions'
  },
  {
    path: '/dashboard/market-heatmap',
    name: 'Market Heatmap',
    icon: TableCellsIcon,
    description: 'Visual market overview'
  },
  {
    path: '/dashboard/reports',
    name: 'Reports',
    icon: DocumentTextIcon,
    description: 'Performance reports'
  },
  {
    path: '/dashboard/news',
    name: 'News',
    icon: NewspaperIcon,
    description: 'Market news'
  },
  {
    path: '/dashboard/settings',
    name: 'Settings',
    icon: Cog6ToothIcon,
    description: 'App settings'
  }
];

const Layout: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen font-inter ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Dashboard Navbar */}
      <DashboardNavbar />

      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full 
                   bg-blue-600 text-white shadow-lg hover:bg-blue-700
                   transition-all duration-200 transform hover:scale-105`}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-14 bottom-0 
                   bg-white/90 dark:bg-gray-800/90 
                   backdrop-blur-lg border-r border-gray-200 dark:border-gray-700
                   transition-all duration-300 ease-in-out z-40
                   md:translate-x-0
                   ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                   ${isSidebarCollapsed ? 'md:w-16' : 'md:w-64'}
                   w-64`}
      >
        <div className="h-full overflow-y-auto">
          {/* Navigation Items */}
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 p-2.5 rounded-xl
                          transition-all duration-200 group
                          ${location.pathname === item.path
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                  location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'
                }`} />
                <span className="font-medium truncate">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Collapse Button - Only visible on desktop */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`absolute bottom-4 ${isSidebarCollapsed ? 'right-2' : 'right-4'} 
                     p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 
                     text-blue-600 dark:text-blue-400
                     hover:bg-blue-100 dark:hover:bg-blue-800/40
                     transition-all duration-200 transform hover:scale-105
                     shadow-sm hover:shadow-md
                     hidden md:block`}
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-300 ${
              isSidebarCollapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isSidebarCollapsed 
                ? 'M9 5l7 7-7 7' 
                : 'M15 19l-7-7 7-7'}
            />
          </svg>
        </button>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`pt-14 min-h-screen transition-all duration-300 ease-in-out
                     md:pl-64 ${isSidebarCollapsed ? 'md:pl-16' : ''}`}>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
