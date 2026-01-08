import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import SectionHeader from '../../components/SectionHeader';
import AIInsightCard from '../../components/AIInsightCard';
import { Ionicons } from '@expo/vector-icons';

export default function AIInsightsScreen() {
  const insights = [
    {
      title: 'Dining Expenses Alert',
      message: 'This month your dining expenses increased by 12%. Consider cooking at home more often to save money.',
      type: 'warning' as const,
    },
    {
      title: 'Subscription Savings',
      message: 'You can save $180 by canceling unused subscriptions. Netflix and Spotify haven\'t been used in 30 days.',
      type: 'success' as const,
    },
    {
      title: 'Budget Performance',
      message: 'You\'re on track to stay within budget this month. Great job managing your expenses!',
      type: 'success' as const,
    },
    {
      title: 'Investment Opportunity',
      message: 'Based on your spending patterns, you could invest an additional $500 monthly in your portfolio.',
      type: 'info' as const,
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="AI Insights" />
      
      <View style={styles.aiHeader}>
        <View style={styles.aiIcon}>
          <Ionicons name="sparkles" size={24} color={COLORS.primaryGreen} />
        </View>
        <View style={styles.aiInfo}>
          <Text style={styles.aiTitle}>Your AI Financial Assistant</Text>
          <Text style={styles.aiSubtitle}>Personalized insights based on your spending patterns</Text>
        </View>
      </View>
      
      <View style={styles.insightsContainer}>
        {insights.map((insight, index) => (
          <AIInsightCard
            key={index}
            title={insight.title}
            message={insight.message}
            type={insight.type}
          />
        ))}
      </View>
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>This Month's Summary</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Insights</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$180</Text>
            <Text style={styles.statLabel}>Potential Savings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Budget Score</Text>
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
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  aiIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  aiInfo: {
    flex: 1,
  },
  aiTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  aiSubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  insightsContainer: {
    marginBottom: SPACING.lg,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  summaryTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  summaryStats: {
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