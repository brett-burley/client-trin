import { useEffect } from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import useScreen from '../../hooks/useScreen';

import Webpage from '../screens/web/Webpage';
import Home from '../screens/home/Home';
import Book from '../screens/book/Book';
import Games from '../screens/home/Games';
import Strokes from '../screens/strokes/Strokes';
import Numbers from '../screens/numbers/Numbers';


const Tab = createBottomTabNavigator();


export default function ScreenNav() {
  const {screenOptions, hideTab } = useScreen();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Icon type="antdesign" name="home" size={28} />,
          }}
        />

        <Tab.Screen
          name="Book"
          component={Book}
          options={{
            tabBarIcon: () => <Icon type="entypo" name="open-book" size={28} />,
            lazy: true,
            headerShown: false,
          }}
        />

        <Tab.Screen 
          name="Games" 
          component={Games}
          options={{
            tabBarIcon: () => <Icon type='material-community' name='dice-multiple-outline' size={28} />,
            lazy: true,
          }}
        />


        <Tab.Screen
          name="Webpage"
          component={Webpage}
          options={{...hideTab}}
        />
        <Tab.Screen
          name="Strokes"
          component={Strokes}
          options={{...hideTab}}
        />
        <Tab.Screen
          name="Numbers"
          component={Numbers}
          options={{...hideTab}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


/*
const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home},
    Games: { screen: Games },
    Webpage: { screen: Webpage },
    Strokes: { screen: Strokes },
    Numbers: { screen: Numbers },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showIcon: false,
      showLabel: true,
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index === 0 || navigation.state.index === 1,
    }),
  }
);

export default TabNavigator;
export default function ScreenNav()
{
  const routeName = Platform.OS === 'web' ? 'Webpage' : 'Home';
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={routeName}  
      >

        <Tab.Screen
          name='Webpage'
          component={Webpage}
          tabBarVisible={false}
          options={{
            tabBarIcon: () => null,
          }}
        />
 
        <Tab.Screen 
          name='Home'
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: () => <Icon type='ionicon' name='library-outline' size={24} color="black" />,
          }}
        />

        <Tab.Screen 
          name='Games'
          component={Games}
          options={{
            title: 'Games',
            tabBarIcon: () => <Icon type='material-community' name='dice-multiple-outline' size={24} color="black" />,
          }}
        />

       
        
        <Tab.Screen 
          name='Strokes'
          component={Strokes} 
          tabBarVisible={false}
          labeled={false}
        />

        <Tab.Screen 
          name='Numbers'
          component={Numbers} 
          tabBarVisible={false}
          labeled={false}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
/*
const TabBarComponent = (props) => {
  const { navigation } = props;
  const { routes, index } = navigation.state;

  return (
    <View style={styles.tabBar}>
      {routes.map((route, idx) => {
        const isFocused = index === idx;
        const { tabBarVisible } = route.params;

        if (!tabBarVisible) {
          return null; // Skip rendering hidden tabs
        }
        
        console.log(route);
        return <Text>tab</Text>
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 56, // Adjust the height as per your design
    backgroundColor: 'white', // Adjust the background color as per your design
    elevation: 8, // Adjust the elevation as per your design
  },
});
*/

/*
        <Tab.Screen 
          name='Book'
          component={Book}
          options={{
            tabBarStyle: { display: 'none' },
            headerShown: false,
            title: 'Read',
            tabBarIcon: () => <Icon type="ionicon" name="reader-outline" size={24} color="black" />,
            tabBarStyle: { display: 'none' },
            tabBarItemStyle: { display: 'none' },
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
*/
