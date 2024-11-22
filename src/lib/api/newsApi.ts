import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsdata.io/api/1/news';

export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image_url: string | null;
  source_id: string;
  pubDate: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface NewsResponse {
  articles: NewsArticle[];
  nextPage: string | null;
}

class NewsApiClient {
  private async get(params: Record<string, string>) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          ...params,
          apikey: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('News API Error:', error);
      throw error;
    }
  }

  // Get financial news
  async getFinancialNews(page?: string): Promise<NewsResponse> {
    const params: Record<string, string> = {
      category: 'business',
      language: 'en',
      country: 'us',
    };

    if (page) {
      params.page = page;
    }

    const data = await this.get(params);

    return {
      articles: data.results.map((article: any) => ({
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.link,
        image_url: article.image_url,
        source_id: article.source_id,
        pubDate: article.pubDate,
      })),
      nextPage: data.nextPage,
    };
  }

  // Get news for specific company
  async getCompanyNews(
    company: string,
    page?: string
  ): Promise<NewsResponse> {
    const params: Record<string, string> = {
      q: company,
      category: 'business',
      language: 'en',
    };

    if (page) {
      params.page = page;
    }

    const data = await this.get(params);

    return {
      articles: data.results.map((article: any) => ({
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.link,
        image_url: article.image_url,
        source_id: article.source_id,
        pubDate: article.pubDate,
      })),
      nextPage: data.nextPage,
    };
  }
}

export const newsApi = new NewsApiClient();
