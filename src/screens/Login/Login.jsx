import React, { useContext, useState, useRef, useEffect } from "react";
import { Box, Button, Center, Input, VStack, Text, Icon, Pressable } from "native-base";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../../contexts/AuthContext";
import { useColors } from '../../theme/colors';
import { Image, KeyboardAvoidingView, Platform, Animated } from "react-native";
import styles from "./styles";

const montain = require('../../assets/images/mountain.png');
const visible = require('../../assets/icons/visible.png');
const invisible = require('../../assets/icons/invisible.png');

export default function Login({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useContext(AuthContext);
  const colors = useColors();

  const slideAnim = useRef(new Animated.Value(0)).current; // Inicializa a animação da translação
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializa a animação da opacidade
  

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      setLoginError("Falha na autenticação. Tente novamente.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      
      Animated.timing(slideAnim, {
        toValue: 10, 
        duration: 1500,
        useNativeDriver: true,
      }).start();

      Animated.timing(fadeAnim, {
        toValue: 0.4, 
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [slideAnim, fadeAnim]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >

      <Center flex={1} bg={colors.primary} px={4}>
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
        >
          <Animated.Image
            style={[styles.img, { transform: [{ translateX: slideAnim }], opacity: fadeAnim }]}
            resizeMode="cover"
            source={montain}
          />
        </Box>

        <Box w="100%" maxW="400px" p={6} bg="white" borderRadius="lg" shadow={5} zIndex={2}>
          <Text fontSize="xl" bold mb={6} color={colors.secondaryDark} textAlign="left">
            Login Teste
          </Text>
          <VStack space={4}>
            <Text fontSize="md" color={colors.secondaryDark}>
              E-mail
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de e-mail inválido"
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Digite seu e-mail"
                  borderRadius="md"
                  height={45}
                  value={value}
                  onChangeText={onChange}
                  isInvalid={!!errors.email}
                  _focus={{ borderColor: colors.primary }}
                />
              )}
            />
            {errors.email && <Text color="red.500">{errors.email.message}</Text>}

            <Text fontSize="md" color={colors.secondaryDark}>
              Senha
            </Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Senha é obrigatória"
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Digite sua senha"
                  borderRadius="md"
                  value={value}
                  height={45}
                  onChangeText={onChange}
                  isInvalid={!!errors.password}
                  _focus={{ borderColor: colors.primary }}
                  secureTextEntry={!showPassword}
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Image
                        source={showPassword ? visible : invisible}
                        alt="Ícone de senha"
                        style={styles.icon}
                      />
                    </Pressable>
                  }
                />
              )}
            />
            {errors.password && <Text color="red.500">{errors.password.message}</Text>}

            {loginError && <Text color="red.500" textAlign="center">{loginError}</Text>}

            <Button
              bg={colors.primary}
              _pressed={{ bg: colors.primaryDark }}
              borderRadius="md"
              onPress={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </VStack>
        </Box>
      </Center>

    </KeyboardAvoidingView>
  );
}
