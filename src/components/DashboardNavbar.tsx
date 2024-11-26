import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Home,
  TrendingUp, 
  Sun, 
  Moon,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface ThemeContext {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface AuthContext {
  user: any;
  signOut: () => void;
}

const DashboardNavbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme() as ThemeContext;
  const { signOut } = useAuth() as AuthContext;
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm transform"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 shrink-0 group"
            >
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600 transform transition-transform group-hover:scale-110 duration-200" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  FinRisk
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Link */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Sign Out */}
            <button
              onClick={signOut}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="px-4 py-3 space-y-3">
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default DashboardNavbar;
