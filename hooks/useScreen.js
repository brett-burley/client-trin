import { useTheme, useThemeMode } from '@rneui/themed';


export default function useScreen()
{
  const { mode } = useTheme();
  const { theme } = useTheme();
  const { colors } = theme;

  const light = mode === 'light';

  return {
    screenOptions: {
      headerStyle: {
        backgroundColor: light ? colors.grey5 : colors.grey4,
        borderBottomColor: colors.black,
      },
      headerTitleStyle: {
        color: colors.black,
        fontWeight: '500',
        fontSize: 22,
      },
      tabBarStyle: {
        backgroundColor: light ? colors.grey5 : colors.grey4,
        borderTopColor: colors.black,
      },
      tabBarLabelStyle: {
        fontSize: 22,
        marginLeft: 25,
      },
      tabBarActiveTintColor: colors.secondary,
      tabBarInactiveTintColor: colors.black,
    },
    hideTab: {
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { display: 'none' },
      tabBarItemStyle: { display: 'none' },
      tabBarLabelStyle: { display: 'none' },
      lazy: true,
    }
  }
};
