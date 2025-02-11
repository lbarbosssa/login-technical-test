import React from 'react';
import { LogBox } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop.", 
]);

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider >
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

export default App;
