export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  header: string;
  cardBackground: string;
}

export interface ThemeRadii {
  sm: string;
  md: string;
  lg: string;
}

export interface SiteTheme {
  name: string;
  colors: ThemeColors;
  font: {
    body: string;
  };
  radii: ThemeRadii;
  shadowsEnabled: boolean;
}
