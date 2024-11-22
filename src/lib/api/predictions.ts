import * as tf from '@tensorflow/tfjs';

export async function predictAssetPrice(historicalPrices: number[]) {
  // Simple LSTM model for demonstration
  const model = tf.sequential();
  
  model.add(
    tf.layers.lstm({
      units: 50,
      returnSequences: true,
      inputShape: [10, 1],
    })
  );
  
  model.add(tf.layers.lstm({ units: 50 }));
  model.add(tf.layers.dense({ units: 1 }));
  
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  
  // Prepare data
  const data = historicalPrices.slice(-10);
  const tensor = tf.tensor2d(data, [1, 10, 1]);
  
  // Make prediction
  const prediction = model.predict(tensor) as tf.Tensor;
  const result = await prediction.data();
  
  return result[0];
}

export function calculateMovingAverage(
  prices: number[],
  period: number = 20
) {
  const mas = [];
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices
      .slice(i - period + 1, i + 1)
      .reduce((a, b) => a + b, 0);
    mas.push(sum / period);
  }
  return mas;
}

export function calculateRSI(
  prices: number[],
  period: number = 14
): number[] {
  const rsis: number[] = [];
  const gains: number[] = [];
  const losses: number[] = [];
  
  // Calculate price changes
  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    gains.push(Math.max(0, change));
    losses.push(Math.max(0, -change));
  }
  
  // Calculate initial averages
  let avgGain =
    gains.slice(0, period).reduce((sum, gain) => sum + gain, 0) / period;
  let avgLoss =
    losses.slice(0, period).reduce((sum, loss) => sum + loss, 0) / period;
  
  // Calculate RSI values
  for (let i = period; i < prices.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i - 1]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i - 1]) / period;
    
    const rs = avgGain / avgLoss;
    const rsi = 100 - 100 / (1 + rs);
    rsis.push(rsi);
  }
  
  return rsis;
}