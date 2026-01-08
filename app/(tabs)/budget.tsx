import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '@/utils/theme';
import SectionHeader from '@/components/SectionHeader';
import ChartBar from '@/components/ChartBar';
import { budgetData } from '@/constants/mockData';
import { useTranslation } from '@/utils/translations';

export default function BudgetScreen() {
  const { t } = useTranslation();
  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  return (
    <ScrollView style={styles.container}>
      <SectionHeader title={t('budget')} />
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{t('monthlyBudget')}</Text>
        <Text style={styles.summaryValue}>${totalBudget.toLocaleString()}</Text>
        
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>{t('spent')}</Text>
            <Text style={[styles.summaryItemValue, { color: COLORS.expense }]}>
              ${totalSpent.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>{t('remaining')}</Text>
            <Text style={[styles.summaryItemValue, { color: COLORS.income }]}>
              ${remainingBudget.toLocaleString()}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${(totalSpent / totalBudget) * 100}%`,
                  backgroundColor: totalSpent > totalBudget ? COLORS.error : COLORS.primaryGreen
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {((totalSpent / totalBudget) * 100).toFixed(1)}% {t('used')}
          </Text>
        </View>
      </View>
      
      <SectionHeader title={t('categories')} />
      
      {budgetData.map((item, index) => {
        const percentage = (item.spent / item.budget) * 100;
        const isOverBudget = item.spent > item.budget;
        
        return (
          <View key={index} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{item.category}</Text>
              <Text style={styles.categoryAmount}>
                ${item.spent} / ${item.budget}
              </Text>
            </View>
            
            <View style={styles.categoryProgressContainer}>
              <View style={styles.categoryProgressBar}>
                <View 
                  style={[
                    styles.categoryProgressFill, 
                    { 
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: isOverBudget ? COLORS.error : item.color
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.categoryPercentage, { color: isOverBudget ? COLORS.error : COLORS.muted }]}>
                {percentage.toFixed(0)}%
              </Text>
            </View>
            
            {isOverBudget && (
              <Text style={styles.overBudgetText}>
                ${(item.spent - item.budget).toFixed(2)} {t('overBudget')}
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
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
  summaryLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    marginBottom: SPACING.xs,
  },
  summaryValue: {
    color: COLORS.white,
    fontSize: FONTS.sizes.display,
    fontWeight: '800',
    marginBottom: SPACING.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  summaryItem: {
    flex: 1,
  },
  summaryItemLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.xs,
  },
  summaryItemValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  progressContainer: {
    marginTop: SPACING.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
  },
  categoryCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  categoryAmount: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  categoryProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    marginRight: SPACING.sm,
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  categoryPercentage: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    minWidth: 35,
    textAlign: 'right',
  },
  overBudgetText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
    fontWeight: '500',
  },
});