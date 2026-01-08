import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext } from 'react';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    transactions: 'Transactions',
    portfolio: 'Portfolio',
    budget: 'Budget',
    menu: 'Menu',
    
    // Home Screen
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    add: 'Add',
    transfer: 'Transfer',
    pay: 'Pay',
    recentTransactions: 'Recent Transactions',
    seeAll: 'See All',
    
    // Subscriptions
    subscriptions: 'Subscriptions',
    monthlyTotal: 'Monthly Total',
    activeSubscriptions: 'active subscriptions',
    addSubscription: 'Add Subscription',
    serviceName: 'Service Name',
    monthlyPrice: 'Monthly Price',
    nextRenewalDate: 'Next Renewal Date',
    categoryIcon: 'Category Icon',
    
    // Settings
    settings: 'Settings',
    appearance: 'Appearance',
    language: 'Language',
    darkMode: 'Dark Mode',
    
    // Budget Screen
    monthlyBudget: 'Monthly Budget',
    spent: 'Spent',
    remaining: 'Remaining',
    used: 'used',
    categories: 'Categories',
    overBudget: 'over budget',
    
    // Menu Screen
    features: 'Features',
    subscriptions: 'Subscriptions',
    manageSubscriptions: 'Manage your subscriptions',
    savingsGoals: 'Savings Goals',
    trackSavings: 'Track your savings progress',
    billsPayments: 'Bills & Payments',
    manageBills: 'Manage bills and reminders',
    analytics: 'Analytics',
    financialInsights: 'Financial insights and reports',
    reminders: 'Reminders',
    paymentAlerts: 'Payment and budget alerts',
    quickStats: 'Quick Stats',
    activeGoals: 'Active Goals',
    pendingBills: 'Pending Bills',
    
    // AI Screen
    aiAssistant: 'AI Assistant',
    yourAiAssistant: 'Your AI Financial Assistant',
    aiDescription: 'Get personalized insights, predictions, and advice powered by artificial intelligence',
    spendingInsights: 'Spending Insights',
    spendingInsightsDesc: 'Get personalized insights about your spending patterns',
    budgetAdvisor: 'Budget Advisor',
    budgetAdvisorDesc: 'AI-powered budget recommendations and tips',
    forecastPredictions: 'Forecast Predictions',
    forecastDesc: 'Predict your future spending and savings',
    chatAssistant: 'Chat Assistant',
    chatAssistantDesc: 'Ask questions about your finances',
    aiInsightsMonth: 'AI Insights This Month',
    insights: 'Insights',
    savingsFound: 'Savings Found',
    accuracy: 'Accuracy',
    
    // Portfolio Screen
    totalPortfolioValue: 'Total Portfolio Value',
    todaysPL: "Today's P&L",
    holdings: 'Holdings',
    shares: 'shares',
    
    // Transactions Screen
    all: 'All',
    
    // Profile Screen
    editProfile: 'Edit Profile',
    faceIdTouchId: 'Face ID / Touch ID',
    pushNotifications: 'Push Notifications',
    account: 'Account',
    personalInformation: 'Personal Information',
    paymentMethods: 'Payment Methods',
    connectedBanks: 'Connected Banks',
    security: 'Security',
    changePassword: 'Change Password',
    twoFactorAuth: 'Two-Factor Auth',
    loginHistory: 'Login History',
    support: 'Support',
    helpCenter: 'Help Center',
    contactSupport: 'Contact Support',
    privacyPolicy: 'Privacy Policy',
    signOut: 'Sign Out',
    
    // Add Payment Method
    addPaymentMethod: 'Add Payment Method',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    cardholderName: 'Cardholder Name',
    saveCard: 'Save Card',
    cancel: 'Cancel',
    
    // Onboarding & Auth
    takeControl: 'Take Control of Your',
    financialFuture: 'Financial Future',
    aiPoweredInsights: 'AI-powered insights, smart budgeting, and personalized financial guidance all in one beautiful app.',
    aiFinancialAssistant: 'AI Financial Assistant',
    bankLevelSecurity: 'Bank-Level Security',
    smartAnalytics: 'Smart Analytics',
    continueWithGoogle: 'Continue with Google',
    continueWithApple: 'Continue with Apple',
    or: 'or',
    otherSignInOptions: 'Other Sign In Options',
    termsAgreement: 'By continuing, you agree to our',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    
    // Login
    welcomeBack: 'Welcome Back',
    signInToContinue: 'Sign in to continue to your account',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    signIn: 'Sign In',
    dontHaveAccount: "Don't have an account?",
    signUp: 'Sign Up',
    
    // Register
    createAccount: 'Create Account',
    joinFinanceAI: 'Join FinanceAI and take control of your finances',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    alreadyHaveAccount: 'Already have an account?',
    
    // Forgot Password
    resetPassword: 'Reset Password',
    enterEmailToReset: 'Enter your email address and we\'ll send you a link to reset your password',
    sendResetLink: 'Send Reset Link',
    backToSignIn: 'Back to Sign In',
    
    // Verification
    verifyEmail: 'Verify Your Email',
    verificationCodeSent: 'We\'ve sent a verification code to',
    enterVerificationCode: 'Enter the 6-digit code below',
    verificationCode: 'Verification Code',
    verify: 'Verify',
    didntReceiveCode: "Didn't receive the code?",
    resendCode: 'Resend Code',
    
    
    // General
    active: 'Active',
    expired: 'Expired',
    dueSoon: 'Due Soon',
  },
  tr: {
    // Navigation
    home: 'Ana Sayfa',
    transactions: 'İşlemler',
    portfolio: 'Portföy',
    budget: 'Bütçe',
    menu: 'Menü',
    
    // Home Screen
    goodMorning: 'Günaydın',
    goodAfternoon: 'İyi Öğleden Sonralar',
    goodEvening: 'İyi Akşamlar',
    add: 'Ekle',
    transfer: 'Transfer',
    pay: 'Öde',
    recentTransactions: 'Son İşlemler',
    seeAll: 'Tümünü Gör',
    
    // Subscriptions
    subscriptions: 'Abonelikler',
    monthlyTotal: 'Aylık Toplam',
    activeSubscriptions: 'aktif abonelik',
    addSubscription: 'Abonelik Ekle',
    serviceName: 'Hizmet Adı',
    monthlyPrice: 'Aylık Ücret',
    nextRenewalDate: 'Sonraki Yenileme Tarihi',
    categoryIcon: 'Kategori İkonu',
    
    // Settings
    settings: 'Ayarlar',
    appearance: 'Görünüm',
    language: 'Dil',
    darkMode: 'Karanlık Mod',
    
    // Budget Screen
    monthlyBudget: 'Aylık Bütçe',
    spent: 'Harcanan',
    remaining: 'Kalan',
    used: 'kullanıldı',
    categories: 'Kategoriler',
    overBudget: 'bütçe aşımı',
    
    // Menu Screen
    features: 'Özellikler',
    subscriptions: 'Abonelikler',
    manageSubscriptions: 'Aboneliklerinizi yönetin',
    savingsGoals: 'Tasarruf Hedefleri',
    trackSavings: 'Tasarruf ilerlemenizi takip edin',
    billsPayments: 'Faturalar ve Ödemeler',
    manageBills: 'Faturası ve hatırlatmaları yönetin',
    analytics: 'Analitik',
    financialInsights: 'Finansal görüşler ve raporlar',
    reminders: 'Hatırlatmalar',
    paymentAlerts: 'Ödeme ve bütçe uyarıları',
    quickStats: 'Hızlı İstatistikler',
    activeGoals: 'Aktif Hedefler',
    pendingBills: 'Bekleyen Faturalar',
    
    // AI Screen
    aiAssistant: 'AI Asistan',
    yourAiAssistant: 'Finansal AI Asistanınız',
    aiDescription: 'Yapay zeka destekli kişiselleştirilmiş görüşler, tahminler ve tavsiyeler alın',
    spendingInsights: 'Harcama Analizi',
    spendingInsightsDesc: 'Harcama alışkanlıklarınız hakkında kişiselleştirilmiş görüşler',
    budgetAdvisor: 'Bütçe Danışmanı',
    budgetAdvisorDesc: 'AI destekli bütçe önerileri ve ipucları',
    forecastPredictions: 'Gelecek Tahminleri',
    forecastDesc: 'Gelecekteki harcama ve tasarruflarınızı tahmin edin',
    chatAssistant: 'Sohbet Asistanı',
    chatAssistantDesc: 'Finansal durumunuz hakkında sorular sorun',
    aiInsightsMonth: 'Bu Ayki AI Görüşleri',
    insights: 'Görüş',
    savingsFound: 'Bulunan Tasarruf',
    accuracy: 'Doğruluk',
    
    // Portfolio Screen
    totalPortfolioValue: 'Toplam Portföy Değeri',
    todaysPL: 'Bugünkü K/Z',
    holdings: 'Varlıklar',
    shares: 'hisse',
    
    // Transactions Screen
    all: 'Tümü',
    
    // Profile Screen
    editProfile: 'Profili Düzenle',
    faceIdTouchId: 'Face ID / Touch ID',
    pushNotifications: 'Bildirimler',
    account: 'Hesap',
    personalInformation: 'Kişisel Bilgiler',
    paymentMethods: 'Ödeme Yöntemleri',
    connectedBanks: 'Bağlı Bankalar',
    security: 'Güvenlik',
    changePassword: 'Şifre Değiştir',
    twoFactorAuth: 'İki Faktörlü Doğrulama',
    loginHistory: 'Giriş Geçmişi',
    support: 'Destek',
    helpCenter: 'Yardım Merkezi',
    contactSupport: 'Destek İletişim',
    privacyPolicy: 'Gizlilik Politikası',
    signOut: 'Çıkış Yap',
    
    // Add Payment Method
    addPaymentMethod: 'Ödeme Yöntemi Ekle',
    cardNumber: 'Kart Numarası',
    expiryDate: 'Son Kullanma Tarihi',
    cvv: 'CVV',
    cardholderName: 'Kart Sahibi Adı',
    saveCard: 'Kartı Kaydet',
    cancel: 'İptal',
    
    // Onboarding & Auth
    takeControl: 'Finansal Geleceğinizin',
    financialFuture: 'Kontrolünü Ele Alın',
    aiPoweredInsights: 'AI destekli görüşler, akıllı bütçeleme ve kişiselleştirilmiş finansal rehberlik tek bir güzel uygulamada.',
    aiFinancialAssistant: 'AI Finansal Asistan',
    bankLevelSecurity: 'Banka Seviyesi Güvenlik',
    smartAnalytics: 'Akıllı Analitik',
    continueWithGoogle: 'Google ile Devam Et',
    continueWithApple: 'Apple ile Devam Et',
    or: 'veya',
    otherSignInOptions: 'Diğer Giriş Seçenekleri',
    termsAgreement: 'Devam ederek',
    termsOfService: 'Hizmet Şartlarımızı',
    and: 've',
    privacyPolicy: 'Gizlilik Politikamızı kabul etmiş olursunuz',
    
    // Login
    welcomeBack: 'Tekrar Hoşgeldiniz',
    signInToContinue: 'Hesabınıza devam etmek için giriş yapın',
    email: 'E-posta',
    password: 'Şifre',
    forgotPassword: 'Şifremi Unuttum?',
    signIn: 'Giriş Yap',
    dontHaveAccount: 'Hesabınız yok mu?',
    signUp: 'Kayıt Ol',
    
    // Register
    createAccount: 'Hesap Oluştur',
    joinFinanceAI: 'FinanceAI\'ya katılın ve finanslarınızın kontrolünü ele alın',
    fullName: 'Ad Soyad',
    confirmPassword: 'Şifre Onayla',
    alreadyHaveAccount: 'Zaten hesabınız var mı?',
    
    // Forgot Password
    resetPassword: 'Şifre Sıfırla',
    enterEmailToReset: 'E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim',
    sendResetLink: 'Sıfırlama Bağlantısı Gönder',
    backToSignIn: 'Girişe Geri Dön',
    
    // Verification
    verifyEmail: 'E-postanızı Doğrulayın',
    verificationCodeSent: 'Doğrulama kodu gönderildi:',
    enterVerificationCode: 'Aşağıdaki 6 haneli kodu girin',
    verificationCode: 'Doğrulama Kodu',
    verify: 'Doğrula',
    didntReceiveCode: 'Kodu almadınız mı?',
    resendCode: 'Kodu Tekrar Gönder',
    
    
    // General
    active: 'Aktif',
    expired: 'Süresi Dolmuş',
    dueSoon: 'Yakında',
  },
};

export type Language = 'en' | 'tr';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'goodMorning';
  if (hour < 18) return 'goodAfternoon';
  return 'goodEvening';
};

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  getGreeting: () => string;
}>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  getGreeting: () => 'Good Morning',
});

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return {
    ...context,
    getGreeting: () => {
      const greetingKey = getGreeting();
      return context.t(greetingKey as keyof typeof translations.en);
    },
  };
};