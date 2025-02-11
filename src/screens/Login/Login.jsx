import React, { useContext, useState } from "react";
import { Box, Button, Center, Input, VStack, Text } from "native-base";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../../contexts/AuthContext";
import { useColors } from '../../theme/colors'; 

export default function Login({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(""); 
  const { login } = useContext(AuthContext); 
  const colors = useColors()

  const onSubmit = async (data) => {
    try {
     
      await login(data.email, data.password);
      navigation.navigate("Home");
    } catch (error) {
      setLoginError("Falha na autenticação. Tente novamente.");
    }
  };

  return (
    <Center flex={1} bg={colors.primary} px={4}>
      <Box w="100%" maxW="400px" p={6} bg="white" borderRadius="lg" shadow={5}>
        <Text fontSize="xl" bold mb={6} color="black" textAlign="center">
          Login Teste
        </Text>
        <VStack space={4}>

          <Text fontSize="sm" color="black">
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

          
          <Text fontSize="sm" color="black">
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
                secureTextEntry
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
  );
}
