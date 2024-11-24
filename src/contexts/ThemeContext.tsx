/**
 * Theme Context
 * 
 * Provides theme management throughout the application.
 * Handles dark/light mode switching and persistence.
 * 
 * Features:
 * - Theme state management (dark/light)
 * - Theme persistence in localStorage
 * - Automatic system preference detection
 * - Smooth theme transitions
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of our theme context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook for easy theme context consumption
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Theme Provider
 * 
 * Provides the theme context to the application.
 * Handles theme state management and persistence.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme state from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update document classes when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // Apply theme colors
    const style = document.documentElement.style;
    if (isDarkMode) {
      // Dark theme colors - Modern dark blue theme
      style.setProperty('--primary', '#2563eb');
      style.setProperty('--primary-dark', '#1d4ed8');
      style.setProperty('--primary-light', '#3b82f6');
      style.setProperty('--background', '#0f172a');
      style.setProperty('--surface', '#1e293b');
      style.setProperty('--text', '#f8fafc');
      style.setProperty('--text-secondary', '#cbd5e1');
      style.setProperty('--border', '#334155');
      style.setProperty('--accent', '#818cf8');
    } else {
      // Light theme colors - Clean, modern light theme
      style.setProperty('--primary', '#2563eb');
      style.setProperty('--primary-dark', '#1d4ed8');
      style.setProperty('--primary-light', '#3b82f6');
      style.setProperty('--background', '#ffffff');
      style.setProperty('--surface', '#f8fafc');
      style.setProperty('--text', '#0f172a');
      style.setProperty('--text-secondary', '#475569');
      style.setProperty('--border', '#e2e8f0');
      style.setProperty('--accent', '#4f46e5');
    }
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
