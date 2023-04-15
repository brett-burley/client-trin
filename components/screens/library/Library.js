import { Text, Platform, StyleSheet, View } from 'react-native';
import LibraryNav from '../../navs/LibraryNav';

export default function Library({ navigation })
{
  return (
    <View style={sty.container}>
      <View style={sty.wrapper}>
        <LibraryNav />
      </View>
    </View>
  );
}


const sty = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: '99%',
    width: '99%',
    padding: 2,
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  },
});

