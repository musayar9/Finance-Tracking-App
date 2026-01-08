import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';
import SectionHeader from '../../components/SectionHeader';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BillsScreen() {
  const bills = [
    {
      id: 1,
      name: 'Electricity',
      amount: 120.50,
      dueDate: 'Dec 15',
      status: 'pending',
      icon: 'flash',
      color: COLORS.warning,
    },
    {
      id: 2,
      name: 'Internet',
      amount: 59.99,
      dueDate: 'Dec 20',
      status: 'paid',
      icon: 'wifi',
      color: COLORS.accentBlue,
    },
    {
      id: 3,
      name: 'Rent',
      amount: 1200.00,
      dueDate: 'Dec 1',
      status: 'paid',
      icon: 'home',
      color: COLORS.primaryGreen,
    },
    {
      id: 4,
      name: 'Phone',
      amount: 45.00,
      dueDate: 'Dec 25',
      status: 'pending',
      icon: 'phone-portrait',
      color: COLORS.secondary,
    },
  ];

  const totalPending = bills
    .filter(bill => bill.status === 'pending')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const upcomingBills = bills.filter(bill => bill.status === 'pending');

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="Bills & Payments" />
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Upcoming Bills</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/add-bill')}
          >
            <Ionicons name="add" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </View>
        <Text style={styles.totalAmount}>${totalPending.toFixed(2)}</Text>
        <Text style={styles.summarySubtitle}>
          {upcomingBills.length} bills due this month
        </Text>
      </View>
      
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/bill-calendar')}
        >
          <Ionicons name="calendar" size={24} color={COLORS.accentBlue} />
          <Text style={styles.actionText}>Calendar View</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/reminders')}
        >
          <Ionicons name="notifications" size={24} color={COLORS.warning} />
          <Text style={styles.actionText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/auto-pay')}
        >
          <Ionicons name="card" size={24} color={COLORS.primaryGreen} />
          <Text style={styles.actionText}>Auto Pay</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.billsList}>
        <Text style={styles.sectionTitle}>All Bills</Text>
        {bills.map((bill) => (
          <TouchableOpacity key={bill.id} style={styles.billCard}>
            <View style={[styles.billIcon, { backgroundColor: bill.color }]}>
              <Ionicons name={bill.icon as any} size={20} color={COLORS.background} />
            </View>
            
            <View style={styles.billInfo}>
              <Text style={styles.billName}>{bill.name}</Text>
              <Text style={styles.billDue}>Due {bill.dueDate}</Text>
            </View>
            
            <View style={styles.billRight}>
              <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: bill.status === 'paid' ? COLORS.success + '20' : COLORS.warning + '20' }
              ]}>
                <Text style={[
                  styles.statusText, 
                  { color: bill.status === 'paid' ? COLORS.success : COLORS.warning }
                ]}>
                  {bill.status === 'paid' ? 'Paid' : 'Pending'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>Bill Insights</Text>
        <View style={styles.insight}>
          <Ionicons name="trending-down" size={16} color={COLORS.success} />
          <Text style={styles.insightText}>
            Your monthly bills decreased by 8% compared to last month
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="time" size={16} color={COLORS.accentBlue} />
          <Text style={styles.insightText}>
            Set up auto-pay to avoid late fees and improve credit score
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
  summaryCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryTitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAmount: {
    color: COLORS.white,
    fontSize: FONTS.sizes.display,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  summarySubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  actionCard: {
    backgroundColor: COLORS.card,
    flex: 1,
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    marginTop: SPACING.xs,
  },
  billsList: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  billCard: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  billIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  billDue: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  billRight: {
    alignItems: 'flex-end',
  },
  billAmount: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: SPACING.xs,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
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