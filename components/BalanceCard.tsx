import { StyleSheet, Text, View } from "react-native";
import { COLORS, SHADOWS } from "../utils/theme";

interface BalanceCardProps {
  balance?: number;
}

export default function BalanceCard({ balance = 185450.75 }: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Net Worth</Text>
      <Text style={styles.amount}>${balance.toLocaleString()}</Text>
      <View style={styles.row}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>+2.15%</Text>
        </View>
        <Text style={styles.muted}>7d trend</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    marginVertical: 10,
    ...SHADOWS.soft,
  },
  title: {
    color: COLORS.muted,
    fontSize: 14,
    marginBottom: 6,
  },
  amount: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "800",
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 8 
  },
  chip: {
    backgroundColor: COLORS.primaryGreen,
    padding: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  chipText: { 
    color: "#000", 
    fontWeight: "700",
    fontSize: 12,
  },
  muted: { 
    color: COLORS.muted,
    fontSize: 12,
  },
});