/**
 * Main Application Component
 * 
 * This is the root component of the FinRisk application that sets up:
 * - React Query for data fetching
 * - Theme provider for dark/light mode
 * - Authentication context
 * - Routing configuration
 * - Global layout structure
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Help from './pages/Help';
import Contact from './pages/Contact';
import LegalDisclaimer from './pages/LegalDisclaimer';
import CookieSettings from './pages/CookieSettings';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            {/* Main layout wrapper */}
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
              {/* Global navigation */}
              <Navbar />
              
              {/* Main content area */}
              <div className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  
                  {/* Protected Dashboard Route */}
                  <Route
                    path="/dashboard/*"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Legal Pages */}
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
                  <Route path="/cookie-settings" element={<CookieSettings />} />
                  
                  {/* Support Pages */}
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Fallback route for unmatched paths */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              
              {/* Global footer */}
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;