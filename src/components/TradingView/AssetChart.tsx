import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CrosshairMode, IChartApi, ISeriesApi } from 'lightweight-charts';
import { Settings, ZoomIn, ZoomOut, Maximize2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface Indicator {
  name: string;
  type: 'MA' | 'RSI' | 'MACD';
  period: number;
  color: string;
}

interface AssetChartProps {
  symbol: string;
  onTimeframeChange?: (timeframe: string) => void;
}

const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

export default function AssetChart({ symbol, onTimeframeChange }: AssetChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [candleSeries, setCandleSeries] = useState<ISeriesApi<'Candlestick'> | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [indicators, setIndicators] = useState<Indicator[]>([
    { name: 'MA-20', type: 'MA', period: 20, color: '#2962FF' },
    { name: 'MA-50', type: 'MA', period: 50, color: '#FF6B6B' },
  ]);

  // Fetch historical data
  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true);
      setError(null);

      try {
        const resolution = selectedTimeframe === '1D' ? '5' :
                         selectedTimeframe === '1W' ? '30' :
                         selectedTimeframe === '1M' ? '60' :
                         selectedTimeframe === '3M' ? 'D' :
                         selectedTimeframe === '6M' ? 'D' :
                         selectedTimeframe === '1Y' ? 'D' : 'W';

        const to = Math.floor(Date.now() / 1000);
        const from = to - (
          selectedTimeframe === '1D' ? 24 * 60 * 60 :
          selectedTimeframe === '1W' ? 7 * 24 * 60 * 60 :
          selectedTimeframe === '1M' ? 30 * 24 * 60 * 60 :
          selectedTimeframe === '3M' ? 90 * 24 * 60 * 60 :
          selectedTimeframe === '6M' ? 180 * 24 * 60 * 60 :
          selectedTimeframe === '1Y' ? 365 * 24 * 60 * 60 :
          5 * 365 * 24 * 60 * 60
        );

        const response = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.VITE_FINNHUB_API_KEY}`
        );

        const data = await response.json();

        if (data.s === 'ok') {
          const formattedData: ChartData[] = data.t.map((timestamp: number, index: number) => ({
            time: new Date(timestamp * 1000).toISOString().split('T')[0],
            open: data.o[index],
            high: data.h[index],
            low: data.l[index],
            close: data.c[index],
            volume: data.v[index],
          }));

          setChartData(formattedData);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch historical data');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [symbol, selectedTimeframe]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartInstance = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { type: ColorType.Solid, color: 'var(--background)' },
        textColor: 'var(--text)',
      },
      grid: {
        vertLines: { color: 'var(--border)' },
        horzLines: { color: 'var(--border)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'var(--border)',
      },
      timeScale: {
        borderColor: 'var(--border)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const handleResize = () => {
      if (chartContainerRef.current) {
        chartInstance.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    const series = chartInstance.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    if (chartData.length > 0) {
      series.setData(chartData);
    }

    setChart(chartInstance);
    setCandleSeries(series);

    // Add volume series
    const volumeSeries = chartInstance.addHistogramSeries({
      color: '#26a69a50',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    if (chartData.length > 0) {
      const volumeData = chartData.map(item => ({
        time: item.time,
        value: item.volume || 0,
        color: item.close > item.open ? '#26a69a50' : '#ef535050',
      }));

      volumeSeries.setData(volumeData);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.remove();
    };
  }, [chartData]);

  useEffect(() => {
    if (!chart || !candleSeries || chartData.length === 0) return;

    // Add indicators
    indicators.forEach(indicator => {
      if (indicator.type === 'MA') {
        const maData = calculateMA(chartData, indicator.period);
        const maSeries = chart.addLineSeries({
          color: indicator.color,
          lineWidth: 2,
        });
        maSeries.setData(maData);
      }
    });
  }, [chart, candleSeries, indicators, chartData]);

  const calculateMA = (data: ChartData[], period: number) => {
    return data.map((item, index) => {
      if (index < period - 1) return null;
      const sum = data
        .slice(index - period + 1, index + 1)
        .reduce((acc, curr) => acc + curr.close, 0);
      return {
        time: item.time,
        value: sum / period,
      };
    }).filter(item => item !== null);
  };

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    if (onTimeframeChange) {
      onTimeframeChange(timeframe);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-surface rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-surface rounded-lg">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => handleTimeframeChange(timeframe)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedTimeframe === timeframe
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:bg-background'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-background rounded-lg transition-colors">
            <ZoomIn className="w-5 h-5 text-text-secondary" />
          </button>
          <button className="p-2 hover:bg-background rounded-lg transition-colors">
            <ZoomOut className="w-5 h-5 text-text-secondary" />
          </button>
          <button className="p-2 hover:bg-background rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-text-secondary" />
          </button>
          <button className="p-2 hover:bg-background rounded-lg transition-colors">
            <Maximize2 className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
}
