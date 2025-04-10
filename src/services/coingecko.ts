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

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

/**
 * Asynchronously retrieves cryptocurrency data from CoinGecko.
 * @returns A promise that resolves to an array of CryptoData objects.
 */
export async function getCryptoData(): Promise<CryptoData[]> {
  const currency = 'usd';
  const coinIds = ['bitcoin', 'ethereum', 'ripple', 'pi', 'walrus', 'solana', 'sui', 'jellyjelly', 'pnut', 'broc-cz']; // Replace with actual CoinGecko IDs
  const url = `${COINGECKO_API_URL}?vs_currency=${currency}&ids=${coinIds.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Map the data from the API to the CryptoData interface
    const cryptoData: CryptoData[] = data.map((item: any) => ({
      symbol: item.symbol.toUpperCase(),
      price: item.current_price,
      marketCap: item.market_cap,
      twentyFourHourChange: item.price_change_percentage_24h,
    }));

    return cryptoData;
  } catch (error: any) {
    console.error("Failed to fetch cryptocurrency data:", error);
    throw new Error("Failed to fetch cryptocurrency data from CoinGecko API.");
  }
}
