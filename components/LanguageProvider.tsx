import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language, LanguageContext } from '../utils/translations';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    let greetingKey: keyof typeof translations.en;
    if (hour < 12) greetingKey = 'goodMorning';
    else if (hour < 18) greetingKey = 'goodAfternoon';
    else greetingKey = 'goodEvening';
    return t(greetingKey);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getGreeting }}>
      {children}
    </LanguageContext.Provider>
  );
};