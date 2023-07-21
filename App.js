import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import AllStates from './components/layout/AllStates';
import Screen from './components/screens/Screen';
import ScreenNav from './components/navs/ScreenNav';
import ErrorBoundary from './components/layout/ErrorBoundary';

const theme = getTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AllStates>
        <SafeAreaProvider>
          <StatusBar style="auto" />
            <ErrorBoundary>
              <ScreenNav />
            </ErrorBoundary>
        </SafeAreaProvider>
      </AllStates>
    </ThemeProvider>
  );
}


function getTheme()
{
  return createTheme({
    lightColors: {
      primary: '#118AB2',
      secondary: '#073B4C',
      success: '#06D6A0',
      warning: '#FF0166',
      error: '#EF476F',
    },
    darkColors: {
      primary: '#0C627F',
      secondary: '#052935',
      success: '#049971',
      warning: '#FFB300',
      error: '#CC123D',
    },
  });
}
