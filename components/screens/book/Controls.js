import { createRef, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { ListItem, useTheme, FAB, Divider, Text, Icon, Button, Input } from '@rneui/themed';
import useMode from '../../../hooks/useMode';
import useBook from '../../../hooks/useBook';
import Popup from '../../extras/Popup';
import Settings from './Settings';

let sty = {};

export default function Controls({ children })
{
  const { theme } = useTheme();
  sty = useStyles(theme);

  return (
    <View style={sty.controls}>
      <ControlBtn type="left" />
      <SectionText />
      <ControlBtn type="right" />
    </View>
  );
}

function SectionText()
{
  
  const { section } = useBook();

  return (
    <View style={sty.sectionTextContainer}>
      <Text style={sty.sectionText}>
        {`Section: ${section+1}`}
      </Text>
    </View>
  );
}


function ControlBtn({ type })
{
  const { setSection } = useBook();
  const disabled = false;

  const name = type === 'left' ? 'control-rewind' : 'control-forward';

  return (     
    <Button
      style={sty.controlBtn}
      containerStyle={sty.controlBtn}
      buttonStyle={sty.controlBtn}
      onPress={onPress}
      type="outline"
      disabled={disabled}
      disabledStyle={sty.disabled}
    >
      <Icon 
        type="simple-line-icon" 
        name={name}
        style={sty.icon}
        size={35}
      />
    </Button>
  );

  
  function onPress()
  {
    const value = type === 'left' ? -1 : 1;
    setSection(value);
  }
}


function useStyles(theme)
{
  const { colors } = theme;

  return StyleSheet.create({
    controls: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopStyle: 'solid',
      borderTopWidth: '3px',
      borderTopColor: 'rgb(17, 138, 178)',
      backgroundColor: colors.background,
    },  
    controlBtn: {
      flex: 4,
      height: '100%',
    },
    icon: {
      margin: 15,
      color: colors.black,
    },
    disabled: {
      backgroundColor: '#e3e6e8',
      opacity: 0.7,
    },
    sectionTextContainer: {
      flex: 2,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'rgb(17, 138, 178)',
    },
    jumpTo: {
      flex: 2,
    },
    jumpToInput: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '50%',
    },
    inputLabel: {
      fontSize: 8,
    },
    sectionText: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
}
