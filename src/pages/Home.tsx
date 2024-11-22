import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, LineChart, PieChart, Zap, Globe, ArrowRight, DollarSign, ChartBar, Percent } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Financial Doodles */}
      <div className="relative overflow-hidden">
        {/* Background Pattern and Doodles */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.02]" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 dark:from-primary/20 dark:to-accent/20" />
          
          {/* Financial Doodles Layer */}
          <div className="absolute inset-0 opacity-10 dark:opacity-[0.05]">
            {/* Candlestick Chart Doodle */}
            <svg className="absolute top-1/4 left-1/4 w-64 h-64 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100">
              <path d="M10,50 L90,50 M20,20 L20,80 M40,30 L40,70 M60,10 L60,90 M80,40 L80,60" 
                    stroke="currentColor" strokeWidth="1" fill="none"/>
              {/* Candlesticks */}
              <rect x="15" y="30" width="10" height="40" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="35" y="40" width="10" height="20" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="55" y="20" width="10" height="60" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="75" y="45" width="10" height="10" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>

            {/* Statistical Formulas */}
            <svg className="absolute top-3/4 right-1/4 w-64 h-64 transform rotate-12" viewBox="0 0 100 100">
              <text x="10" y="30" className="text-xs" fill="currentColor">σ = √(Σ(x-μ)²/N)</text>
              <text x="10" y="50" className="text-xs" fill="currentColor">β = Cov(r,m)/Var(m)</text>
              <text x="10" y="70" className="text-xs" fill="currentColor">VaR = μ + σ × Z</text>
            </svg>

            {/* Pie Chart Doodle */}
            <svg className="absolute bottom-1/4 left-1/3 w-48 h-48 transform -rotate-12" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M50,50 L90,50 A40,40 0 0,1 50,90 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M50,50 L50,10 A40,40 0 0,1 90,50 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>

            {/* Line Graph with Moving Average */}
            <svg className="absolute top-1/2 right-1/4 w-64 h-32 transform translate-x-1/2" viewBox="0 0 100 50">
              <path d="M0,25 Q25,40 50,20 T100,25" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M0,25 Q25,30 50,25 T100,25" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2"/>
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-text mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-gradient">
                  FinRisk
                </span>
                <br />
                <span className="text-3xl sm:text-5xl mt-4 block">
                  Advanced Risk Management
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto animate-slide-up">
                Empower your investment decisions with AI-driven risk analysis and portfolio management
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
                <Link
                  to="/signup"
                  className="group inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center px-8 py-3 border border-border text-base font-medium rounded-lg text-text bg-surface hover:bg-surface/80 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text mb-12">
            Powerful Features for Risk Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-background rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section with Animated Numbers */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-surface border border-border">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Risk Management?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust FinRisk for their portfolio analysis and risk management needs.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Add CSS for background pattern */}
      <style>
        {`
          .bg-grid-pattern {
            background-image: linear-gradient(currentColor 1px, transparent 1px),
                            linear-gradient(to right, currentColor 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}

const features = [
  {
    title: 'Advanced Risk Metrics',
    description: 'Calculate VaR, Sharpe Ratio, and other key risk indicators with real-time market data.',
    icon: <Shield className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Portfolio Analytics',
    description: 'Track and analyze your portfolio performance with sophisticated analytics tools.',
    icon: <LineChart className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Market Insights',
    description: 'Get AI-powered market insights and trend analysis for informed decision making.',
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Asset Allocation',
    description: 'Optimize your portfolio with smart asset allocation recommendations.',
    icon: <PieChart className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Real-time Monitoring',
    description: 'Monitor your investments 24/7 with instant alerts and notifications.',
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Global Coverage',
    description: 'Access data and analysis for markets worldwide.',
    icon: <Globe className="w-6 h-6 text-primary" />,
  },
];

const stats = [
  {
    value: '99.9%',
    label: 'System Uptime',
  },
  {
    value: '10M+',
    label: 'Transactions Analyzed',
  },
  {
    value: '50K+',
    label: 'Active Users',
  },
];
