import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AddBillScreen() {
  const [billName, setBillName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState('monthly');
  const [notes, setNotes] = useState('');

  const categories = [
    { id: 'utilities', name: 'Utilities', icon: 'flash', color: COLORS.warning },
    { id: 'internet', name: 'Internet & Phone', icon: 'wifi', color: COLORS.accentBlue },
    { id: 'insurance', name: 'Insurance', icon: 'shield-checkmark', color: COLORS.success },
    { id: 'subscription', name: 'Subscriptions', icon: 'tv', color: COLORS.error },
    { id: 'rent', name: 'Rent & Mortgage', icon: 'home', color: COLORS.primaryGreen },
    { id: 'loan', name: 'Loans', icon: 'card', color: COLORS.secondary },
    { id: 'other', name: 'Other', icon: 'ellipsis-horizontal', color: COLORS.muted },
  ];

  const recurringOptions = [
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'yearly', name: 'Yearly' },
  ];

  const handleSave = () => {
    console.log('Saving bill:', {
      name: billName,
      amount: parseFloat(amount),
      dueDate,
      category: selectedCategory,
      isRecurring,
      recurringType: isRecurring ? recurringType : null,
      notes,
    });
    router.back();
  };

  const canSave = billName && amount && dueDate && selectedCategory;

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
        <Text style={styles.headerTitle}>Add Custom Bill</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill Information</Text>
        <TextInput
          style={styles.textInput}
          value={billName}
          onChangeText={setBillName}
          placeholder="Bill name (e.g., Water Bill, Gym Membership)"
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
        <Text style={styles.sectionTitle}>Due Date</Text>
        <TextInput
          style={styles.textInput}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="e.g., 15th of each month, Dec 25, etc."
          placeholderTextColor={COLORS.muted}
        />
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
        <View style={styles.recurringHeader}>
          <Text style={styles.sectionTitle}>Recurring Bill</Text>
          <TouchableOpacity 
            style={[styles.toggleButton, isRecurring && styles.activeToggle]}
            onPress={() => setIsRecurring(!isRecurring)}
          >
            <Text style={[styles.toggleText, isRecurring && styles.activeToggleText]}>
              {isRecurring ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {isRecurring && (
          <View style={styles.recurringOptions}>
            {recurringOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.recurringOption,
                  recurringType === option.id && styles.selectedRecurring
                ]}
                onPress={() => setRecurringType(option.id)}
              >
                <Text style={[
                  styles.recurringText,
                  recurringType === option.id && styles.selectedRecurringText
                ]}>
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes (Optional)</Text>
        <TextInput
          style={[styles.textInput, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any additional notes about this bill..."
          placeholderTextColor={COLORS.muted}
          multiline
        />
      </View>

      <View style={styles.reminderCard}>
        <View style={styles.reminderHeader}>
          <Ionicons name="notifications" size={20} color={COLORS.accentBlue} />
          <Text style={styles.reminderTitle}>Reminder Settings</Text>
        </View>
        <Text style={styles.reminderText}>
          We'll automatically create reminders for this bill based on your notification preferences.
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, !canSave && styles.disabledButton]}
        onPress={handleSave}
        disabled={!canSave}
      >
        <Ionicons name="checkmark-circle" size={20} color={COLORS.background} />
        <Text style={styles.saveButtonText}>Create Bill</Text>
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
  recurringHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  toggleButton: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeToggle: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  toggleText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  activeToggleText: {
    color: COLORS.background,
  },
  recurringOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recurringOption: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedRecurring: {
    borderColor: COLORS.accentBlue,
    backgroundColor: COLORS.accentBlue + '20',
  },
  recurringText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  selectedRecurringText: {
    color: COLORS.accentBlue,
    fontWeight: '600',
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  reminderCard: {
    backgroundColor: COLORS.card,
    margin: SPACING.md,
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
  reminderText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 18,
  },
  saveButton: {
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
  saveButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginLeft: SPACING.sm,
  },
});