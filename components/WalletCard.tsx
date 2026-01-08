import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';

interface WalletCardProps {
  name: string;
  balance: number;
  currency?: string;
}

export default function WalletCard({ name, balance, currency = '$' }: WalletCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.icon}>💳</Text>
      </View>
      <Text style={styles.balance}>
        {currency}{balance.toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  name: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  icon: {
    fontSize: 20,
  },
  balance: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
  },
});