import { StyleSheet } from "react-native";
import {colors} from '../../theme/colors'

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.backdrop,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  flatList: {
    height: "70%",
  },
});
