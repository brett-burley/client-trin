import { createRef, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { ListItem, useTheme, FAB, Divider, Text, Icon, Button, Input } from '@rneui/themed';
import useMode from '../../../hooks/useMode';
import useBook from '../../../hooks/useBook';
import Popup from '../../extras/Popup';
import Settings from './Settings';

export default function Controls({ children })
{
  return (
    <View style={sty.controls}>
      <View style={sty.btns}>
        <ControlBtn type="left" />
        
        <Menu />

        <ControlBtn type="right" />
      </View>
    </View>
  );
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
      containerStyle={sty.menuBtn}
      style={sty.menuBtn}
      buttonStyle={sty.menuBtn}
    >
      <View style={sty.menuBtnContents}>
        <Icon
          type="simple-line-icon"
          name="settings"
          reverseColor="#fff"
          color={theme.colors.primary}
          reverse
          style={sty.menuIconInner}
        />
        <Text style={sty.locationText}>{`section: ${section+1}`}</Text>
      </View>
    </Button>
  );
}


function ControlBtn({ type })
{
  const { setSection } = useBook();
  const disabled = false;

  return (     
    <Button
      style={sty.btn}
      containerStyle={sty.btn}
      buttonStyle={sty.btn}
      onPress={onPress}
      type="clear"
      disabled={disabled}
      disabledStyle={sty.disabled}
    >
      <Icon 
        type="antdesign" 
        name={type}
        style={sty.icon}
      />
    </Button>
  );

  
  function onPress()
  {
    const value = type === 'left' ? -1 : 1;
    setSection(value);
  }
}


const sty = StyleSheet.create({
  safeArea: { 
    width: '100%',
    height: '100%'
  },
  openBtn: {
    height: '100%',
    width: '100%',
    padding: 0,
  },
  modeBtnContainer: {
    height: 80,
  },
  modeBtnText: {
    fontSize: 20,
  },
  cancelItem: {
    backgroundColor: '#ff190c',
  },
  cancelTitle: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
  },
  chevrons: {
    fontWeight: 'lighter',
    marginLeft: 15,
    marginRight: 15,
  },
  listItemTitle: {
    fontSize: 20,
    margin: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center'
  },
  accordion: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sliderBtn: {
    marginBottom: 10,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  gotoContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backContent: {
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  btnContents: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btnIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: {
    color: '#43484d',
    fontWeight: '400',
  },
  input: {
    width: '50%',
  },

  controls: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    borderTopColor: 'rgb(17, 138, 178)',
  },  
  btns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    flex: 5,
    height: '100%',
  },
  menu: {
    flex: 1,
    height: '100%',
  },
  icon: {
    margin: 15,
  },
  disabled: {
    backgroundColor: '#e3e6e8',
    opacity: 0.7,
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
