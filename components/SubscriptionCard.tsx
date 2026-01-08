import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';

interface SubscriptionCardProps {
  name: string;
  price: number;
  renewalDate: string;
  status: 'active' | 'due_soon' | 'expired';
  icon?: string;
  onPress?: () => void;
}

export default function SubscriptionCard({ 
  name, 
  price, 
  renewalDate, 
  status, 
  icon = 'apps',
  onPress 
}: SubscriptionCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return COLORS.success;
      case 'due_soon':
        return COLORS.warning;
      case 'expired':
        return COLORS.error;
      default:
        return COLORS.muted;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'due_soon':
        return 'Due Soon';
      case 'expired':
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color={COLORS.primaryGreen} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.renewalDate}>Renews {renewalDate}</Text>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={styles.price}>${price}/mo</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  name: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  renewalDate: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: SPACING.xs,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
});