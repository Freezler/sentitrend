'use server';
/**
 * @fileOverview A cryptocurrency report generator AI agent.
 *
 * - generateCryptoReport - A function that generates a cryptocurrency report based on a given prompt.
 * - GenerateCryptoReportInput - The input type for the generateCryptoReport function.
 * - GenerateCryptoReportOutput - The return type for the generateCryptoReport function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateCryptoReportInputSchema = z.object({
  prompt: z.string().describe('The prompt for generating the cryptocurrency report.'),
});
export type GenerateCryptoReportInput = z.infer<typeof GenerateCryptoReportInputSchema>;

const GenerateCryptoReportOutputSchema = z.object({
  report: z.string().describe('The generated cryptocurrency report.'),
});
export type GenerateCryptoReportOutput = z.infer<typeof GenerateCryptoReportOutputSchema>;

export async function generateCryptoReport(input: GenerateCryptoReportInput): Promise<GenerateCryptoReportOutput> {
  return generateCryptoReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCryptoReportPrompt',
  input: {
    schema: z.object({
      prompt: z.string().describe('The prompt for generating the cryptocurrency report.'),
    }),
  },
  output: {
    schema: z.object({
      report: z.string().describe('The generated cryptocurrency report.'),
    }),
  },
  prompt: `You are a cryptocurrency expert. Generate a report based on the following prompt:\n\nPrompt: {{{prompt}}}`, // Fixed: Using Handlebars syntax correctly
});

const generateCryptoReportFlow = ai.defineFlow<
  typeof GenerateCryptoReportInputSchema,
  typeof GenerateCryptoReportOutputSchema
>({
  name: 'generateCryptoReportFlow',
  inputSchema: GenerateCryptoReportInputSchema,
  outputSchema: GenerateCryptoReportOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});