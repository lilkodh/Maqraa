// ============================================================
// Maqra Design System — Theme Tokens
// Source: Maqra Stitch Design System (projects/13351498328700285086)
// Style: Luxury Glassmorphism / OLED Deep Navy / Moroccan Zellige
// ============================================================

export const colors = {
  // Core surfaces (Espresso / Coffee theme)
  background:               '#150b05',
  surface:                  '#150b05',
  surfaceDim:               '#150b05',
  surfaceBright:            '#2f1d13',
  surfaceContainerLowest:   '#0c0603',
  surfaceContainerLow:      '#1c120a',
  surfaceContainer:         '#22160d',
  surfaceContainerHigh:     '#2d1f14',
  surfaceContainerHighest:  '#382a1d',
  surfaceVariant:           '#382a1d',

  // On-surface text
  onSurface:                '#fdfbf7',
  onSurfaceVariant:         '#dfd2c4',
  inverseSurface:           '#fdfbf7',
  inverseOnSurface:         '#24170e',

  // Primary (Glowing White)
  primary:                  '#ffffff',
  onPrimary:                '#261408',
  primaryContainer:         '#d8a47f', // glowing caramel
  onPrimaryContainer:       '#4a1e05',
  inverseP:                 '#7c4422',
  primaryFixed:             '#ffdcc6',
  primaryFixedDim:          '#d8a47f',
  onPrimaryFixed:           '#2c1202',
  onPrimaryFixedVariant:    '#602d0f',

  // Secondary (Latte Brown)
  secondary:                '#e6cfbe',
  onSecondary:              '#382212',
  secondaryContainer:       '#503724',
  onSecondaryContainer:     '#f5dfcf',
  secondaryFixed:           '#f7e8dd',
  secondaryFixedDim:        '#e6cfbe',
  onSecondaryFixed:         '#261306',
  onSecondaryFixedVariant:  '#503724',

  // Tertiary (Antique Ivory/Gold)
  tertiary:                 '#ffe9d3',
  onTertiary:               '#472a00',
  tertiaryContainer:        '#ffc681',
  onTertiaryContainer:      '#7e4e00',
  tertiaryFixed:            '#ffddb8',
  tertiaryFixedDim:         '#ffb95f',
  onTertiaryFixed:          '#2a1700',
  onTertiaryFixedVariant:   '#653e00',

  // Outline
  outline:                  '#a49386',
  outlineVariant:           '#503e33',

  // Error
  error:                    '#ffb4ab',
  onError:                  '#690005',
  errorContainer:           '#93000a',
  onErrorContainer:         '#ffdad6',

  // Named brand colors
  ivoryWhite:               '#fdfbf7',
  cyanGrey:                 '#bdae9f', // latte
  emeraldSuccess:           '#10B981',
  oledBlack:                '#080402',
};

export const typography = {
  displayLg: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.96,
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
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.14,
  },
  dataMono: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.8,
  },
};

export const spacing = {
  base: 8,
  gutter: 16,
  containerPadding: 24,
  sectionGap: 40,
};

export const radii = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const glassMorphism = {
  // Level 1 card style - clean solid flat
  card: {
    backgroundColor: '#0e1d2a',
    borderWidth: 1,
    borderColor: '#1c2d3d',
  },
  // Level 2 active card style
  cardActive: {
    backgroundColor: '#13212e',
    borderWidth: 1,
    borderColor: '#00daf3',
  },
  // Level 3 liquid card style - simplified flat card
  cardLiquid: {
    backgroundColor: '#0e1d2a',
    borderWidth: 1.5,
    borderColor: '#1c2d3d',
  },
  // Gold-tinted streak card - simplified flat border
  cardStreak: {
    backgroundColor: '#13212e',
    borderWidth: 1.5,
    borderColor: '#ffb95f',
  },
  // Solid navigation bar
  nav: {
    backgroundColor: '#0e1d2a',
    borderWidth: 1,
    borderColor: '#1c2d3d',
  },
};

export const shadows = {
  cyanGlow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  goldGlow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  emeraldGlow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
};

export default {
  colors,
  typography,
  spacing,
  radii,
  glassMorphism,
  shadows,
};
