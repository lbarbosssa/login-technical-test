import React from 'react';
import { Box, Button, Text } from 'native-base';

export default function Home({ navigation }) {
  return (
    <Box flex={1} bg="#ededed" alignItems="center" justifyContent="center">
      <Text fontSize="lg">Tela Home</Text>
      <Button mt={4} onPress={() => navigation.navigate('Login')}>
        Voltar para Login
      </Button>
    </Box>
  );
}
