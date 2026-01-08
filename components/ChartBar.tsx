import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/theme';

interface ChartBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
}

export default function ChartBar({ label, value, maxValue, color = COLORS.primaryGreen }: ChartBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>${value}</Text>
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  label: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  value: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  barContainer: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
});