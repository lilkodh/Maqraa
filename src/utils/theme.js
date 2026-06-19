export const colors = {
  background: '#00142a',
  surface: '#00142a',
  surfaceDim: '#00142a',
  surfaceBright: '#223a58',
  surfaceContainerLowest: '#000f21',
  surfaceContainerLow: '#001c38',
  surfaceContainer: '#03203c',
  surfaceContainerHigh: '#112b47',
  surfaceContainerHighest: '#1d3653',
  onSurface: '#d3e4ff',
  onSurfaceVariant: '#c2c7cb',
  primary: '#e1f3ff', // Neon Sapphire
  onPrimary: '#193341',
  primaryContainer: '#bdd8e9',
  onPrimaryContainer: '#455f6d',
  secondary: '#ffb95f', // Antique Gold
  onSecondary: '#472a00',
  secondaryContainer: '#ee9800',
  onSecondaryContainer: '#5b3800',
  tertiary: '#bbffda', // Moorish Emerald
  onTertiary: '#003824',
  tertiaryContainer: '#5eecb0',
  onTertiaryContainer: '#006847',
  outline: '#8c9195',
  outlineVariant: '#42474b',
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
    fontSize: 56,
    lineHeight: 64,
  },
  headlineLg: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    lineHeight: 40,
  },
  headlineLgMobile: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    lineHeight: 36,
  },
  headlineMd: {
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
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.7,
  },
  labelSm: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.96,
  },
};

export default {
  colors,
  radii,
  spacing,
  typography,
};
