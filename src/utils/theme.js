export const colors = {
  background: '#0B0F19', // Deep Midnight Blue Base
  surface: '#161B26', // Deep Blue Slate Cards
  primary: '#4CAF85', // Vibrant Mint Green
  primaryContainer: '#006C4B', // Mint Green Container
  secondary: '#5E7CF2', // Vibrant Accent Blue (Active States)
  tertiary: '#FF8C00', // Arabic Accent Orange
  textPrimary: '#FFFFFF', // High-Contrast White Text
  textSecondary: '#94A3B8', // Soft Slate-Blue Text
  surfaceContainer: '#1E2538', // Mid-tone Slate Blue Containers
  surfaceContainerLow: '#121824',
  surfaceContainerHigh: '#28354E',
  surfaceContainerHighest: '#334155',
  error: '#FF6B6B',
  errorContainer: '#8B0000',
  white: '#FFFFFF',
  black: '#000000',
  darkBg: '#080B11', // Midnight Black-Blue Panel
};

export const radii = {
  sm: 4,
  default: 8,
  md: 12,
  lg: 16,
  xl: 20, // 20px standard cards
  full: 9999,
};

export const spacing = {
  unit: 4,
  sm: 8,
  md: 16,
  lg: 24,
  marginEdge: 20,
  containerPadding: 20,
};

export const typography = {
  display: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600',
  },
  headlineLg: {
    fontFamily: 'Inter_500Medium',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500',
  },
  headlineLgMobile: {
    fontFamily: 'Inter_500Medium',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500',
  },
  headlineMd: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
  },
  bodyLg: {
    fontFamily: 'Inter_300Light',
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '300',
  },
  bodyMd: {
    fontFamily: 'Inter_300Light',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '300',
  },
  labelLg: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  labelSm: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
};

export const shadows = {
  card: {
    shadowColor: '#0D0D0D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 3,
  },
  active: {
    shadowColor: '#0D0D0D',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 5,
  },
};

export default {
  colors,
  radii,
  spacing,
  typography,
  shadows,
};
