/**
 * Represents cryptocurrency data.
 */
export interface CryptoData {
  /**
   * The cryptocurrency's symbol (e.g., 'BTC').
   */
  symbol: string;
  /**
   * The current price of the cryptocurrency.
   */
  price: number;
  /**
   * The market capitalization of the cryptocurrency.
   */
  marketCap: number;
  /**
   * The percentage change in price over the last 24 hours.
   */
  twentyFourHourChange: number;
}

/**
 * Asynchronously retrieves cryptocurrency data from CoinGecko.
 * @returns A promise that resolves to an array of CryptoData objects.
 */
export async function getCryptoData(): Promise<CryptoData[]> {
  // TODO: Implement this by calling the CoinGecko API.

  return [
    {
      symbol: 'BTC',
      price: 60000,
      marketCap: 1000000000000,
      twentyFourHourChange: 2.5,
    },
    {
      symbol: 'ETH',
      price: 3000,
      marketCap: 360000000000,
      twentyFourHourChange: -1.2,
    },
  ];
}
