import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AddAutoPayScreen() {
  const [billName, setBillName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [reminderDays, setReminderDays] = useState('3');

  const paymentMethods = [
    { id: 'checking', name: 'Checking Account', balance: 12450.50, icon: 'card' },
    { id: 'savings', name: 'Savings Account', balance: 45200.34, icon: 'wallet' },
    { id: 'credit', name: 'Credit Card', limit: 5000.00, icon: 'card' },
  ];

  const categories = [
    { id: 'utilities', name: 'Utilities', icon: 'flash', color: COLORS.warning },
    { id: 'internet', name: 'Internet & Phone', icon: 'wifi', color: COLORS.accentBlue },
    { id: 'insurance', name: 'Insurance', icon: 'shield-checkmark', color: COLORS.success },
    { id: 'subscription', name: 'Subscriptions', icon: 'tv', color: COLORS.error },
    { id: 'rent', name: 'Rent & Mortgage', icon: 'home', color: COLORS.primaryGreen },
    { id: 'loan', name: 'Loans & Credit', icon: 'card', color: COLORS.secondary },
  ];

  const frequencies = [
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'yearly', name: 'Yearly' },
  ];

  const dueDateOptions = [
    { id: '1st', name: '1st of month' },
    { id: '15th', name: '15th of month' },
    { id: 'last', name: 'Last day of month' },
    { id: 'custom', name: 'Custom date' },
  ];

  const handleSave = () => {
    console.log('Creating auto pay:', {
      billName,
      amount: parseFloat(amount),
      paymentMethod: selectedPaymentMethod,
      category: selectedCategory,
      dueDate,
      frequency: selectedFrequency,
      reminderDays: parseInt(reminderDays),
    });
    router.back();
  };

  const canSave = billName && amount && selectedPaymentMethod && selectedCategory && dueDate;

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
        <Text style={styles.headerTitle}>Add Auto Pay Bill</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Ionicons name="information-circle" size={20} color={COLORS.accentBlue} />
          <Text style={styles.infoTitle}>Auto Pay Benefits</Text>
        </View>
        <Text style={styles.infoText}>
          Never miss a payment, avoid late fees, and improve your credit score with automatic bill payments.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill Information</Text>
        <TextInput
          style={styles.textInput}
          value={billName}
          onChangeText={setBillName}
          placeholder="Bill name (e.g., Electric Bill, Netflix)"
          placeholderTextColor={COLORS.muted}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amount</Text>
        <View style={styles.amountInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountField}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor={COLORS.muted}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon as any} size={18} color={COLORS.background} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethodItem,
              selectedPaymentMethod === method.id && styles.selectedPaymentMethod
            ]}
            onPress={() => setSelectedPaymentMethod(method.id)}
          >
            <View style={styles.methodLeft}>
              <View style={styles.methodIcon}>
                <Ionicons name={method.icon as any} size={20} color={COLORS.primaryGreen} />
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
            {selectedPaymentMethod === method.id && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primaryGreen} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Frequency</Text>
        <View style={styles.frequencyOptions}>
          {frequencies.map((frequency) => (
            <TouchableOpacity
              key={frequency.id}
              style={[
                styles.frequencyOption,
                selectedFrequency === frequency.id && styles.selectedFrequency
              ]}
              onPress={() => setSelectedFrequency(frequency.id)}
            >
              <Text style={[
                styles.frequencyText,
                selectedFrequency === frequency.id && styles.selectedFrequencyText
              ]}>
                {frequency.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Due Date</Text>
        <View style={styles.dueDateOptions}>
          {dueDateOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.dueDateOption,
                dueDate === option.id && styles.selectedDueDate
              ]}
              onPress={() => setDueDate(option.id)}
            >
              <Text style={[
                styles.dueDateText,
                dueDate === option.id && styles.selectedDueDateText
              ]}>
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {dueDate === 'custom' && (
          <TextInput
            style={[styles.textInput, { marginTop: SPACING.sm }]}
            placeholder="Enter custom date (e.g., 25th, Last Friday)"
            placeholderTextColor={COLORS.muted}
            onChangeText={(text) => setDueDate(text)}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminder Settings</Text>
        <View style={styles.reminderCard}>
          <View style={styles.reminderHeader}>
            <Ionicons name="notifications" size={18} color={COLORS.warning} />
            <Text style={styles.reminderTitle}>Payment Reminder</Text>
          </View>
          <Text style={styles.reminderDescription}>
            Get notified before your auto payment is processed
          </Text>
          <View style={styles.reminderInput}>
            <Text style={styles.reminderLabel}>Remind me</Text>
            <TextInput
              style={styles.reminderDaysInput}
              value={reminderDays}
              onChangeText={setReminderDays}
              keyboardType="numeric"
            />
            <Text style={styles.reminderLabel}>days before</Text>
          </View>
        </View>
      </View>

      <View style={styles.securityCard}>
        <View style={styles.securityHeader}>
          <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
          <Text style={styles.securityTitle}>Security & Control</Text>
        </View>
        <View style={styles.securityFeatures}>
          <View style={styles.securityFeature}>
            <Ionicons name="checkmark" size={14} color={COLORS.success} />
            <Text style={styles.securityFeatureText}>Bank-level encryption</Text>
          </View>
          <View style={styles.securityFeature}>
            <Ionicons name="checkmark" size={14} color={COLORS.success} />
            <Text style={styles.securityFeatureText}>Cancel anytime</Text>
          </View>
          <View style={styles.securityFeature}>
            <Ionicons name="checkmark" size={14} color={COLORS.success} />
            <Text style={styles.securityFeatureText}>Payment confirmations</Text>
          </View>
          <View style={styles.securityFeature}>
            <Ionicons name="checkmark" size={14} color={COLORS.success} />
            <Text style={styles.securityFeatureText}>Fraud protection</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.createButton, !canSave && styles.disabledButton]}
        onPress={handleSave}
        disabled={!canSave}
      >
        <Ionicons name="card" size={20} color={COLORS.background} />
        <Text style={styles.createButtonText}>Set Up Auto Pay</Text>
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
  infoCard: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.accentBlue,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  infoTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  infoText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
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
  textInput: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currencySymbol: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    marginRight: SPACING.sm,
  },
  amountField: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCategory: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen + '20',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    textAlign: 'center',
  },
  paymentMethodItem: {
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
  selectedPaymentMethod: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen + '20',
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
  frequencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  frequencyOption: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedFrequency: {
    borderColor: COLORS.accentBlue,
    backgroundColor: COLORS.accentBlue + '20',
  },
  frequencyText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  selectedFrequencyText: {
    color: COLORS.accentBlue,
    fontWeight: '600',
  },
  dueDateOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dueDateOption: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedDueDate: {
    borderColor: COLORS.warning,
    backgroundColor: COLORS.warning + '20',
  },
  dueDateText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedDueDateText: {
    color: COLORS.warning,
    fontWeight: '600',
  },
  reminderCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  reminderTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  reminderDescription: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.md,
  },
  reminderInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderLabel: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
  },
  reminderDaysInput: {
    backgroundColor: COLORS.background,
    color: COLORS.white,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginHorizontal: SPACING.sm,
    minWidth: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
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
    marginBottom: SPACING.md,
  },
  securityTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  securityFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  securityFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: SPACING.xs,
  },
  securityFeatureText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.xs,
  },
  createButton: {
    backgroundColor: COLORS.primaryGreen,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  disabledButton: {
    backgroundColor: COLORS.muted,
    opacity: 0.5,
  },
  createButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginLeft: SPACING.sm,
  },
});