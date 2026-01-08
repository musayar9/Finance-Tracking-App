import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';

interface GoalCardProps {
  title: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
  icon?: string;
  onPress?: () => void;
}

export default function GoalCard({ 
  title, 
  currentAmount, 
  targetAmount, 
  deadline, 
  icon = 'flag',
  onPress 
}: GoalCardProps) {
  const progress = (currentAmount / targetAmount) * 100;
  const remaining = targetAmount - currentAmount;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Ionicons name={icon as any} size={20} color={COLORS.primaryGreen} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.deadline}>{deadline}</Text>
      </View>
      
      <View style={styles.amountSection}>
        <Text style={styles.currentAmount}>${currentAmount.toLocaleString()}</Text>
        <Text style={styles.targetAmount}>of ${targetAmount.toLocaleString()}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress.toFixed(0)}%</Text>
      </View>
      
      <Text style={styles.remaining}>
        ${remaining.toLocaleString()} remaining
      </Text>
    </TouchableOpacity>
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
    marginBottom: SPACING.md,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  deadline: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  amountSection: {
    marginBottom: SPACING.md,
  },
  currentAmount: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
  },
  targetAmount: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    marginRight: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primaryGreen,
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    minWidth: 35,
    textAlign: 'right',
  },
  remaining: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
});