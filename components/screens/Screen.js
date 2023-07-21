import { useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Icon, useTheme, useThemeMode } from '@rneui/themed';

export default function Screen({ children })
{
  const { theme } = useTheme();
  const { mode, setMode } = useThemeMode();

  useEffect(() => {
    setMode('dark');
  }, [])

  const sty = makeStyles(theme);

  return (
      <ScrollView contentContainerStyle={sty.container}>
        <Button
          containerStyle={sty.modeBtn} 
          onPress={switchMode}
          type="outline"
        >
          <ModeIcon mode={mode} />
        </Button>
        {children}
      </ScrollView>
  );


  function switchMode()
  {
    const newMode = mode === 'light' ? 'dark' : 'light';

    setMode(newMode);
  }
}

function ModeIcon({ mode })
{
  if(mode === 'light')
    return <Icon type="feather" name="sun" size={30} />
  return <Icon type="feather" name="moon" size={30} />
}


function makeStyles(theme)
{
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 5,
      position: 'relative',
    },
    modeBtn: {
      position: 'absolute',
      top: 5,
      left: 5,
      zIndex: 1000,
    },
  });
}


