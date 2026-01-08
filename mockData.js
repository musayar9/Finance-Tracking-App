// mockData.js
export const netWorth = {
  value: 185450.75,
  currency: "$",
  history7: [180000, 181200, 182500, 183000, 184500, 185000, 185450.75],
  history30: Array.from({ length: 30 }, (_, i) => 170000 + i * 500),
};

export const transactions = [
  {
    id: "t1",
    merchant: "Starbucks",
    category: "Food",
    amount: -6.75,
    date: "2025-12-08T09:15:00Z",
    account: "Credit Card",
    logo: null,
    aiSuggestion: null,
  },
  {
    id: "t2",
    merchant: "Acme Electricity",
    category: null,
    amount: -120.5,
    date: "2025-12-07T12:00:00Z",
    account: "Checking",
    logo: null,
    aiSuggestion: "Bills",
  },
  {
    id: "t3",
    merchant: "Payroll",
    category: "Income",
    amount: 3500,
    date: "2025-12-01T07:00:00Z",
    account: "Checking",
    logo: null,
    aiSuggestion: null,
  },
];

export const portfolio = {
  totalValue: 45200.34,
  todaysPL: 450.12,
  todaysPLPercent: 2.15,
  allocation: [
    { key: "Stocks", value: 0.6, color: "#007AFF" },
    { key: "Crypto", value: 0.2, color: "#00C853" },
    { key: "Gold", value: 0.1, color: "#FFD700" },
    { key: "Cash", value: 0.1, color: "#8E8E93" },
  ],
  holdings: [
    { symbol: "TSLA", price: 225.45, qty: 10, plPercent: 3.4 },
    { symbol: "BTC", price: 48000, qty: 0.12, plPercent: -1.2 },
    { symbol: "AAPL", price: 170.12, qty: 8, plPercent: 0.8 },
  ],
};

export const budgets = [
  { id: "b1", title: "Groceries", used: 450, limit: 600 },
  { id: "b2", title: "Transport", used: 75, limit: 150 },
  { id: "b3", title: "Entertainment", used: 30, limit: 100 },
];

export const settings = {
  faceId: true,
  fingerprint: true,
  notifications: true,
  connectedBanks: ["BigBank ****1234", "Savings ****9876"],
};
