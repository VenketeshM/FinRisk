import axios from 'axios';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// Types for API responses
export interface StockQuote {
  symbol: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
  latestTradingDay: string;
  previousClose: number;
  change: number;
  changePercent: string;
}

export interface TimeSeriesData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// API client for Alpha Vantage
class AlphaVantageClient {
  private async get(endpoint: string, params: Record<string, string>) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          ...params,
          apikey: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Alpha Vantage API Error:', error);
      throw error;
    }
  }

  // Get real-time quote for a symbol
  async getQuote(symbol: string): Promise<StockQuote> {
    const data = await this.get('', {
      function: 'GLOBAL_QUOTE',
      symbol,
    });

    const quote = data['Global Quote'];
    return {
      symbol: quote['01. symbol'],
      open: parseFloat(quote['02. open']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      price: parseFloat(quote['05. price']),
      volume: parseInt(quote['06. volume']),
      latestTradingDay: quote['07. latest trading day'],
      previousClose: parseFloat(quote['08. previous close']),
      change: parseFloat(quote['09. change']),
      changePercent: quote['10. change percent'],
    };
  }

  // Get historical daily data
  async getDailyTimeSeries(
    symbol: string,
    outputSize: 'compact' | 'full' = 'compact'
  ): Promise<TimeSeriesData[]> {
    const data = await this.get('', {
      function: 'TIME_SERIES_DAILY',
      symbol,
      outputsize: outputSize,
    });

    const timeSeries = data['Time Series (Daily)'];
    return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume']),
    }));
  }

  // Search for symbols
  async searchSymbol(keywords: string) {
    const data = await this.get('', {
      function: 'SYMBOL_SEARCH',
      keywords,
    });

    return data.bestMatches.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      marketOpen: match['5. marketOpen'],
      marketClose: match['6. marketClose'],
      timezone: match['7. timezone'],
      currency: match['8. currency'],
      matchScore: match['9. matchScore'],
    }));
  }
}

export const alphaVantage = new AlphaVantageClient();
