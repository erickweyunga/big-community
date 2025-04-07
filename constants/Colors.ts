/**
 * Developer Community Color Palette
 * Colors that reflect collaboration, innovation, and technical focus
 */

// Types for color scheme support
type ColorScheme = 'light' | 'dark';
type ColorSet = {
  light: string;
  dark: string;
};

// Create a helper for colors that change with theme
const themeColor = (light: string, dark: string): ColorSet => ({
  light,
  dark
});

// Base colors - raw values that aren't directly used in the UI
const palette = {
  // Black shades - representing sophistication and elegance
  black: {
    50: "#F2F2F2",
    100: "#E6E6E6",
    200: "#CCCCCC",
    300: "#B3B3B3",
    400: "#808080",
    500: "#262626", // Primary - rich black
    600: "#1A1A1A",
    700: "#0D0D0D",
    800: "#0A0A0A",
    900: "#000000"
  },

  // Secondary green shades - representing growth and community
  green: {
    50: "#E6FFF4",
    100: "#CCFFE9",
    200: "#99FFD3",
    300: "#66FFBD",
    400: "#33FFA7",
    500: "#00E890",
    600: "#00BA73",
    700: "#008B56",
    800: "#005D3A",
    900: "#002E1D"
  },

  // Accent orange shades - representing creativity and energy
  orange: {
    50: "#FFF2E6",
    100: "#FFE5CC",
    200: "#FFCC99",
    300: "#FFB266",
    400: "#FF9933",
    500: "#FF8000",
    600: "#CC6600",
    700: "#994D00",
    800: "#663300",
    900: "#331A00"
  },

  // Gray shades
  gray: {
    50: "#FAFAFA",  // Very subtle gray for backgrounds
    100: "#F5F5F5",  // Extra light gray
    200: "#EEEEEE",  // Border color
    300: "#E0E0E0",  // Light gray
    400: "#BDBDBD",  // Placeholder
    500: "#9E9E9E",  // Gray light
    600: "#757575",  // Gray
    700: "#616161",  // Gray dark
    800: "#424242",
    900: "#212121"   // Dark background
  },

  // Status colors
  success: {
    100: "#D6FFEA",
    300: "#8EFDCD",
    500: "#00E288",
    700: "#00B36C",
    900: "#007848"
  },

  error: {
    100: "#FFE5E5",
    300: "#FF9999",
    500: "#FF4D4D",
    700: "#D93636",
    900: "#991F1F"
  },

  warning: {
    100: "#FFF8E6",
    300: "#FFEBAD",
    500: "#FFCC33",
    700: "#F2B900",
    900: "#996600"
  },

  info: {
    100: "#E6F0FF",
    300: "#99C2FF",
    500: "#3366FF",
    700: "#1F3FCC",
    900: "#0C1A66"
  },

  // Code syntax highlighting colors
  syntax: {
    keyword: "#262626",    // black
    string: "#FF8000",     // orange
    comment: "#9E9E9E",    // gray
    function: "#00E890",   // green
    variable: "#3366FF",   // blue
    tag: "#FF4D4D",        // red
    attribute: "#FFCC33"   // yellow
  },

  // Pure colors
  pure: {
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent"
  },

  // Social colors
  social: {
    github: "#181717",
    stackoverflow: "#F58025",
    discord: "#5865F2",
    twitter: "#1DA1F2"
  }
};

// Type for app Colors object
interface AppColors {
  // Theme awareness
  mode: ColorScheme;

  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryBackground: string;

  // Secondary/community colors
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  secondaryBackground: string;

  // Accent colors
  accent: string;
  accentDark: string;
  accentLight: string;
  accentBackground: string;

  // Background colors
  background: string;
  backgroundDark: string;
  backgroundLight: string;
  card: string;

  // Inputs and interactive elements
  input: {
    background: string;
    border: string;
    text: string;
    placeholder: string;
    focused: string;
    error: string;
    disabled: string;
  };

  // Gray scale
  gray: string;
  grayDark: string;
  grayLight: string;
  lightGray: string;
  extraLightGray: string;
  borderColor: string;

  // Status colors
  success: string;
  successDark: string;
  successBackground: string;

  error: string;
  errorDark: string;
  errorBackground: string;

  warning: string;
  warningDark: string;
  warningBackground: string;

  info: string;
  infoBackground: string;

  // Code highlighting
  code: {
    background: string;
    text: string;
    keyword: string;
    string: string;
    comment: string;
    function: string;
    variable: string;
    tag: string;
    attribute: string;
  };

  // Aliases for status colors (for backwards compatibility)
  green: string;
  lightGreen: string;
  red: string;
  yellow: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // Other UI colors
  divider: string;
  placeholder: string;
  disabled: string;
  highlight: string;

