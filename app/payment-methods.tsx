import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from '../utils/translations';

export default function PaymentMethodsScreen() {
  const { t } = useTranslation();

  const paymentMethods = [
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '26',
      isDefault: false,
    },
  ];

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return 'card';
      case 'mastercard':
        return 'card';
      default:
        return 'card';
    }
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case 'visa':
        return COLORS.accentBlue;
      case 'mastercard':
        return COLORS.warning;
      default:
        return COLORS.primaryGreen;
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('paymentMethods')}</Text>
        <View style={styles.placeholder} />
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/add-payment-method')}
      >
        <View style={styles.addIcon}>
          <Ionicons name="add" size={24} color={COLORS.background} />
        </View>
        <Text style={styles.addButtonText}>{t('addPaymentMethod')}</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
      </TouchableOpacity>

      <View style={styles.cardsSection}>
        {paymentMethods.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <View style={styles.cardLeft}>
              <View style={[styles.cardIcon, { backgroundColor: getCardColor(card.type) }]}>
                <Ionicons name={getCardIcon(card.type) as any} size={20} color={COLORS.background} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardType}>
                  {card.type.charAt(0).toUpperCase() + card.type.slice(1)} •••• {card.last4}
                </Text>
                <Text style={styles.cardExpiry}>
                  Expires {card.expiryMonth}/{card.expiryYear}
                </Text>
                {card.isDefault && (
                  <Text style={styles.defaultBadge}>Default</Text>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.cardOptions}>
              <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.muted} />
            </TouchableOpacity>
          </View>
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
    paddingBottom: Platform.OS === 'android' ? 100 : 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  addButton: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  addIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  addButtonText: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  cardsSection: {
    marginBottom: SPACING.lg,
  },
  cardItem: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  cardInfo: {
    flex: 1,
  },
  cardType: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  cardExpiry: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  defaultBadge: {
    color: COLORS.primaryGreen,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    marginTop: 4,
  },
  cardOptions: {
    padding: SPACING.xs,
  },
});