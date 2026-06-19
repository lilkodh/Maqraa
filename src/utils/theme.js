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
  onSurfaceVariant: '#bbcabf',
  primary: '#4edea3', // Moorish Emerald
  onPrimary: '#003824',
  primaryContainer: '#10b981',
  onPrimaryContainer: '#00422b',
  secondary: '#afcadb', // Sapphire Blue
  onSecondary: '#193341',
  secondaryContainer: '#334c5a',
  onSecondaryContainer: '#a2bccd',
  tertiary: '#ffb95f', // Antique Gold
  onTertiary: '#472a00',
  tertiaryContainer: '#e29100',
  onTertiaryContainer: '#523200',
  outline: '#86948a',
  outlineVariant: '#3c4a42',
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
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8,
  },
  headlineLg: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    lineHeight: 40,
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
