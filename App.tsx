import React from 'react';

import { Routes } from './src/routes/index.routes';

import { useFonts, Inter_400Regular, Inter_500Medium, } from '@expo-google-fonts/inter';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { Hooks } from './src/hooks';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_500Medium, 
    Inter_400Regular,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold, 
  });

  return fontsLoaded ? (
    <Hooks>
      <ThemeProvider theme={theme}>
          <Routes />
      </ThemeProvider>
    </Hooks>
  ) : <AppLoading />;
}