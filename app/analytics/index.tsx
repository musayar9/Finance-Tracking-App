import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import SectionHeader from '../../components/SectionHeader';
import ChartBar from '../../components/ChartBar';
import { Ionicons } from '@expo/vector-icons';

export default function AnalyticsScreen() {
  const monthlyData = {
    income: 4500,
    expenses: 3200,
    savings: 1300,
  };

  const categoryData = [
    { category: 'Food & Dining', amount: 680, color: COLORS.error },
    { category: 'Transportation', amount: 520, color: COLORS.accentBlue },
    { category: 'Shopping', amount: 450, color: COLORS.warning },
    { category: 'Entertainment', amount: 320, color: COLORS.secondary },
    { category: 'Bills & Utilities', amount: 280, color: COLORS.muted },
  ];

  const maxAmount = Math.max(...categoryData.map(item => item.amount));

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="Analytics" />
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>This Month Overview</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Ionicons name="trending-up" size={20} color={COLORS.success} />
            <Text style={styles.statLabel}>Income</Text>
            <Text style={[styles.statValue, { color: COLORS.success }]}>
              ${monthlyData.income.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trending-down" size={20} color={COLORS.error} />
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={[styles.statValue, { color: COLORS.error }]}>
              ${monthlyData.expenses.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="wallet" size={20} color={COLORS.primaryGreen} />
            <Text style={styles.statLabel}>Savings</Text>
            <Text style={[styles.statValue, { color: COLORS.primaryGreen }]}>
              ${monthlyData.savings.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.pieChartCard}>
        <Text style={styles.chartTitle}>Expense Breakdown</Text>
        <View style={styles.pieContainer}>
          {categoryData.map((item, index) => {
            const percentage = ((item.amount / categoryData.reduce((sum, cat) => sum + cat.amount, 0)) * 100).toFixed(1);
            return (
              <View key={index} style={styles.pieItem}>
                <View style={[styles.pieColor, { backgroundColor: item.color }]} />
                <View style={styles.pieInfo}>
                  <Text style={styles.pieCategory}>{item.category}</Text>
                  <Text style={styles.pieAmount}>${item.amount}</Text>
                </View>
                <Text style={styles.piePercentage}>{percentage}%</Text>
              </View>
            );
          })}
        </View>
      </View>
      
      <View style={styles.trendsCard}>
        <Text style={styles.chartTitle}>Category Spending</Text>
        <View style={styles.barsContainer}>
          {categoryData.map((item, index) => (
            <ChartBar
              key={index}
              label={item.category}
              value={item.amount}
              maxValue={maxAmount}
              color={item.color}
            />
          ))}
        </View>
      </View>
      
      <View style={styles.comparisonCard}>
        <Text style={styles.chartTitle}>Monthly Comparison</Text>
        <View style={styles.comparisonStats}>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonLabel}>vs Last Month</Text>
            <View style={styles.comparisonValue}>
              <Ionicons name="trending-up" size={16} color={COLORS.success} />
              <Text style={[styles.comparisonText, { color: COLORS.success }]}>
                +12% savings
              </Text>
            </View>
          </View>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonLabel}>vs Last Year</Text>
            <View style={styles.comparisonValue}>
              <Ionicons name="trending-up" size={16} color={COLORS.success} />
              <Text style={[styles.comparisonText, { color: COLORS.success }]}>
                +25% income
              </Text>
            </View>
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
  summaryCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
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
    flex: 1,
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  pieChartCard: {
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
  pieContainer: {
    marginTop: SPACING.sm,
  },
  pieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  pieColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  pieInfo: {
    flex: 1,
  },
  pieCategory: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  pieAmount: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  piePercentage: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  trendsCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  barsContainer: {
    marginTop: SPACING.sm,
  },
  comparisonCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  comparisonStats: {
    marginTop: SPACING.sm,
  },
  comparisonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  comparisonLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  comparisonValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comparisonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
});