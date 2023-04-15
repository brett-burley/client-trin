import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from '@rneui/themed';
import Books from '../screens/library/Books';
//import Upload from '../library/Upload';


const Tab = createMaterialTopTabNavigator();


export default function LibraryNav()
{
  return (
    <Tab.Navigator
      initialRouteName="Books"
    >
      <Tab.Screen 
        name='Books'
        component={Books} 
        options={{
          tabBarLabel: "Books",
          tabBarIcon: () => <Icon type="ionicon" name="book-outline" size={24} color="black" />,
        }}
      />

    {/*
      <Tab.Screen 
        name='Upload'
        component={Upload}
        options={{
          tabBarLabel: "Upload your Own",
          tabBarIcon: () => <Icon type="ionicon" name="cloud-upload-outline" size={24} color="black" />,
        }}
      />
      */}
    </Tab.Navigator>
  );
}

