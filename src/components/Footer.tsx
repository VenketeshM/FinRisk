import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail,
  Linkedin, 
  Github, 
  Instagram,
  Globe,
  AlertCircle,
  ChevronRight,
  MessageCircle,
  ChevronUp,
  Award,
  BookOpen,
  Shield,
  HelpCircle,
  FileText,
  ArrowUpCircle
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    // Scroll to top smoothly after a small delay to ensure navigation completes
    setTimeout(scrollToTop, 100);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        alert('Thank you for subscribing!');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Company
            </h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                About Us
              </Link>
              <Link to="/careers" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                Careers
              </Link>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <Link to="/status" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                  System Status
                </Link>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Legal
            </h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                Terms of Use
              </Link>
              <Link to="/legal-disclaimer" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                Legal Disclaimer
              </Link>
              <Link to="/cookie-settings" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                Cookie Settings
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              Support
            </h3>
            <div className="space-y-2">
              <Link to="/faq" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                FAQ
              </Link>
              <Link to="/help" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                Help Center
              </Link>
              <Link to="/contact" className="block text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" onClick={handleLinkClick}>
                Contact Us
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Stay Updated
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Awards and Certifications */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
            >
              <Award className="h-6 w-6 text-blue-600" />
              <span>Best FinTech Solution 2023</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
            >
              <Shield className="h-6 w-6 text-green-600" />
              <span>ISO 27001 Certified</span>
            </motion.div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Contact Info */}
            <div className="flex space-x-6 text-gray-500 dark:text-gray-400">
              <a
                href="mailto:venketeshofficial.1@gmail.com"
                className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">venketeshofficial.1@gmail.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/venketesh-kini-m"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/VenketeshM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/venketesh.kini.m/profilecard/?igsh=MWg5ZDhtZTliZHphNg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://wa.me/917907758505"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-6 w-6" />
              </motion.a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} FinRisk. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => {/* TODO: Implement language selection */}}
                className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <Globe className="h-5 w-5 mr-1" />
                <span>English</span>
              </button>
              <Link
                to="/accessibility"
                className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <AlertCircle className="h-5 w-5 mr-1" />
                <span>Accessibility</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
