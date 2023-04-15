import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Divider, Text } from '@rneui/themed';
import useBook from '../../hooks/useBook';
import ReadNav from '../navs/ReadNav';


export default function Read()
{
  return (
    <View style={sty.tabPage}>
      <ReadNav />    
    </View>
  );
}


const sty = StyleSheet.create({
  tabPage: {
    flex: 1,
  },
});
