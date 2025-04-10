# **App Name**: Crypto Pulse

## Core Features:

- Data Display: Display cryptocurrency data (price, market cap, 24h change) and sentiment scores fetched from CoinGecko or Binance APIs.
- Sentiment Visualization: Use color-coded indicators (green, light green, yellow, orange, red) to visually represent market sentiment and odds based on price change percentages.
- User Authentication: Implement user authentication using Firebase Authentication (email/password, Google sign-in).
- User Preferences: Allow users to save their favorite cryptocurrencies to a personalized dashboard using Firebase Firestore.
- AI Sentiment Analysis: Employ an AI tool to analyze news articles and social media for sentiment regarding the top 20 cryptocurrencies by market cap. 

## Style Guidelines:

- Primary color: Dark blue (#1A202C) for a professional and modern feel.
- Secondary color: Light gray (#EDF2F7) for backgrounds and subtle elements.
- Accent: Teal (#4DC0B5) for interactive elements and highlights.
- Clean and modern sans-serif font for readability.
- Use a grid-based layout for a structured and responsive design.
- Use simple and consistent icons to represent different cryptocurrencies and features.

## Original User Request:
Project Title: CryptoSentiment Tracker
Objective:
Build a web application that tracks and visualizes various cryptocurrencies, displaying their market trends and sentiment in real-time. The app will use a color-coded system to notify users of market conditions (e.g., green for very good, red for awful odds). The app will be built using Svelte 5 (and SvelteKit if necessary) for the frontend, Firebase for the backend, and integrate with a cryptocurrency API for real-time data. The app should also include user authentication and the ability to save user preferences (e.g., favorite cryptocurrencies).
1. Project Requirements
Core Features:
Cryptocurrency Data Display:
Fetch and display a list of cryptocurrencies (e.g., Bitcoin, Ethereum, Solana, Chainlink, etc.) with their current price, market cap, 24-hour price change, and sentiment score.

Market Trend and Sentiment Visualization:
Use a color-coded system to represent market sentiment and odds:
Green: Very good (e.g., strong bullish sentiment, price increase >5%)

Light Green: Good (e.g., moderate bullish sentiment, price increase 1-5%)

Yellow: Neutral (e.g., neutral sentiment, price change between -1% and +1%)

Orange: Poor (e.g., moderate bearish sentiment, price decrease 1-5%)

Red: Awful (e.g., strong bearish sentiment, price decrease >5%)

Real-Time Updates:
Use server-sent events (SSE) or WebSockets to update the data in real-time as market conditions change.

User Notifications:
Notify users of significant market changes (e.g., a cryptocurrency’s sentiment shifts to "awful" or "very good") via in-app alerts.

User Authentication:
Allow users to sign up, log in, and log out using Firebase Authentication (email/password and Google sign-in).

User Preferences:
Let users save their favorite cryptocurrencies to a personalized dashboard, stored in Firebase Firestore.

Responsive Design:
Ensure the app is fully responsive and works on desktop, tablet, and mobile devices.

Tech Stack:
Frontend: Svelte 5 (with SvelteKit for routing and server-side rendering if needed)

Backend: Firebase (Firestore for database, Authentication for user management, Functions for serverless logic)

API: Use a cryptocurrency API like Binance (for market data and sentiment) or CoinGecko (for price and market cap data). Optionally, integrate StockGeist.ai for sentiment analysis if available.

Real-Time Updates: Use Firebase Functions with server-sent events (SSE) or WebSockets for real-time data updates.

Styling: Use Tailwind CSS for responsive and modern styling.
  