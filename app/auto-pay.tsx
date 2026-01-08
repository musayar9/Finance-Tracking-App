import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Switch, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AutoPayScreen() {
  const [bills, setBills] = useState([
    { id: 1, name: 'Electricity Bill', amount: 120.50, autoPayEnabled: true, paymentMethod: 'Checking Account', dueDate: '15th', color: COLORS.warning },
    { id: 2, name: 'Internet Bill', amount: 59.99, autoPayEnabled: false, paymentMethod: 'Credit Card', dueDate: '20th', color: COLORS.accentBlue },
    { id: 3, name: 'Netflix Subscription', amount: 15.99, autoPayEnabled: true, paymentMethod: 'Checking Account', dueDate: '18th', color: COLORS.error },
    { id: 4, name: 'Phone Bill', amount: 45.00, autoPayEnabled: false, paymentMethod: 'Savings Account', dueDate: '25th', color: COLORS.secondary },
  ]);

  const paymentMethods = [
    { id: 'checking', name: 'Checking Account', balance: 12450.50 },
    { id: 'savings', name: 'Savings Account', balance: 45200.34 },
    { id: 'credit', name: 'Credit Card', limit: 5000.00 },
  ];

  const toggleAutoPay = (billId: number) => {
    setBills(bills.map(bill => 
      bill.id === billId 
        ? { ...bill, autoPayEnabled: !bill.autoPayEnabled }
        : bill
    ));
  };

  const enabledBills = bills.filter(bill => bill.autoPayEnabled);
  const totalAutoPayAmount = enabledBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Auto Pay Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Ionicons name="card" size={24} color={COLORS.primaryGreen} />
          <Text style={styles.summaryTitle}>Auto Pay Summary</Text>
        </View>
        <Text style={styles.totalAmount}>${totalAutoPayAmount.toFixed(2)}</Text>
        <Text style={styles.summarySubtitle}>
          {enabledBills.length} bills set to auto pay monthly
        </Text>
        
        <View style={styles.benefitsContainer}>
          <View style={styles.benefit}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.benefitText}>Never miss a payment</Text>
          </View>
          <View style={styles.benefit}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.benefitText}>Avoid late fees</Text>
          </View>
          <View style={styles.benefit}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.benefitText}>Improve credit score</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bills & Subscriptions</Text>
        {bills.map((bill) => (
          <View key={bill.id} style={styles.billCard}>
            <View style={styles.billHeader}>
              <View style={styles.billLeft}>
                <View style={[styles.billIcon, { backgroundColor: bill.color }]}>
                  <Ionicons name="receipt" size={18} color={COLORS.background} />
                </View>
                <View style={styles.billInfo}>
                  <Text style={styles.billName}>{bill.name}</Text>
                  <Text style={styles.billDetails}>
                    ${bill.amount.toFixed(2)} • Due {bill.dueDate}
                  </Text>
                  {bill.autoPayEnabled && (
                    <Text style={styles.paymentMethod}>
                      via {bill.paymentMethod}
                    </Text>
                  )}
                </View>
              </View>
              <Switch
                value={bill.autoPayEnabled}
                onValueChange={() => toggleAutoPay(bill.id)}
                trackColor={{ false: COLORS.border, true: COLORS.primaryGreen }}
                thumbColor={COLORS.white}
              />
            </View>
            
            {bill.autoPayEnabled && (
              <View style={styles.autoPaySettings}>
                <TouchableOpacity style={styles.settingButton}>
                  <Ionicons name="card" size={16} color={COLORS.accentBlue} />
                  <Text style={styles.settingButtonText}>Change Payment Method</Text>
                  <Ionicons name="chevron-forward" size={14} color={COLORS.muted} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingButton}>
                  <Ionicons name="calendar" size={16} color={COLORS.warning} />
                  <Text style={styles.settingButtonText}>Modify Schedule</Text>
                  <Ionicons name="chevron-forward" size={14} color={COLORS.muted} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentMethodCard}>
            <View style={styles.methodLeft}>
              <View style={styles.methodIcon}>
                <Ionicons 
                  name={method.id === 'credit' ? 'card' : 'wallet'} 
                  size={20} 
                  color={COLORS.primaryGreen} 
                />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodBalance}>
                  {method.id === 'credit' 
                    ? `Limit: $${method.limit?.toLocaleString()}` 
                    : `Balance: $${method.balance?.toLocaleString()}`
                  }
                </Text>
              </View>
            </View>
            <View style={styles.methodStats}>
              <Text style={styles.methodUsage}>
                {bills.filter(b => b.autoPayEnabled && b.paymentMethod === method.name).length} bills
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.securityCard}>
        <View style={styles.securityHeader}>
          <Ionicons name="shield-checkmark" size={24} color={COLORS.success} />
          <Text style={styles.securityTitle}>Security & Control</Text>
        </View>
        <Text style={styles.securityText}>
          Auto Pay is secured with bank-level encryption. You can cancel or modify any auto payment at any time.
        </Text>
        
        <View style={styles.securityFeatures}>
          <View style={styles.securityFeature}>
            <Ionicons name="notifications" size={16} color={COLORS.accentBlue} />
            <Text style={styles.securityFeatureText}>Payment confirmations</Text>
          </View>
          <View style={styles.securityFeature}>
            <Ionicons name="lock-closed" size={16} color={COLORS.accentBlue} />
            <Text style={styles.securityFeatureText}>Fraud protection</Text>
          </View>
          <View style={styles.securityFeature}>
            <Ionicons name="time" size={16} color={COLORS.accentBlue} />
            <Text style={styles.securityFeatureText}>Cancel anytime</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addBillButton}
        onPress={() => router.push('/add-autopay')}
      >
        <Ionicons name="add-circle" size={20} color={COLORS.primaryGreen} />
        <Text style={styles.addBillText}>Add New Auto Pay Bill</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'android' ? 100 : 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    paddingTop: Platform.OS === 'ios' ? 50 : SPACING.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  summaryTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginLeft: SPACING.sm,
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
    marginBottom: SPACING.md,
  },
  benefitsContainer: {
    marginTop: SPACING.sm,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  benefitText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.sm,
  },
  section: {
    margin: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  billCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  billIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  billDetails: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  paymentMethod: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  autoPaySettings: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  settingButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  paymentMethodCard: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  methodBalance: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  methodStats: {
    alignItems: 'flex-end',
  },
  methodUsage: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  securityCard: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  securityTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  securityText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  securityFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  securityFeature: {
    alignItems: 'center',
    flex: 1,
  },
  securityFeatureText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  addBillButton: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.primaryGreen,
    borderStyle: 'dashed',
  },
  addBillText: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});