import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { requireBiometricAuth } from "../functions/function";
import { BORDER_RADIUS, COLORS, FONTS, SHADOWS, SPACING } from "../utils/theme";
import * as SecureStore from "expo-secure-store"
export default function PayBillScreen() {
  const [selectedBill, setSelectedBill] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  const bills = [
    {
      id: "electricity",
      name: "Electricity Bill",
      amount: 120.5,
      dueDate: "Dec 15",
      icon: "flash",
      color: COLORS.warning,
    },
    {
      id: "internet",
      name: "Internet Bill",
      amount: 59.99,
      dueDate: "Dec 20",
      icon: "wifi",
      color: COLORS.accentBlue,
    },
    {
      id: "phone",
      name: "Phone Bill",
      amount: 45.0,
      dueDate: "Dec 25",
      icon: "phone-portrait",
      color: COLORS.secondary,
    },
    {
      id: "netflix",
      name: "Netflix Subscription",
      amount: 15.99,
      dueDate: "Dec 18",
      icon: "tv",
      color: COLORS.error,
    },
  ];

  const wallets = [
    { id: "checking", name: "Checking Account", balance: 12450.5 },
    { id: "savings", name: "Savings Account", balance: 45200.34 },
    { id: "cash", name: "Cash Wallet", balance: 850.0 },
  ];

  const selectedBillData = bills.find((bill) => bill.id === selectedBill);
  const paymentAmount = customAmount
    ? parseFloat(customAmount)
    : selectedBillData?.amount || 0;
  const processingFee = 0; // Free processing
  const totalAmount = paymentAmount + processingFee;

  const handlePayment = async () => {
    const stored = await SecureStore.getItemAsync("biometric_enabled");

    if (stored === "false") {
      Alert.alert(
        "Face Id",
        "Ödeme için face Id ile ödemeyi aktfi hale getirin"
      );
      return;
    }

    const authorized = await requireBiometricAuth();
    console.log(authorized);
    if (!authorized) {
      Alert.alert("Onay Gerekli", "Ödeme işlemi iptal edildi");
      return;
    }

    console.log("Payment:", {
      bill: selectedBill,
      amount: paymentAmount,
      wallet: selectedWallet,
      fee: processingFee,
    });
    router.back();
  };

  const canPay = selectedBill && selectedWallet && paymentAmount > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay Bills</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Bill</Text>

        <TouchableOpacity
          style={styles.addCustomBill}
          onPress={() => router.push("/add-bill")}
        >
          <View style={styles.addBillIcon}>
            <Ionicons name="add" size={20} color={COLORS.primaryGreen} />
          </View>
          <Text style={styles.addBillText}>Add Custom Bill</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
        </TouchableOpacity>

        {bills.map((bill) => (
          <TouchableOpacity
            key={bill.id}
            style={[
              styles.billItem,
              selectedBill === bill.id && styles.selectedBill,
            ]}
            onPress={() => setSelectedBill(bill.id)}
          >
            <View style={styles.billLeft}>
              <View style={[styles.billIcon, { backgroundColor: bill.color }]}>
                <Ionicons
                  name={bill.icon as any}
                  size={20}
                  color={COLORS.background}
                />
              </View>
              <View style={styles.billInfo}>
                <Text style={styles.billName}>{bill.name}</Text>
                <Text style={styles.billDue}>Due {bill.dueDate}</Text>
              </View>
            </View>
            <View style={styles.billRight}>
              <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
              {selectedBill === bill.id && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={COLORS.primaryGreen}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedBillData && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Amount</Text>
          <View style={styles.amountOptions}>
            <TouchableOpacity
              style={[
                styles.amountOption,
                !customAmount && styles.selectedAmount,
              ]}
              onPress={() => setCustomAmount("")}
            >
              <Text style={styles.amountOptionText}>Full Amount</Text>
              <Text style={styles.amountOptionValue}>
                ${selectedBillData.amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.amountOption,
                customAmount && styles.selectedAmount,
              ]}
              onPress={() => setCustomAmount("0")}
            >
              <Text style={styles.amountOptionText}>Custom Amount</Text>
              {customAmount ? (
                <TextInput
                  style={styles.customAmountInput}
                  value={customAmount}
                  onChangeText={setCustomAmount}
                  placeholder="0.00"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.amountOptionValue}>Enter amount</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {wallets.map((wallet) => (
          <TouchableOpacity
            key={wallet.id}
            style={[
              styles.walletItem,
              selectedWallet === wallet.id && styles.selectedWallet,
            ]}
            onPress={() => setSelectedWallet(wallet.id)}
          >
            <View style={styles.walletInfo}>
              <Text style={styles.walletName}>{wallet.name}</Text>
              <Text style={styles.walletBalance}>
                Available: ${wallet.balance.toLocaleString()}
              </Text>
            </View>
            {selectedWallet === wallet.id && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={COLORS.primaryGreen}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedBillData && paymentAmount > 0 && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Bill</Text>
            <Text style={styles.summaryValue}>{selectedBillData.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryValue}>${paymentAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing Fee</Text>
            <Text style={[styles.summaryValue, { color: COLORS.success }]}>
              {processingFee === 0 ? "FREE" : `$${processingFee.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.payButton, !canPay && styles.disabledButton]}
        onPress={handlePayment}
        disabled={!canPay}
      >
        <Ionicons name="card" size={20} color={COLORS.background} />
        <Text style={styles.payButtonText}>Pay Now</Text>
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
    paddingBottom: Platform.OS === "android" ? 100 : 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    paddingTop: Platform.OS === "ios" ? 50 : SPACING.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: "700",
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
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  billItem: {
    backgroundColor: COLORS.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedBill: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen + "20",
  },
  billLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  billIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
  billDue: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  billRight: {
    alignItems: "flex-end",
  },
  billAmount: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  amountOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountOption: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  selectedAmount: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen + "20",
  },
  amountOptionText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  amountOptionValue: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  customAmountInput: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
    textAlign: "center",
    minWidth: 80,
  },
  walletItem: {
    backgroundColor: COLORS.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedWallet: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen + "20",
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
  walletBalance: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
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
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  summaryValue: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
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
    fontWeight: "700",
  },
  totalValue: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.lg,
    fontWeight: "800",
  },
  payButton: {
    backgroundColor: COLORS.primaryGreen,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    ...SHADOWS.soft,
  },
  disabledButton: {
    backgroundColor: COLORS.muted,
    opacity: 0.5,
  },
  payButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: "700",
    marginLeft: SPACING.sm,
  },
  addCustomBill: {
    backgroundColor: COLORS.card,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primaryGreen,
    borderStyle: "dashed",
  },
  addBillIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryGreen + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  addBillText: {
    flex: 1,
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.md,
    fontWeight: "600",
  },
});
