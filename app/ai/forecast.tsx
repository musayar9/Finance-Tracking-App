import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import SectionHeader from '../../components/SectionHeader';
import { Ionicons } from '@expo/vector-icons';

export default function AIForecastScreen() {
  const predictions = [
    {
      title: 'Next Month Spending',
      amount: 2450,
      change: 5,
      trend: 'up',
      icon: 'trending-up',
      color: COLORS.warning,
    },
    {
      title: 'Savings Projection',
      amount: 1200,
      change: 8,
      trend: 'up',
      icon: 'wallet',
      color: COLORS.success,
    },
    {
      title: 'Investment Growth',
      amount: 850,
      change: 12,
      trend: 'up',
      icon: 'bar-chart',
      color: COLORS.primaryGreen,
    },
  ];

  const monthlyTrends = [
    { month: 'Jan', spending: 2200, savings: 800 },
    { month: 'Feb', spending: 2350, savings: 750 },
    { month: 'Mar', spending: 2180, savings: 920 },
    { month: 'Apr', spending: 2420, savings: 680 },
    { month: 'May', spending: 2300, savings: 800 },
    { month: 'Jun', spending: 2450, savings: 750 },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="AI Forecast" />
      
      <View style={styles.forecastHeader}>
        <Ionicons name="crystal-ball" size={32} color={COLORS.accentBlue} />
        <Text style={styles.headerTitle}>Financial Predictions</Text>
        <Text style={styles.headerSubtitle}>
          AI-powered forecasts based on your spending patterns
        </Text>
      </View>
      
      <View style={styles.predictionsContainer}>
        {predictions.map((prediction, index) => (
          <View key={index} style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <View style={[styles.predictionIcon, { backgroundColor: prediction.color }]}>
                <Ionicons name={prediction.icon as any} size={20} color={COLORS.background} />
              </View>
              <View style={styles.predictionInfo}>
                <Text style={styles.predictionTitle}>{prediction.title}</Text>
                <Text style={styles.predictionAmount}>${prediction.amount.toLocaleString()}</Text>
              </View>
              <View style={styles.changeContainer}>
                <Ionicons 
                  name={prediction.trend === 'up' ? 'trending-up' : 'trending-down'} 
                  size={16} 
                  color={prediction.trend === 'up' ? COLORS.success : COLORS.error} 
                />
                <Text style={[
                  styles.changeText, 
                  { color: prediction.trend === 'up' ? COLORS.success : COLORS.error }
                ]}>
                  {prediction.change}%
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.trendChart}>
        <Text style={styles.chartTitle}>6-Month Trend Analysis</Text>
        <View style={styles.chartContainer}>
          {monthlyTrends.map((month, index) => {
            const maxValue = Math.max(...monthlyTrends.map(m => Math.max(m.spending, m.savings)));
            const spendingHeight = (month.spending / maxValue) * 100;
            const savingsHeight = (month.savings / maxValue) * 100;
            
            return (
              <View key={index} style={styles.chartBar}>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.spendingBar, 
                      { height: `${spendingHeight}%` }
                    ]} 
                  />
                  <View 
                    style={[
                      styles.savingsBar, 
                      { height: `${savingsHeight}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.monthLabel}>{month.month}</Text>
              </View>
            );
          })}
        </View>
        
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: COLORS.error }]} />
            <Text style={styles.legendText}>Spending</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: COLORS.primaryGreen }]} />
            <Text style={styles.legendText}>Savings</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>Market Insights</Text>
        <View style={styles.insight}>
          <Ionicons name="trending-up" size={16} color={COLORS.success} />
          <Text style={styles.insightText}>
            Market spending trend is rising 5% monthly
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="information-circle" size={16} color={COLORS.accentBlue} />
          <Text style={styles.insightText}>
            Holiday season may increase expenses by 15-20%
          </Text>
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
  forecastHeader: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
  },
  predictionsContainer: {
    marginBottom: SPACING.lg,
  },
  predictionCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  predictionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  predictionInfo: {
    flex: 1,
  },
  predictionTitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  predictionAmount: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginTop: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  trendChart: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  chartTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: SPACING.md,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    width: '80%',
  },
  spendingBar: {
    backgroundColor: COLORS.error,
    width: '45%',
    marginRight: 2,
    borderRadius: 2,
  },
  savingsBar: {
    backgroundColor: COLORS.primaryGreen,
    width: '45%',
    borderRadius: 2,
  },
  monthLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  legendText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
  },
  insightsCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  insightsTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  insight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  insightText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.sm,
    flex: 1,
    lineHeight: 18,
  },
});