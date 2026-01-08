import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from '../utils/translations';

export default function LanguageSettingsScreen() {
  const { t, language, setLanguage } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  ];

  const changeLanguage = (languageCode: Language) => {
    setSelectedLanguage(languageCode);
    setLanguage(languageCode);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('language')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.languageList}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageItem}
            onPress={() => changeLanguage(language.code)}
          >
            <View style={styles.languageLeft}>
              <View style={styles.languageIcon}>
                <Text style={styles.languageFlag}>
                  {language.code === 'tr' ? '🇹🇷' : '🇺🇸'}
                </Text>
              </View>
              <View style={styles.languageContent}>
                <Text style={styles.languageName}>{language.nativeName}</Text>
                <Text style={styles.languageSubname}>{language.name}</Text>
              </View>
            </View>
            {selectedLanguage === language.code && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primaryGreen} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: Platform.OS === 'android' ? 100 : 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  languageList: {
    marginBottom: SPACING.lg,
  },
  languageItem: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  languageFlag: {
    fontSize: 20,
  },
  languageContent: {
    flex: 1,
  },
  languageName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  languageSubname: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
});