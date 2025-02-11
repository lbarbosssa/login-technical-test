import { extendTheme } from "native-base";
import { colors } from "./colors";

export const theme = extendTheme({
  colors: {
    primary: {
      500: colors.primary,
    },
  },
});