import React, { useState } from "react";
import { Text, SafeAreaView, useColorScheme } from "react-native";
import { Button, Alert, VStack, HStack, IconButton, CloseIcon, Card, Radio, Stack, Switch } from "native-base";
import api from "../../services/api";
import ModalList from "../../components/ModalList/ModalList";

import { useThemeStore } from "../../store/themeStore";
import { useColors } from '../../theme/colors';
import { createStyles } from "./styles";

const themeOptions = [
  { label: 'Claro', value: 'light' },
  { label: 'Escuro', value: 'dark' },
]

const Home = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const { theme, setTheme } = useThemeStore();
  const colors = useColors()
  const styles = createStyles(colors);

  const systemTheme = useColorScheme();

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

  const handleSwitch = (value) => {
    if(value) setTheme(systemTheme);
    setIsSwitchOn(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} shadow={2}>
        <Text style={styles.cardTitle}>Gerenciamento de Estado</Text>
        <Text style={styles.cardDescription}>
          Alterne entre as opções de tema abaixo
        </Text>

        <Radio.Group
          name="themeGroup"
          value={theme}
          onChange={setTheme}

        >
          <Stack direction={{
            base: "row",
          }} alignItems={{
            base: "flex-start",
            md: "center"
          }} space={4} w="100%">
            {themeOptions.map(({ label, value }) => (
              <Radio
                _text={{ color: colors.text }}
                key={value}
                value={value}
                colorScheme="gray"
                size="md"
                my={1}
                isDisabled={isSwitchOn}>
                {label}
              </Radio>
            ))}
          </Stack>
        </Radio.Group>
        <HStack mt={2} alignItems="center">
          <Switch size="sm" marginLeft={-2}
            isChecked={isSwitchOn}
            onToggle={handleSwitch}
          />
          <Text style={styles.switchLabel}>Automático</Text>
        </HStack>


      </Card>
      <Card style={styles.card} shadow={2}>
        <Text style={styles.cardTitle}>Teste API</Text>
        <Text style={styles.cardDescription}>
          Teste a comunicação com a API utilizando os botões abaixo.
        </Text>

        <HStack space={4} mt={4}>
          <Button
            bg={colors.success}
            _text={{ color: colors.txtW }}
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
            _text={{ color: colors.txtW }}
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
