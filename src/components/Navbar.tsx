import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, X, Sun, Moon, TrendingUp, ChevronDown, HelpCircle, Book, Mail, Shield, FileText, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -5,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.3,
      stiffness: 150,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const DropdownItem = ({ icon: Icon, name, href, onClick }: { icon: any, name: string, href: string, onClick: () => void }) => (
  <Link
    to={href}
    onClick={onClick}
    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-all duration-200 hover:translate-x-1"
  >
    <Icon className="h-4 w-4 mr-3 text-blue-500/70 dark:text-blue-400/70" />
    <span>{name}</span>
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Contact', href: '/#contact' },
    {
      name: 'More',
      items: [
        {
          name: 'Support',
          items: [
            { name: 'FAQ', href: '/faq', icon: HelpCircle },
            { name: 'Help', href: '/help', icon: Book },
            { name: 'Contact Us', href: '/contact', icon: Mail },
          ]
        },
        {
          name: 'Legal',
          items: [
            { name: 'Privacy Policy', href: '/privacy', icon: Shield },
            { name: 'Terms of Use', href: '/terms', icon: FileText },
            { name: 'Legal Disclaimer', href: '/legal-disclaimer', icon: Shield },
            { name: 'Cookie Settings', href: '/cookie-settings', icon: Settings },
          ]
        }
      ]
    },
    ...(user ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setOpenDropdown(null);
    if (href === '/') {
      if (window.location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm transform`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 shrink-0 group"
            onClick={() => handleNavClick('/')}
          >
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600 transform transition-transform group-hover:scale-110 duration-200" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FinRisk
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.items ? (
                <div key={item.name} className="relative group" ref={dropdownRef}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    className={`text-sm font-medium transition-all duration-200 flex items-center space-x-1 group hover:-translate-y-0.5 ${
                      openDropdown === item.name
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      openDropdown === item.name ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg shadow-gray-200/20 dark:shadow-none bg-white dark:bg-gray-800/95 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
                      >
                        {item.items.map((section) => (
                          <div key={section.name} className="py-2">
                            <div className="px-4 py-2 text-xs font-semibold text-blue-600/80 dark:text-blue-400/80 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700/80">
                              {section.name}
                            </div>
                            <div className="py-1">
                              {section.items.map((subItem) => (
                                <DropdownItem
                                  key={subItem.name}
                                  icon={subItem.icon}
                                  name={subItem.name}
                                  href={subItem.href}
                                  onClick={() => {
                                    handleNavClick(subItem.href);
                                    setOpenDropdown(null);
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {user ? (
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                item.items ? (
                  <div key={item.name} className="rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="w-full px-3 py-2 text-base font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          openDropdown === item.name ? 'transform rotate-180' : ''
                        }`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4"
                        >
                          {item.items.map((section) => (
                            <div key={section.name}>
                              <div className="px-3 py-2 text-xs font-semibold text-blue-600/80 dark:text-blue-400/80 uppercase tracking-wider">
                                {section.name}
                              </div>
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  onClick={() => {
                                    handleNavClick(subItem.href);
                                    setIsOpen(false);
                                  }}
                                  className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-200"
                                >
                                  <subItem.icon className="h-4 w-4 mr-3 text-blue-500/70 dark:text-blue-400/70" />
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-gray-800/80'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}