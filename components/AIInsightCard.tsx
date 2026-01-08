import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';

interface AIInsightCardProps {
  title: string;
  message: string;
  type: 'warning' | 'success' | 'info';
}

export default function AIInsightCard({ title, message, type }: AIInsightCardProps) {
  const getIconAndColor = () => {
    switch (type) {
      case 'warning':
        return { icon: 'warning', color: COLORS.warning };
      case 'success':
        return { icon: 'checkmark-circle', color: COLORS.success };
      default:
        return { icon: 'information-circle', color: COLORS.accentBlue };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={icon as any} size={20} color={color} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  message: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
  },
});