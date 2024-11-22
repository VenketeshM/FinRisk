import { Asset } from './portfolio';

export function calculateVaR(assets: Asset[], confidenceLevel: number = 0.95) {
  // Simple VaR calculation for demonstration
  const portfolioValue = assets.reduce(
    (total, asset) => total + asset.quantity * asset.purchasePrice,
    0
  );
  
  // Using a simplified approach - in production, use historical data
  const dailyVolatility = 0.02; // 2% daily volatility assumption
  const zScore = 1.645; // 95% confidence level
  
  return portfolioValue * dailyVolatility * zScore;
}

export function calculateSharpeRatio(
  returns: number[],
  riskFreeRate: number = 0.02
) {
  const avgReturn =
    returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const excessReturns = avgReturn - riskFreeRate;
  
  const variance =
    returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) /
    returns.length;
  const stdDev = Math.sqrt(variance);
  
  return excessReturns / stdDev;
}

export function calculateBeta(assetReturns: number[], marketReturns: number[]) {
  const n = assetReturns.length;
  const avgAssetReturn =
    assetReturns.reduce((sum, ret) => sum + ret, 0) / n;
  const avgMarketReturn =
    marketReturns.reduce((sum, ret) => sum + ret, 0) / n;
  
  let covariance = 0;
  let marketVariance = 0;
  
  for (let i = 0; i < n; i++) {
    covariance +=
      (assetReturns[i] - avgAssetReturn) *
      (marketReturns[i] - avgMarketReturn);
    marketVariance += Math.pow(marketReturns[i] - avgMarketReturn, 2);
  }
  
  covariance /= n;
  marketVariance /= n;
  
  return covariance / marketVariance;
}