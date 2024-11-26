import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Portfolio from '../pages/Portfolio';
import MarketWatch from '../pages/MarketWatch';
import Exchange from '../pages/Exchange';
import Trading from '../pages/Trading';
import Orders from '../pages/Orders';
import RiskAnalysis from '../pages/RiskAnalysis';
import OptionsAndFutures from '../pages/OptionsAndFutures';
import AIInsights from '../pages/AIInsights';
import MarketHeatmap from '../pages/MarketHeatmap';
import Reports from '../pages/Reports';
import News from '../pages/News';
import Settings from '../pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/dashboard/portfolio',
        element: <Portfolio />,
      },
      {
        path: '/dashboard/market-watch',
        element: <MarketWatch />,
      },
      {
        path: '/dashboard/exchange',
        element: <Exchange />,
      },
      {
        path: '/dashboard/trading',
        element: <Trading />,
      },
      {
        path: '/dashboard/orders',
        element: <Orders />,
      },
      {
        path: '/dashboard/risk-analysis',
        element: <RiskAnalysis />,
      },
      {
        path: '/dashboard/options-and-futures',
        element: <OptionsAndFutures />,
      },
      {
        path: '/dashboard/ai-insights',
        element: <AIInsights />,
      },
      {
        path: '/dashboard/market-heatmap',
        element: <MarketHeatmap />,
      },
      {
        path: '/dashboard/reports',
        element: <Reports />,
      },
      {
        path: '/dashboard/news',
        element: <News />,
      },
      {
        path: '/dashboard/settings',
        element: <Settings />,
      },
    ],
  },
]);
