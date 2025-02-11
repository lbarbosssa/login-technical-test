import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button, Alert, VStack, HStack, IconButton, CloseIcon, Card, Radio, Stack } from "native-base";
import api from "../services/api";
import ModalList from "../components/ModalList/ModalList";
import { colors } from '../theme/colors';

const themeOptions = [
  { label: 'Claro', value: 'light' },
  { label: 'Escuro', value: 'dark' },
  { label: 'Sistema', value: 'system' },
]

const Home = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const userData = async (url, type) => {
    if (type === "success") {
      setLoadingSuccess(true);
    } else {
      setLoadingError(true);
    }

    setErrorMessage(null);

    try {
      const response = await api.get(url);
      console.log(response?.config?.headers?.Authorization);

      setTimeout(() => {
        setData(response.data);
        setModalVisible(true);
        setLoadingSuccess(false);
        setLoadingError(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setErrorMessage("Falha ao buscar os dados. Tente novamente.");
        setLoadingSuccess(false);
        setLoadingError(false);
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} shadow={2}>
        <Text style={styles.cardTitle}>Gerenciamento de Estado</Text>
        <Text style={styles.cardDescription}>
          Alterne entre as opções de tema abaixo
        </Text>

        <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
          <Stack direction={{
            base: "row",
            // md: "row"
          }} alignItems={{
            base: "flex-start",
            md: "center"
          }} space={4} w="100%">
            {themeOptions.map(({label, value}) => <Radio key={value} value={value} colorScheme="gray" size="md" my={1}>{label}</Radio>)}
          </Stack>
        </Radio.Group>

      </Card>
      <Card style={styles.card} shadow={2}>
        <Text style={styles.cardTitle}>Teste API</Text>
        <Text style={styles.cardDescription}>
          Teste a comunicação com a API utilizando os botões abaixo.
        </Text>

        <HStack space={4} mt={4}>
          <Button
            bg={colors.success}
            _text={{ color: colors.white }}
            _pressed={{ bg: colors.successDark }}
            borderRadius="md"
            onPress={() => userData("/posts", "success")}
            isDisabled={loadingSuccess || loadingError}
            isLoading={loadingSuccess}
            flex={1}
          >
            Testar - Sucesso
          </Button>
          <Button
            bg={colors.danger}
            _text={{ color: colors.white }}
            _pressed={{ bg: colors.dangerDark }}
            borderRadius="md"
            onPress={() => userData("/error", "error")}
            isDisabled={loadingSuccess || loadingError}
            isLoading={loadingError}
            flex={1}
          >
            Testar - Error
          </Button>
        </HStack>
      </Card>

      {errorMessage && (
        <Alert w="90%" status="error" mt={4}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack space={2} alignItems="center">
              <Alert.Icon />
              <Text style={styles.alertText}>{errorMessage}</Text>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" />}
                onPress={() => setErrorMessage(null)}
              />
            </HStack>
          </VStack>
        </Alert>
      )}


      <ModalList visible={modalVisible} data={data} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    marginVertical: 10,
    marginBottom: 15,
  },
  alertText: {
    color: "#721c24",
    fontSize: 14,
    flex: 1,
  },
});
