import * as tf from '@tensorflow/tfjs';

export interface RiskMetrics {
  sharpeRatio: number;
  beta: number;
  alpha: number;
  valueAtRisk: number;
  maxDrawdown: number;
  volatility: number;
}

export class RiskAnalyzer {
  private static RISK_FREE_RATE = 0.02; // 2% annual risk-free rate

  // Calculate daily returns from price series
  static calculateReturns(prices: number[]): number[] {
    const returns: number[] = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
    }
    return returns;
  }

  // Calculate volatility (standard deviation of returns)
  static calculateVolatility(returns: number[]): number {
    const tensor = tf.tensor1d(returns);
    const mean = tf.mean(tensor);
    const squaredDiffs = tf.square(tf.sub(tensor, mean));
    const variance = tf.mean(squaredDiffs);
    const volatility = tf.sqrt(variance);
    return volatility.dataSync()[0];
  }

  // Calculate Sharpe Ratio
  static calculateSharpeRatio(returns: number[]): number {
    const meanReturn = tf.mean(tf.tensor1d(returns)).dataSync()[0];
    const volatility = this.calculateVolatility(returns);
    const annualizedSharpe =
      ((meanReturn - this.RISK_FREE_RATE / 252) * Math.sqrt(252)) / volatility;
    return annualizedSharpe;
  }

  // Calculate Beta (market sensitivity)
  static calculateBeta(
    assetReturns: number[],
    marketReturns: number[]
  ): number {
    const assetTensor = tf.tensor1d(assetReturns);
    const marketTensor = tf.tensor1d(marketReturns);

    const covariance = tf.mean(
      tf.mul(
        tf.sub(assetTensor, tf.mean(assetTensor)),
        tf.sub(marketTensor, tf.mean(marketTensor))
      )
    );
    const marketVariance = tf.mean(
      tf.square(tf.sub(marketTensor, tf.mean(marketTensor)))
    );

    return covariance.div(marketVariance).dataSync()[0];
  }

  // Calculate Alpha (excess return)
  static calculateAlpha(
    assetReturns: number[],
    marketReturns: number[],
    beta: number
  ): number {
    const meanAssetReturn = tf.mean(tf.tensor1d(assetReturns)).dataSync()[0];
    const meanMarketReturn = tf.mean(tf.tensor1d(marketReturns)).dataSync()[0];
    return (
      meanAssetReturn -
      (this.RISK_FREE_RATE / 252 + beta * (meanMarketReturn - this.RISK_FREE_RATE / 252))
    );
  }

  // Calculate Value at Risk (VaR)
  static calculateVaR(returns: number[], confidenceLevel: number = 0.95): number {
    const sortedReturns = returns.sort((a, b) => a - b);
    const index = Math.floor((1 - confidenceLevel) * returns.length);
    return -sortedReturns[index];
  }

  // Calculate Maximum Drawdown
  static calculateMaxDrawdown(prices: number[]): number {
    let maxDrawdown = 0;
    let peak = prices[0];

    for (const price of prices) {
      if (price > peak) {
        peak = price;
      }
      const drawdown = (peak - price) / peak;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }

    return maxDrawdown;
  }

  // Calculate all risk metrics
  static calculateAllMetrics(
    assetPrices: number[],
    marketPrices: number[]
  ): RiskMetrics {
    const assetReturns = this.calculateReturns(assetPrices);
    const marketReturns = this.calculateReturns(marketPrices);
    const beta = this.calculateBeta(assetReturns, marketReturns);

    return {
      sharpeRatio: this.calculateSharpeRatio(assetReturns),
      beta,
      alpha: this.calculateAlpha(assetReturns, marketReturns, beta),
      valueAtRisk: this.calculateVaR(assetReturns),
      maxDrawdown: this.calculateMaxDrawdown(assetPrices),
      volatility: this.calculateVolatility(assetReturns),
    };
  }
}

// Utility function to format risk metrics for display
export function formatRiskMetrics(metrics: RiskMetrics): Record<string, string> {
  return {
    'Sharpe Ratio': metrics.sharpeRatio.toFixed(2),
    'Beta': metrics.beta.toFixed(2),
    'Alpha': (metrics.alpha * 100).toFixed(2) + '%',
    'Value at Risk (95%)': (metrics.valueAtRisk * 100).toFixed(2) + '%',
    'Maximum Drawdown': (metrics.maxDrawdown * 100).toFixed(2) + '%',
    'Volatility': (metrics.volatility * 100).toFixed(2) + '%',
  };
}
