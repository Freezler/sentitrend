'use client'

import {getCryptoData} from "@/services/coingecko";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {CryptoData} from "@/services/coingecko";
import {Badge} from "@/components/ui/badge";
import {analyzeCryptoSentiment} from "@/ai/flows/analyze-crypto-sentiment";

function getSentimentColor(change: number): string {
  if (change > 5) return "green";
  if (change > 1) return "lightgreen";
  if (change >= -1) return "yellow";
  if (change >= -5) return "orange";
  return "red";
}

async function getSentimentSummary(symbol: string): Promise<string> {
  try {
    const sentimentAnalysis = await analyzeCryptoSentiment({ cryptoSymbol: symbol });
    return sentimentAnalysis.sentimentSummary;
  } catch (error) {
    console.error(`Failed to analyze sentiment for ${symbol}:`, error);
    return "Sentiment analysis unavailable.";
  }
}

export default function Home() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getCryptoData();
      setCryptoData(data);
    }

    loadData();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cryptoData.map((crypto) => (
        <CryptoCard key={crypto.symbol} crypto={crypto} />
      ))}
    </div>
  );
}

interface CryptoCardProps {
  crypto: CryptoData;
}

function CryptoCard({ crypto }: CryptoCardProps) {
  const sentimentColor = getSentimentColor(crypto.twentyFourHourChange);
  const [sentimentSummary, setSentimentSummary] = useState<string>("Loading sentiment...");

  useEffect(() => {
    async function loadSentiment() {
      const summary = await getSentimentSummary(crypto.symbol);
      setSentimentSummary(summary);
    }

    loadSentiment();
  }, [crypto.symbol]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{crypto.symbol}</CardTitle>
        <CardDescription>
          Price: ${crypto.price.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Market Cap: ${crypto.marketCap.toLocaleString()}</p>
        <p>24h Change: {crypto.twentyFourHourChange.toFixed(2)}%</p>
        <Badge variant="secondary" style={{ backgroundColor: sentimentColor }}>
          {sentimentColor.toUpperCase()}
        </Badge>
        <p>Sentiment: {sentimentSummary}</p>
      </CardContent>
    </Card>
  );
}
