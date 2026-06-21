export const colors = {
  background: '#FAF6F0',
  surface: '#FFFFFF',
  primary: '#B58900',
  primaryContainer: '#E5A93C',
  secondary: '#3E59AC',
  tertiary: '#9C440F',
  textPrimary: '#0D0D0D',
  textSecondary: '#6E7A72',
  surfaceContainer: '#F0EDEC',
  surfaceContainerLow: '#F6F3F2',
  surfaceContainerHigh: '#EBE7E7',
  surfaceContainerHighest: '#E5E2E1',
  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
  white: '#FFFFFF',
  black: '#000000',
  darkBg: '#0D0D0D',
};

export const radii = {
  sm: 4,
  default: 8,
  md: 12,
  lg: 16,
  xl: 20,
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  active: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
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
