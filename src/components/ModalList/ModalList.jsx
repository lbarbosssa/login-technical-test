import React from "react";
import { Modal, View, FlatList } from "react-native";
import { Box, Text, Button } from "native-base";

import { useColors } from '../../theme/colors';
import { createStyles } from "./styles";

const ModalList = ({ visible, data, onClose }) => {
  const colors = useColors()
  const styles = createStyles(colors);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Dados Recebidos</Text>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            style={styles.flatList}
            renderItem={({ item }) => (
              <Box borderBottomWidth={1} borderColor="coolGray.300" p={3}>
                <Text bold fontSize="md" color={colors.secondaryText}>{item.title}</Text>
                <Text color={colors.secondaryText}>{item.body}</Text>
              </Box>
            )}
          />

          <Button mt={4} bg={colors.primary} onPress={onClose}>
            Fechar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ModalList;
