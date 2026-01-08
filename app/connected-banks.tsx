import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ConnectedBanksScreen() {
  const connectedBanks = [
    {
      id: 1,
      name: 'Chase Bank',
      accountType: 'Checking Account',
      accountNumber: '•••• 7890',
      balance: '$12,450.00',
      status: 'connected',
      lastSync: '2 hours ago',
    },
    {
      id: 2,
      name: 'Bank of America',
      accountType: 'Savings Account',
      accountNumber: '•••• 3456',
      balance: '$8,750.00',
      status: 'connected',
      lastSync: '1 day ago',
    },
    {
      id: 3,
      name: 'Wells Fargo',
      accountType: 'Credit Card',
      accountNumber: '•••• 9012',
      balance: '-$1,250.00',
      status: 'error',
      lastSync: '3 days ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return COLORS.primaryGreen;
      case 'error':
        return COLORS.error;
      default:
        return COLORS.muted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Connection Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connected Banks</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color={COLORS.primaryGreen} />
        </TouchableOpacity>
      </View>

      <View style={styles.banksList}>
        {connectedBanks.map((bank) => (
          <View key={bank.id} style={styles.bankItem}>
            <View style={styles.bankLeft}>
              <View style={styles.bankIcon}>
                <Ionicons name="business" size={20} color={COLORS.primaryGreen} />
              </View>
              <View style={styles.bankContent}>
                <Text style={styles.bankName}>{bank.name}</Text>
                <Text style={styles.accountType}>{bank.accountType} {bank.accountNumber}</Text>
                <Text style={styles.lastSync}>Last sync: {bank.lastSync}</Text>
              </View>
            </View>
            <View style={styles.bankRight}>
              <Text style={styles.balance}>{bank.balance}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bank.status) }]}>
                <Text style={styles.statusText}>{getStatusText(bank.status)}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={16} color={COLORS.muted} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color={COLORS.background} />
        <Text style={styles.addButtonText}>Connect New Bank</Text>
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
    padding: SPACING.md,
    paddingBottom: Platform.OS === 'android' ? 100 : 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  banksList: {
    marginBottom: SPACING.xl,
  },
  bankItem: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  bankContent: {
    flex: 1,
  },
  bankName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  accountType: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  lastSync: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  bankRight: {
    alignItems: 'flex-end',
  },
  balance: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  statusText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  moreButton: {
    padding: SPACING.xs,
  },
  addButton: {
    backgroundColor: COLORS.primaryGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  addButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});