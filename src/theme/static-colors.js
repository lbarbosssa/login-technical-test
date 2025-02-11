// src/theme/colors.js
import { useThemeStore } from "../store/themeStore";

// Definindo as cores para cada tema
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
    text: "#333",
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
    screenBg: 'red',
    text: "#fff",
    txtW: white,
    backdrop,
    danger,
    dangerDark,
    success,
    successDark
  },
};

// Criando um Proxy para pegar sempre o estado atualizado do Zustand
export const colors = new Proxy({}, {
  get: (_, prop) => {
    const theme = useThemeStore.getState().theme; // Obtém o tema atual do Zustand
    return themes[theme]?.[prop]; // Retorna a cor correta para o tema
  },
});