  // Semantic alias
  link: string;

  // Social media colors
  github: string;
  stackoverflow: string;
  discord: string;
  twitter: string;

  // Navigation and system UI colors
  navigation: {
    background: string;
    border: string;
    tint: string;
    inactive: string;
    active: string;
  };

  // Common UI patterns
  button: {
    primary: string;
    primaryText: string;
    secondary: string;
    secondaryText: string;
    accent: string;
    accentText: string;
    disabled: string;
    disabledText: string;
  };

  toast: {
    info: string;
    success: string;
    warning: string;
    error: string;
    text: string;
  };

  // Dark mode colors
  dark: {
    background: string;
    backgroundLight: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    codeBackground: string;
  };
}

const Colors: AppColors = {
  // Theme mode
  mode: 'light',

  // Primary colors - Black for sophistication and elegance
  primary: palette.black[500],
  primaryDark: palette.black[600],
  primaryLight: palette.black[400],
  primaryBackground: palette.black[50],

  // Secondary colors - Green for community and growth
  secondary: palette.green[500],
  secondaryDark: palette.green[600],
  secondaryLight: palette.green[400],
  secondaryBackground: palette.green[50],

  // Accent colors - Orange for creativity and energy
  accent: palette.orange[500],
  accentDark: palette.orange[600],
  accentLight: palette.orange[400],
  accentBackground: palette.orange[50],

  // Background colors - Pure white backgrounds
  background: palette.pure.white,
  backgroundDark: palette.gray[50],
  backgroundLight: palette.pure.white,
  card: palette.pure.white,

  // Inputs and interactive elements
  input: {
    background: palette.pure.white,
    border: palette.gray[300],
    text: palette.black[500],
    placeholder: palette.gray[400],
    focused: palette.black[500],
    error: palette.error[500],
    disabled: palette.gray[200]
  },

  // Gray scale
  gray: palette.gray[600],
  grayDark: palette.gray[700],
  grayLight: palette.gray[500],
  lightGray: palette.gray[300],
  extraLightGray: palette.gray[100],
  borderColor: palette.gray[200],

  // Status colors
  success: palette.success[500],
  successDark: palette.success[700],
  successBackground: palette.success[100],

  error: palette.error[500],
  errorDark: palette.error[700],
  errorBackground: palette.error[100],

  warning: palette.warning[500],
  warningDark: palette.warning[700],
  warningBackground: palette.warning[100],

  info: palette.info[500],
  infoBackground: palette.info[100],

  // Code highlighting
  code: {
    background: palette.gray[50],
    text: palette.black[500],
    keyword: palette.syntax.keyword,
    string: palette.syntax.string,
    comment: palette.syntax.comment,
    function: palette.syntax.function,
    variable: palette.syntax.variable,
    tag: palette.syntax.tag,
    attribute: palette.syntax.attribute
  },

  // Aliases for status colors (for backwards compatibility)
  green: palette.green[500],
  lightGreen: palette.green[100],
  red: palette.error[500],
  yellow: palette.warning[500],

  // Text colors
  text: palette.black[500],
  textSecondary: palette.gray[600],
  textTertiary: palette.gray[500],
  textInverse: palette.pure.white,

  // Other UI colors
  divider: palette.gray[300],
  placeholder: palette.gray[400],
  disabled: palette.gray[400],
  highlight: palette.black[50],

  // Semantic alias
  link: palette.black[500],

  // Social media colors - Developer focused
  github: palette.social.github,
  stackoverflow: palette.social.stackoverflow,
  discord: palette.social.discord,
  twitter: palette.social.twitter,

  // Navigation and system UI
  navigation: {
    background: palette.pure.white,
    border: palette.gray[200],
    tint: palette.black[500],
    inactive: palette.gray[500],
    active: palette.black[500]
  },

  // Button styles
  button: {
    primary: palette.black[500],
    primaryText: palette.pure.white,
    secondary: palette.green[500],
    secondaryText: palette.pure.white,
    accent: palette.orange[500],
    accentText: palette.pure.white,
    disabled: palette.gray[300],
    disabledText: palette.gray[500]
  },

  // Toast notifications
  toast: {
    info: palette.info[100],
    success: palette.success[100],
    warning: palette.warning[100],
    error: palette.error[100],
    text: palette.black[500]
  },

  // Dark mode colors
  dark: {
    background: "#121212", // Pure dark background
    backgroundLight: "#1E1E1E", // Slightly lighter background
    card: "#2C2C2C", // Card with subtle dark tone
    text: palette.pure.white,
    textSecondary: "#EBEBF5",
    border: "#383838", // Border with dark tone
    codeBackground: "#242424" // Code background with dark tone
  }
};

export default Colors;