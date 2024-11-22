import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with light theme as default
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

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

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
