import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from '@rneui/themed';
import Screen from '../Screen';
import Header from '../../layout/Header';

export default function Games({ navigation })
{
  return (
    <Screen>
      <View style={sty.header}>
        <Header title="Games">
          <Icon type="material-community" name="gamepad-variant-outline" size={50} />
        </Header>
      </View>
      <View style={sty.buttons}>
        <Button
          onPress={() => navigation.navigate("Strokes")}
          size="lg" 
          radius="lg" 
          type="solid" 
        >
          <View style={sty.navBtn}>
            <Text style={sty.navText}>Strokes</Text>
            <Icon type="material-community" name="draw-pen" size={40} color="#fff" />
          </View>
        </Button>
        <Button
          onPress={() => navigation.navigate("Numbers")}
          size="lg"
          radius="lg"
          type="solid"
        >
          <View style={sty.navBtn}>
            <Text style={sty.navText}>Numbers</Text>
            <Icon type="octicon" name="number" size={50} color="#fff" />
          </View>
        </Button>
      </View>
    </Screen>
  );
}


const sty = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
    flexGrow: 6,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '50%',
    minWidth: 200,
    height: 200,
  },
  navText: {
    fontSize: 35,
    color: '#fff',
    marginBottom: 10,
  },

});

