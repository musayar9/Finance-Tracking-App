import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import BalanceCard from '../../components/BalanceCard';
import SectionHeader from '../../components/SectionHeader';
import TransactionItem from '../../components/TransactionItem';
import { transactions } from '../../constants/mockData';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from '../../utils/translations';

export default function HomeScreen() {
  const { t, getGreeting } = useTranslation();
  
  const quickActions = [
    { title: t('add'), icon: 'add-circle', color: COLORS.primaryGreen, action: () => router.push('/add-transaction') },
    { title: t('transfer'), icon: 'swap-horizontal', color: COLORS.accentBlue, action: () => router.push('/transfer') },
    { title: t('pay'), icon: 'card', color: COLORS.secondary, action: () => router.push('/pay-bill') },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AM</Text>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.name}>Alex Morgan</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      <BalanceCard balance={185450.75} />
      
      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.actionButton, { backgroundColor: action.color }]}
            onPress={action.action}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={action.icon as any} size={28} color={COLORS.background} />
            </View>
            <Text style={styles.actionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <SectionHeader title={t('recentTransactions')} actionText={t('seeAll')} />
      
      {transactions.slice(0, 5).map((transaction) => (
        <TransactionItem
          key={transaction.id}
          title={transaction.title}
          category={transaction.category}
          amount={transaction.amount}
          date={transaction.date}
        />
      ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  name: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.lg,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.xs,
    ...SHADOWS.soft,
    minHeight: 80,
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.xs,
  },
  actionText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
});
