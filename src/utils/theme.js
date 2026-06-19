export const colors = {
  background: '#151311', // Deep Charcoal
  surface: '#151311',
  surfaceDim: '#151311',
  surfaceBright: '#3c3936',
  surfaceContainerLowest: '#100e0c',
  surfaceContainerLow: '#1e1b19',
  surfaceContainer: '#221f1d',
  surfaceContainerHigh: '#2c2927',
  surfaceContainerHighest: '#373431',
  onSurface: '#e8e1dd',
  onSurfaceVariant: '#d0c5af',
  primary: '#f2ca50', // Primary Gold
  onPrimary: '#3c2f00',
  primaryContainer: '#d4af37',
  onPrimaryContainer: '#554300',
  secondary: '#dbc2b3', // Muted Bronze
  onSecondary: '#3d2d23',
  secondaryContainer: '#554339',
  onSecondaryContainer: '#c9b0a3',
  tertiary: '#70e3b0', // Moorish Emerald
  onTertiary: '#003825',
  tertiaryContainer: '#52c796',
  onTertiaryContainer: '#004f36',
  outline: '#99907c',
  outlineVariant: '#4d4635',
};

export const radii = {
  sm: 8,
  default: 16,
  md: 24,
  lg: 32,
  xl: 48,
  full: 9999,
};

export const spacing = {
  unit: 8,
  gutter: 24,
  marginMobile: 20,
  marginDesktop: 64,
};

export const typography = {
  displayLg: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.96,
  },
  displayLgMobile: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    lineHeight: 40,
  },
  headlineLg: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    lineHeight: 40,
  },
  headlineMd: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    lineHeight: 40,
  },
  headlineSm: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    lineHeight: 32,
  },
  bodyLg: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  labelMd: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.7,
  },
  labelSm: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
  },
  metadataSm: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.13,
  },
  timerMono: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.7,
  },
};

export default {
  colors,
  radii,
  spacing,
  typography,
};
