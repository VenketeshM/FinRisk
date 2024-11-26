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

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import SignIn from './pages/SignIn'; // Import the new SignIn component
import SignUp from './pages/SignUp';
import Layout from './components/layout/Layout';
import PublicLayout from './components/layout/PublicLayout';
import Portfolio from './pages/Portfolio';
import MarketWatch from './pages/MarketWatch';
import Exchange from './pages/Exchange';
import Trading from './pages/Trading';
import Orders from './pages/Orders';
import RiskAnalysis from './pages/RiskAnalysis';
import OptionsAndFutures from './pages/OptionsAndFutures';
import AIInsights from './pages/AIInsights';
import MarketHeatmap from './pages/MarketHeatmap';
import Reports from './pages/Reports';
import News from './pages/News';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Help from './pages/Help';
import Contact from './pages/Contact';
import LegalDisclaimer from './pages/LegalDisclaimer';
import CookieSettings from './pages/CookieSettings';
import PageTransition from './components/common/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingFooter from './components/LandingFooter';

// Create a new query client instance
const queryClient = new QueryClient();

// Wrapper for protected routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();
  
  return (
    <Routes location={location}>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={
          user ? <Navigate to="/dashboard" replace /> : <SignIn />
        } />
        <Route path="signup" element={
          user ? <Navigate to="/dashboard" replace /> : <SignUp />
        } />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="help" element={<Help />} />
        <Route path="contact" element={<Contact />} />
        <Route path="legal-disclaimer" element={<LegalDisclaimer />} />
        <Route path="cookie-settings" element={<CookieSettings />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Portfolio />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="market-watch" element={<MarketWatch />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="trading" element={<Trading />} />
        <Route path="orders" element={<Orders />} />
        <Route path="risk-analysis" element={<RiskAnalysis />} />
        <Route path="options-and-futures" element={<OptionsAndFutures />} />
        <Route path="ai-insights" element={<AIInsights />} />
        <Route path="market-heatmap" element={<MarketHeatmap />} />
        <Route path="reports" element={<Reports />} />
        <Route path="news" element={<News />} />
        <Route path="settings" element={<Settings />} />
      </Route>
        
      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;