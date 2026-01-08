import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AddTransactionScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');

  const categories = [
    { id: 'food', name: 'Food & Dining', icon: 'restaurant', color: COLORS.error },
    { id: 'transport', name: 'Transportation', icon: 'car', color: COLORS.accentBlue },
    { id: 'shopping', name: 'Shopping', icon: 'bag', color: COLORS.warning },
    { id: 'entertainment', name: 'Entertainment', icon: 'game-controller', color: COLORS.secondary },
    { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', color: COLORS.muted },
    { id: 'salary', name: 'Salary', icon: 'briefcase', color: COLORS.success },
  ];

  const wallets = [
    { id: 'checking', name: 'Checking Account', balance: 12450.50 },
    { id: 'savings', name: 'Savings Account', balance: 45200.34 },
    { id: 'cash', name: 'Cash', balance: 850.00 },
  ];

  const handleSave = () => {
    // Here you would save the transaction
    console.log('Saving transaction:', {
      amount: parseFloat(amount),
      description,
      category: selectedCategory,
      wallet: selectedWallet,
      type: transactionType,
    });
    router.back();
  };

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
        <Text style={styles.headerTitle}>Add Transaction</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.typeSelector}>
        <TouchableOpacity 
          style={[styles.typeButton, transactionType === 'expense' && styles.activeTypeButton]}
          onPress={() => setTransactionType('expense')}
        >
          <Ionicons name="remove-circle" size={20} color={transactionType === 'expense' ? COLORS.background : COLORS.error} />
          <Text style={[styles.typeText, transactionType === 'expense' && styles.activeTypeText]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.typeButton, transactionType === 'income' && styles.activeTypeButton]}
          onPress={() => setTransactionType('income')}
        >
          <Ionicons name="add-circle" size={20} color={transactionType === 'income' ? COLORS.background : COLORS.success} />
          <Text style={[styles.typeText, transactionType === 'income' && styles.activeTypeText]}>
            Income
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.amountSection}>
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
        <Text style={styles.sectionTitle}>Description</Text>
        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description..."
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
                <Ionicons name={category.icon as any} size={20} color={COLORS.background} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wallet</Text>
        {wallets.map((wallet) => (
          <TouchableOpacity
            key={wallet.id}
            style={[
              styles.walletItem,
              selectedWallet === wallet.id && styles.selectedWallet
            ]}
            onPress={() => setSelectedWallet(wallet.id)}
          >
            <View style={styles.walletInfo}>
              <Text style={styles.walletName}>{wallet.name}</Text>
              <Text style={styles.walletBalance}>${wallet.balance.toLocaleString()}</Text>
            </View>
            {selectedWallet === wallet.id && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primaryGreen} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, (!amount || !selectedCategory || !selectedWallet) && styles.disabledButton]}
        onPress={handleSave}
        disabled={!amount || !selectedCategory || !selectedWallet}
      >
        <Text style={styles.saveButtonText}>Save Transaction</Text>
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
  typeSelector: {
    flexDirection: 'row',
    margin: SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  activeTypeButton: {
    backgroundColor: COLORS.primaryGreen,
  },
  typeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  activeTypeText: {
    color: COLORS.background,
  },
  amountSection: {
    margin: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
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
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '700',
    marginRight: SPACING.sm,
  },
  amountField: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '700',
  },
  section: {
    margin: SPACING.md,
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
  walletItem: {
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
  selectedWallet: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen + '20',
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  walletBalance: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: COLORS.primaryGreen,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
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
  },
});