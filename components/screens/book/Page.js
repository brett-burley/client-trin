import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon,  Divider, TabView, useTheme } from '@rneui/themed';
import useBook from '../../../hooks/useBook';

import Controls from './Controls';
import BookNav from '../../navs/BookNav';
import Popup from '../../extras/Popup';
import Settings from './Settings';



export default function Page() 
{
  return (
    <View style={sty.page}>
      <BackBtn />
      <Menu />
      <View style={sty.read}>
        <TabViewPages />
      </View>

      <View style={sty.controls}>
        <Controls />
      </View>
    </View>
  );
}

function TabViewPages()
{
  const { setSection } = useBook();

  return (
    <TabView
      containerStyle={sty.tabViewPages}
      onSwipeStart={direction => swiped(direction)}
    >
      <TabViewPage />
    </TabView>
  );




  function swiped(dir)
  {
    const value = dir === 'right' ? 1 : -1;
    setSection(value);
  }
}

function TabViewPage()
{
  return (
    <TabView.Item style={sty.tabViewPage}>
    <ScrollView contentContainerStyle={sty.scrollView}>
      <BookNav />
    </ScrollView>
    </TabView.Item>
  );
}


function BackBtn()
{

  const navigation = useNavigation();
  return (
    <View style={sty.backBtn}>
      <Button onPress={onPress} type="outline">
        <Icon type='material-community' name='book-arrow-left-outline' />
      </Button>
    </View>
  );

  function onPress()
  {
    close();
    navigation.navigate('Library');
  }

}


function Menu()
{
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <View style={sty.menu}>
      <MenuBtn onPress={open} />
      <Popup show={show} close={close}>
        <Settings close={close} />
      </Popup>
    </View>
  );
}

function MenuBtn({ onPress })
{
  const { section } = useBook();
  const { theme } = useTheme();

  return (
    <Button 
      onPress={onPress}
      type='outline'
    >
      <Icon
        type="ionicon"
        name="menu-sharp"
        style={sty.menuIconInner}
        size={30}
      />
    </Button>
  );
}

const sty = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'rgba(245, 225, 200, 0.5)',
  },
  read: {
    flex: 8,
  },
  controls: {
    flex: 1,
  },
  tabViewPages: {
    flex: 1,
  },
  tabViewPage: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: '10px',
    left: '95%',
    zIndex: 1000,
  },
  backBtn: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1000,
  },
  menuBtn: {
    height: '100%',
    width: '100%',
  },
  menuBtnContents: {
    alignItems: 'center',
  },
  locationText: {
    fontSize: 10,
  },
});
