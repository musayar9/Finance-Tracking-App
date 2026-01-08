import { Platform } from "react-native";

export const COLORS = {
  // Backgrounds
  background: "#0D0D0D",
  card: "#1A1A1A",
  
  // Primary Colors
  primaryGreen: "#00E676",
  secondary: "#00BFA5",
  accentBlue: "#2979FF",
  
  // Text Colors
  white: "#FFFFFF",
  muted: "#9E9E9E",
  
  // Borders
  border: "#222222",
  
  // Status Colors
  success: "#00E676",
  error: "#FF5252",
  warning: "#FFC107",
  income: "#00E676",
  expense: "#FF5252",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONTS = {
  family: Platform.select({ 
    ios: "System", 
    android: "Roboto" 
  }),
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
};

export const SHADOWS = {
  soft: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export default { COLORS, SPACING, FONTS, SHADOWS, BORDER_RADIUS };
