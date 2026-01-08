import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SectionHeader from "../../components/SectionHeader";
import SubscriptionCard from "../../components/SubscriptionCard";
import {
  BORDER_RADIUS,
  COLORS,
  FONTS,
  SHADOWS,
  SPACING,
} from "../../utils/theme";
import { useTranslation } from "../../utils/translations";

export default function SubscriptionsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const subscriptions = [
    {
      id: 1,
      name: "Netflix",
      price: 15.99,
      renewalDate: "Dec 15",
      status: "active" as const,
      icon: "tv",
    },
    {
      id: 2,
      name: "Spotify Premium",
      price: 9.99,
      renewalDate: "Dec 20",
      status: "due_soon" as const,
      icon: "musical-notes",
    },
    {
      id: 3,
      name: "Adobe Creative",
      price: 52.99,
      renewalDate: "Dec 25",
      status: "active" as const,
      icon: "brush",
    },
    {
      id: 4,
      name: "Gym Membership",
      price: 29.99,
      renewalDate: "Dec 10",
      status: "expired" as const,
      icon: "fitness",
    },
  ];

  const totalMonthly = subscriptions
    .filter((sub) => sub.status === "active" || sub.status === "due_soon")
    .reduce((sum, sub) => sum + sub.price, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title={t('subscriptions')} />

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>{t('monthlyTotal')}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/subscriptions/add")}
          >
            <Ionicons name="add" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </View>
        <Text style={styles.totalAmount}>${totalMonthly.toFixed(2)}</Text>
        <Text style={styles.summarySubtitle}>
          {subscriptions.filter((s) => s.status === "active").length} {t('activeSubscriptions')}
        </Text>
      </View>

      <View style={styles.statusFilters}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>{t('all')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{t('active')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{t('dueSoon')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{t('expired')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subscriptionsList}>
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            name={subscription.name}
            price={subscription.price}
            renewalDate={subscription.renewalDate}
            status={subscription.status}
            icon={subscription.icon}
            onPress={() => {}}
          />
        ))}
      </View>
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
    paddingBottom: Platform.OS === "android" ? 100 : 80,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  summaryTitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.md,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  totalAmount: {
    color: COLORS.white,
    fontSize: FONTS.sizes.display,
    fontWeight: "800",
    marginBottom: SPACING.xs,
  },
  summarySubtitle: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  statusFilters: {
    flexDirection: "row",
    marginBottom: SPACING.lg,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilter: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  filterText: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    fontWeight: "500",
  },
  activeFilterText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
    fontWeight: "600",
  },
  subscriptionsList: {
    marginBottom: SPACING.lg,
  },
});
