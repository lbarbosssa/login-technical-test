import { useThemeStore } from "../store/themeStore";

const white = '#fff';
const primary = "#07639d";
const primaryDark = "#054f7a";
const backdrop = "rgba(0,0,0,0.5)";
const danger = "#dc3545";
const dangerDark = "#a71d2a";
const success = "#28a745";
const successDark = "#1e7e34";

const themes = {
  light: {
    primary,
    primaryDark,
    background: white,
    screenBg: '#eee',
    cardBg: white,
    text: "#333",
    secondaryText: "#1c1c1c",
    txtW: white,
    backdrop,
    danger,
    dangerDark,
    success,
    successDark
  },
  dark: {
    primary,
    primaryDark,
    background: '#000',
    screenBg: '#212121',
    cardBg: '#303030',
    text: "#fff",
    secondaryText: "#c4c4c4",
    txtW: white,
    backdrop: "rgba(0, 0, 0, 0.8)",
    danger,
    dangerDark,
    success,
    successDark
  },
};

export const useColors = () => {
  const theme = useThemeStore((state) => state.theme);
  return themes[theme] || themes.light;
};
