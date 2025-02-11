import { extendTheme } from "native-base";
import { colors } from "./static-colors";

export const theme = extendTheme({
  colors: {
    primary: {
      500: colors.primary,
    },
  },
});