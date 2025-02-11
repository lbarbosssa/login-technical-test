import { StyleSheet } from "react-native";

export const createStyles = (colors) => {
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: colors.backdrop,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "90%",
      backgroundColor: colors.cardBg,
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
      color: colors.text
    },
    flatList: {
      height: "70%",
    },
  });
};