import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import SectionHeader from '../../components/SectionHeader';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from '../../utils/translations';

export default function AIScreen() {
  const { t } = useTranslation();
  
  const aiFeatures = [
    {
      title: t('spendingInsights'),
      description: t('spendingInsightsDesc'),
      icon: 'analytics',
      route: '/ai/insights',
      color: COLORS.primaryGreen,
    },
    {
      title: t('budgetAdvisor'),
      description: t('budgetAdvisorDesc'),
      icon: 'bulb',
      route: '/ai/advisor',
      color: COLORS.accentBlue,
    },
    {
      title: t('forecastPredictions'),
      description: t('forecastDesc'),
      icon: 'trending-up',
      route: '/ai/forecast',
      color: COLORS.secondary,
    },
    {
      title: t('chatAssistant'),
      description: t('chatAssistantDesc'),
      icon: 'chatbubbles',
      route: '/ai/chat',
      color: COLORS.warning,
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title={t('aiAssistant')} />
      
      <View style={styles.welcomeCard}>
        <View style={styles.aiIcon}>
          <Ionicons name="sparkles" size={32} color={COLORS.primaryGreen} />
        </View>
        <Text style={styles.welcomeTitle}>{t('yourAiAssistant')}</Text>
        <Text style={styles.welcomeDescription}>
          {t('aiDescription')}
        </Text>
      </View>
      
      <View style={styles.featuresGrid}>
        {aiFeatures.map((feature, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.featureCard}
            onPress={() => router.push(feature.route as any)}
          >
            <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
              <Ionicons name={feature.icon as any} size={24} color={COLORS.background} />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
            <View style={styles.arrowIcon}>
              <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.quickStats}>
        <Text style={styles.statsTitle}>{t('aiInsightsMonth')}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>{t('insights')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$340</Text>
            <Text style={styles.statLabel}>{t('savingsFound')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>{t('accuracy')}</Text>
          </View>
        </View>
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
  welcomeCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  aiIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  welcomeTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  welcomeDescription: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresGrid: {
    marginBottom: SPACING.lg,
  },
  featureCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
  },
  arrowIcon: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
  },
  quickStats: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  statsTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
});