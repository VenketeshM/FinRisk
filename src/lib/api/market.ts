import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function getStockPrice(symbol: string) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return response.data['Global Quote'];
  } catch (error) {
    console.error('Error fetching stock price:', error);
    throw error;
  }
}

export async function getHistoricalData(symbol: string) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        outputsize: 'compact',
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return response.data['Time Series (Daily)'];
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}