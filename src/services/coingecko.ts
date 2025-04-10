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
    {
      symbol: 'XRP',
      price: 0.50,
      marketCap: 25000000000,
      twentyFourHourChange: 0.5,
    },
    {
      symbol: 'PI',
      price: 0.00,
      marketCap: 0,
      twentyFourHourChange: 0.0,
    },
    {
      symbol: 'WALRUS/USD',
      price: 0.4774,
      marketCap: 1000000000,
      twentyFourHourChange: 1.0,
    },
    {
      symbol: 'SOL',
      price: 180.00,
      marketCap: 80000000000,
      twentyFourHourChange: 3.0,
    },
    {
      symbol: 'SUI',
      price: 1.20,
      marketCap: 15000000000,
      twentyFourHourChange: -0.8,
    },
    {
      symbol: 'JELLYJELLY',
      price: 0.05,
      marketCap: 500000000,
      twentyFourHourChange: 1.5,
    },
    {
      symbol: 'PNUT',
      price: 0.15,
      marketCap: 100000000,
      twentyFourHourChange: 2.0,
    },
    {
      symbol: 'BROC CZ',
      price: 2.50,
      marketCap: 750000000,
      twentyFourHourChange: -2.5,
    },
  ];
}
