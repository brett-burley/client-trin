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
      <Text style={sty.sectionText}>{`Section: ${section+1}`}</Text>
    </View>
  );
}

function JumpTo({ onPress })
{
  <Text style={sty.sectionText}>{`Section: ${section+1}`}</Text>
  const input = createRef();
  const { bookLength, setSection, section } = useBook();
  const [num, setNum] = useState(0);
  
  const disabled = num < 1 || num >= bookLength;
  const range = `1-${bookLength}`
  const errorMsg = `range: ${range}`;


  return (
    <View style={sty.jumpTo}>
      <View style={sty.jumpToInput}>
        <Input
          containerStyle={sty.input}
          inputStyle={sty.input}
          placeholder={`(${range})`}
          onChangeText={v => onChange(v)}
          ref={input}
        />

        <Button
          onPress={onPress}
          disabled={disabled}
          size="lg"
        >
          {`Jump to: ${num ? num : '-'}`}
        </Button>
      </View>
      <Text style={sty.sectionText}>{`Section: ${section+1}`}</Text>
    </View>
  );


  function onChange(v)
  {
    const value = parseInt(v);
    if(value < 1 || value >= bookLength) {
      input.current.shake();
      input.current.clear();
      setNum(0);
      return;
    }

    setNum(value);
  }


  function onPress()
  {
    close();
    setSection(num-1);
  }
}


function ControlBtn({ type })
{
  const { setSection } = useBook();
  const disabled = false;

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
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    borderTopColor: 'rgb(17, 138, 178)',
  },  
  controlBtn: {
    flex: 4,
    height: '100%',
  },
  icon: {
    margin: 15,
  },
  disabled: {
    backgroundColor: '#e3e6e8',
    opacity: 0.7,
  },
  sectionTextContainer: {
    flex: 2,
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
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
