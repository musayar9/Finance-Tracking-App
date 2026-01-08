import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TransferScreen() {
  const [amount, setAmount] = useState('');
  const [fromWallet, setFromWallet] = useState('');
  const [toWallet, setToWallet] = useState('');
  const [note, setNote] = useState('');

  const wallets = [
    { id: 'checking', name: 'Checking Account', balance: 12450.50, icon: 'card' },
    { id: 'savings', name: 'Savings Account', balance: 45200.34, icon: 'wallet' },
    { id: 'cash', name: 'Cash Wallet', balance: 850.00, icon: 'cash' },
    { id: 'investment', name: 'Investment Account', balance: 25600.75, icon: 'trending-up' },
  ];

  const transferFee = 0; // Free transfer
  const totalAmount = parseFloat(amount) + transferFee;

  const handleTransfer = () => {
    console.log('Transfer:', {
      amount: parseFloat(amount),
      from: fromWallet,
      to: toWallet,
      note,
      fee: transferFee,
    });
    router.back();
  };

  const canTransfer = amount && fromWallet && toWallet && fromWallet !== toWallet;

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
        <Text style={styles.headerTitle}>Transfer Money</Text>
        <View style={styles.placeholder} />
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
        <Text style={styles.sectionTitle}>From Wallet</Text>
        {wallets.map((wallet) => (
          <TouchableOpacity
            key={wallet.id}
            style={[
              styles.walletItem,
              fromWallet === wallet.id && styles.selectedWallet
            ]}
            onPress={() => setFromWallet(wallet.id)}
          >
            <View style={styles.walletLeft}>
              <View style={styles.walletIcon}>
                <Ionicons name={wallet.icon as any} size={20} color={COLORS.primaryGreen} />
              </View>
              <View style={styles.walletInfo}>
                <Text style={styles.walletName}>{wallet.name}</Text>
                <Text style={styles.walletBalance}>Available: ${wallet.balance.toLocaleString()}</Text>
              </View>
            </View>
            {fromWallet === wallet.id && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primaryGreen} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.transferIcon}>
        <Ionicons name="swap-vertical" size={24} color={COLORS.accentBlue} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>To Wallet</Text>
        {wallets.map((wallet) => (
          <TouchableOpacity
            key={wallet.id}
            style={[
              styles.walletItem,
              toWallet === wallet.id && styles.selectedWallet,
              fromWallet === wallet.id && styles.disabledWallet
            ]}
            onPress={() => fromWallet !== wallet.id && setToWallet(wallet.id)}
            disabled={fromWallet === wallet.id}
          >
            <View style={styles.walletLeft}>
              <View style={styles.walletIcon}>
                <Ionicons name={wallet.icon as any} size={20} color={COLORS.primaryGreen} />
              </View>
              <View style={styles.walletInfo}>
                <Text style={[styles.walletName, fromWallet === wallet.id && styles.disabledText]}>
                  {wallet.name}
                </Text>
                <Text style={[styles.walletBalance, fromWallet === wallet.id && styles.disabledText]}>
                  Balance: ${wallet.balance.toLocaleString()}
                </Text>
              </View>
            </View>
            {toWallet === wallet.id && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primaryGreen} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Note (Optional)</Text>
        <TextInput
          style={styles.textInput}
          value={note}
          onChangeText={setNote}
          placeholder="Add a note for this transfer..."
          placeholderTextColor={COLORS.muted}
          multiline
        />
      </View>

      {amount && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Transfer Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryValue}>${parseFloat(amount).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Transfer Fee</Text>
            <Text style={[styles.summaryValue, { color: COLORS.success }]}>
              {transferFee === 0 ? 'FREE' : `$${transferFee.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity 
        style={[styles.transferButton, !canTransfer && styles.disabledButton]}
        onPress={handleTransfer}
        disabled={!canTransfer}
      >
        <Text style={styles.transferButtonText}>Transfer Now</Text>
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
  disabledWallet: {
    opacity: 0.5,
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
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
  disabledText: {
    color: COLORS.muted,
  },
  transferIcon: {
    alignSelf: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textInput: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 80,
    textAlignVertical: 'top',
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
  summaryTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  summaryValue: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  totalLabel: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  totalValue: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.lg,
    fontWeight: '800',
  },
  transferButton: {
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
  transferButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
});