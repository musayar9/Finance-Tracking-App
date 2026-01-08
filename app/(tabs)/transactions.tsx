import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '@/utils/theme';
import SectionHeader from '@/components/SectionHeader';
import TransactionItem from '@/components/TransactionItem';
import CategoryTag from '@/components/CategoryTag';
import { transactions, categories } from '@/constants/mockData';
import { useTranslation } from '@/utils/translations';

export default function TransactionsScreen() {
  const { t } = useTranslation();
  
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  return (
    <ScrollView style={styles.container}>
      <SectionHeader title={t('transactions')} />
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <TouchableOpacity style={[styles.categoryButton, styles.activeCategory]}>
          <Text style={styles.activeCategoryText}>{t('all')}</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category.key}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
        <View key={date} style={styles.dateGroup}>
          <Text style={styles.dateHeader}>{new Date(date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</Text>
          {dayTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              title={transaction.title}
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.date}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  categoriesContainer: {
    marginBottom: SPACING.lg,
  },
  categoryButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeCategory: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  categoryText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  dateGroup: {
    marginBottom: SPACING.lg,
  },
  dateHeader: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
});
