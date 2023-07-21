import { Button, Text, Platform, StyleSheet, View } from 'react-native';
import Library from './Library';
//import HomeNav from '../../navs/HomeNav';

export default function Home({ navigation })
{
  return (
    <View style={sty.container}>
      <View style={sty.wrapper}>
        <Library />
      </View>
    </View>
  );
}


const sty = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    padding: 2,
    boxShadow: '0px 0px 4px 2px rgba(60, 64, 67, 0.3)',
  },
});

