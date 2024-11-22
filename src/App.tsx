import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import Hero from './components/Hero';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import PrivateRoute from './components/PrivateRoute';
import Pricing from './components/Pricing';
import Settings from './components/Settings';
import Testimonials from './components/Testimonials';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <main className="min-h-screen bg-white">
                  <Navbar />
                  <Hero />
                  <Features />
                  <Testimonials />
                  <Pricing />
                </main>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <Dashboard />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/portfolio"
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <Portfolio />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <Settings />
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}