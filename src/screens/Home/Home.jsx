import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, useColorScheme, Appearance, NativeModules, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Alert, VStack, HStack, IconButton, CloseIcon, Card, Radio, Stack, Switch, Text, ScrollView } from "native-base";
import api from "../../services/api";
import ModalList from "../../components/ModalList/ModalList";
import AuthContext from "../../contexts/AuthContext";
import { useThemeStore } from "../../store/themeStore";
import { useColors } from '../../theme/colors';
import { createStyles } from "./styles";


const themeOptions = [
  { label: 'Claro', value: 'light' },
  { label: 'Escuro', value: 'dark' },
];

const isIos = Platform.OS === 'ios'

const Home = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [NativeModuleMessage, setNativeModuleMessage] = useState('');
  const { logout } = useContext(AuthContext);

  const { DeviceInfoModule } = NativeModules;

  if (isIos) {
    DeviceInfoModule.getIOSVersion((iosVersion) => {
      setNativeModuleMessage(iosVersion)
      console.log('Versão do iOS:', iosVersion);
    });
  } else {
    DeviceInfoModule.getManufacturer((error, manufacturer) => {
      if (error) {
        console.error(error);
      } else {
        setNativeModuleMessage(manufacturer)
        console.log('Fabricante:', manufacturer);
      }
    });
  }

  const { theme, setTheme } = useThemeStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const systemTheme = useColorScheme();

  useEffect(() => {
    const loadSwitchState = async () => {
      try {
        const storedSwitchState = await AsyncStorage.getItem("autoTheme");
        if (storedSwitchState !== null) {
          const switchValue = JSON.parse(storedSwitchState)
          if (switchValue) setTheme(systemTheme)
          setIsSwitchOn(switchValue);
        }
      } catch (error) {
        console.error("Erro ao carregar estado do switch", error);
      }
    };
    loadSwitchState();
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (isSwitchOn) {
        setTheme(colorScheme);
      }
    });

    return () => subscription.remove();
  }, [isSwitchOn]);

  useEffect(() => {
    const saveSwitchState = async () => {
      try {
        await AsyncStorage.setItem("autoTheme", JSON.stringify(isSwitchOn));
      } catch (error) {
        console.error("Erro ao salvar estado do switch", error);
      }
    };
    saveSwitchState();
  }, [isSwitchOn]);

  const userData = async (url, type) => {
    if (type === "success") {
      setLoadingSuccess(true);
    } else {
      setLoadingError(true);
    }

    setErrorMessage(null);

    try {
      const response = await api.get(url);
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

  const handleLogoff = () => {
    logout()
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  const handleSwitch = (value) => {
    setIsSwitchOn(value);
    if (value) {
      setTheme(systemTheme);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView w={['100%']} contentContainerStyle={styles.centerScroll}>
        <Card style={styles.card} shadow={isIos ? 2 : -2}>
          <Text style={styles.cardTitle}>Integração Nativa</Text>
          <Text style={styles.cardDescription}>
            Valide a integração nativa
          </Text>
          <Text style={styles.cardDescription}>
            {isIos ? 'Versão do sistema operacional: ' : 'Fabricante do dispositivo: '}
            <Text bold textTransform={'capitalize'}>{NativeModuleMessage}</Text>
          </Text>


        </Card>
        <Card style={styles.card} shadow={isIos ? 2 : -2}>
          <Text style={styles.cardTitle}>Gerenciamento de Estado</Text>
          <Text style={styles.cardDescription}>
            Configure sua preferência de tema
          </Text>

          <Radio.Group name="themeGroup" value={theme} onChange={setTheme}>
            <Stack direction={{ base: "row" }} alignItems={{ base: "flex-start", md: "center" }} space={4} w="100%">
              {themeOptions.map(({ label, value }) => (
                <Radio
                  _text={{ color: colors.text }}
                  key={value}
                  value={value}
                  colorScheme="gray"
                  size="md"
                  my={1}
                  isDisabled={isSwitchOn}
                >
                  {label}
                </Radio>
              ))}
            </Stack>
          </Radio.Group>
          <HStack mt={2} alignItems="center">
            <Switch size="sm" marginLeft={-2} isChecked={isSwitchOn} onToggle={handleSwitch} colorScheme="emerald" />
            <Text style={styles.switchLabel}>Automático</Text>
          </HStack>
        </Card>
        <Card style={styles.card} shadow={isIos ? 2 : -2}>
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
              Testar - Retorno
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
              Testar - Erro
            </Button>
          </HStack>
        </Card>

        {errorMessage && (
          <Alert w="90%" status="error" mb={4}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack space={2} alignItems="center">
                <Alert.Icon />
                <Text style={styles.alertText}>{errorMessage}</Text>
                <IconButton variant="unstyled" icon={<CloseIcon size="3" />} onPress={() => setErrorMessage(null)} />
              </HStack>
            </VStack>
          </Alert>
        )}

        <Card style={styles.card} shadow={isIos ? 2 : -2}>
          <HStack space={4} alignItems="center" justifyContent="space-between">
            <Text style={styles.cardTitle}>Logoff</Text>
            <Button
              bg={colors.primary}
              _text={{ color: colors.txtW }}
              _pressed={{ bg: colors.primaryDark }}
              borderRadius="md"
              onPress={handleLogoff}
              width={100}
            >
              Sair
            </Button>
          </HStack>
        </Card>
      </ScrollView>
      <ModalList visible={modalVisible} data={data} onClose={() => setModalVisible(false)} />
    </SafeAreaView >
  );
};

export default Home;
