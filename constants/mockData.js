export const user = {
  name: "Alex Morgan",
  email: "alex@example.com",
};

export const wallets = [
  { id: "w1", name: "Checking", balance: 12450.5, currency: "$" },
  { id: "w2", name: "Savings", balance: 45200.34, currency: "$" },
  { id: "w3", name: "Crypto", balance: 12000.12, currency: "$" },
];

export const transactions = [
  {
    id: "t1",
    title: "Salary",
    category: "Salary",
    amount: 3500,
    date: "2025-12-01",
  },
  {
    id: "t2",
    title: "Starbucks",
    category: "Food",
    amount: -6.75,
    date: "2025-12-08",
  },
  {
    id: "t3",
    title: "Electric Bill",
    category: "Bills",
    amount: -120.5,
    date: "2025-11-28",
  },
  {
    id: "t4",
    title: "Groceries",
    category: "Shopping",
    amount: -82.23,
    date: "2025-12-05",
  },
];

export const categories = [
  { id: "c1", key: "Food", icon: "food" },
  { id: "c2", key: "Bills", icon: "bills" },
  { id: "c3", key: "Salary", icon: "salary" },
  { id: "c4", key: "Travel", icon: "travel" },
  { id: "c5", key: "Shopping", icon: "shopping" },
];

export const portfolioData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.15, shares: 50 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: -1.23, shares: 25 },
  { symbol: "BTC", name: "Bitcoin", price: 42150.00, change: 5.67, shares: 0.5 },
];

export const budgetData = [
  { category: "Food & Dining", spent: 450, budget: 600, color: "#FF6B6B" },
  { category: "Transportation", spent: 280, budget: 400, color: "#4ECDC4" },
  { category: "Entertainment", spent: 120, budget: 200, color: "#45B7D1" },
  { category: "Shopping", spent: 350, budget: 500, color: "#96CEB4" },
];

export const subscriptions = [
  { id: 1, name: "Netflix", price: 15.99, renewalDate: "Dec 15", status: "active", icon: "tv" },
  { id: 2, name: "Spotify", price: 9.99, renewalDate: "Dec 20", status: "due_soon", icon: "musical-notes" },
  { id: 3, name: "Adobe Creative", price: 52.99, renewalDate: "Dec 25", status: "active", icon: "brush" },
];

export const savingsGoals = [
  { id: 1, title: "Emergency Fund", currentAmount: 8500, targetAmount: 15000, deadline: "Jun 2024" },
  { id: 2, title: "New Car", currentAmount: 12000, targetAmount: 25000, deadline: "Dec 2024" },
  { id: 3, title: "Vacation", currentAmount: 2800, targetAmount: 5000, deadline: "Mar 2024" },
];

export const aiInsights = [
  { title: "Dining Alert", message: "Your dining expenses increased by 12% this month.", type: "warning" },
  { title: "Savings Opportunity", message: "You can save $180 by canceling unused subscriptions.", type: "success" },
  { title: "Budget Performance", message: "You're on track to stay within budget this month.", type: "success" },
];