import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, Icon } from '@rneui/themed';

import ReadLine from '../screens/book/ReadLine';
import ReadPage from '../screens/book/ReadPage';

const Tab = createMaterialTopTabNavigator();

export default function BookNav()
{
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { backgroundColor: theme.colors.grey5 },
        tabBarActiveTintColor: theme.colors.warning,
        tabBarInactiveTintColor: theme.colors.black,
      }}
    >

      <Tab.Screen 
        name='line'
        component={ReadLine} 
        options={{
          tabBarIcon: () => <Icon type="material" name="format-strikethrough" />,
          tabBarLabel: 'By Line',
          lazy: true,
        }}
      />

      <Tab.Screen 
        name='page'
        component={ReadPage}
        options={{
          tabBarIcon: () => <Icon type="material-community" name="book-open-page-variant-outline" />,
          tabBarLabel: 'By Page',
          lazy: true,
        }}
      />

    </Tab.Navigator>
  );
}
