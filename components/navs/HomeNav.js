import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from '@rneui/themed';
import Strokes from '../screens/strokes/Strokes';
import Numbers from '../screens/numbers/Numbers';

const Tab = createMaterialTopTabNavigator();

export default function HomeNav()
{
  return (
    <Tab.Navigator
      initialRouteName="Library"
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Tab.Screen 
        name='Library'
        component={Library} 
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Icon type="antdesign" name="home" size={24} color="black" />,
          tabBarItemStyle: { width: '100%', textAlign: 'center' },
        }}
      />

      <Tab.Screen 
        name='Strokes'
        component={Strokes} 
        options={{
          tabBarItemStyle: { display: 'none' },
          headerShown: false,
          tabBarShowLabel: false,
          lazy: true,
        }}
      />

      <Tab.Screen 
        name='Numbers'
        component={Numbers} 
        options={{
          tabBarItemStyle: { display: 'none' },
          headerShown: false,
          tabBarShowLabel: false,
          lazy: true,
        }}
      />
    </Tab.Navigator>
  );
}
