import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  
  sectionHeader: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  textPrimary: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
  },
  
  textSecondary: {
    color: COLORS.muted,
    fontSize: FONTS.sizes.sm,
  },
  
  textLarge: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.white,
  },
  
  button: {
    backgroundColor: COLORS.primaryGreen,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  
  buttonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
  },
});