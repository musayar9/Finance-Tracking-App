import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '@/utils/theme';
import SectionHeader from '@/components/SectionHeader';
import { portfolioData } from '@/constants/mockData';
import { useTranslation } from '@/utils/translations';

export default function PortfolioScreen() {
  const { t } = useTranslation();
  const totalValue = portfolioData.reduce((sum, item) => sum + (item.price * item.shares), 0);
  const totalChange = portfolioData.reduce((sum, item) => sum + (item.change * item.shares), 0);
  const changePercentage = ((totalChange / totalValue) * 100).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <SectionHeader title={t('portfolio')} />
      
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>{t('totalPortfolioValue')}</Text>
        <Text style={styles.totalValue}>${totalValue.toLocaleString()}</Text>
        <View style={styles.changeContainer}>
          <Text style={[styles.changeText, { color: totalChange >= 0 ? COLORS.income : COLORS.expense }]}>
            {totalChange >= 0 ? '+' : ''}${Math.abs(totalChange).toFixed(2)} ({changePercentage}%)
          </Text>
          <Text style={styles.changeLabel}>{t('todaysPL')}</Text>
        </View>
      </View>
      
      <SectionHeader title={t('holdings')} />
      
      {portfolioData.map((item, index) => {
        const itemValue = item.price * item.shares;
        const itemChange = item.change * item.shares;
        const itemChangePercentage = ((itemChange / itemValue) * 100).toFixed(2);
        
        return (
          <View key={index} style={styles.holdingCard}>
            <View style={styles.holdingHeader}>
              <View>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={styles.holdingValues}>
                <Text style={styles.holdingValue}>${itemValue.toLocaleString()}</Text>
                <Text style={[styles.holdingChange, { color: itemChange >= 0 ? COLORS.income : COLORS.expense }]}>
                  {itemChange >= 0 ? '+' : ''}${Math.abs(itemChange).toFixed(2)} ({itemChangePercentage}%)
                </Text>
              </View>
            </View>
            <View style={styles.holdingDetails}>
              <Text style={styles.detailText}>{item.shares} {t('shares')} × ${item.price}</Text>
            </View>
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
  totalCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  totalLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    marginBottom: SPACING.xs,
  },
  totalValue: {
    color: COLORS.white,
    fontSize: FONTS.sizes.display,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginRight: SPACING.sm,
  },
  changeLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  holdingCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  holdingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  symbol: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  name: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  holdingValues: {
    alignItems: 'flex-end',
  },
  holdingValue: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
  holdingChange: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    marginTop: 2,
  },
  holdingDetails: {
    marginTop: SPACING.sm,
  },
  detailText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
  },
});