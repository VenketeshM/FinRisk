import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// You would replace this with your actual API key
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export interface MarketData {
  symbol: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
}

interface MarketDataMap {
  [symbol: string]: MarketData;
}

export function useMarketData(symbols: string[]) {
  const [data, setData] = useState<MarketDataMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const webSocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const promises = symbols.map(async (symbol) => {
          // Get quote data
          const quoteResponse = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          );

          return {
            symbol,
            price: quoteResponse.data.c,
            previousClose: quoteResponse.data.pc,
            change: quoteResponse.data.d,
            changePercent: quoteResponse.data.dp,
          };
        });

        const results = await Promise.all(promises);
        const newData: MarketDataMap = {};
        results.forEach((result) => {
          newData[result.symbol] = result;
        });

        setData(newData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch market data');
        console.error('Error fetching market data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (symbols.length > 0) {
      fetchInitialData();

      // Set up WebSocket connection
      webSocket.current = new WebSocket('wss://ws.finnhub.io?token=' + FINNHUB_API_KEY);

      webSocket.current.onopen = () => {
        // Subscribe to symbols
        symbols.forEach((symbol) => {
          if (webSocket.current?.readyState === WebSocket.OPEN) {
            webSocket.current.send(JSON.stringify({ type: 'subscribe', symbol }));
          }
        });
      };

      webSocket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'trade') {
          const { s: symbol, p: price } = message.data[0];
          setData((prevData) => {
            if (!prevData[symbol]) return prevData;
            
            const previousClose = prevData[symbol].previousClose;
            const change = price - previousClose;
            const changePercent = (change / previousClose) * 100;

            return {
              ...prevData,
              [symbol]: {
                ...prevData[symbol],
                price,
                change,
                changePercent,
              },
            };
          });
        }
      };

      webSocket.current.onerror = (err) => {
        console.error('WebSocket error:', err);
        setError('WebSocket connection error');
      };
    }

    return () => {
      if (webSocket.current?.readyState === WebSocket.OPEN) {
        symbols.forEach((symbol) => {
          webSocket.current?.send(JSON.stringify({ type: 'unsubscribe', symbol }));
        });
        webSocket.current?.close();
      }
    };
  }, [symbols]);

  return { data, isLoading, error };
}
