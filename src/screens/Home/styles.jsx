import { StyleSheet } from "react-native";

export const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop: 20,
      backgroundColor: colors.screenBg,
    },
    card: {
      width: "90%",
      padding: 20,
      borderRadius: 10,
      backgroundColor: colors.cardBg,
      marginBottom: 20,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      color: colors.text, 
    },
    cardDescription: {
      fontSize: 14,
      marginVertical: 10,
      marginBottom: 15,
      color: colors.text, 
    },
    alertText: {
      color: "#721c24",
      fontSize: 14,
      flex: 1,
    },
    switchLabel: {
      color: colors.text,
      fontSize: 16
    }
  });
};
