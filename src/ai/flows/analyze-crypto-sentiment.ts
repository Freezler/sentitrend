'use server';

/**
 * @fileOverview Analyzes the sentiment of news articles and social media for the top 20 cryptocurrencies.
 *
 * - analyzeCryptoSentiment - A function that analyzes cryptocurrency sentiment.
 * - AnalyzeCryptoSentimentInput - The input type for the analyzeCryptoSentiment function.
 * - AnalyzeCryptoSentimentOutput - The return type for the analyzeCryptoSentiment function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeCryptoSentimentInputSchema = z.object({
  cryptoSymbol: z.string().describe('The symbol of the cryptocurrency to analyze (e.g., BTC).'),
});
export type AnalyzeCryptoSentimentInput = z.infer<typeof AnalyzeCryptoSentimentInputSchema>;

const AnalyzeCryptoSentimentOutputSchema = z.object({
  sentimentSummary: z.string().describe('A summary of the sentiment towards the cryptocurrency from news and social media.'),
});
export type AnalyzeCryptoSentimentOutput = z.infer<typeof AnalyzeCryptoSentimentOutputSchema>;

export async function analyzeCryptoSentiment(input: AnalyzeCryptoSentimentInput): Promise<AnalyzeCryptoSentimentOutput> {
  return analyzeCryptoSentimentFlow(input);
}

const analyzeSentimentPrompt = ai.definePrompt({
  name: 'analyzeSentimentPrompt',
  input: {
    schema: z.object({
      cryptoSymbol: z.string().describe('The symbol of the cryptocurrency to analyze (e.g., BTC).'),
    }),
  },
  output: {
    schema: z.object({
      sentimentSummary: z.string().describe('A summary of the sentiment towards the cryptocurrency from news and social media.'),
    }),
  },
  prompt: `Analyze the sentiment of recent news articles and social media posts regarding {{cryptoSymbol}}.\n\nProvide a concise summary of the overall sentiment.`,
});

const analyzeCryptoSentimentFlow = ai.defineFlow<
  typeof AnalyzeCryptoSentimentInputSchema,
  typeof AnalyzeCryptoSentimentOutputSchema
>({
  name: 'analyzeCryptoSentimentFlow',
  inputSchema: AnalyzeCryptoSentimentInputSchema,
  outputSchema: AnalyzeCryptoSentimentOutputSchema,
},
async input => {
  const maxRetries = 3;
  let retryCount = 0;
  let delay = 1000; // Initial delay of 1 second

  while (retryCount < maxRetries) {
    try {
      const {output} = await analyzeSentimentPrompt(input);
      return output!;
    } catch (error: any) {
      if (error.message.includes('Too Many Requests')) {
        retryCount++;
        console.warn(`Rate limit hit. Retry ${retryCount} of ${maxRetries}. Waiting ${delay}ms.`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        // If it's not a rate limit error, re-throw the error
        throw error;
      }
    }
  }
  throw new Error('Failed to analyze sentiment after multiple retries.');
});
