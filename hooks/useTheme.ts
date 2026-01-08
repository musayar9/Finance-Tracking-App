import { useColorScheme } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from '../utils/theme';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  
  return {
    colors: COLORS,
    spacing: SPACING,
    typography: TYPOGRAPHY,
    shadows: SHADOWS,
    borderRadius: BORDER_RADIUS,
    isDark: colorScheme === 'dark',
  };
};