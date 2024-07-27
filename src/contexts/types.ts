export interface IThemeContext {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}
