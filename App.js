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
      primary: '#c0cff2',
      secondary: '#a730f1',
      success: '#46cc4b',
      warning: '#fffc41',
      error: '#f03716',
    },
    darkColors: {
      primary: '#a5bcf0',
      secondary: '#9a15ed',
      success: '#2cc932',
      warning: '#fcf92b',
      error: '#ed2400',
    },
  });
}
