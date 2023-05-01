import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from '@rneui/themed';

import ReadLine from '../screens/book/ReadLine';
import ReadPage from '../screens/book/ReadPage';

const Tab = createMaterialTopTabNavigator();

export default function BookNav()
{
  return (
    <Tab.Navigator
      initialRouteName='page'
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: 'rgba(170,73,235,0.3)',
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: { fontSize: 15 },
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
