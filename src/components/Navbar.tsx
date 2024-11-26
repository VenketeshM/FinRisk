import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Sun, 
  Moon,
  Menu,
  X,
  ChevronDown,
  Home,
  BarChart2,
  DollarSign,
  Shield,
  FileText,
  Settings,
  HelpCircle,
  LifeBuoy,
  Scale,
  AlertCircle,
  HeartHandshake,
  Mail
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon?: any;
  items?: {
    name: string;
    href: string;
    icon: any;
    description: string;
  }[];
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigation: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Contact', href: '/#contact' },
    {
      name: 'More',
      href: '#',
      items: [
        {
          name: 'Privacy Policy',
          href: '/privacy',
          icon: Shield,
          description: 'Our privacy and data protection policies'
        },
        {
          name: 'Terms of Use',
          href: '/terms',
          icon: FileText,
          description: 'Terms and conditions of use'
        },
        {
          name: 'Legal Disclaimer',
          href: '/legal-disclaimer',
          icon: AlertCircle,
          description: 'Important legal disclaimers'
        },
        {
          name: 'Cookie Settings',
          href: '/cookie-settings',
          icon: Settings,
          description: 'Manage your cookie preferences'
        },
        {
          name: 'FAQ',
          href: '/faq',
          icon: HelpCircle,
          description: 'Frequently asked questions'
        },
        {
          name: 'Help Center',
          href: '/help',
          icon: HeartHandshake,
          description: 'Browse help articles and guides'
        },
        {
          name: 'Contact Us',
          href: '/contact',
          icon: Mail,
          description: 'Get in touch with our team'
        }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
      
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      
      setVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 transition-transform duration-300 ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <TrendingUp className="h-8 w-8 text-blue-600 transform transition-transform group-hover:scale-110 duration-200" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FinRisk
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            {navigation.map((item) => (
              item.items ? (
                <div key={item.name} className="relative px-4" ref={dropdownRef}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <subItem.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                              <div>
                                <p className="font-medium">{subItem.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{subItem.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right side - Theme Toggle and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-3 space-y-3">
              {navigation.map((item) => (
                item.items ? (
                  <div key={item.name} className="space-y-2">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-2"
                        >
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              <subItem.icon className="mr-3 h-5 w-5" />
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavClick(item.href);
                    }}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              <button
                onClick={toggleTheme}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="mr-3 h-5 w-5" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-3 h-5 w-5" />
                    Dark Mode
                  </>
                )}
              </button>

              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="block w-full px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;